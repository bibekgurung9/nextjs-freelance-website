import { getDashboardJobs } from "@/actions/get-dashboard-jobs";
import { JobsList } from "@/components/jobs-list";
import { auth } from "@clerk/nextjs"
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";


export default async function Dashboard() {
  const { userId } = auth();

  if(!userId){
    return redirect("/");
  }

  const { 
    completedJobs,
    jobsInProgress,
  } = await getDashboardJobs(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={jobsInProgress.length} />
        </div>
        <div>
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedJobs.length}
            variant="success" />
        </div>
      </div>
      <JobsList items={[...completedJobs, ...jobsInProgress]} />

    </div>
  )
}
