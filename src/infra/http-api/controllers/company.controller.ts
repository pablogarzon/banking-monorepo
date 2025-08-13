import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { GetCompaniesWithTransferSinceUC } from 'src/application/use-cases/get-companies-with-transfer-since.uc';
import { GetCompaniesSuscribedSinceUC } from 'src/application/use-cases/get-companies-subscribed-since.uc';
import { RegisterNewCompanyUC } from 'src/application/use-cases/register-new-company.uc';
import { CreateCompanyCommand } from 'src/application/commands/create-company.command';
import { CompanyDto } from '../dtos/company.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly getCompaniesWithTransferSince: GetCompaniesWithTransferSinceUC,
    private readonly getCompaniesSuscribedSince: GetCompaniesSuscribedSinceUC,
    private readonly registerNewCompany: RegisterNewCompanyUC,
  ) {}

  @Get('transferencias')
  @ApiOperation({
    summary:
      'Obtener las empresas que realizaron transferencias desde una fecha dada',
  })
  @ApiOkResponse({ type: CompanyDto, isArray: true })
  async companiesWithTransfersSince(
    @Query('since') since: Date,
  ): Promise<CompanyDto[]> {
    const companiesModel = await this.getCompaniesWithTransferSince.execute(
      new Date(since),
    );
    return companiesModel.map((c) => Object.assign(new CompanyDto(), c));
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener las empresas que se adhirieron desde una fecha dada',
  })
  @ApiOkResponse({ type: CompanyDto, isArray: true })
  async companiesAdheredSince(
    @Query('joinedSince') joinedSince: Date,
  ): Promise<CompanyDto[]> {
    console.log(typeof joinedSince, 'date');

    const companiesModel = await this.getCompaniesSuscribedSince.execute(
      new Date(joinedSince),
    );
    return companiesModel.map((c) => Object.assign(new CompanyDto(), c));
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar la adhesión de una nueva empresa',
  })
  register(@Body() dto: CreateCompanyDto) {
    const command: CreateCompanyCommand = {
      ...dto,
      fechaAdhesion: new Date(),
    };
    return this.registerNewCompany.execute(command);
  }
}
