import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('agency adaptations preserve provenance, license and Vietnamese display coverage', async () => {
  const root = new URL('../', import.meta.url);
  const read = path => readFile(new URL(path, root), 'utf8');
  const manifest = JSON.parse(await read('docs/agency-agents-sources.json'));
  const vi = await read('docs/agency-agents.vi.md');
  const en = await read('docs/agency-agents.en.md');
  const license = await read('licenses/agency-agents-MIT.txt');
  assert.match(license, /Copyright \(c\) 2025 AgentLand Contributors/);
  assert.match(license, /Permission is hereby granted/);
  assert.match(license, /THE SOFTWARE IS PROVIDED "AS IS"/);
  const files = (await readdir(new URL('bots/', root))).filter(x => x.startsWith('agency-'));
  assert.equal(manifest.templates.length, 8);
  assert.deepEqual(manifest.templates.map(x => `${x.id}.json`).sort(), files.sort());
  for (const entry of manifest.templates) {
    const bot = JSON.parse(await read(`bots/${entry.id}.json`));
    assert.equal(entry.license, 'MIT');
    assert.match(entry.sourceCommit, /^[a-f0-9]{40}$/);
    assert.equal(entry.sourceCommit, manifest.commit);
    assert.equal(entry.source, `${manifest.repository}/blob/${manifest.commit}/${entry.sourcePath}`);
    assert.ok(bot.soul.includes(entry.source));
    assert.ok(bot.soul.includes("language of the conversation"));
    assert.ok(Buffer.byteLength(JSON.stringify(bot)) < 64000);
    const section = vi.split(`## ${entry.id}\n`)[1]?.split('\n## ')[0];
    assert.ok(section, `Missing Vietnamese copy for ${entry.id}`);
    const translated = label => section.split(`- ${label}: `)[1].split('\n')[0];
    assert.equal(bot.title, translated('Vai trò'));
    assert.equal(bot.description, translated('Mô tả'));
    assert.equal(bot.tryAsking[0], translated('Ví dụ bắt đầu'));
    assert.ok(en.includes(`## ${entry.id}\n`));
    for (const label of ['Tên:', 'Vai trò:', 'Mô tả:', 'Hướng dẫn:', 'Ví dụ bắt đầu:']) assert.ok(section.includes(label));
  }
});
