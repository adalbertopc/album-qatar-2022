import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useLoaderData, useParams } from '@remix-run/react'
import { Link } from 'react-router-dom'
import { prisma } from '~/lib/db.server'
import { getUser } from '~/utils/auth.server'

import { isValidCollection } from '~/utils/isValidCollection'
import {
  getStickersByTeamName,
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

  const stickers = await getStickersByTeamName(collection)
  return json(stickers)
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

  return (
    <div>
      <h1 className="text-4xl font-semibold">Equipo {slug}</h1>
      <Link to="/collection">Back to collection</Link>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stickers.map(sticker => {
          return (
            <div
              key={sticker.id}
              className="flex h-52 w-40 items-center justify-center rounded-xl p-5 shadow-sm transition-transform  hover:scale-105"
            >
              <div className="text-center">
                <span className="block text-2xl font-bold">{sticker.team.name}</span>
                <span className="mt-4 block text-3xl font-bold">{sticker.number}</span>
                <Form method="post">
                  <input type="hidden" name="sticker_id" value={sticker.id} />
                  <button name="_action" value="add">
                    +
                  </button>
                </Form>
                <Form method="post">
                  <input type="hidden" name="sticker_id" value={sticker.id} />
                  <button name="_action" value="remove">
                    -
                  </button>
                </Form>
                {/* <span> cantidad: {3}</span> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
