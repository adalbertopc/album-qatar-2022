import clsx from 'clsx'

interface InputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
  error?: string
  min?: number
  max?: number
  defaultValue?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  className,
  error,
  min,
  max,
  defaultValue,
}) => {
  return (
    <label className={clsx(className, 'flex flex-col')}>
      <span className="mb-2 text-sm font-medium text-gray-400">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="rounded-lg bg-gray-800 p-2 placeholder:text-sm"
        min={min}
        max={max}
        defaultValue={defaultValue}
      />
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </label>
  )
}
