import { createAuthClient } from "better-auth/react";

// Let Better Auth use the current origin. This works for localhost, Vercel
// preview deployments, and the production domain without exposing a server
// environment variable to the browser.
export const authClient = createAuthClient();

export const { signOut, signIn, signUp, useSession } = authClient;
