import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: {params: { jobId: string }}
  ){
 try{
  const { userId } = auth();
  const { jobId } = params;
  const values = await req.json();

  if(!userId){
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