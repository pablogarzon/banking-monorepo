/* const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');*/

import { getDbRepository } from './db/providers/database.provider';

const express = require('express');
const serverless = require('serverless-http');
const validateData = require('./http-api/validation.middleware');
const { CreateCompanySchema } = require('./http-api/create-company.shcema');

const app = express();

/*
const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);
*/
app.use(express.json());
app.use(validateData);

const companyRepository = getDbRepository();

app.get('/users/:userId', async (req, res) => {
  /*const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not retrieve user' });
  }*/

  res.json({ saludo: 'hello' });
});

app.post('/company', async (req, res) => {
  companyRepository.save(req.body);
  res.status(201).json({ saludo: 'hello' });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

exports.handler = serverless(app);
