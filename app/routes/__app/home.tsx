import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link, useLoaderData, useTransition } from '@remix-run/react'
import { getUser, requireUserId } from '~/services/auth.server'
import { getGroupsWithTeamsAndUserStickers } from '~/services/group.server'
import { GroupCard } from '~/components'

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
      <h1 className="text-4xl font-semibold leading-tight ">Mi colección 📄</h1>
      <h2 className="text-xl font-medium">Estampas obtenidas.</h2>
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
            />
          )
        })}
      </div>
    </div>
  )
}
