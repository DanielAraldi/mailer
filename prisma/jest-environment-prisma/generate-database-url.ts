export const generateDatabaseUrl = (schema: string): string => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
};
