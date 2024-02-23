import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isClient } from "@/lib/client";

export async function DELETE(
  req: Request,
  { params }: {params: { jobId: string }}
  ){
    try{
      const { userId } = auth();
    
      if(!userId || !isClient(userId)){
        return new NextResponse("Unauthorized", {status: 401})
      }
    
      const job = await db.job.findUnique({
        where: {
          id: params.jobId,
          userId: userId,
        }, 
        include: {
          chapters: {
          }
        }
      });

      if(!job){
        return new NextResponse("NotFound", {status: 404})
      }

      const deletedJob = await db.job.delete({
        where: {
          id: params.jobId,
          userId: userId,
        },
      });

      return NextResponse.json(deletedJob);


    } catch(error){
      console.log("[JOB_DELETED", error);
      return new NextResponse ("Internal Error", {status: 500});
    }
}


export async function PATCH(
  req: Request,
  { params }: {params: { jobId: string }}
  ){
 try{
  const { userId } = auth();
  const { jobId } = params;
  const values = await req.json();

  if(!userId || !isClient(userId)){
    return new NextResponse("Unauthorized", {status: 401})
  }

  const job = await db.job.update({
    where: {
      id: jobId,
      userId: userId,
    },
    data: {
      ...values,
    }
  });
  return NextResponse.json(job);
 
 } catch(error){
    console.log("[JOB_ID]", error);
    return new NextResponse ("Internal Error", {status: 500});
 }
}