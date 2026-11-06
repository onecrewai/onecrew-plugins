import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { promisify } from 'node:util';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

assert.equal(process.platform, 'win32');
const execute = promisify(execFile);
const version = process.env.ONECREW_TEST_VERSION;
assert.ok(version);
const candidate = path.resolve('.cache/candidate/node_modules/@onecrew/pro');
const baseline = path.resolve('.cache/baseline/node_modules/@onecrew/pro');
const entry = path.join(candidate, 'bin/onecrew-pro.cjs');
const binary = path.join(path.dirname(createRequire(path.join(candidate, 'package.json')).resolve('@onecrew/pro-win32-x64/package.json')), 'onecrew.exe');
const powershell = path.join(process.env.SystemRoot, 'System32/WindowsPowerShell/v1.0/powershell.exe');
const run = (file, args, env = process.env) => execute(file, args, { env, timeout: 240000, maxBuffer: 4 * 1024 * 1024, windowsHide: true });
const ps = command => run(powershell, ['-NoProfile', '-NonInteractive', '-Command', `$ErrorActionPreference='Stop'; ${command}`]);
const sid = (await ps('[Security.Principal.WindowsIdentity]::GetCurrent().User.Value')).stdout.trim();
assert.match(sid, /^S-1-\d+(?:-\d+)+$/);
assert.equal((await run(binary, ['--version'])).stdout.trim(), version);

async function profile(t) {
  const directory = await mkdtemp(path.resolve('.cache/windows setup-'));
  const data = path.join(directory, 'data with spaces');
  const full = { ...process.env, ONECREW_DATA_DIR: data, ONECREW_INSTALL_DIR: path.join(directory, 'application') };
  delete full.ONECREW_RUNTIME_FILE;
  delete full.ONECREW_UPDATE_WORKER;
  const restricted = { ...full };
  for (const key of Object.keys(restricted)) {
    if (['LOCALAPPDATA', 'PATH'].includes(key.toUpperCase())) delete restricted[key];
  }
  restricted.Path = [path.dirname(process.execPath), path.dirname(process.env.ONECREW_TEST_GIT)].join(path.delimiter);
  assert.ok(!restricted.Path.toLowerCase().includes('powershell'));
  t.after(async () => {
    await run(binary, ['stop', '--data-dir', data], full);
    const name = 'OneCrewPro-' + createHash('sha256').update(`${sid}|${path.resolve(data).toLowerCase()}`).digest('hex').slice(0, 24).toUpperCase();
    await ps(`$task=Get-ScheduledTask -TaskName '${name}' -ErrorAction SilentlyContinue; if ($task) { Unregister-ScheduledTask -TaskName '${name}' -Confirm:$false }`);
    await rm(directory, { recursive: true, maxRetries: 10, retryDelay: 200 });
  });
  return { directory, data, full, restricted };
}

async function verifyMcp(data, env) {
  const client = new Client({ name: 'windows-setup-acceptance', version: '1' });
  try {
    await client.connect(new StdioClientTransport({ command: binary, args: ['mcp', '--data-dir', data], env, stderr: 'pipe' }));
    const result = await client.callTool({ name: 'account', arguments: { action: 'version' } });
    assert.notEqual(result.isError, true);
    assert.equal(result.structuredContent.result.version, version);
  } finally {
    await client.close();
  }
}

test('native service starts without PowerShell on PATH and survives the launcher exit', { timeout: 180000 }, async t => {
  const { data, restricted } = await profile(t);
  const first = JSON.parse((await run(binary, ['start', '--data-dir', data, '--port', '0', '--json'], restricted)).stdout);
  assert.equal(first.state, 'running');
  const repeated = JSON.parse((await run(binary, ['start', '--data-dir', data, '--json'], restricted)).stdout);
  assert.equal(repeated.pid, first.pid);
  assert.equal((await fetch(`${first.url}/api/v1/access/version`).then(response => response.json())).version, version);
  await verifyMcp(data, restricted);
});

for (const scenario of ['fresh', 'running', 'stopped']) {
  test(`${scenario} WorkBuddy setup without LOCALAPPDATA or PowerShell on PATH`, { timeout: 600000 }, async t => {
    const upgrade = scenario !== 'fresh';
    const { directory, data, full, restricted } = await profile(t);
    let previous;
    if (upgrade) {
      const old = JSON.parse((await run(process.execPath, [path.join(baseline, 'bin/onecrew-pro.cjs'), 'setup', '--client', 'mcp', '--mcp-config', path.join(directory, 'mcp.json'), '--skills-dir', path.join(directory, 'skills'), '--port', '0'], full)).stdout);
      assert.equal(old.state, 'ready');
      previous = old.service;
      if (scenario === 'stopped')
        await run(process.execPath, [path.join(baseline, 'bin/onecrew-pro.cjs'), 'stop'], full);
    }
    const clientDirectory = path.join(directory, 'workbuddy');
    await mkdir(clientDirectory);
    await writeFile(path.join(clientDirectory, 'settings.json'), '{"language":"zh-CN"}\n');
    const args = [entry, 'setup', '--client', 'workbuddy', '--client-dir', clientDirectory, ...(upgrade ? [] : ['--port', '0'])];
    const first = JSON.parse((await run(process.execPath, args, restricted)).stdout);
    assert.equal(first.state, 'ready');
    assert.equal(first.service.version, version);
    assert.equal(first.service.data_dir, data);
    assert.equal(first.client.plugin_version, '0.1.22');
    assert.equal(first.mcp.version, version);
    if (previous) assert.equal(first.service.url, previous.url);
    const repeated = JSON.parse((await run(process.execPath, args, restricted)).stdout);
    assert.equal(repeated.state, 'ready');
    assert.equal(repeated.service.pid, first.service.pid);
    const settings = JSON.parse(await readFile(path.join(clientDirectory, 'settings.json'), 'utf8'));
    assert.equal(settings.language, 'zh-CN');
    assert.equal(settings.enabledPlugins['onecrew@onecrew'], true);
    assert.equal(settings.pluginConfigs['onecrew@onecrew'].options.data_dir, data);
    await verifyMcp(data, restricted);
  });
}
