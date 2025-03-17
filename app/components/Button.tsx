import { FC } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  url: string
  label: string
  className?: string
}

const Button: FC<ButtonProps> = ({ url, label, className }) => {
  return (
    <div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-center inline-block mb-2 bg-white border-2 no-underline border-black rounded-full px-4 py-1 shadow-lg hover:bg-biggerboat-yellow transition-colors duration-200",
          className
        )}
      >
        {label}
      </a>
    </div>
  )
}

export default Button 
