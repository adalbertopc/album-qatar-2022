import clsx from 'clsx'

interface InputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  className?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  className,
  error,
}) => {
  return (
    <label className={clsx(className, 'flex flex-col')}>
      <span className="mb-2 text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border p-2 placeholder:text-sm"
      />
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </label>
  )
}
