import { createAuth } from "@repo/auth";

/**
 * Better Auth instance for the Next.js server
 */
export const auth = createAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "your-secret-key-min-32-characters-long",
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  ],
});
