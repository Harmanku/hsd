import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!password) {
    return NextResponse.json({ status: "error" });
  }

  const S_PASSWORD =
    "$2a$10$LGtkgGg5g/G7BfIgxE8GqOW4qGs1v8h2hourQb1b3Xd/67l214v9q";
  const H_PASSWORD =
    "$2a$10$Jd8iJf0NkOK.ASh1Zdomb.FGFA6aWpKGLO1HauU3jfxnU7ERlAFM6";

  let user;
  let partnerStories;
  if (await bcrypt.compare(password, S_PASSWORD)) {
    user = await prisma.user.findUnique({
      where: { id: 2 },
      include: { Stories: true },
    });
    let partner = await prisma.user.findUnique({
      where: { id: 1 },
      include: { Stories: true },
    });
    partnerStories = partner?.Stories;
  } else if (await bcrypt.compare(password, H_PASSWORD)) {
    user = await prisma.user.findUnique({
      where: { id: 1 },
      include: { Stories: true },
    });
    let partner = await prisma.user.findUnique({
      where: { id: 2 },
      include: { Stories: true },
    });
    partnerStories = partner?.Stories;

  } else {
    return NextResponse.json({ status: "error" });
  }




  let system = await prisma.system.findUnique({ where: { id: 1 } });
  return NextResponse.json({ status: "success", user, system, partnerStories });
}
