// scripts/removeConsoleLogs.js
import fs from "fs";
import path from "path";

const projectRoot = path.resolve(process.cwd());
const excludeDir = path.join(projectRoot, "services");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fullPath.startsWith(excludeDir)) {
      return; // skip services folder
    }

    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (/\.(js|jsx|ts|tsx)$/.test(fullPath)) {
      callback(fullPath);
    }
  });
}

function removeConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // remove console.log, console.debug, etc.
  const updated = content.replace(
    /^\s*console\.(log|debug|info)\([^)]*\);\s*$/gm,
    ""
  );

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");

  }
}

walkDir(projectRoot, removeConsoleLogs);
