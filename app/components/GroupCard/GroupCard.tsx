import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { countries } from '~/constants/countries'

interface GroupCardProps {
  name: string
  teams: {
    name: string
    totalStickers: number
    collectedStickers: number
  }[]
}

export const GroupCard: React.FC<GroupCardProps> = ({ name, teams }) => {
  return (
    <div className="">
      {/* Style group title */}
      <h3 className="mb-4 text-2xl font-semibold text-white">Grupo: {name}</h3>
      <div className="grid gap-8 md:grid-cols-2">
        {teams.map(team => {
          return (
            <Link key={team.name} to={`/team/${team.name}`}>
              <div className="relative flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-transparent bg-slate-800 p-4 shadow-md hover:border-gray-500">
                <div className="flex flex-col items-center justify-center space-y-2 text-white">
                  <h3 className="text-lg font-bold">{team.name}</h3>
                  <img
                    src={`https://img.icons8.com/color/48/000000/${
                      countries[team.name.toLowerCase()]?.name
                    }.png`}
                    alt={team.name}
                  />
                  <div className="absolute top-2 right-4 flex items-center justify-center text-sm">
                    <p className="text-lg font-bold">{team.collectedStickers}</p>
                    <p className="text-lg font-medium">/</p>
                    <p className="text-lg font-medium">{team.totalStickers}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
