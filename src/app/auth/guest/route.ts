import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Create a generic robust guest object
    const guestData = {
      isGuest: true,
      user: {
        id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        phone,
      },
      createdAt: new Date().toISOString(),
    };

    // Serialize to Base64 (In a strict production app, consider encrypting this with `jose`)
    const token = Buffer.from(JSON.stringify(guestData)).toString('base64');

    const response = NextResponse.json({ success: true });

    // 72 hours in seconds
    const maxAge = 3 * 24 * 60 * 60; 

    // Set the cookie
    response.cookies.set("sb-guest-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
