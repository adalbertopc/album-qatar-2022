import { json, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link, useLoaderData, useTransition } from '@remix-run/react'
import clsx from 'clsx'
import { getUser, requireUserId } from '~/utils/auth.server'
import { getGroupsWithTeamsAndUserStickers } from '~/utils/group.server'
import { colors } from '~/constants/colors'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  const user = await getUser(request)
  if (!user) return redirect('/auth/login')
  const groups = await getGroupsWithTeamsAndUserStickers(user.id)
  return groups
}

export default function Index() {
  const groups = useLoaderData()

  const transtion = useTransition()

  if (transtion.state === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-4xl font-semibold">Mi colección</h1>
      <h3 className="text-lg font-medium">Estampas obtenidas: 0 / 680</h3>
      <div className="grid gap-8 md:grid-cols-2">
        {groups.map(group => {
          return (
            <div
              key={group.id}
              className={clsx(
                {
                  [colors.groups[group.name]]: true,
                },
                'rounded-xl p-4 text-white'
              )}
            >
              <h3 className="mb-2 text-xl font-semibold">Grupo: {group.name}</h3>
              <div className="grid gap-2 md:grid-cols-2">
                {group.teams.map(team => {
                  return (
                    <Link key={team.id} to={`/collection/${team.name}`}>
                      <div className="cursor-pointer rounded-md border-2 border-opacity-50 p-2 tracking-wider shadow-lg transition-transform hover:scale-105">
                        {team.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
