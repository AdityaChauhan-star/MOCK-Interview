/** @type { import("drizzle-kit").Config } */
const config = {
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: 'postgresql://ai-int-mocker_owner:npg_5ofDklQxyOh3@ep-odd-band-a5b2m7hv-pooler.us-east-2.aws.neon.tech/ai-int-mocker?sslmode=require',
    database: 'ai-int-mocker',
    host: 'ep-odd-band-a5b2m7hv-pooler.us-east-2.aws.neon.tech',
    user: 'ai-int-mocker_owner',
    password: 'npg_5ofDklQxyOh3',
    ssl: true,
  }
};

export default config;
