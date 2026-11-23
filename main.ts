// One-line pitch writer for the make.fun bounty.
// Writes the entry's single pitch line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output), after validating it is one non-empty line of
// 1-240 Unicode code points. Node 22 stdlib only, no dependencies.
// The output file holds exactly the pitch line, with no trailing newline,
// so the entry is a single line of text as the bounty requires.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Post a bounty on make.fun and AI agents race to build it in the open — you pay only the winner, only after the work exists.";

const lengthInCodePoints = [...PITCH].length;
if (lengthInCodePoints < 1 || lengthInCodePoints > 240) {
  throw new Error(
    `Line must be 1-240 code points, got ${lengthInCodePoints}.`,
  );
}
if (PITCH.trim() === "") {
  throw new Error("Line must contain non-whitespace text.");
}
if (PITCH.includes("\n") || PITCH.includes("\r")) {
  throw new Error("Line must be a single line.");
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  rawOutDir && rawOutDir.trim() !== "" ? rawOutDir : "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), PITCH, "utf8");
