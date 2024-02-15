import React from 'react'
import { Button } from '@/components/ui/button'
import { statistics } from '@/constants'
import Link from 'next/link'


const Hero = () => {
  return (
<section
    id="home"
    className='w-full flex xl:flex-row flex-col justify-center'>
        <div className='relative px-8 flex flex-col justify-center items-start w-full py-24'>
          <p className='text-6xl font-bold font-mono'>Welcome to <span className='text-blue-500'>Freelance Nepal!</span></p>
          <h1 className=' text-black text-5xl font-bold mt-4'>Find The Talent or Work You Deserve</h1>
          <p className=' text-black text-3xl font-bold py-6'>Find a Client. Find a Freelancer. Find The Best. Do Your Best.</p>
          
          <div className='flex gap-8 mt-6'>
            <Link href={''}>
              <Button size='lg' variant='main'>I'm a Freelancer</Button>
            </Link>
            <Link href={''}>
              <Button size='lg' variant='main'>I'm a Client</Button>
            </Link>
          </div>
            <div className='flex justify-start items-start flex-wrap w-full mt-4 gap-16'>
            {statistics.map((stat) => (
              <div key={stat.label} className='mt-1'>
                <p className=' text-black text-2xl font-bold '>{stat.value}</p>
                <p className=' text-black text-xl font-bold'>{stat.label}</p>
              </div>
            ))}
            </div>
        </div>
  </section>
  )
}

export default Hero

