import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "postgres",
});
const db = drizzle(pool);

// local dev only
await migrate(db, { migrationsFolder: "drizzle" });

export default db;
