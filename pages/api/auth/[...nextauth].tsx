// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.SEQULIZE_CONNECTION_STRING as string);

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  callbacks: {
    session({ session, user }) {

      // if session does exist, map extra user fields to the session object
      if (session) {
        for (let key of ['id', 'role']) {
          // @ts-ignore
          session.user[key] = user[key];
        }
      }

      return session
    }
  },
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("user", {
        ...models.User,
        role: {
          type: DataTypes.STRING(16),
          defaultValue: "admin",
        },
      }),
      // replace 4 fields with TEXT type, or it will exceed the default varchar length limit. (this is a bug for next-auth sequlize adatpor)
      Account: sequelize.define("account", {
        ...models.Account,
        id_token: {
          ...models.Account.id_token,
          type: DataTypes.TEXT
        },
        access_token: {
          ...models.Account.access_token,
          type: DataTypes.TEXT
        },
        refresh_token: {
          ...models.Account.refresh_token,
          type: DataTypes.TEXT
        },
        providerAccountId: {
          ...models.Account.providerAccountId,
          type: DataTypes.TEXT
        },
      }),
    },
  }),
};

export default NextAuth(authOptions);
