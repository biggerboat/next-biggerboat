import { TextareaHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError
  errorMessage?: string
  label?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, errorMessage, label, className = '', id, ...props }, ref) => {
    // Use the provided id, or the label as id (with spaces removed)
    const textareaId = id || (label && label.replace(/\s+/g, ''))
    
    return (
      <div>
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full p-2 border rounded h-32 ${className}`}
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

TextArea.displayName = 'TextArea'

export default TextArea 
