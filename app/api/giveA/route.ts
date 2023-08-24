import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    if (data.partnerId === 1) {
      switch (data.type) {
        case "Hand":
          await prisma.system.update({
            where: { id: 1 },
            data: { handForH: { increment: 1 } },
          });

          await prisma.user.update({where: {id: 2}, data: {energy: {decrement: 10}}})
          break;

        case "Hug":
          await prisma.system.update({
            where: { id: 1 },
            data: { hugsForH: { increment: 1 } },
          });
          await prisma.user.update({where: {id: 2}, data: {energy: {decrement: 20}}})

          break;

        case "Kiss":
          await prisma.system.update({
            where: { id: 1 },
            data: { kissesForH: { increment: 1 } },
          });
          await prisma.user.update({where: {id: 2}, data: {energy: {decrement: 40}}})

          break;
        default:
          return false;
      }
      return NextResponse.json({ status: "success" });

    } else if (data.partnerId === 2) {
      switch (data.type) {
        case "Hand":
          await prisma.system.update({
            where: { id: 1 },
            data: { handForS: { increment: 1 } },
          });
          await prisma.user.update({where: {id: 1}, data: {energy: {decrement: 10}}})

          break;

        case "Hug":
          console.log("Given hug to simran");
          await prisma.system.update({
            where: { id: 1 },
            data: { hugsForS: { increment: 1 } },
          });
          await prisma.user.update({where: {id: 1}, data: {energy: {decrement: 20}}})

          break;

        case "Kiss":
          console.log("Given kiss to simran");
          await prisma.system.update({
            where: { id: 1 },
            data: { kissesForS: { increment: 1 } },
          });
          await prisma.user.update({where: {id: 1}, data: {energy: {decrement: 40}}})

          break;
        default:
          return false;
        }
        return NextResponse.json({ status: "success" });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: "error", error });
  }

  return NextResponse.json({ status: "error" });
}
