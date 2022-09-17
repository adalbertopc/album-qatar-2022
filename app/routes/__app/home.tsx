import type { DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '~/services/auth.server'
import { getGroupsWithTeamsAndUserStickers } from '~/services/group.server'
import { GroupCard } from '~/components'
import clsx from 'clsx'

export async function loader({ request }: DataFunctionArgs) {
  const groups = await getGroupsWithTeamsAndUserStickers(await requireUserId(request))
  return groups
}

type LoaderType = typeof loader

export default function Index() {
  const groups = useLoaderData<LoaderType>()

  return (
    <div className="container mx-auto">
      <div className="mb-4 text-white">
        <h1 className="mt-5 mb-2 font-display text-3xl font-bold leading-tight sm:text-5xl">
          Mi colección
        </h1>
        <h2 className="text-lg font-medium">
          Stickers obtenidos:{' '}
          {groups.reduce((acc, group) => {
            return (
              acc +
              group.teams.reduce((acc, team) => {
                return acc + team.stickers
              }, 0)
            )
          }, 0)}
        </h2>
      </div>
      <hr className="border-t-2 border-dotted border-slate-700" />
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {groups.map(group => {
          return (
            <GroupCard
              key={group.id}
              name={group.name}
              teams={group.teams.map(team => {
                return {
                  name: team.name,
                  totalStickers: team._count.stickers,
                  collectedStickers: team.stickers,
                }
              })}
              className={clsx({
                'order-last': group.name === 'SPECIAL',
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
