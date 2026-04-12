import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().optional(),
  JWT_SECRET: Joi.when('NODE_ENV', {
    is: 'test',
    then: Joi.string().min(8).default('jest-jwt-secret-key-min-16chars'),
    otherwise: Joi.string().min(16).required(),
  }),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  AUTH_LOG_LEVEL: Joi.string().optional(),
  AUTH_TEST_ENDPOINT_ENABLED: Joi.string().valid('true', 'false').optional(),
  AUTH_PROVIDER_URL: Joi.string().uri().optional(),
  AUTH_PROVIDER_REALM: Joi.string().optional(),
  AUTH_PROVIDER_ADMIN_USER: Joi.string().optional(),
  AUTH_PROVIDER_ADMIN_PASSWORD: Joi.string().optional(),
});
