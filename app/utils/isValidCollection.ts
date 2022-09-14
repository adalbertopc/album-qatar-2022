import { plainData } from './plainData'

export const isValidCollection = (slug: string) => {
  console.log(plainData)
  return plainData.includes(slug.toLowerCase())
}
