import { createLogger } from '@mastra/core/logger';
import { Mastra } from '@mastra/core/mastra';
import { createApiRoute } from '@mastra/core/server';
import { TestDeployer } from '@mastra/deployer/test';
import { SHARED_LABEL } from './dynamic-shared.js';

export const mastra = new Mastra({
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
  server: {
    port: 3000,
    apiRoutes: [
      createApiRoute({
        path: '/repro',
        method: 'get',
        // `dynamic-shared.js` is imported both here (statically) and from the
        // dynamically imported module, so it lands in a shared split chunk.
        handler: async (req, res) => {
          const mod = await import('./dynamic-chunk.js');
          res.send(`${SHARED_LABEL}:${mod.fixtureLabel()}`);
        },
      }),
    ],
  },
  deployer: new TestDeployer(),
});
