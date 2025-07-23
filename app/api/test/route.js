import { ConnectDB } from "@/lib/config/db";
import TestModel from "@/lib/models/TestModel";

export async function POST(request) {
  try {
    await ConnectDB();

    const newPost = await TestModel.create({ title: "TEST", status: "drafting" });

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
}

export async function PATCH(request) {
  try {
    await ConnectDB();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    }

    const updatedArticle = await TestModel.findByIdAndUpdate(
      id,
      { status: "published" },
      { new: true }
    );

    return new Response(JSON.stringify(updatedArticle), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to update article:", error);
    return new Response(JSON.stringify({ error: "Failed to update article" }), { status: 500 });
  }
}
