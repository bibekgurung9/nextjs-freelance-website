import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {params} : {params: { jobId: string; chapterId: string; isPublished: boolean;}} 
) {
  try{
    const { userId } = auth()
    
    if(!userId){
      return new NextResponse("Unauthorized", { status : 401});
    }

    const job = await db.job.findUnique({
      where: {
        id: params.jobId,
        userId,
      },
      include: {
        chapters: {}
      }
    })

    if(!job){
      return new NextResponse("No Job Found", { status : 404});  
    }
    
    const hasPublishedChapter = job.chapters.some((chapter) => chapter.isPublished);

    if(!job.title || !job.description ||!job.categoryId || !hasPublishedChapter){
      return new NextResponse("Missing Required Fields", {status: 401})
    }

    const publishedJob = await db.job.update({
      where: {
        id: params.jobId,
        userId,
      },
      data: {
        isPublished: true,
      }
    })

    return NextResponse.json(publishedJob)

  } catch(error){
    console.log("[JOB_PUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500})
  }

  }


