import { useLoaderData } from '@remix-run/react'
import type { ActionFunction, DataFunctionArgs, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { requireUserId } from '~/services/auth.server'

import { isValidCollection } from '~/utils/isValidCollection'
import {
  getStickersByTeamNameAndUserId,
  subtractOneToUserSticker,
  sumOneToUserSticker,
} from '~/services/sticker.server'
import { Sticker } from '~/components'
import { getFlagUrl } from '~/utils/getFlagUrl'

export async function loader({ request, params }: DataFunctionArgs) {
  const teamShortName = params.teamShortName
  const isValid = isValidCollection(teamShortName)
  if (!isValid) {
    return redirect('/home')
  }

  const stickers = await getStickersByTeamNameAndUserId(teamShortName, await requireUserId(request))
  return stickers
}

type LoaderData = typeof loader

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

export const meta: MetaFunction<LoaderData> = ({ data, params: { teamShortName } }) => ({
  title: `Stickers de ${teamShortName}`,
})

export default function Slug() {
  const { stickers, teamTotal } = useLoaderData<LoaderData>()

  return (
    <div>
      <div className="mb-4 text-white">
        <h1 className="mt-5 mb-2 flex items-center gap-2 font-display text-3xl font-bold leading-tight md:text-4xl">
          Colección {stickers[0]?.team?.name}{' '}
          {getFlagUrl(stickers[0].team.name) !== '' && (
            <img src={getFlagUrl(stickers[0].team.name)} alt={stickers[0].team.name} />
          )}
        </h1>
        <h2 className="mt-4 flex items-center gap-4 text-3xl font-medium">
          Stickers obtenidos: {stickers.filter(sticker => sticker.quantity > 0).length} de{' '}
          {teamTotal}
        </h2>
      </div>
      <hr className="border-t-2 border-dotted border-slate-700" />
      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-fluid">
        {stickers.map(sticker => {
          return (
            <Sticker
              key={sticker.id}
              id={sticker.id}
              name={sticker.name}
              team={sticker.team.name}
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
