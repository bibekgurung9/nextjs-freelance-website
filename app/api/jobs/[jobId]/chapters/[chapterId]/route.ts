import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
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

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });

    const publishedChapterInJob = await db.chapter.findMany({
      where: {
        jobId: params.jobId,
        isPublished: true,
      }
    })

    if(!publishedChapterInJob.length){
      await db.job.update({
        where: {
          id: params.jobId,
        },
        data: {
          isPublished: false, 
        }
      })
    }
    return NextResponse.json(deletedChapter);

  } catch(error){
    console.log("[CHAPTER_ID_DELTE]", error);
    return new NextResponse("Internal Error", {status : 500})
  }
 }


export async function PATCH(
  req: Request,
  {params} : {params: { jobId: string; chapterId: string}} 
) {
  try{
    const { userId } = auth()
    const { isPublished, ...values} = await req.json()
    
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

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        jobId: params.jobId,
      },
      data: {
        ...values,
      }
    })

    return NextResponse.json(chapter);

  } catch(error){
    console.log("[JOB_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", {status: 500})
  }

  }