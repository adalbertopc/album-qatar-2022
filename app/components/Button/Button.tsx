import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
}
export const Button: React.FC<ButtonProps> = ({ children, type, className, disabled, onClick }) => {
  return (
    <button
      type={type}
      className={clsx(
        className,
        'rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
