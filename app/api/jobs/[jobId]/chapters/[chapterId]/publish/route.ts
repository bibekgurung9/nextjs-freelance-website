import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params} : {params: { jobId: string; chapterId: string}} 
) {
  try{
    const { userId } = auth()
    
    if(!userId){
      return new NextResponse("Unauthorized", { status : 401});
    }

    const ownJob = await db.job.findUnique({
      where: {
        id: params.jobId,
        userId,
      }
    })

    if(!ownJob){
      return new NextResponse("Unauthorized", { status : 401});
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        jobId: params.jobId,
      },
    })

    if(!chapter){
      return new NextResponse("No Chapter Found", { status : 404});  
    }

    if(!chapter || !chapter.title || !chapter.description){
      return new NextResponse("Missing Required Fields", {status: 400})
    }

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        jobId: params.jobId,
      },
      data: {
        isPublished: true,
      }
    })

    return NextResponse.json(publishedChapter)

    
  } catch(error){
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}