import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export { docClient };
