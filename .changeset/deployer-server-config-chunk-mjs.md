---
'@mastra/deployer': patch
---

Fixed `mastra dev` writing `server-config.mjs` chunks as `.js`. When the server option's module graph has a dynamic `import()`, Rollup split the extra chunk using its default `[name]-[hash].js` name because the extracted-config bundle set `entryFileNames` but not `chunkFileNames`. In a project whose `package.json` has no `"type": "module"`, Node treats those `.js` chunks as CommonJS, so `mastra dev` emits `MODULE_TYPELESS_PACKAGE_JSON` warnings and fails outright under a loader such as tsx (`does not provide an export named ...`). The extracted config now writes its chunks as `.mjs`, matching its entry and every other bundle the deployer emits.
