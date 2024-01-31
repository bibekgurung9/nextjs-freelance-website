import { db } from "@/lib/db";
import { Category, Job } from "@prisma/client";
import { getProgress } from "./get-progress";

type JobwithProgressWithCategory = Job & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetJobs = {
  id: string;
  title: string;
  categoryId: string;
};

export const getJobs = async ({  
  id,
  title,
  categoryId,
}: GetJobs): Promise<JobwithProgressWithCategory[]> => {
  try{
    const jobs = await db.job.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        payments: {
          where: {
            id,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    const jobwithProgres: JobwithProgressWithCategory[] = await Promise.all(
      jobs.map(async job => {
        if(job.payments.length === 0){
          return {
            ...job,
            progress: null,
          }
        }
        const progressPercentage = await getProgress(id, job.id);

        return {
          ...job,
          progress: progressPercentage,
        }
      })
    )
    return jobwithProgres;
  } catch(error){
    console.log("GET_JOBS", error);
    return [];
  }
}