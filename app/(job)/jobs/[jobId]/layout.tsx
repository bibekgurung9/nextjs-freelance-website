import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import { Navbar } from "@/app/(frontend)/_components/navbar";

import { FaMoneyBill, FaAudioDescription } from "react-icons/fa";
import { ZodDate } from "zod";

const JobLayout = async ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { jobId: string};
  }) => {

    const { userId } = auth()
    
    if(!userId){
      return redirect("/");
    }

    const job = await db.job.findUnique({
      where : {
        id: params.jobId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            freelancerProgress: {
              where: {
                userId,
              }
            }
          },
          orderBy: {
            position: 'asc'
          }
        }
      }
    })

    if(!job){
      return redirect("/");
    }

    const progressCount = await getProgress(userId, job.id);

    return (
      <div className="h-full">
        <div className="h-[70px] md:pl-56 fixed inset-y-0 w-full z-50 bg-sky-500">
          <Navbar /> 
        </div>
        <div className="mt-20 flex flex-col gap-y-4 px-4">
          <h1 className="text-4xl font-bold">{job.title}</h1>
          <span className="text-slate-400 text-xl">Posted On: {job.createdAt.toLocaleDateString()}</span>
          <span className="text-slate-400 text-xl">Posted By: {job.userId}</span>
          <p className="text-2xl"><span className="font-bold">Job Description</span>:<br/>{job.description}</p>
          <p className="text-2xl"><span className="font-bold"><FaMoneyBill /> Budget: </span>{job.price}</p>
        </div>    
        <main className="h-full">
          {children}
        </main>
      </div>
    )
  }

export default JobLayout;