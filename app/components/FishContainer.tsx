"use client"

import { useState } from 'react'
import Fish from './Fish'
import { cn } from '@/lib/utils'

export default function FishContainer() {
  const [speedMultiplier] = useState(1)

  return (
    <>
      <div className={cn("absolute inset-0 w-full overflow-hidden h-screen z-0 top-[700px] pointer-events-none")}>
        <Fish baseImagePath="/fishes/fish1" delay={0} yPosition={120} speed={0.8 * speedMultiplier} />
        <Fish baseImagePath="/fishes/fish2" delay={2000} yPosition={440} speed={1.0 * speedMultiplier} />
        <Fish baseImagePath="/fishes/fish3" delay={1000} yPosition={800} speed={1.2 * speedMultiplier} />
        <Fish baseImagePath="/fishes/shark" delay={3000} yPosition={1280} speed={0.5 * speedMultiplier} />
      </div>
    </>
  )
}
