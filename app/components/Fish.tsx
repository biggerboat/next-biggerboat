"use client"

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

type Direction = 'left' | 'right'

interface FishProps {
  baseImagePath: string
  speed?: number
  delay?: number
  yPosition?: number
}

export default function Fish({ baseImagePath, speed = 0.1, delay = 0, yPosition = 50 }: FishProps) {
  const [position, setPosition] = useState(-100)
  const [verticalOffset, setVerticalOffset] = useState(0)
  const [direction, setDirection] = useState<Direction>('right')
  const animationTimeRef = useRef(0)

  useEffect(() => {
    let startTime: number | null = null
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / 1000
      
      setVerticalOffset(Math.sin(progress * 1.5) * 15)
      
      setPosition((prev) => {
        const windowWidth = window.innerWidth
        const newPosition = direction === 'right' ? prev + speed : prev - speed

        if (newPosition > windowWidth + 100) {
          setDirection('left')
          return windowWidth + 100
        }
        if (newPosition < -100) {
          setDirection('right')
          return -100
        }
        return newPosition
      })

      animationTimeRef.current = requestAnimationFrame(animate)
    }

    const timeout = setTimeout(() => {
      animationTimeRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (animationTimeRef.current) {
        cancelAnimationFrame(animationTimeRef.current)
      }
    }
  }, [direction, speed, delay])

  return (
    <div style={{ 
      position: 'absolute', 
      top: `${yPosition}px`,
      transform: `translate(${position}px, ${verticalOffset}px)`,
      transition: 'all 0.05s linear'
    }}>
      <img
        src={`${baseImagePath}_${direction}.png`}
        alt="fish"
      />
    </div>
  )
} 
