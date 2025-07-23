import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/UserModel";

export const POST = async (req) => {
    try {
        const { email, password, loginAs } = await req.json();
        await ConnectDB();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // ✅ Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // ✅ Role mismatch
        if (user.role !== loginAs) {
            return NextResponse.json({
                error: `You are registered as a ${user.role}. Please use the ${user.role} login.`,
            }, { status: 403 });
        }

        // ✅ Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // ✅ Set token in cookie
        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        return response;
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
};
