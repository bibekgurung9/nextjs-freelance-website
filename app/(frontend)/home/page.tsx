import React from 'react'
import Hero from '../_components/_sections/hero'
import Testimonial from '../_components/_sections/testimonial'
import ForSignup from '../_components/_sections/forSignup'
import Footer from '@/components/footer'

const HomePage = () => {
  return (
    <main className="relative">
        <section className="">
            <Hero />
            <ForSignup />
            <Testimonial />
            <Footer />
        </section>
    </main>
  )
}

export default HomePage