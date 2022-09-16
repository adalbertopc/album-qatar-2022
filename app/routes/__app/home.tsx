import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link, useLoaderData, useTransition } from '@remix-run/react'
import { getUser, requireUserId } from '~/services/auth.server'
import { getGroupsWithTeamsAndUserStickers } from '~/services/group.server'
import { GroupCard } from '~/components'
import clsx from 'clsx'

export async function loader({ request }: DataFunctionArgs) {
  await requireUserId(request)
  const user = await getUser(request)
  if (!user) return redirect('/login')
  const groups = await getGroupsWithTeamsAndUserStickers(user.id)
  return groups
}

type LoaderType = typeof loader

export default function Index() {
  const groups = useLoaderData<LoaderType>()

  return (
    <div className="container mx-auto">
      <div className="mb-4 text-white">
        <h1 className="mb-4 font-display text-4xl font-bold leading-tight">Mi colección</h1>
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
      <div className="grid gap-8 md:grid-cols-2">
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
              className={clsx({ 'order-first': group.name === 'FWC' })}
            />
          )
        })}
      </div>
    </div>
  )
}
