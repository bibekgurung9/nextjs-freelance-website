import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: {params: { jobId: string}}
){
  try{
    const { userId } = auth();
    const { title } = await req.json()

    if(!userId){
      return new NextResponse("Unauthorized", { status : 401});
    }

    const jobOwner = await db.job.findUnique({
      where: {
        id: params.jobId,
        userId: userId,
      }
    })

    if(!jobOwner){
      return new NextResponse("Unauthorized", { status : 401});
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        jobId: params.jobId,
      },
      orderBy: {
        position: "desc"
      }
    })

    const newPoistion = lastChapter ? lastChapter.position + 1: 1;
    
    const chapter = await db.chapter.create({
      data: {
        title,
        jobId: params.jobId,
        position: newPoistion,
      }
    })

    return NextResponse.json(chapter);

  } catch(error){
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status:500 })
  }
}