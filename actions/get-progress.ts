import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  jobId: string,
): Promise<number> => {
  try{
    const publishedChapter = await db.chapter.findMany({
      where: {
        jobId : jobId,
        isPublished: true,
      },
      select: {
        id: true,
      }
    });

    const publishedChapterId = publishedChapter.map((chapter) => chapter.id);

    const validCompletedChapter = await db.freelancerProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterId,
        },
        isCompleted: true,
      }
    });

    const progressPercentage = (validCompletedChapter / publishedChapterId.length) * 100;

    return progressPercentage;

  } catch(error){
    console.log("GET_PROGRESS", error);
    return 0;
  }
}