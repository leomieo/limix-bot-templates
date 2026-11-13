import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { validateBot } from "../scripts/validate-bot.mjs";

test("catalog contains every valid bot template", async () => {
  const root = new URL("../", import.meta.url);
  const catalog = JSON.parse(await readFile(new URL("catalog.json", root), "utf8"));
  const files = (await readdir(new URL("bots/", root))).filter((file) => file.endsWith(".json")).sort();
  assert.equal(catalog.format, "openmaus.catalog");
  assert.equal(catalog.version, 1);
  assert.deepEqual(catalog.bots.map((entry) => entry.file).sort(), files.map((file) => `bots/${file}`));
  for (const file of files) {
    const bot = JSON.parse(await readFile(new URL(`bots/${file}`, root), "utf8"));
    validateBot(bot, file);
    const entry = catalog.bots.find((entry) => entry.id === bot.id);
    assert.equal(entry.description, bot.description);
    assert.equal(entry.title, bot.title);
    assert.equal(entry.try, bot.tryAsking[0]);
  }
});
