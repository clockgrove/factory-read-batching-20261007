export function parseTasks(markdown) {
  const tasks = [];
  let fence = null;

  // Only LF and CRLF delimit lines; Unicode separators remain label content.
  for (const line of markdown.split(/\r?\n/)) {
    const boundary = /^ {0,3}(`{3,}|~{3,})([\s\S]*)$/.exec(line);

    if (fence !== null) {
      if (
        boundary !== null &&
        boundary[1][0] === fence.character &&
        boundary[1].length >= fence.length &&
        boundary[2].trim().length === 0
      ) {
        fence = null;
      }
      continue;
    }

    if (boundary !== null) {
      fence = { character: boundary[1][0], length: boundary[1].length };
      continue;
    }

    const task = /^ {0,3}[-*+] \[([ xX])\] ([\s\S]*)$/.exec(line);
    if (task !== null) {
      const text = task[2].trim();
      if (text.length > 0) {
        tasks.push({ done: task[1] !== " ", text });
      }
    }
  }

  return tasks;
}
