import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}
export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  disabled,
  onClick,
  variant = 'primary',
  size = 'md',
}) => {
  return (
    <button
      type={type}
      className={clsx(
        className,
        'rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4 py-3 font-medium text-white transition-all hover:brightness-105',
        {
          'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500': variant === 'primary',
          'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500': variant === 'secondary',
          'px-4 py-3 text-sm': size === 'sm',
          'px-6 py-4 text-base': size === 'md',
          'px-8 py-5 text-lg': size === 'lg',
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
