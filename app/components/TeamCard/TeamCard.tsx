import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { getFlagUrl } from '~/utils/getFlagUrl'

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
  const special = name === 'FWC'
  return (
    <Link to={`/team/${name}`}>
      <article className="group relative flex min-h-[150px] flex-col gap-2.5 overflow-hidden rounded-lg border-2 border-transparent bg-slate-800 p-4 shadow-md hover:border-gray-500">
        <img
          src={getFlagUrl(name)}
          alt={name}
          className="absolute top-1/3 left-0 w-full scale-125 opacity-30 blur-2xl transition-[top] hover:animate-pulse group-hover:-top-2"
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
          {!special && <img src={getFlagUrl(name)} alt={name} className="w-16 drop-shadow-lg" />}
        </div>
      </article>
    </Link>
  )
}
