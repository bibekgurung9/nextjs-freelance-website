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
    })

    if(!job){
      return new NextResponse("No Job Found", { status : 404});  
    }
    
    const unpublishedJob = await db.job.update({
      where: {
        id: params.jobId,
        userId,
      },
      data: {
        isPublished: false,
      }
    })

    return NextResponse.json(unpublishedJob)

  } catch(error){
    console.log("[JOB_UNPUBLISH]", error);
    return new NextResponse("Internal Error", {status: 500})
  }

  }


