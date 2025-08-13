import CTASection from '@/AppComponents/Home/CTASection'
import FeaturesSection from '@/AppComponents/Home/FeaturesSection'
import Features from '@/AppComponents/Home/FeaturesSection'
import Hero from '@/AppComponents/Home/Hero'
import HowItWorks from '@/AppComponents/Home/HowItWorks'
import StatsSection from '@/AppComponents/Home/StatsSection'
import Testimonials from '@/AppComponents/Home/Testimonials'
import React from 'react'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeaturesSection/>
        <HowItWorks/>
        <StatsSection/>
        <Testimonials/>
        <CTASection/>
    </>
  )
}

export default Home