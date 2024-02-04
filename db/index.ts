import { drizzle } from "drizzle-orm/node-postgres";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

const dbCredentials = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: true }
  : {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "root",
      database: "postgres",
    };

const pool = new Pool({
  ...dbCredentials,
});
const db = drizzle(pool, { schema });

// local dev only
// await migrate(db, { migrationsFolder: "drizzle" });

export default db;
