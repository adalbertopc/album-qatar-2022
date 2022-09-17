import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { teamsData } from '~/constants/teams'

interface TeamCardProps {
  name: string
  totalStickers: number
  collectedStickers: number
  className?: string
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  totalStickers,
  collectedStickers,
  className,
}) => {
  const special = name === 'FWC' || name === 'STADIUMS'
  return (
    <Link to={`/team/${name}`}>
      <article className="group relative flex min-h-[150px] flex-col gap-2.5 overflow-hidden rounded-lg border-2 border-transparent bg-slate-800 p-4 shadow-md hover:border-gray-500">
        <img
          src={`https://img.icons8.com/color/48/000000/${teamsData[name.toLowerCase()]?.name}.png`}
          alt={name}
          className="absolute top-1/3 left-0 w-full scale-125 opacity-30 blur-2xl transition-[top] group-hover:-top-2 group-hover:animate-pulse"
        />

        <div className="flex justify-between text-white">
          <h2 className="text-lg font-bold">{name}</h2>
          <div className="flex items-center justify-center text-sm">
            <p className="text-lg font-bold">{collectedStickers}</p>
            <p className="text-lg font-medium">/</p>
            <p className="text-lg font-medium">{totalStickers}</p>
          </div>
        </div>
        <div className="grid h-full place-items-center">
          {!special && (
            <img
              src={`https://img.icons8.com/color/48/000000/${
                teamsData[name.toLowerCase()]?.name
              }.png`}
              alt={name}
              className="w-16 drop-shadow-lg"
            />
          )}
        </div>
      </article>
    </Link>
  )
}
