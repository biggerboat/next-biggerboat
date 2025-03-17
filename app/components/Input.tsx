import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  errorMessage?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorMessage, label, className = '', id, ...props }, ref) => {
    // Use the provided id, or the label as id (with spaces removed)
    const inputId = id || (label && label.replace(/\s+/g, ''))
    
    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn('w-full p-2 border rounded', className)}
          {...props}
        />
        {error && (
          <span className="text-red-500">
            {errorMessage || 'This field is required'}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input 
