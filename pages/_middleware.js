import { NextRequest, NextResponse } from 'next/server'
// import {useAuth} from "../context/auth";
// import {MENU} from "../constants";

export function middleware(req) {

  const { pathname } = req.nextUrl;
  const publicPaths = ["/dang-nhap"];
  const ignoreExt = ["jpg", "ico"];
  const ext = pathname.split(".").pop();
  const accessToken = req.cookies?.accessToken;
  const url = req.nextUrl.clone();

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

    // if (!_.isNil(_.find(MENU['teacher'], (o) => o.link === pathname))) {
    //   NextResponse.redirect('/404')
    // }
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}