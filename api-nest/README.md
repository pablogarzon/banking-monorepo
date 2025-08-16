<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Bank API</p>

## Description

1. Obtener las empresas que realizaron transferencias en el último mes.
2. Obtener las empresas que se adhirieron en el último mes.
3. Registrar la adhesión de una nueva empresa.
   Estas empresas pueden ser de dos tipos:
   - Empresa Pyme.
   - Empresa Corporativa.

### Consideraciones:

La consigna especifica crear la lógica para el último mes, así que se pensó en dejar los endpoints de manera funcional con la consigna:

```
GET  company/transferencias/ultimo-mes
GET  company/adhesiones-ultimo-mes
POST company/
```

Pero en REST, lo ideal es que la URL represente el recurso y los filtros, fechas u operaciones se indiquen por query params. Además, crear la lógica para un solo mes implica que si mañana se necesita "últimos 3 meses" se debe crear otro caso de uso, codigo, endpoint, etc. Por lo que se decidió que sería mejor usar un query param poder ajustar la fecha de consulta sin cambiar el endpoint.

### Stack

- Nestjs
- Fastify
- Typeorm
- Sqlite (para entorno de desarrollo)
- Postgresql (para entorno de producción)

### Estructura del proyecto

El proyecto esta diseñado en base a la arquitectura hexagonal

```
src/
│
├── domain/                    # Lógica de negocio
│   ├── entities/              # Entidades del dominio
│   ├── ports/                 # Interfaces de puertos (repositorios)
│
├── application/               # Casos de uso / servicios de aplicación
│   ├── use-cases/             # Casos de uso
│   ├── commands/              # acciones manejadas por los CU
│
├── infra/                     # Implementaciones técnicas
│   ├── db/                    # Configuración DB
│   │   ├── adapters/          # adaptadores de los puertos de dominio
│   │   ├── entities/          # Entitades a ser guardadas en la BD
│   │   ├── providers/         # Módulos Nest para exportar cliente DB
│   ├── http-api/              # Web API
│       └── controllers/       # Controladores Nest
│       └── dtos/              # dtos
│
└── main.ts                    # Punto de entrada NestJS
```

## Settings

El proyecto se configura con archivos `.env`, pero para probarlo localmente en desarrollo no es necesario. El archivo de producción debe ser creado en el directorio raíz con el nombre de `.env.production` con las siguientes configuraciones de ejemplo:

```env
# .env.production


APP_PORT=3005

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
```

SQLite se usa para desarrollo local y para tests (e2e y unitarios):

- Es ligero y no requiere instalar un servidor externo.

- Arranca rápido y evita la sobrecarga de configurar credenciales o contenedores de Postgres.

PostgreSQL se usa en producción:

- Es un motor más robusto, escalable y seguro para entornos reales.

- Maneja concurrencia, integridad y grandes volúmenes de datos mejor que SQLite.

- Ofrece más funcionalidades avanzadas.

**Esta versionada una base de datos de prueba con datos cargados, se debe renombrar a para probar**

```
$ mv database.sqlite.example database.sqlite
```

**_El proyecto usa un módulo proveedor de base de datos (DatabaseProviderModule) que decide qué configuración cargar según el NODE_ENV._**

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Docs

El proyecto esta documentado con Swagger, para acceder a la documentación se debe ingresar a:
`http://[server]:[port]/api`. Si no se a modificado la configuración por defecto se puede ingresar directamente a [http://localhost:3005/api](http://localhost:3005/api)

## Stay in touch

- Author - [Pablo Garzón](https://gitlab.com/pablogarzon)
