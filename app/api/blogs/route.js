import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import fs from "fs";
import jwt from "jsonwebtoken"
import BlogModel from "@/lib/models/BlogModel";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// API End Point to GET Blogs

export async function GET(request) {
    try {
        await ConnectDB();
        const blogId = request.nextUrl.searchParams.get("id");
        if (blogId) {
            const blog = await BlogModel.findById(blogId).populate("author", "username email");
            return NextResponse.json(blog);
        } else {
            const blogs = await BlogModel.find({}).populate("author", "username email");
            return NextResponse.json({ blogs });
        }
    } catch (err) {
        console.error("Blog fetch error:", err);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// API End Point to Add Blogs

export async function POST(request) {
    try {
        await ConnectDB();

        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get("image");
        const buffer = Buffer.from(await image.arrayBuffer());
        const path = `./public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);
        const imgUrl = `/${timestamp}_${image.name}`;

        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return NextResponse.json({ error: "Invalid user" }, { status: 401 });
        }
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imgUrl,
            authorImg: formData.get("authorImg"),
            author: userId,
        };

        await BlogModel.create(blogData);

        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (err) {
        console.error("Blog creation error:", err);
        return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
    }
}

// API End Point to delete Blogs
export async function DELETE(request) {
    const blogId = request.nextUrl.searchParams.get("id");

    try {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }

        // Delete the image file
        const imagePath = `./public${blog.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) console.warn("Image deletion failed:", err.message);
        });

        // Delete blog from DB
        await BlogModel.findByIdAndDelete(blogId);

        return NextResponse.json({ success: true, msg: "Blog Deleted" });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
    }
}

// API End Point to update Blogs

export async function PATCH(request) {
    try {
        await ConnectDB()
        const blogId = request.nextUrl.searchParams.get('id')
        if (!blogId) {
            return new Response(JSON.stringify({ error: 'Missing blog ID' }), { status: 400 })
        }

        const formData = await request.formData()
        const title = formData.get('title')
        const description = formData.get('description')
        const image = formData.get('image')

        if (!title || !description) {
            return new Response(JSON.stringify({ error: 'Title and description are required' }), { status: 400 })
        }

        let updatedFields = { title, description }

        if (image && image.name) {
            const timestamp = Date.now()
            const buffer = Buffer.from(await image.arrayBuffer())
            const path = `./public/${timestamp}_${image.name}`
            await writeFile(path, buffer)
            const imageUrl = `/${timestamp}_${image.name}`
            updatedFields.image = imageUrl
        }

        const updatedArticle = await BlogModel.findByIdAndUpdate(
            blogId,
            updatedFields,
            { new: true, runValidators: true }
        )

        if (!updatedArticle) {
            return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 })
        }

        return new Response(JSON.stringify(updatedArticle), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Failed to update article:', error)
        return new Response(JSON.stringify({ error: 'Failed to update article' }), { status: 500 })
    }
}