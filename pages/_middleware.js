import { NextRequest, NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const publicPaths = ["/dang-nhap"];
  const ignoreExt = ["jpg", "ico"];
  const ext = pathname.split(".").pop();
  const accessToken = req.cookies?.accessToken;
  const url = req.nextUrl.clone()
  if (
    !accessToken &&
    !publicPaths.includes(pathname) &&
    !ignoreExt.includes(ext)
  ) {
    url.pathname = '/dang-nhap'
    return NextResponse.redirect(url);
  } 
  else if (publicPaths.includes(pathname) && accessToken) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}