import { isClient } from "@/lib/client";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST( req: Request ) {
  try{
    const { userId } = auth();
    const { title } = await req.json();
    
    if(!userId || !isClient(userId)){
      return new NextResponse("Unauthorized", {status: 400});
    }

    const jobs = await db.job.create({
      data: {
        userId,
        title,
      }
    })
    return NextResponse.json(jobs)

  } catch(error){
    console.log("[JOBS]", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}