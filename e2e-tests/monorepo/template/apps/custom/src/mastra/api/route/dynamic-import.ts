import { registerApiRoute } from '@mastra/core/server';

// `shared` is imported both statically here and from the dynamically imported
// `lazy` module, so it lands in a chunk split from the extracted server config
// (`.mastra/output/server-config.mjs`). That chunk must be written as `.mjs`,
// otherwise Node loads it as CommonJS under a loader such as tsx and dev fails.
import { SHARED_DYNAMIC_LABEL } from '../../dynamic/shared';

export const dynamicImportRoute = registerApiRoute('/dynamic-import', {
  method: 'GET',
  handler: async c => {
    const lazy = await import('../../dynamic/lazy');
    return c.json({ shared: SHARED_DYNAMIC_LABEL, lazy: lazy.lazyLabel() });
  },
});
