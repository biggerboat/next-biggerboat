import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BoatProps {
  className?: string
}

export default function Boat({ className = "" }: BoatProps) {
  return (
    <div className={cn(
      'w-[479px] h-[330px] animate-float max-w-full max-h-[50vh] self-end',
      className
    )}>
      <Image
        src="/boat.png"
        alt="Boat"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
} 
