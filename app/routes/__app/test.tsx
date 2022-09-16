import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Sticker } from '~/components'
import { teamsData } from '~/constants/teams'

export const loader: LoaderFunction = async () => {
  return json(teamsData)
}

export default function Test() {
  const data = useLoaderData()

  return (
    <>
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
          />
        )
      })}
    </>
  )
}
