import { NextResponse } from 'next/server'
import { auth } from './app/lib/auth'
 
export async function proxy(request) {

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session){
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
}
 
export const config = {
  matcher: ['/profile', '/book/:id']
}
