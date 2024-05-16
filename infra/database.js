import { Client } from "pg";

async function query(queryObject) {  
  
  let client;
  try {
    client = await getNewCLient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
  
}

async function getNewCLient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? true : false,
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewCLient,
};
