import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { GetCompaniesWithTransferLastMonthUC } from 'src/application/use-cases/get-companies-with-transfer-last-month.uc';
import { GetCompaniesSuscribedLastMonthUC } from 'src/application/use-cases/get-companies-subscribed-last-month.uc';
import { RegisterNewCompanyUC } from 'src/application/use-cases/register-new-company.uc';
import { CreateCompanyCommand } from 'src/application/commands/create-company.command';
import { CompanyDto } from '../dtos/company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly getCompaniesWithTransferLastMonth: GetCompaniesWithTransferLastMonthUC,
    private readonly getCompaniesSuscribedLastMonth: GetCompaniesSuscribedLastMonthUC,
    private readonly registerNewCompany: RegisterNewCompanyUC,
  ) {}

  @Get('transferencias/ultimo-mes')
  async companiesWithTransfersLastMonth(): Promise<CompanyDto[]> {
    const companiesModel =
      await this.getCompaniesWithTransferLastMonth.execute();
    return companiesModel.map((c) => Object.assign(new CompanyDto(), c));
  }

  @Get('adhesiones/ultimo-mes')
  async companiesAdheredLastMonth(): Promise<CompanyDto[]> {
    const companiesModel = await this.getCompaniesSuscribedLastMonth.execute();
    return companiesModel.map((c) => Object.assign(new CompanyDto(), c));
  }

  @Post('empresas/adhesiones')
  register(@Body() dto: CreateCompanyDto) {
    const command: CreateCompanyCommand = {
      ...dto,
      fechaAdhesion: new Date(),
    };
    return this.registerNewCompany.execute(command);
  }
}
