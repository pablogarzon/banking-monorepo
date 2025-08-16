import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import {
  CreateCompanyCommand,
  formatDate,
  GetCompaniesSuscribedSinceUC,
  GetCompaniesWithTransferSinceUC,
  getStartOfDay,
  RegisterNewCompanyUC,
} from '@bank-monorepo/core';
import { CompanyDto } from '../dtos/company.dto';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly getCompaniesWithTransferSince: GetCompaniesWithTransferSinceUC,
    private readonly getCompaniesSuscribedSince: GetCompaniesSuscribedSinceUC,
    private readonly registerNewCompany: RegisterNewCompanyUC,
  ) {}

  @Get('transfers')
  @ApiOperation({
    summary:
      'Obtener las empresas que realizaron transferencias desde una fecha dada',
  })
  @ApiQuery({
    name: 'since',
    required: true,
    description: 'Fecha desde (YYYY-MM-DD)',
    example: formatDate(new Date()),
  })
  @ApiOkResponse({ type: CompanyDto, isArray: true })
  async companiesWithTransfersSince(
    @Query('since') since: Date,
  ): Promise<CompanyDto[]> {
    const companiesModel = await this.getCompaniesWithTransferSince.execute(
      getStartOfDay(since),
    );
    return companiesModel.map((c) => Object.assign(new CompanyDto(), c));
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener las empresas que se adhirieron desde una fecha dada',
  })
  @ApiQuery({
    name: 'joinedSince',
    required: true,
    description: 'Fecha de adhesión (YYYY-MM-DD)',
    example: formatDate(new Date()),
  })
  @ApiOkResponse({ type: CompanyDto, isArray: true })
  async companiesAdheredSince(
    @Query('joinedSince') joinedSince: Date,
  ): Promise<CompanyDto[]> {
    console.log(joinedSince, 'date');
    const companiesModel = await this.getCompaniesSuscribedSince.execute(
      getStartOfDay(joinedSince),
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
