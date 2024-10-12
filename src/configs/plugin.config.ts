import { registerAs } from '@nestjs/config';

export default registerAs(
  'plugin',
  (): Record<string, any> => ({
    swagger: {
      config: {
        info: {
          title: 'backend-test-case',
        },
        swaggerUI: true,
        documentationPath: '/swagger/api-docs',
      },
      options: {
        apisSorter: 'alpha',
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    },
  }),
);
