import type { AdapterAccount } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});
export type SelectUsers = typeof users.$inferSelect;

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const typeEnum = pgEnum("type", ["rent", "trade"]);
export const tagEnum = pgEnum("tag", [
  "games",
  "electronics",
  "clothing",
  "books",
  "furniture",
]);

export const products = pgTable("product", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  // numberOfRatings: integer("numberOfRatings").notNull(),
  rentedTill: date("rentedTill", { mode: "date" }), // TODO: Considering all users are from Bharat. Need to handle timezones
  type: typeEnum("type").notNull(),
  tag: tagEnum("tag").notNull(),
  seller: text("seller")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const history = pgTable("history", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  product: text("product")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  buyer: text("buyer")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const reviews = pgTable("review", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  product: text("product")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  buyer: text("buyer")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  rating: integer("rating").default(0),
  review: text("review").notNull(),
});
