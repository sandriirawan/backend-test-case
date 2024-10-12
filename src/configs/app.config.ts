import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    node_env: process.env.NODE_ENV || 'dev',
    host: process.env.HOST || '0.0.0.0',
    port: {
      api: parseInt((process.env.PORT || 4500).toString(), 10),
    },
    projectName: process.env.PROJECT_NAME || 'backend-test-case',
    apiPrefix: process.env.API_PREFIX || '/api/v1/',
    corsEnabled: false,
  }),
);
