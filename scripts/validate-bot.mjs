import assert from "node:assert/strict";

function text(value, field, max) {
  assert.ok(typeof value === "string" && value.trim() && value.length <= max, `${field} must be nonempty and at most ${max} characters`);
}

export function validateBot(bot, file) {
  assert.equal(bot.format, "limix.bot");
  assert.equal(bot.version, 1);
  assert.match(bot.id, /^[a-z0-9][a-z0-9-]{0,63}$/);
  assert.equal(file, `${bot.id}.json`);
  text(bot.name, "name", 40);
  text(bot.title, "title", 80);
  text(bot.description, "description", 300);
  text(bot.soul, "soul", 8000);
  assert.ok(["everyday", "work", "writing", "design", "sales", "personal"].includes(bot.category));
  text(bot.look?.color, "look.color", 20);
  text(bot.look?.mascotBody, "look.mascotBody", 20);
  assert.ok(Array.isArray(bot.tryAsking) && bot.tryAsking.length > 0 && bot.tryAsking.length <= 6);
  for (const prompt of bot.tryAsking) text(prompt, "tryAsking", 200);
  assert.ok(Array.isArray(bot.apps ?? []) && (bot.apps?.length ?? 0) <= 10);
  for (const app of bot.apps ?? []) assert.match(app, /^[a-z0-9][a-z0-9_-]{0,39}$/);
  assert.ok(Array.isArray(bot.skills ?? []) && (bot.skills?.length ?? 0) <= 20);
  for (const skill of bot.skills ?? []) assert.match(skill, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(Object.keys(bot.notes ?? {}).length <= 6);
  for (const [path, content] of Object.entries(bot.notes ?? {})) {
    assert.match(path, /^(MEMORY\.md|memory\/[a-z0-9][a-z0-9-]{0,63}\.md)$/);
    text(content, "notes", 8000);
  }
  assert.ok(Array.isArray(bot.routines ?? []) && (bot.routines?.length ?? 0) <= 5);
  for (const routine of bot.routines ?? []) {
    text(routine.name, "routine.name", 80);
    text(routine.prompt, "routine.prompt", 2000);
    assert.equal(routine.schedule?.type, "daily");
    assert.match(routine.schedule.time, /^(?:[01]\d|2[0-3]):[0-5]\d$/);
    assert.ok(Array.isArray(routine.schedule.weekdays) && routine.schedule.weekdays.length > 0 && routine.schedule.weekdays.length <= 7);
    for (const day of routine.schedule.weekdays) assert.ok(Number.isInteger(day) && day >= 0 && day <= 6);
  }
}
