import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
};
