import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form ";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

const JobIdPage = async ({
  params
}: {
  params: { jobId: string; isPublished:boolean; }
}) => {
  const userId = auth();

  if(!userId){
    return redirect("/");
  }

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "desc",
        }
      }
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
    job.price ,
    job.categoryId ,
    job.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean);


  return (
    <>
    {!job.isPublished && (
      <Banner 
        label="This job is unpublished. It will not be visible to the freelancers"
         />
    )}
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
        {/*Add Actions Here */}
        <Actions
          disabled={!isComplete}
          jobId={params.jobId}
          isPublished={params.isPublished}
           />
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
        <div className="space-y-6">
           <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-2xl">Job Chapters</h2>
            </div>
            <ChaptersForm
              initialData={job}
              jobId={job.id}
          />
          </div> 

          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-2xl">Project Budget </h2>
          </div>
          <PriceForm
            initialData={job}
            jobId={job.id}
           />
        </div>
      </div>
    </div>
    </>
  );
}

export default JobIdPage