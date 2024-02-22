import { db } from "@/lib/db";
import { Category, Chapter, Job } from "@prisma/client";

type JobWithProgressWithCategory = Job & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
}

type DashboardCourses = {
  completedJobs: JobWithProgressWithCategory[];
  jobsInProgress: JobWithProgressWithCategory[];
}

export const getDashboardJObs = async (userId: string): Promise<DashboardCourses> => {
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
      const progress = await getProgress
    }

  } catch(error){
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedJobs: [],
      jobsInProgress: [],
    }

  } 
}