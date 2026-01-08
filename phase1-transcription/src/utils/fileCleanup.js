import fs from "fs";

export function cleanupFile(path) {
  fs.unlink(path, err => {
    if (err) console.error("File cleanup error:", err);
  });
}
