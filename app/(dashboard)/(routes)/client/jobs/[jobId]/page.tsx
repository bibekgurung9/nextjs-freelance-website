import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { CategoryForm } from "./_components/category-form";
const JobIdPage = async ({
  params
}: {
  params: { jobId: string }
}) => {
  const userId = auth();

  if(!userId){
    return redirect("/");
  }

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if(!job){
    return redirect("/");
  }

  const requiredFields = [
    job.title,
    job.description,
    job.imageUrl ,
    job.price ,
    job.categoryId ,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`


  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Job Setup
          </h1>
          <span className="text-sm text-slate-600">
            Complete All Fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Customize Your Job 
            </h2>
          </div>
          <TitleForm
              initialData={job}
              jobId={job.id}
          />
          <DescriptionForm
              initialData={job}
              jobId={job.id}
          />
          <CategoryForm
              initialData={job}
              jobId={job.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
          />
        </div>
      </div>
    </div>
  );
}

export default JobIdPage