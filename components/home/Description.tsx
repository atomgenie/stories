import { Config } from "@helpers/config/config-types"

interface DescriptionProps {
  description: Required<Config>["description"]
}

export const Description: React.FC<DescriptionProps> = props => {
  const { description } = props

  return (
    <div className="p-4">
      <div className="rounded-lg bg-gray-800 text-white px-4 py-4 text-sm">
        {description}
      </div>
    </div>
  )
}
