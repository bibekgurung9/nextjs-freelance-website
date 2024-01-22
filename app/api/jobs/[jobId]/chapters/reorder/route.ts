import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"

export async function PUT(
  req: Request,
  { params }: { params: { jobId: string} }
  ){
  try{
    const { userId } = auth();

    if(!userId){
      return new NextResponse("Unauthorized", {status: 401})
    }

    const { list } = await req.json();

    const ownJob = await db.job.findUnique({
      where: {
        id: params.jobId,
        userId: userId,
      }
    });

    if(!ownJob){
      return new NextResponse("Unauthorized", {status: 401})
    }

    for (let item of list){
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position},
      });
    }

    return new NextResponse("Success", {status: 200})

  } catch(error){
    console.log("Reorder Error")
    return new NextResponse("Internal Erorr", {status: 500})
  }
}