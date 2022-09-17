interface SelectProps {
  label: string
  name: string
  firstOption: string
  options: {
    value: string
    label: string
  }[]
  className?: string
  defaultValue?: string
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  firstOption,
  options,
  defaultValue,
  className,
}) => (
  <div className={className}>
    <label htmlFor="teams" className="mb-2 block text-sm font-medium text-gray-400">
      {label}
    </label>
    <select
      name={name}
      id="teams"
      className="block w-full rounded-lg bg-gray-800 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
      defaultValue={defaultValue}
    >
      <option>{firstOption}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)
