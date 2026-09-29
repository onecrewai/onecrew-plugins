import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const windows = process.platform === 'win32';
test('marketplace uses only plugin-relative launch configuration', async () => {
  const market = JSON.parse(await readFile(path.join(root, '.agents/plugins/marketplace.json')));
  assert.equal(market.name, 'onecrew');
  assert.equal(market.plugins[0].source.path, './plugins/onecrew');
  const config = JSON.parse(await readFile(path.join(root, 'plugins/onecrew/.mcp.json'))).mcpServers.onecrew;
  assert.equal(config.type, 'stdio');
  assert.equal(config.command, './scripts/launch_onecrew_mcp');
  assert.equal(config.cwd, '.');
  assert(!('url' in config));
});

test('OS launcher finds the installed program without Node or OneCrew on PATH', async (t) => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'onecrew-launcher-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  const home = path.join(temp, 'User spaces & punctuation!');
  const plugin = path.join(temp, 'plugin cache spaces');
  await cp(path.join(root, 'plugins/onecrew'), plugin, { recursive: true });
  const install = windows ? path.join(home, 'Programs/OneCrewConnect') : path.join(home, 'Applications/OneCrewConnect');
  await mkdir(install, { recursive: true });
  const executable = path.join(install, windows ? 'onecrew.exe' : 'onecrew');
  if (windows) {
    // A real OS executable accepts the literal "mcp" argument as a search pattern.
    await cp(path.join(process.env.SystemRoot, 'System32/findstr.exe'), executable);
  } else {
    await writeFile(executable, '#!/bin/sh\nprintf "%s\\n" "$1"\n/bin/cat\nexit 23\n', { mode: 0o755 });
  }
  const env = { HOME: home, USERPROFILE: home, LOCALAPPDATA: home, PATH: path.join(temp, 'empty-path') };
  for (const key of ['SystemRoot', 'SYSTEMROOT', 'ComSpec', 'COMSPEC', 'PATHEXT']) {
    if (process.env[key]) env[key] = process.env[key];
  }
  const launcher = path.join(plugin, 'scripts/launch_onecrew_mcp') + (windows ? '.cmd' : '');
  const run = (extra = {}, input = 'mcp: payload\n') => spawnSync(windows ? `"${launcher}"` : launcher, [], {
    cwd: temp, env: { ...env, ...extra }, input, encoding: 'utf8', timeout: 5000,
    shell: windows ? process.env.ComSpec : false, windowsHide: true,
  });
  const installed = run();
  assert.equal(installed.status, windows ? 0 : 23, installed.stderr);
  assert.equal(installed.stdout.replaceAll('\r\n', '\n'), windows ? 'mcp: payload\n' : 'mcp\nmcp: payload\n');
  assert.equal(installed.stderr, '');
  const override = run({ HOME: path.join(temp, 'missing-home'), LOCALAPPDATA: path.join(temp, 'missing-home'), ONECREW_BINARY: executable });
  assert.equal(override.status, installed.status, override.stderr);
  const missing = run({ ONECREW_BINARY: path.join(temp, windows ? 'missing.exe' : 'missing') });
  assert.equal(missing.status, 127);
  assert.equal(missing.stdout, '');
  assert.match(missing.stderr, /not installed/);
  const relative = run({ ONECREW_BINARY: 'relative/onecrew' });
  assert.equal(relative.status, 64);
  assert.equal(relative.stdout, '');
});
