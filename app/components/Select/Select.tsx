interface SelectProps {
  label: string
  name: string
  firstOption: string
  options: {
    value: string
    label: string
  }[]
  className?: string
}

export const Select: React.FC<SelectProps> = ({ label, name, firstOption, options, className }) => (
  <div className={className}>
    <label htmlFor="teams" className="mb-2 block text-sm font-medium text-gray-400">
      {label}
    </label>
    <select
      name={name}
      id="teams"
      className="block w-full rounded-lg bg-gray-800 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500"
    >
      <option selected>{firstOption}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)
