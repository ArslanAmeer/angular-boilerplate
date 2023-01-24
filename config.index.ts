// @ts-nocheck

import {writeFile} from 'fs';

const targetPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
    production: true,
    env: '${process.env.ENV}',
    };
    `;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
