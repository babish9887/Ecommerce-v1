import NextAuth from 'next-auth'
import MyAuthOptions from './authOptions';


const handler = NextAuth(MyAuthOptions)


export {handler as GET, handler as POST};