import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, eq } from "drizzle-orm";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../../../db";
import { users } from "../../../../db/schema";

export const authOptions: NextAuthOptions = {
  // @ts-ignore: Not solvable issue with the adapter
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  //   theme: {
  //     colorScheme: "light",
  //     brandColor: "#06b6d4",
  //     logo: "/logo.png",
  //   },
  callbacks: {
    async session({ session }) {
      if (!session.user || !session.user.email || !session.user.name) {
        return session;
      }

      const user = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.email, session.user.email),
            eq(users.name, session.user.name)
          )
        );

      session.user.id = user[0].id;

      return session;
    },
  },
};
