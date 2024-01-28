import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, imageUrl, content, excerpt, slug } = body;


    const billboard = await db.blogPosts.create({
      data: {
        title,
        imageUrl,
        content,
        excerpt,
        slug
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}


export async function GET() {
  try {
    const blogposts = await db.blogPosts.findMany();

    return NextResponse.json(blogposts);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error BROJ", { status: 500 });
  }
}
