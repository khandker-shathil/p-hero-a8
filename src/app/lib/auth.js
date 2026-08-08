import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(
  process.env.MONGODB_CONNECTION ?? process.env.MONDGOBD_CONNECTION
);
export const db = client.db();

export const auth = betterAuth({
  // Environment-variable values can accidentally include whitespace when
  // copied into a deployment dashboard. Trim it before Better Auth appends
  // its `/api/auth` path.
  baseURL: process.env.BETTER_AUTH_URL?.trim(),
  account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google"] // Add providers as needed
		}
	},
  emailAndPassword: { 
    enabled: true, 
  }, 
   database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }},
  plugins: [nextCookies()],
});
