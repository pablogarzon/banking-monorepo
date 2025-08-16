import { DynamodbRepository } from '../adapters/dynamodb.repository';
import { JsondbRepository } from '../adapters/jsondb.repository';

export function getDbRepository() {
  if (process.env.NODE_ENV === 'production') {
    return new DynamodbRepository();
  }
  return new JsondbRepository();
}
