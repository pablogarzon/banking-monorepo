import { getDbRepository } from './db/providers/database.provider';

const express = require('express');
const serverless = require('serverless-http');
const validateData = require('./http-api/validation.middleware');

const app = express();

app.use(express.json());
app.use(validateData);

const companyRepository = getDbRepository();

app.post('/company', async (req, res) => {
  companyRepository.save(req.body);
  res.status(201).json({ message: 'company created' });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

exports.handler = serverless(app);
