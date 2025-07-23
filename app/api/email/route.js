import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB()
}


LoadDB()
export async function POST(request) {
    try {

        const { email } = await request.json();
        // const email = formData.get("email");

        if (!email) {
            return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
        }

        await EmailModel.create({ email });

        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (err) {
        console.error("Email subscription error:", err);
        return NextResponse.json({ success: false, msg: "Subscription failed" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await ConnectDB()
        const emails = await EmailModel.find()
        return NextResponse.json({ emails })
    } catch (err) {
        console.error('GET /api/email error:', err)
        return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        await ConnectDB()
        const id = request.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json({ success: false, msg: 'Missing ID' }, { status: 400 })
        }
        await EmailModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true, msg: 'Email deleted' })
    } catch (err) {
        console.error('DELETE /api/email error:', err)
        return NextResponse.json({ success: false, msg: err.message }, { status: 500 })
    }
}