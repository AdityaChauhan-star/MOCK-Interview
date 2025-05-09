import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT: process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT,
    NEXT_PUBLIC_DRIZZLE_DB_URL: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};

export default nextConfig;
