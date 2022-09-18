import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Sticker, TeamCard } from '~/components'
import { teamsData } from '~/constants/teams'
import { fillFwc } from '~/lib/dataGen'

export const loader: LoaderFunction = async () => {
  // await fillFwc()
  return json(teamsData)
}

export default function Test() {
  const data = useLoaderData()

  return (
    <>
      <div className="grid w-[600px] grid-cols-2 gap-2">
        <TeamCard name="ARG" totalStickers={20} collectedStickers={10} />
        <TeamCard name="ARG" totalStickers={20} collectedStickers={10} />
        <TeamCard name="ARG" totalStickers={20} collectedStickers={10} />
        <TeamCard name="ARG" totalStickers={20} collectedStickers={10} />
      </div>
      {Object.keys(data).map((country, index) => {
        return (
          <Sticker
            key={index}
            id="a"
            number={10}
            team={country.toUpperCase()}
            name="Lionel Messi"
            showButtons
            quantity={0}
            variant="small"
          />
        )
      })}
    </>
  )
}
