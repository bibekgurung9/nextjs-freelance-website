import { auth } from '@clerk/nextjs';
import { Chapter, Job } from '@prisma/client'
import { redirect } from 'next/navigation';
import React from 'react'

interface JobSidebarProps {
  job: Job & {
    chapters: Chapter[]
  };
}

const JobSidebar = ({ job }: JobSidebarProps) => {
  const { userId } = auth()
    
  if(!userId){
    return redirect("/");
  }

  return (
    <div>JobSidebar</div>
  )
}

export default JobSidebar