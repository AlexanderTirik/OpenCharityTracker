// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const getLocalJSON = (name) =>
  JSON.parse(fs.readFileSync(`src/${name}.json`, 'utf8'));
