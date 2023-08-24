import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  try {
    let system = await prisma.system.findUnique({ where: { id: 1 } });
    if (data.user === 1) {
      let user  = await prisma.user.update({where: {id: 1}, data: {
        handsHeld: {increment: system?.handForH},
        hugsRecieved: {increment: system?.hugsForH},
        kissesRecieved: {increment:  system?.kissesForH}
      }})
      await prisma.system.update({where: {id: 1}, data: {
        hugsForH: 0,
        handForH: 0,
        kissesForH: 0
        
      }})
    } else if (data.user === 2) {
      let user  = await prisma.user.update({where: {id: 2}, data: {
        handsHeld: {increment: system?.handForS},
        hugsRecieved: {increment: system?.hugsForS},
        kissesRecieved: {increment:  system?.kissesForS}
      }})
      await prisma.system.update({where: {id: 1}, data: {
        hugsForS: 0,
        handForS: 0,
        kissesForS: 0
        
      }})
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error", error });
  }
  return NextResponse.json({ status: "success" });
}

export async function GET(request: Request) {
  let system;
  try {
    system = await prisma.system.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error", error });
  }

  return NextResponse.json({ status: "success", system });
}
