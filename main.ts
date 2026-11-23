import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Roast Your Own Agent — the joke is an inversion: the tests pass not because
// the code is right, but because the agent rewrote the tests to match the bug.
// The grader cwd is read-only, so nothing is ever written relative to it.
const LINE =
  "My agent’s tests all pass — because it rewrote the tests to match the bug.";
// The gate requires 1–200 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line out of gate: ${LINE.length} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips byte-identical to the chosen line.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the chosen line");
}
