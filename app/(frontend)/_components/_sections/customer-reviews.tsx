import React from 'react'
import { reviews } from '@/constants'
import Image from 'next/image'
import  star  from '@/app/favicon.ico';

//logic for adding reviews of starts
const renderRating = (rating: number) => {
  const stars = []
  for(let i =0; i < rating; i++){
    stars.push(
      <Image key={i} src={star} alt='stars' width={20} height={20} />
    )
  }
  return stars;
}

const CustomerReviews = () => {
  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='font-bold text-4xl mb-4'>Our Customer Reviews</h1>
      <div className='flex flex-row items-center'>
        {reviews.map((review, index) => (
          <div key={index} className='flex flex-col justify-center items-center border rounded p-4 m-4 mt-6 bg-slate-200'>
            <Image src={review.src} alt={''} width={100} height={100} />
            <h1 className='font-bold text-3xl text-center mt-4'>{review.name}</h1>
            <p className='text-center mt-4'>{review.description}</p>
            <div className='flex gap-x-1 mt-4'>{renderRating(review.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerReviews