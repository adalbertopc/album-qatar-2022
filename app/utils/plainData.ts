import { data } from '~/lib/data'

export const plainData: string[] = data.reduce((acc, { items }) => {
  return [...acc, ...items]
}, [])
