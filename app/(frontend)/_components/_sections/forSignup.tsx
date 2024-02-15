import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ForSignup = () => {
  return (
    <section
    id="home"
    className='w-full grid grid-cols-1 md:grid-cols-2 justify-center min-h-scree gap-12 px-8'>
        <div className=''>
          <h1 className='font-sans text-5xl font-bold '>In Search For Freelancers?</h1>
          <div className='relative flex flex-col justify-center items-start w-full'>
          <p className='mt-4 text-3xl font-bol'>Hire one of the best talents in the industry.<br />If you don't have already have an account with us, you can sign up from here.</p>
            <div className='flex gap-8 mt-6'>
              <Link href={'/job'}>
                  <Button size='lg' variant='main'>Sign Up As A Client</Button>
              </Link>
            </div>       
          </div>
        </div>

        <div className=''>
          <h1 className=' text-black font-sans text-5xl font-bold '>In Search For Freelancing Work?</h1>
          <div className='relative flex flex-col justify-center items-start w-full text-black'>
          <p className='mt-4 text-3xl font-boldbg-slate-200 text-black'>Showcase your talents to potential employers.<br />If you don't have already have an account with us, you can sign up from here.</p>
          <div className='flex gap-8 mt-6'>
              <Link href={'/search'}>
                <Button size='lg' variant='main'>Sign Up As A Freelancer</Button>
              </Link>
          </div>
          </div>
        </div>

</section>
  )
}

export default ForSignup;