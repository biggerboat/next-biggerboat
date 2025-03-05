import { FC } from 'react'

interface ButtonProps {
  url: string
  label: string
}

const Button: FC<ButtonProps> = ({ url, label }) => {
  return (
    <div >
      <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-center inline-block mb-2 bg-white border-2 no-underline border-black rounded-full px-4 py-1 shadow-lg hover:bg-biggerboat-yellow transition-colors duration-200"
    >
      {label}
    </a>
    </div>
  )
}

export default Button 
