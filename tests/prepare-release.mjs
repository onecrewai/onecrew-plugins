import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {appendFile, mkdir, mkdtemp, readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// 使用已发布的真实程序验证现有 ZIP 安装的兼容性。
const releases = {
  'darwin-arm64': [68082500, '018a2b8ac61ad1e07f48779423e9e90e505cc82edc482cc25a81d1760fe19442'],
  'darwin-x64': [70990558, '843fa30d64aba5fe9f76872e7c498f087cde2b1a4dfe489d6525ac7e4890f048'],
  'win32-x64': [63865209, '05676df8dfd83c2fba09ca70d18481793248ad89451bcd5e116d77d84cea1ffc'],
};
const target = `${process.platform}-${process.arch}`;
assert.ok(releases[target], `Unsupported test platform: ${target}`);
assert.ok(process.env.GITHUB_ENV);
const root = fileURLToPath(new URL('../', import.meta.url));
await mkdir(path.join(root, '.cache'), {recursive: true});
const directory = await mkdtemp(path.join(root, '.cache/release-'));
const archive = path.join(directory, 'release.zip');
const response = await fetch(`https://access.onecrewai.io/cli/packages/pro/0.1.9/onecrew-0.1.9-${target}.zip`, {
  redirect: 'error', signal: AbortSignal.timeout(120000),
});
assert.equal(response.status, 200);
const bytes = Buffer.from(await response.arrayBuffer());
assert.equal(bytes.length, releases[target][0]);
assert.equal(createHash('sha256').update(bytes).digest('hex'), releases[target][1]);
await writeFile(archive, bytes);
execFileSync('tar', ['-xf', archive, '-C', directory], {stdio: 'inherit'});
const folders = (await readdir(directory, {withFileTypes: true})).filter(entry => entry.isDirectory());
assert.equal(folders.length, 1);
const binary = path.join(directory, folders[0].name, process.platform === 'win32' ? 'onecrew.exe' : 'onecrew');
assert.equal(execFileSync(binary, ['--version'], {encoding: 'utf8'}).trim(), '0.1.9');
await appendFile(process.env.GITHUB_ENV, `ONECREW_TEST_BINARY=${binary}\n`);
