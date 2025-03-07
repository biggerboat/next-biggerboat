import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LighthouseProps {
  className?: string
}

export default function Lighthouse({ className = '' }: LighthouseProps) {
  return (
    <div className={cn(
      'w-[763px] h-[683px]',
      className
    )}>
      <Image 
        src="/lighthouse.png" 
        alt="Lighthouse" 
        fill
        className="object-contain hidden lg:block"
        priority
      />
    </div>
  )
} 
