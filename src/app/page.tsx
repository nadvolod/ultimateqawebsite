import { Hero } from '@/components/sections/Hero'
import { WhatWeBuild } from '@/components/sections/WhatWeBuild'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { WhyUltimateQA } from '@/components/sections/WhyUltimateQA'
import { Process } from '@/components/sections/Process'
import { SocialProof } from '@/components/sections/SocialProof'
import { EducationNewsletter } from '@/components/sections/EducationNewsletter'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <FeaturedWork />
      <WhyUltimateQA />
      <Process />
      <SocialProof />
      <EducationNewsletter />
      <FinalCTA />
    </>
  )
}
