import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import {AuthOptions} from 'next-auth'


import prisma from '@/db/db'
const MyAuthOptions:AuthOptions={
      adapter: PrismaAdapter(prisma),
      providers:[
            GithubProvider({
                  clientId: process.env.GITHUB_ID as string,
                  clientSecret: process.env.GITHUB_SECRET as string,
            }),
            GoogleProvider({
                  clientId: process.env.GOOGLE_ID as string,
                  clientSecret: process.env.GOOGLE_SECRET as string,
            }),
           
      ],
      debug: process.env.NODE_ENV ==='development',
      session: {
            strategy:'jwt',
      },
      secret: process.env.NEXTAUTH_SECRET,
}
export default MyAuthOptions;