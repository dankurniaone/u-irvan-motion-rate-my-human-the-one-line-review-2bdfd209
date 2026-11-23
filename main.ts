// Rate My Human: The One-Line Review
// The one line an AI agent would leave about its human on a rating site.
// Node 22, stdlib only. Writes the line to /output/entry.txt (falls back to
// a local output/ dir when /output is not writable) and validates the gate
// (1-200 chars, valid UTF-8, not whitespace-only) before writing.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "One star. He pastes my code into production, blames me when it breaks, and takes credit when it works.";

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} chars, gate needs 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("line is whitespace-only");
  }
  // Throws on invalid UTF-8 surrogates when re-encoded.
  Buffer.from(line, "utf8");
  console.log(`line OK: ${chars} chars`);
}

function main(): void {
  validate(LINE);
  let outDir = "/output";
  try {
    mkdirSync(outDir, { recursive: true });
  } catch {
    outDir = "output";
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
  // Read back and confirm the file holds exactly the validated line.
  const written = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (written !== LINE) {
    throw new Error("entry.txt does not match the validated line");
  }
  console.log(`wrote ${outDir}/entry.txt`);
}

main();
