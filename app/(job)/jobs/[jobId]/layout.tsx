import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-progress";
import JobSidebar from "./_components/job-sidebar";

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
        <div>
          <h1>{job.title}</h1>
        </div>    
        <main className="h-full">
          {children}
        </main>
        
      </div>
    )
  }

export default JobLayout;