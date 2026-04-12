import { registerAs } from '@nestjs/config';
import type { AuthConfig } from '@sclable/nestjs-auth';

export const AUTH_CONFIG_KEY = 'auth';

function parseEnvBool(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
}

export default registerAs(
  AUTH_CONFIG_KEY,
  (): AuthConfig => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    loglevel: process.env.AUTH_LOG_LEVEL,
    testEndpointEnabled: parseEnvBool(process.env.AUTH_TEST_ENDPOINT_ENABLED),
    providerUrl: process.env.AUTH_PROVIDER_URL,
    providerRealm: process.env.AUTH_PROVIDER_REALM,
    providerAdminUser: process.env.AUTH_PROVIDER_ADMIN_USER,
    providerAdminPassword: process.env.AUTH_PROVIDER_ADMIN_PASSWORD,
  }),
);
