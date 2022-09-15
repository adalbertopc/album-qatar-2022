import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Sticker } from '~/components'
import { countries } from '~/constants/countries'

export const loader: LoaderFunction = async () => {
  return json(countries)
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
