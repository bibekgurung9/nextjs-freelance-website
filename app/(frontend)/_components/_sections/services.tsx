import React from 'react'
import Image from 'next/image'
import { images } from '@/constants'

const Services = () => {
    return (
    <div className='w-full flex xl:flex-row flex-col justify-center gap-10 max-container'>
        <h1 className='text-4xl font-bold text-center text-blue-500'>Services Commonly Searched At Freelance Nepal</h1> 
        <br />
        <div className='flex flex-row gap-2 justify-center items-start w-full'>
            {images.map((image, index) => (
            <div key={index} className='flex flex-col justify-center items-center lg:m-4 bg-blue-300'>
                <a href={image.link} className='text-center'>
                <Image src={image.src} alt={image.alt} height={150} width={150}/>
                <span className='pt-2 font-bold '>{image.alt}</span>
                </a>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Services