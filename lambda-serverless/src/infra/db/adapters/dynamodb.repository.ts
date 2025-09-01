import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Company, CompanyPersistencePort } from '@banking-monorepo/core';
import { docClient } from '../clients/dynamodb.client';

const TABLE_NAME = 'CompaniesTable';

export class DynamodbRepository implements CompanyPersistencePort {
  async save(company: Company): Promise<void> {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: company,
    });

    try {
      await docClient.send(command);
    } catch (error) {
      throw error;
    }
  }
  findByCuit(cuit: string): Promise<Company | null> {
    throw new Error('Method not implemented.');
  }
  findAdheredSince(date: Date): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }
}
