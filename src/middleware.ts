import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidPassword } from './lib/isValidPassword'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
      if(await isAuthenticated(request)===false){
            return new NextResponse("Unauthorized",{status:401, 
                  headers:{"WWW-Authenticate":"Basic"}
            } )
      }
//   return NextResponse.redirect(new URL('/home', request.url))
}

async function isAuthenticated(req:NextRequest){
      const autheHeader=req.headers.get('authorization') || req.headers.get('Authorization')
      if(autheHeader==null) return false
      const [username, password]=Buffer.from(autheHeader.split(' ')[1], "base64").toString().split(":");
      return username===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD

      // isValidPassword(password, password)
      // return username===process.env.ADMIN_USERNAME && (await isValidPassword(password, process.env.ADMIN_PASSWORD as string))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}