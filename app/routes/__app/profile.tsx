import { PencilSquareIcon } from '@heroicons/react/20/solid'
import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { Sticker } from '~/components'
import { useUser } from '~/hooks/useUser'
import { requireUserId } from '~/services/auth.server'
import { getUserLastStickers } from '~/services/user.server'
import { getFlagUrl } from '~/utils/getFlagUrl'

export async function loader({ request }: DataFunctionArgs) {
  const stickers = await getUserLastStickers(await requireUserId(request))
  return json(stickers)
}

type LoaderData = typeof loader

export default function Profile() {
  const stickers = useLoaderData<LoaderData>()
  const user = useUser()
  return (
    <div className="">
      <div className="container mx-auto">
        <div className="mb-4 text-white">
          <h1 className="mt-5 mb-2 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Perfil
          </h1>
          <h2 className="mt-4 flex items-center gap-4 text-3xl font-medium">
            {user?.favoriteTeam && (
              <img src={getFlagUrl(user.favoriteTeam)} alt={user.favoriteTeam} />
            )}
            {user?.username}
            <Link to="/profile/edit" className="flex items-center gap-2 text-sm">
              <PencilSquareIcon className="w-4" /> Editar
            </Link>
          </h2>
        </div>
        <hr className="border-t-2 border-dotted border-slate-700" />
        <h3 className="my-4 text-lg text-white">Últimos stickers obtenidos</h3>
        <div className="grid gap-4 md:grid-cols-fluid">
          {stickers.map(sticker => {
            return (
              <div key={sticker.stickerId}>
                <Sticker
                  id={sticker.stickerId}
                  showButtons={false}
                  number={sticker.sticker.number}
                  name={sticker.sticker.name}
                  team={sticker.sticker.team?.name}
                  variant="small"
                  quantity={sticker.quantity}
                />
                <p className="text-center text-sm text-gray-300">
                  {' '}
                  {new Date(sticker.addedAt).toLocaleDateString()}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
