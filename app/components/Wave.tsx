import { cn } from '@/lib/utils'

interface WaveProps {
  position: "front" | "back"
  className?: string
}

export default function Wave({ position, className = "" }: WaveProps) {
  return (
    <div className={cn(
      'absolute w-full h-12 bg-repeat-x',
      position === "front" ? "animate-wave-front" : "animate-wave-back",
      position === "front" ? "right-0" : "left-0",
      "bg-[url('/background-wave.png')]",
      className
    )} />
  );
} 
