import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { IncrementalCache } from "next/dist/server/lib/incremental-cache";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    let story = await prisma.story.update({
      where: { id: data.storyID },
      data: { score: data.score, pending: false },
    });
    
    let user = await prisma.user.update({
      where: { id: data.partnerID },
      data: { energy: { increment: data.score } },
    });
  } catch (error) {
    return NextResponse.json({ status: "error" });
  }
  return NextResponse.json({ status: "success" });
}
