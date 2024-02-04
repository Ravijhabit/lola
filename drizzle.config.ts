import type { Config } from "drizzle-kit";

const dbCredentials = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: true }
  : {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "root",
      database: "postgres",
    };

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials,
} satisfies Config;
