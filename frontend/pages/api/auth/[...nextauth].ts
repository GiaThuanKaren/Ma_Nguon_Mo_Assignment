import NextAuth, { AuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import type { NextApiRequest, NextApiResponse } from "next"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "src/utils/lib";
import { Updatetoken } from "src/service/api";
export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "22792954187-0kgia3rbn2j066baj3e4vk1cckton43d.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FBID as string,
      clientSecret: process.env.NEXT_PUBLIC_FBSEC as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({
      session,
      token,
      user,

    }: {
      session: any;
      token: any;
      user: User;
    }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    signIn: async function (param) {

      let result = await Updatetoken("INSERT", param.user.id, " adas")
      console.log("login ", result)

      console.log("Call back sing In")
      return true
    },

  },
  secret: "giathuanDoAnPython",
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.query, "Query Request NextAuth", req.query["token_user"])
  // const TokenUser = req.query["token_user"]
  let TokenUser: string
  if (req.query.token_user) {
    TokenUser = req.query.token_user as string
  }
  console.log("Query ", req.query)
  return await NextAuth(req, res,
    {
      adapter: MongoDBAdapter(clientPromise),
      // Configure one or more authentication providers
      providers: [
        GoogleProvider({
          clientId:
            "22792954187-0kgia3rbn2j066baj3e4vk1cckton43d.apps.googleusercontent.com",
          clientSecret: "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",
        }),
        FacebookProvider({
          clientId: process.env.NEXT_PUBLIC_FBID as string,
          clientSecret: process.env.NEXT_PUBLIC_FBSEC as string,
        }),
        // ...add more providers here
      ],
      callbacks: {
        session: async ({
          session,
          token,
          user,

        }: {
          session: any;
          token: any;
          user: User;
        }) => {
          if (session?.user) {
            session.user.id = user.id;
          }
          return session;
        },
        signIn: async function (param) {
          const { callbackUrl } = req.body
          let additionalAuthParams = JSON.parse(req.cookies?.additionalAuthParams as string).appPublicKey
          console.log(additionalAuthParams, "additionalAuthParams")
          // console.log(req.query, " Query Request Callback SignIn", TokenUser)
          // console.log("Token Firebase  ", tokenFirebase)
          // console.log(req.query?.token_user, "Token NextAuth , Request")
          let result = await Updatetoken("INSERT", param.user.id, additionalAuthParams)
          console.log("login ", result)

          console.log("Call back sing In")
          return true
        },

      },
      secret: "giathuanDoAnPython",
    })
}


// export default NextAuth(authOptions);
