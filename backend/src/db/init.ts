import pool from '../config/database';
import fs from 'fs';
import path from 'path';

export async function initializeDatabase(): Promise<void> {
  const client = await pool.connect();
  
  try {
    console.log('Initializing database schema...');
    
    // Read and execute schema SQL file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    
    await client.query(schemaSql);
    
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function dropAllTables(): Promise<void> {
  const client = await pool.connect();
  
  try {
    console.log('Dropping all tables...');
    
    await client.query(`
      DROP TABLE IF EXISTS retweets CASCADE;
      DROP TABLE IF EXISTS likes CASCADE;
      DROP TABLE IF EXISTS follows CASCADE;
      DROP TABLE IF EXISTS tweets CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    
    console.log('All tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Script to run initialization from command line
if (require.main === module) {
  const args = process.argv.slice(2);
  const shouldDrop = args.includes('--drop');
  
  (async () => {
    try {
      if (shouldDrop) {
        await dropAllTables();
      }
      await initializeDatabase();
      console.log('Database setup complete');
      process.exit(0);
    } catch (error) {
      console.error('Database setup failed:', error);
      process.exit(1);
    }
  })();
}
