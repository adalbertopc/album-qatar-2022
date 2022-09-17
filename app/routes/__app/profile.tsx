import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { Sticker } from '~/components'
import { useUser } from '~/hooks/useUser'
import { getUser, requireUserId } from '~/services/auth.server'
import { getUserLastStickers } from '~/services/user.server'

export async function loader({ request }: DataFunctionArgs) {
  // const stickers = await getUserLastStickers(await requireUserId(request))
  // return json(stickers)
  return json('hola')
}

type LoaderData = typeof loader

export default function Profile() {
  // const stickers = useLoaderData<LoaderData>()
  const user = useUser()
  console.log('user', user)
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-2xl text-white">{user.username}</h1>
      <h1 className="text-white">{user.favoriteTeam}</h1>
      <Link replace to="/profile/edit">
        Edit
      </Link>
      {/* <div className="py-8">
        <div className="mb-4 text-white">
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight">Mi Perfil</h1>
          <h2>Usuario: {user.username}</h2>
          <Link replace to="/profile/edit">
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="mb-4 font-display text-2xl font-bold leading-tight">
              Stickers recientes
            </h3>
            <div className="grid grid-cols-fluid">
              {stickers.map(({ addedAt, sticker }) => {
                return (
                  <Sticker
                    key={sticker.id}
                    id={sticker.id}
                    team={sticker.team?.name}
                    name={sticker.name}
                    number={sticker.number}
                  />
                )
              })}
            </div>
          </div>
          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="mb-4 font-display text-2xl font-bold leading-tight">Estadísticas</h3>
            <div className="grid grid-cols-fluid">
              <div className="text-white">
                <h4 className="mb-4 font-display text-2xl font-bold leading-tight">
                  Total de stickers
                </h4>
                <p>Stickers obtenidos: 0</p>
                <p>Stickers faltantes: 0</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Outlet />
    </div>
  )
}
