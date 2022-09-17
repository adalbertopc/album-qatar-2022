import { TeamCard } from '~/components'

interface GroupCardProps {
  name: string
  teams: {
    name: string
    totalStickers: number
    collectedStickers: number
  }[]
  className?: string
}

export const GroupCard: React.FC<GroupCardProps> = ({ name, teams, className }) => {
  return (
    <div className={className}>
      <h3 className="mb-4 rounded-lg bg-slate-800 p-2 text-center text-2xl font-semibold text-white">
        Grupo: {name}
      </h3>
      <div className="grid grid-cols-2 gap-8">
        {teams.map(team => (
          <TeamCard
            key={team.name}
            name={team.name}
            totalStickers={team.totalStickers}
            collectedStickers={team.collectedStickers}
          />
        ))}
      </div>
    </div>
  )
}
