import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Sticker } from '~/components'
import { getUser } from '~/services/auth.server'
import { getUserLastStickers } from '~/services/user.server'

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)

  if (!user) {
    return redirect('/login')
  }

  const stickers = await getUserLastStickers(user.id)

  return json({
    stickers,
    user,
  })
}

type LoaderData = typeof loader

export default function Profile() {
  const { stickers, user } = useLoaderData<LoaderData>()
  console.log(stickers, user)
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="mb-4 text-white">
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight">Mi Perfil</h1>
          <h2>Usuario: {user.username}</h2>
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
      </div>
    </div>
  )
}
