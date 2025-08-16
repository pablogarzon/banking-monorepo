import { RegisterNewCompanyUC } from '@bank-monorepo/core';
import { FastifyPluginAsync } from 'fastify';
import { getDbRepository } from '../db/providers/database.provider';

const companyServicePlugin: FastifyPluginAsync = async (fastify) => {
  // Crear una instancia del servicio
  const companyService = new RegisterNewCompanyUC(getDbRepository());

  // Registrar el servicio en Fastify
  fastify.decorate('companyService', companyService);
};

export default companyServicePlugin;
