import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const plugin = fileURLToPath(new URL('../plugins/onecrew/', import.meta.url));
test('both skills and every local reference are included in the plugin', async () => {
  const manifest = JSON.parse(
    await readFile(path.join(plugin, '.codex-plugin/plugin.json'), 'utf8'),
  );
  const root = path.resolve(plugin, manifest.skills);
  const names = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    const skill = await readFile(path.join(root, name, 'SKILL.md'), 'utf8');
    assert.match(skill, new RegExp(`^---\\nname: ${name}\\n`));
    names.push(name);
    for (const match of skill.matchAll(/\]\((references\/[^)]+)\)/gu))
      assert((await readFile(path.join(root, name, match[1]), 'utf8')).trim());
  }
  assert.deepEqual(names.sort(), ['onecrew', 'onecrew-web-research']);
});
