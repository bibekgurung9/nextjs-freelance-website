import { Category, Job } from "@prisma/client";
import { JobCard } from "@/components/job-card";

type JobWithProgressWithCategory = Job & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
}

interface JobsListProps {
  items: JobWithProgressWithCategory[];
}

export const JobsList = ({
  items,
}:JobsListProps) => {
  return(
    <div>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <JobCard
            key={item.id}
            id={item.id} 
            title={item.title}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
            description={item?.description}
            />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Job Listings Found
        </div>
      )}
    </div>
  )
}