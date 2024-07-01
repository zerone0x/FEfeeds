import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/_utils/auth";

export async function middleware(request: NextRequest) {
  console.log(request);
  let token = request.cookies.get("token")?.value;
  console.log("Token from cookie:", token);

  if (token) {
    if (token.startsWith("s:")) {
      token = token.slice(2);
    }
    token = token.split(".").slice(0, 3).join(".");
  }

  const verifiedToken =
    token &&
    (await verifyJwtToken(token).catch((err) => {
      console.log(err);
    }));
  console.log(verifiedToken);

  if (verifiedToken) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", verifiedToken.userId);
    requestHeaders.set("x-user-name", verifiedToken.name);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }
  if (
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/signup" &&
    !verifiedToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
