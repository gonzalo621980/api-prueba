import { config } from 'dotenv';


config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.NODE_APP_PORT,
  CORS_ALLOWED_ORIGINS: process.env.NODE_APP_CORS_ALLOWED_ORIGINS,
  TOKEN_SECRET: '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611',
  TOKEN_TIME_EXPIRATION: process.env.NODE_APP_TIME_SESION, // ms,
  TIME_ZONE: process.env.NODE_APP_TIME_ZONE,
  pgsql: {
    PGSQL_HOST: process.env.NODE_APP_PGSQL_HOST,
    PGSQL_PORT: process.env.NODE_APP_PGSQL_PORT,
    PGSQL_DB: process.env.NODE_APP_PGSQL_DB,
    PGSQL_USER: process.env.NODE_APP_PGSQL_USER,
    PGSQL_PASSWORD: process.env.NODE_APP_PGSQL_PASSWORD,
    PGSQL_MAX_CONNECTION: process.env.NODE_APP_PGSQL_MAX_CONNECTION
  }
}
