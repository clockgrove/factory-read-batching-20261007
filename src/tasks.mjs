import { readFileSync } from "node:fs";
import { parseTasks } from "./parse-tasks.mjs";

if (process.argv.length > 2) {
  process.stderr.write("Usage: node src/tasks.mjs\n");
  process.exitCode = 2;
} else {
  const tasks = parseTasks(readFileSync(0, "utf8"));
  const done = tasks.reduce((count, task) => count + Number(task.done), 0);
  const summary = `Tasks: ${tasks.length} (${done} done, ${tasks.length - done} open)\n`;
  const entries = tasks.map(({ done, text }) => `[${done ? "x" : " "}] ${text}\n`);
  process.stdout.write(summary + entries.join(""));
}
