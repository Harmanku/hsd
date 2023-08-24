import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  const data = await request.json();
  let story;
  let user;
  console.log(data);
  try {
    story = await prisma.story.create({
      data: {
        title: data.title,
        story: data.story,
        score: 0,
        pending: true,
        author: {
          connect: { id: data.userId },
        },
      },
    });
    

    
    
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error" });
  }

  return NextResponse.json({ status: "success", story});
}


