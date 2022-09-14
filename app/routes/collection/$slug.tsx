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
import { Sticker } from '~/components'
import { useState } from 'react'

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

  // when update the quantity of a sticker, only the quantity is updated
  // the rest of the stickers are not updated
  // so we need to update the quantity of the sticker in the array
  // to make the quantity update without refreshing the page

  return (
    <div>
      <h1 className="text-4xl font-semibold">Equipo {slug}</h1>
      <Link to="/collection">Back to collection</Link>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stickers.map(sticker => {
          return (
            <Sticker
              key={sticker.id}
              id={sticker.id}
              name={sticker.name}
              team={slug}
              quantity={sticker.quantity}
              number={sticker.number}
              showButtons
            />
          )
        })}
      </div>
    </div>
  )
}
