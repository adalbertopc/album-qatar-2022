import type { DataFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '~/services/auth.server'
import { getUsersWithMostUniqueStickers } from '~/services/user.server'

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)

  if (!user) {
    return redirect('/login')
  }

  const users = await getUsersWithMostUniqueStickers()

  return json(users)
}

type LoaderData = typeof loader

export const meta: MetaFunction = () => {
  return {
    title: 'Ranking de usuarios',
    description: 'Ranking de usuarios',
  }
}

export default function Ranking() {
  const users = useLoaderData<LoaderData>()
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-4 text-white">
          <h1 className="text-4xl font-semibold leading-tight ">Ranking de usuarios 👑</h1>
          <h2 className="text-xl font-medium">
            Lista con el top 25 de usuarios con más stickers únicos registrados en la plataforma.
          </h2>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="bg-slate-700 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    #
                  </th>
                  <th className="bg-slate-700 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Usuario
                  </th>
                  <th className="bg-slate-700 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.username} className="bg-slate-800 text-white">
                    <td className="px-5 py-5 text-sm">{index + 1}</td>
                    <td className="px-5 py-5 text-sm">{user.username}</td>
                    <td className="px-5 py-5 text-sm">{user.uniqueStickers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
