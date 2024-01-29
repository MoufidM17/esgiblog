import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"
import { prismaClientDB } from "./prismaClient"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient()
const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prismaClientDB) as Adapter,
    // adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.NEXTAUTH_SECRET as string,
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        },
      }),
      // ...add more providers here
    ],
    callbacks: {
      signIn: async ({ user, account, profile }: any ) => {
        if (account.provider === "google") {
          if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
            return user
          }
        }
        return null
      },
      redirect: async ({ url, baseUrl }: any) => {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
      session: async ({ session, token } :any) => {
        return session;
      },
      jwt: async ({ user, token, account } : any) => {
        return token
      },
    },
}

export default authOptions;