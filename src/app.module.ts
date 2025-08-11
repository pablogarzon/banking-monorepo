import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './infra/company.module';

@Module({
  imports: [CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
