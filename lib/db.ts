import { createClient } from '@libsql/client';

const url = process.env.LIBSQL_DATABASE_URL;
const authToken = process.env.LIBSQL_API_KEY;

if (!url || !authToken) {
  throw new Error('Missing Turso environment variables: LIBSQL_DATABASE_URL and LIBSQL_API_KEY');
}

export const db = createClient({
  url,
  authToken
});
