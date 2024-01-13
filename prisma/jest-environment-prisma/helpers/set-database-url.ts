export const setDatabaseUrl = (databaseUrl: string) => {
  process.env.DATABASE_URL = databaseUrl;
  global.process.env.DATABASE_URL = databaseUrl;
};
