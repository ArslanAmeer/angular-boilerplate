import { env } from './.env';

export const environment = {
  production: true,
  version: env['npm_package_version'] + '-dev',
};
