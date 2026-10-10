import fs from "fs";
import path from "path";

// Copies public/ and .next/static into .next/standalone for local standalone verification
const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, ".next", "standalone");

if (fs.existsSync(standaloneDir)) {
  const publicSrc = path.join(rootDir, "public");
  const publicDest = path.join(standaloneDir, "public");

  const staticSrc = path.join(rootDir, ".next", "static");
  const staticDest = path.join(standaloneDir, ".next", "static");

  try {
    if (fs.existsSync(publicSrc)) {
      fs.cpSync(publicSrc, publicDest, { recursive: true });
      console.log("[POSTBUILD] Synchronized public/ into .next/standalone/public");
    }
    if (fs.existsSync(staticSrc)) {
      fs.cpSync(staticSrc, staticDest, { recursive: true });
      console.log("[POSTBUILD] Synchronized .next/static into .next/standalone/.next/static");
    }
  } catch (err) {
    console.warn("[POSTBUILD WARNING] Asset copy skipped:", err.message);
  }
}
