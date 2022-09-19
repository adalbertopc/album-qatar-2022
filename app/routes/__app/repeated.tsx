import type { ActionFunction, DataFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Sticker } from '~/components'
import { requireUserId } from '~/services/auth.server'
import { subtractOneToUserSticker, sumOneToUserSticker } from '~/services/sticker.server'
import { getUserRepeatedStickers } from '~/services/user.server'

export async function loader({ request }: DataFunctionArgs) {
  const stickers = await getUserRepeatedStickers(await requireUserId(request))
  return json(stickers)
}

type LoaderData = typeof loader

export const meta: MetaFunction = () => ({
  title: 'Stickers repetidos',
})

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const values = Object.fromEntries(formData)
  const userId = await requireUserId(request)

  if (values._action === 'add') {
    return await sumOneToUserSticker(userId, values.sticker_id)
  }

  if (values._action === 'remove') {
    return await subtractOneToUserSticker(userId, values.sticker_id)
  }
}

export default function Repeated() {
  const stickers = useLoaderData<LoaderData>()

  return (
    <div className="container mx-auto">
      <div className="mb-4 text-white">
        <h1 className="mt-5 mb-2 flex items-center gap-2 font-display text-3xl font-bold leading-tight md:text-4xl">
          Mis stickers repetidos
        </h1>
      </div>
      <hr className="border-t-2 border-dotted border-slate-700" />
      <div className="mt-4 grid gap-4 md:grid-cols-fluid">
        {stickers?.map(sticker => {
          return (
            <div key={sticker.stickerId}>
              <Sticker
                id={sticker.stickerId}
                showButtons
                number={sticker.sticker.number}
                name={sticker.sticker.name}
                team={sticker.sticker.team?.name}
                quantity={sticker.quantity}
              />
              <p className="mt-1 text-center text-sm text-gray-300">{sticker.quantity} veces</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
