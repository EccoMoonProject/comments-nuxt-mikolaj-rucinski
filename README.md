# comments-nuxt-mikolaj-rucinski

### 1. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 2. Start the REST API server

```
npm run dev
```
### 3. Start the Nuxt 3 App

```
nvm use 16
```

```
npm i
```

```
npm run dev
```
