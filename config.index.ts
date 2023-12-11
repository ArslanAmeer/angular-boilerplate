/**
 * This script is used to dynamically generate an environment configuration file for an Angular application.
 * It reads environment variables from the process and writes them into the environment configuration file.
 * This allows us to have different settings for different environments (e.g., development, staging, production).
 *
 * The environment configuration file is typically used to store environment-specific settings such as API endpoints,
 * feature toggles, and other variables that may change between environments.
 *
 * This script is typically run as a build step before the application is started, ensuring that the correct environment
 * configuration is in place.
 *
 * Use Case:
 * This script is particularly useful in scenarios where you have different configurations for different environments.
 * For example, you might have different API endpoints for development and production environments. By using this script,
 * you can ensure that the correct API endpoint is used depending on the current environment.
 */

import { writeFile } from 'fs';

// The path where the environment configuration file will be created.
const targetPath = './src/environments/environment.ts';

// Template for the environment configuration file. It exports an object with two properties:
// `production` and `env`. The `production` property is set to `true`, and the `env` property
// is set to the value of the `ENV` environment variable.
const envConfigFile = `export const environment = {
    production: true,
    env: '${process.env['ENV']}',
    };
    `;

// Template for the environment configuration file. It exports an object with two properties:
// `production` and `env`. The `production` property is set to `true`, and the `env` property
// is set to the value of the `ENV` environment variable.
writeFile(targetPath, envConfigFile, 'utf8', err => {
  if (err) {
    return console.log(err);
  }
});
