// /app/api/me/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ConnectDB } from '@/lib/config/db';
import User from '@/lib/models/UserModel';

export const GET = async (req) => {
    try {
        await ConnectDB();

        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('username email role');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ username: user.username, email: user.email, role: user.role });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
};
