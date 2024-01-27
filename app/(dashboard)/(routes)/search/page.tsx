import { db } from '@/lib/db'
import React from 'react'
import { Categories } from './_components/categories'
import { SearchInput } from '@/components/search-input'
import { getJobs } from '@/actions/get-jobs'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { JobsList } from '@/components/jobs-list'

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const SearchPage = async ({searchParams}:SearchPageProps) => {
  const { userId } = auth();
  if(!userId){
    return redirect("/");
  }

  const categories  = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  const jobs = await getJobs({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6'>
        <Categories 
          items={categories}/>
        <JobsList 
          items={jobs}/>
      </div>
    </>
  )
}

export default SearchPage