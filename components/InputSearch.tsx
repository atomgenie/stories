import classname from "classnames"

interface InputSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const InputSearch: React.FC<InputSearchProps> = props => {
  const { onChange, value, placeholder, className } = props

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={classname(
        "rounded-lg px-4 py-2 bg-gray-700 outline-none hover:bg-gray-600 focus:bg-white focus:text-gray-900 text-gray-200 border-4 border-transparent focus:border-gray-300",
        className,
      )}
      placeholder={placeholder}
    />
  )
}
