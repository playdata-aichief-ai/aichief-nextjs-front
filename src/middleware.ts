import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // "next-auth.session-token" 쿠키가 존재할 때
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  // 로그인 후 접근 제한 ( 로그인/회원가입 )
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 로그인 하지 않고 접근 제한 ( 마이페이지 )
  if (pathname.startsWith('/mypage')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: ['/login', '/signup', '/mypage', '/upload'],
};
