import path from "path";
import scanComponent from "./scanComponent.js";
import fg from "fast-glob";
import fs from "fs";
import crypto from "crypto";
import beautify from "js-beautify";

function hash(content) {
  return crypto
  .createHash("sha256")
  .update(content || "")
  .digest("hex");
}

function normalizeScript(script) {
  const pretty = beautify.js(script || "", {
    indent_size: 2,
    preserve_newlines: true,
    space_in_empty_paren: false
  });
  return pretty.trim();
}

export function Scan() {
  const cacheMap = new Map();
  const srcDir = path.resolve("src");

  function scanAndCache(absFilePath) {
    const data = scanComponent(absFilePath);
    const scriptHash = hash(normalizeScript(data.script));
    cacheMap.set(absFilePath, {
      data, scriptHash, hasChanged: true
    });
    return data;
  }

  return {
    name: "vite-scan-pri-plugin",

    configureServer(server) {
      const priGlob = path.resolve(process.cwd(), "./src/**/*.{js,jsx}");
      //const files = fg.sync(priGlob);
      // files.forEach(scanAndCache);
      server.watcher.add(priGlob);
    },

    load(id) {
      if (!(id.endsWith(".pri") || id.endsWith(".jsx"))) return null;

      const absFile = id;
      let cached = cacheMap.get(absFile);

      if (!cached) {
        try {
          const data = scanAndCache(absFile);
          cached = cacheMap.get(absFile);
        } catch (err) {
          console.error(`[plugin] Failed to scan ${absFile}:`, err);
          return null;
        }
      }

      const {
        data
      } = cached;

      // Auto-inject HMR accept block
      return `
      ${data.script}

      if (import.meta.hot) {
      import.meta.hot.accept((newModule) => {
      console.log(newModule);
      });
      }
      `;
    },

    handleHotUpdate( {
      file, server, modules
    }) {
      if (!(file.endsWith(".pri") || file.endsWith(".jsx"))) return [];
     // console.log("[PRI-HMR] updating:", file);

      // 1. Re-scan and update cache
      scanAndCache(file);

      // 2. Invalidate module and bubble up to parents (like index.js)
      const updates = new Set();

      for (const mod of modules) {
        server.moduleGraph.invalidateModule(mod);
        updates.add(mod);

        // Bubble to importers
        mod.importers.forEach(importer => {
          server.moduleGraph.invalidateModule(importer);
          updates.add(importer);
        });
      }

      // 3. Return all modules that should be updated
      return [...updates];
    }
  };
}