import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { validateBot } from "./validate-bot.mjs";

const root = new URL("../", import.meta.url);
const files = (await readdir(new URL("bots/", root))).filter((file) => file.endsWith(".json")).sort();
if (files.length > 200) throw new Error("At most 200 bot templates are supported");
const bots = [];
for (const file of files) {
  const path = new URL(`bots/${file}`, root);
  const raw = await readFile(path, "utf8");
  if (Buffer.byteLength(raw) > 64_000) throw new Error(`${file} exceeds 64 KB`);
  const bot = JSON.parse(raw);
  validateBot(bot, file);
  bots.push({ id: bot.id, name: bot.name, title: bot.title, category: bot.category, description: bot.description,
    try: bot.tryAsking[0], look: bot.look, apps: bot.apps ?? [], routines: bot.routines?.length ?? 0, file: `bots/${file}` });
}
await writeFile(new URL("catalog.json", root), JSON.stringify({ format: "openmaus.catalog", version: 1, bots }, null, 2) + "\n");
console.log(`Updated ${fileURLToPath(new URL("catalog.json", root))} with ${bots.length} templates`);
