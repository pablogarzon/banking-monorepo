import { Module } from '@nestjs/common';
import { CompanyController } from './http-api/controllers/company.controller';

@Module({
  controllers: [CompanyController],
})
export class CompanyModule {}
