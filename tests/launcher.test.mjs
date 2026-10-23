import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const root = fileURLToPath(new URL('../', import.meta.url));
const windows = process.platform === 'win32';
test('marketplace uses plugin-relative launch configuration', async () => {
  const market = JSON.parse(await readFile(path.join(root, '.agents/plugins/marketplace.json')));
  assert.equal(market.name, 'onecrew');
  assert.equal(market.plugins[0].source.path, './plugins/onecrew');
  const pluginRoot = path.join(root, 'plugins/onecrew');
  const manifest = JSON.parse(await readFile(path.join(pluginRoot, '.codex-plugin/plugin.json')));
  const config = JSON.parse(await readFile(path.resolve(pluginRoot, manifest.mcpServers))).mcpServers.onecrew;
  assert.equal(config.type, 'stdio');
  assert.equal(config.command, './scripts/launch_onecrew_mcp');
  assert.equal(config.cwd, '.');
  assert.ok(config.env_vars.includes('PATH'));
});

test('real service connects through the selected installation launchers', {timeout: 120000}, async (t) => {
  const binary = process.env.ONECREW_TEST_BINARY;
  assert.ok(binary && path.isAbsolute(binary), 'Set ONECREW_TEST_BINARY to a real Pro executable');
  assert.ok((await stat(binary)).isFile());
  await mkdir(path.join(root, '.cache'), {recursive: true});
  const directory = await mkdtemp(path.join(root, '.cache/launcher-live-'));
  const home = path.join(directory, 'User spaces & punctuation!');
  const profile = path.join(directory, 'data');
  const plugin = path.join(directory, 'plugin cache spaces');
  await cp(path.join(root, 'plugins/onecrew'), plugin, {recursive: true});
  const install = windows ? path.join(home, 'Programs/OneCrewConnect') : path.join(home, 'Applications/OneCrewConnect');
  await mkdir(install, {recursive: true});
  await cp(binary, path.join(install, windows ? 'onecrew.exe' : 'onecrew'));
  const service = spawn(binary, ['serve', '--data-dir', profile, '--port', '0'], {stdio: ['ignore', 'pipe', 'pipe']});
  let logs = '';
  service.stdout.on('data', chunk => {logs += chunk;});
  service.stderr.on('data', chunk => {logs += chunk;});
  t.after(async () => {
    if (service.exitCode !== null || service.signalCode !== null) return;
    const exited = new Promise(resolve => service.once('exit', resolve));
    service.kill('SIGTERM');
    await exited;
  });
  const runtimeFile = path.join(profile, 'run/server.json');
  for (let attempt = 0; !existsSync(runtimeFile) && attempt < 600; attempt++) {
    assert.equal(service.exitCode, null, logs);
    await delay(100);
  }
  assert.ok(existsSync(runtimeFile), logs);
  const runtime = JSON.parse(await readFile(runtimeFile));
  const response = await fetch(new URL('/api/v1/access/version', runtime.url));
  assert.equal(response.status, 200);
  const current = await response.json();
  const launcher = path.join(plugin, `scripts/launch_onecrew_mcp${windows ? '.cmd' : ''}`);
  const baseEnv = {...process.env, ONECREW_DATA_DIR: profile, HOME: home, USERPROFILE: home, LOCALAPPDATA: home};
  delete baseEnv.ONECREW_BINARY;
  delete baseEnv.ONECREW_RUNTIME_FILE;
  const systemPath = windows
    ? [path.join(process.env.SystemRoot, 'System32'), path.join(process.env.SystemRoot, 'System32/WindowsPowerShell/v1.0')].join(path.delimiter)
    : '/usr/bin:/bin:/usr/sbin:/sbin';
  const modes = [
    ['explicit', {...baseEnv, PATH: systemPath, ONECREW_BINARY: binary}],
    ['zip', {...baseEnv, PATH: systemPath}],
    ['workbuddy', {...process.env, PATH: systemPath}],
  ];
  if (process.env.ONECREW_TEST_NPM === '1') modes.push(
    ['npm', {...baseEnv, HOME: path.join(directory, 'no-zip-home'), LOCALAPPDATA: path.join(directory, 'no-zip-home')}],
  );
  for (const [mode, env] of modes) {
    const client = new Client({name: `onecrew-${mode}-check`, version: '1.0.0'});
    let command = launcher;
    let args = [];
    if (mode === 'workbuddy') {
      assert.equal(existsSync(path.join(plugin, '.mcp.json')), false, 'A default MCP file would override WorkBuddy configuration');
      const manifest = JSON.parse(await readFile(path.join(plugin, '.workbuddy-plugin/plugin.json')));
      const config = manifest.mcpServers.onecrew;
      assert.deepEqual(Object.keys(manifest.mcpServers), ['onecrew']);
      const values = {binary_path: binary, data_dir: profile};
      const resolve = value => value.replace(/\$\{user_config\.([^}]+)\}/gu, (_, key) => {
        assert.ok(manifest.userConfig[key]?.required && values[key], `Missing required plugin option: ${key}`);
        return values[key];
      });
      command = resolve(config.command);
      args = config.args.map(resolve);
    }
    const transport = new StdioClientTransport({command, args, env, stderr: 'pipe'});
    let stderr = '';
    transport.stderr?.on('data', chunk => {stderr += chunk;});
    t.after(() => client.close());
    await client.connect(transport).catch(error => {throw new Error(`${mode} launcher failed: ${stderr}`, {cause:error});});
    const version = await client.callTool({name: 'account', arguments: {action: 'version'}});
    assert.ok(!version.isError, stderr);
    assert.deepEqual(version.structuredContent.result, current);
    const account = await client.callTool({name: 'account', arguments: {action: 'status'}});
    assert.ok(!account.isError, stderr);
    assert.equal(account.structuredContent.result.state, 'signed_out');
    await client.close();
    t.diagnostic(`${mode}: real account version and status verified`);
  }
  t.after(() => rm(directory, {recursive: true}));
});
