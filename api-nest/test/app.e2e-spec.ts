import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/infra/db/entities/company.entity';
import { TransferEntity } from 'src/infra/db/entities/transfer.entity';
import { CompanyModule } from 'src/infra/company.module';
import { ConfigService } from '@nestjs/config';
import { formatDate } from '@banking-monorepo/core';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CompanyModule],
    })
      .overrideProvider('TypeOrmModuleOptions')
      .useValue({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        autoLoadEntities: true,
      })
      .overrideProvider(ConfigService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) get companies added since given date', () => {
    return request(app.getHttpServer())
      .get(`/company?joinedSince=${formatDate(new Date())}`)
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
      .get(`/company?joinedSince=${formatDate(new Date())}`)
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
      .get(`/company/transfers?since=${formatDate(new Date())}`)
      .expect(200);

    expect(res.body).toHaveLength(2);
    expect(res.body[0].razonSocial).toBe('test2');
    expect(res.body[1].razonSocial).toBe('test3');
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});
//bien, como puedo ahora agregar en el swagger, en la casilla de input de un query un hint para el formato de texto a ingresar?
