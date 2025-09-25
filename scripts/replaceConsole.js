// scripts/replaceConsole.js
// Interactive migration: replace console.* with logger.* across the codebase

import fs from "fs";
import path from "path";
import readline from "readline";

const projectRoot = path.resolve(process.cwd()); // project root = current folder
const loggerImport = `import logger from "../utils/logger";\n`;
const isDryRun = process.argv.includes("--dry-run");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const fullPath = path.join(dir, f);
    if (fullPath.includes("scripts/replaceConsole.js")) return;

    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (/\.(js|ts|tsx)$/.test(fullPath)) {
      callback(fullPath);
    }
  });
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  // Match console.log/warn/error/debug until closing paren
  const matches = content.match(/console\.(log|warn|error|debug)\([^;]*\)/g);

  if (!matches) return false;

  console.log(`\n📄 Found in: ${filePath}`);
  matches.forEach((m) => console.log("   → " + m));

  if (isDryRun) {
    return false; // don’t modify
  }

  const answer = await askQuestion("Replace in this file? (y/n): ");
  if (answer.toLowerCase() !== "y") return false;

  // Replace console.* calls with logger.*
  content = content
    .replace(/console\.log/g, "logger.info")
    .replace(/console\.warn/g, "logger.warn")
    .replace(/console\.error/g, "logger.error")
    .replace(/console\.debug/g, "logger.debug");

  // Ensure logger import exists
  if (!content.includes("import logger from")) {
    const depth =
      filePath.split(path.sep).length - projectRoot.split(path.sep).length - 1;
    const prefix = Array(depth).fill("..").join("/") || ".";
    const importLine = `import logger from "${prefix}/utils/logger";\n`;
    content = importLine + content;
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✔ Updated ${filePath}`);
  return true;
}

async function main() {
  const promises = [];
  walkDir(projectRoot, (filePath) => {
    promises.push(processFile(filePath));
  });

  await Promise.all(promises);
  rl.close();

  if (isDryRun) {
    console.log("\n🔎 Dry run complete. No files were modified.");
  } else {
    console.log("\n✅ Migration complete. All approved files updated.");
  }
}

main();
