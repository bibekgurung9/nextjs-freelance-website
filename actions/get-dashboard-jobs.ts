import { db } from "@/lib/db";
import { Category, Chapter, Job } from "@prisma/client";
import { getProgress } from "./get-progress";

type JobWithProgressWithCategory = Job & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
}

type DashboardCourses = {
  completedJobs: JobWithProgressWithCategory[];
  jobsInProgress: JobWithProgressWithCategory[];
}

export const getDashboardJobs = async (userId: string): Promise<DashboardCourses> => {
  try{
    const recivedPayJobs = await db.payment.findMany({
      where: {
        userId: userId,
      },
      select: {
        job: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              }
            }
          }
        }
      }
    });

    const jobs = recivedPayJobs.map((pay) => pay.job) as JobWithProgressWithCategory[];

    for( let job of jobs){
      const progress = await getProgress(userId, job.id);
      job["progress"] = progress;
    }

    const completedJobs = jobs.filter((job) => job.progress === 100);
    const jobsInProgress = jobs.filter((job) =>(job.progress ?? 0) < 100);

    return{
      completedJobs,
      jobsInProgress,
    }



  } catch(error){
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedJobs: [],
      jobsInProgress: [],
    }

  } 
}