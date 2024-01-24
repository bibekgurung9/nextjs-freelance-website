import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const JobPage = () => {
  return (
    <div>
      <Link href="/client/create">
      <Button className='m-4'>
        Add New Jobs
      </Button>
      </Link>
    </div>
  )
}

export default JobPage