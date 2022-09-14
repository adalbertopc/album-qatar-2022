import { Link, Form, useLoaderData, useParams } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { getUser } from '~/utils/auth.server'

import { isValidCollection } from '~/utils/isValidCollection'
import {
  getStickersByTeamNameAndUserId,
  subtractOneToUserSticker,
  sumOneToUserSticker,
} from '~/utils/sticker.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request)

  if (!user) {
    return redirect('/auth/login')
  }
  const collection = params.slug
  const isValid = isValidCollection(collection)
  if (!isValid) {
    return redirect('/collection')
  }

  const stickers = await getStickersByTeamNameAndUserId(collection, user.id)
  return stickers
}

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request)
  if (!user) {
    return redirect('/auth/login')
  }
  const formData = await request.formData()
  const values = Object.fromEntries(formData)

  if (values._action === 'add') {
    return await sumOneToUserSticker(user.id, values.sticker_id)
  }

  if (values._action === 'remove') {
    return await subtractOneToUserSticker(user.id, values.sticker_id)
  }
}

export default function Slug() {
  const { slug } = useParams()
  const stickers = useLoaderData()
  console.log(stickers)

  return (
    <div>
      <h1 className="text-4xl font-semibold">Equipo {slug}</h1>
      <Link to="/collection">Back to collection</Link>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stickers.map(sticker => {
          return (
            <div
              key={sticker.id}
              className="group relative flex h-52 w-40 items-center justify-center rounded-xl p-5 shadow-sm  transition-transform hover:scale-105"
            >
              <div className="text-center">
                <span className="block text-2xl font-bold">{sticker.team.name}</span>
                <span className="mt-3 block text-3xl font-bold">{sticker.number}</span>
                <div className="absolute left-1/2 bottom-4 flex -translate-x-1/2 items-center justify-center gap-4 md:hidden md:group-hover:flex">
                  <Form method="post">
                    <input type="hidden" name="sticker_id" value={sticker.id} />
                    <button
                      name="_action"
                      value="add"
                      className="rounded-lg bg-green-600 transition-all hover:scale-105 hover:bg-green-700"
                    >
                      <PlusIcon width={30} height={30} className="fill-white" />
                    </button>
                  </Form>
                  <Form method="post">
                    <input type="hidden" name="sticker_id" value={sticker.id} />
                    <button
                      name="_action"
                      value="remove"
                      className="rounded-lg bg-red-600 transition-all hover:scale-105 hover:bg-red-700"
                    >
                      <MinusIcon width={30} height={30} className="fill-white" />
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
