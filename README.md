# next-auth boilerplate

This boilerplate uses sequlize for the database adaptor, however, the concept for wiring things together is the same.

1. run `yarn install`

2. create .env.local and fill-in the .env

```yml
# google oauth client ID & Secret
GOOGLE_ID=
GOOGLE_SECRET=
# e.g. postgresql://postgres:password@localhost:5432/my-app
SEQULIZE_CONNECTION_STRING=
```

3. run `yarn dev`

# Add more type to session.user object

in `[..nextauth].tsx`, add more field to

```js
  callbacks: {
    session({ session, user }) {

      if (session) {
        for (let key of ['id', 'role', 'your-user-field']) { // <---- add custom field here so that user object from in session.user will have those filed
          session.user[key] = user[key];
        }
      }

      return session
    }
  },
  ...,
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("user", {
        ...models.User,
        role: {
          type: DataTypes.STRING(16),
          defaultValue: "admin",
        },
        // add your own custom user field
      }),
    },
  }),
```

And in `next-auth.d` , add the extra field to the User type

```tsx
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "regular";
      name: string;
      email: string;
      image: string;
      // <---add rest of your user custom field here, or TS will complain.
    };
  }
}
```
