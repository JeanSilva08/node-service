import { Pool, QueryResult } from 'pg';
export const pool = new Pool({
  user: 'service_user',
  host: 'localhost',
  database: 'servicedb',
  password: 'sigma123@',
  port: 5433,
});

export const getUserInfo = async (): Promise<QueryResult<any>> => {
  const result = await pool.query('SELECT * FROM users');
  return result;
};
