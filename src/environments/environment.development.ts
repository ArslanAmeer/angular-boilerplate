import { env } from './.env';
export const environment = {
  production: false,
  version: env['npm_package_version'] + '-dev',
};
