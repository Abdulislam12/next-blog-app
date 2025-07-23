import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/UserModel";

export const POST = async (req) => {
  try {
    const { username, email, password, role } = await req.json();
    await ConnectDB();

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return NextResponse.json({ error: "Email or Username already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });

    // Create JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("Generated JWT token:", token);


    // Set JWT in cookie
    const response = NextResponse.json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      message: "User registered successfully",
    }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax"
    });

    return response;

  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
};
