import { JsonDB, Config } from 'node-json-db';

export const jsondbClient = new JsonDB(
  new Config('lambdadb', true, false, '/'),
);
