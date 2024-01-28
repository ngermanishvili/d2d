import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { blogpostsId: string } }
) {
  try {
    if (!params.blogpostsId) {
      return new NextResponse("billboardId ID is required", { status: 400 });
    }
    const blogposts = await db.blogPosts.findUnique({
      where: {
        id: params.blogpostsId,
      },
    });
    return NextResponse.json(blogposts);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blogpostsId: string } }
) {
  try {
    const body = await req.json();

    const { title,
      imageUrl,
      content,
      excerpt,
      slug } = body;

    const blogposts = await db.blogPosts.updateMany({
      where: {
        id: params.blogpostsId,
      },
      data: {
        title,
        imageUrl,
        content,
        excerpt,
        slug
      },
    });

    return NextResponse.json(blogposts);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogpostsId: string } }
) {
  try {

    const blogposts = await db.blogPosts.deleteMany({
      where: {
        id: params.blogpostsId,
      },
    });

    return NextResponse.json(blogposts);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
