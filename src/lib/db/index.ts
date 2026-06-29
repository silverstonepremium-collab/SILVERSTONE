import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

/**
 * Get database connection
 */
export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
}

/**
 * Execute a query and return results
 */
export async function query<T>(
  sql: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  try {
    const db = getDb();
    const result = await db(sql, ...values);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Execute a query and return single result
 */
export async function queryOne<T>(
  sql: TemplateStringsArray,
  ...values: any[]
): Promise<T | null> {
  const results = await query<T>(sql, ...values);
  return results.length > 0 ? results[0] : null;
}
