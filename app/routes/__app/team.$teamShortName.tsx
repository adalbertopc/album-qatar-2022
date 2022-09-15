import { Link, useLoaderData, useParams } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { getUser } from '~/services/auth.server'

import { isValidCollection } from '~/utils/isValidCollection'
import {
  getStickersByTeamNameAndUserId,
  subtractOneToUserSticker,
  sumOneToUserSticker,
} from '~/services/sticker.server'
import { Sticker } from '~/components'

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request)

  if (!user) {
    return redirect('/login')
  }
  const teamShortName = params.teamShortName
  const isValid = isValidCollection(teamShortName)
  if (!isValid) {
    return redirect('/home')
  }

  const stickers = await getStickersByTeamNameAndUserId(teamShortName, user.id)
  return stickers
}

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request)
  if (!user) {
    return redirect('/login')
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
  const { teamShortName } = useParams()
  const stickers = useLoaderData()

  return (
    <div>
      <h1 className="text-4xl font-semibold">Equipo {teamShortName}</h1>
      <Link to="/home">Back to collection</Link>
      <div className="grid gap-4 md:grid-flow-col-dense">
        {stickers.map(sticker => {
          return (
            <Sticker
              key={sticker.id}
              id={sticker.id}
              name={sticker.name}
              team={teamShortName}
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
