import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { ChapterTitleForm } from './_components/chapter-title-form';

const ChapterId = async (
  { params } : {
    params: { jobId : string; chapterId: string}
  }) => {

    const { userId } = auth()
    if(!userId){
      return redirect("/");
    }
    
    const chapter = await db.chapter.findUnique({
      where : {
        id: params.chapterId,
        jobId: params.jobId,
      },
      include: {
      MuxData: true,
      }
    })

    if(!chapter){
      return redirect("/");
    }

    const requiredFields = [
      chapter.title,
      chapter.description,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='w-full'>
          <Link 
            href={`/client/jobs/${params.jobId}`}
            className='flex items-center text-sm hover:opacity-75 transition mb-6'
            >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to job setup
          </Link>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-2xl font-medium'>
                Chapter Creation
              </h1>
              <span className="text-sm text-slate-700">Complete All Fields {completionText}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div className='space-y-4 '>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard}/>
              <h2  className='text-xl'>Customize Your Chapters</h2>
            </div>
          </div>
          {/* Chapter Title Form*/}
          <ChapterTitleForm
            initialData={chapter}
            jobId={params.jobId}
            chapterId={params.chapterId} />
        </div>
      </div>
    </div>
  )
}

export default ChapterId