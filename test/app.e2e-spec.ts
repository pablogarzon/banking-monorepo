import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GetCompaniesSuscribedSinceUC } from 'src/application/use-cases/get-companies-subscribed-since.uc';
import { GetCompaniesWithTransferSinceUC } from 'src/application/use-cases/get-companies-with-transfer-since.uc';
import { RegisterNewCompanyUC } from 'src/application/use-cases/register-new-company.uc';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/infra/db/entities/company.entity';
import { TransferEntity } from 'src/infra/db/entities/transfer.entity';
import { CompanyPersistenceAdapter } from 'src/infra/db/adapters/company-persistence.adapter';
import { TransferPersistenceAdapter } from 'src/infra/db/adapters/transfer-persistence.adapter';
import { COMPANY_PERSISTENCE_PORT } from 'src/domain/ports/company-persistence.port';
import { TRANSFER_PERSISTENCE_PORT } from 'src/domain/ports/transfer-persistence.port';
import { CompanyController } from 'src/infra/http-api/controllers/company.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.sqlite',
          dropSchema: true, // Limpia el schema al inicio
          entities: [CompanyEntity, TransferEntity],
          synchronize: true, // Crea tablas automáticamente
        }),
        TypeOrmModule.forFeature([CompanyEntity, TransferEntity]),
      ],
      controllers: [CompanyController],
      providers: [
        GetCompaniesSuscribedSinceUC,
        GetCompaniesWithTransferSinceUC,
        RegisterNewCompanyUC,
        {
          provide: COMPANY_PERSISTENCE_PORT,
          useClass: CompanyPersistenceAdapter,
        },
        {
          provide: TRANSFER_PERSISTENCE_PORT,
          useClass: TransferPersistenceAdapter,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) get companies added since given date', () => {
    return request(app.getHttpServer())
      .get(`/company?joinedSince=${new Date().toISOString().slice(0, 10)}`)
      .expect(200)
      .expect([]);
  });

  it('POST /company add new company', async () => {
    const payload = {
      cuit: '20-12345678-9',
      razonSocial: 'test1',
      fechaAdhesion: new Date().toISOString(),
      tipo: 'pyme',
    };

    await request(app.getHttpServer())
      .post('/company')
      .send(payload)
      .expect(201);

    const res = await request(app.getHttpServer())
      .get(`/company?joinedSince=${new Date().toISOString().slice(0, 10)}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(1);
  });

  it('GET /company/transfers get companies with transfers since given date', async () => {
    const companyRepo = app.get(getRepositoryToken(CompanyEntity));
    const transferRepo = app.get(getRepositoryToken(TransferEntity));

    await companyRepo.save({
      cuit: '20-111111-1',
      razonSocial: 'test2',
      fechaAdhesion: new Date(),
      tipo: 'pyme',
    });

    await companyRepo.save({
      cuit: '20-111111-2',
      razonSocial: 'test3',
      fechaAdhesion: new Date(),
      tipo: 'pyme',
    });

    await transferRepo.save({
      importe: 120,
      empresaCuit: '20-111111-1',
      cuentaDebito: '1',
      cuentaCredito: '1',
      fecha: new Date(),
    });

    await transferRepo.save({
      importe: 100,
      empresaCuit: '20-111111-2',
      cuentaDebito: '1',
      cuentaCredito: '1',
      fecha: new Date(),
    });

    const res = await request(app.getHttpServer())
      .get(`/company/transfers?since=${new Date().toISOString().slice(0, 10)}`)
      .expect(200);

    expect(res.body).toHaveLength(2);
    expect(res.body[0].razonSocial).toBe('test2');
    expect(res.body[1].razonSocial).toBe('test3');
  });

  afterAll(async () => {
    await app.close();
  });
});
