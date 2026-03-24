import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars are missing or placeholders, just pass through (Demo Mode)
  const isDemo = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project-url");
  
  if (isDemo) {
    return NextResponse.next();
  }

  // Get the auth token from cookies
  const authCookie = request.cookies.getAll().find(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  );

  const hasSession = !!authCookie?.value;

  // Protect dashboard and donate routes (DISABLED - allow anonymous access)
  /*
  if (
    !hasSession &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/donate"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
