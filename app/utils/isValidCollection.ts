import { plainData } from '../services/plainData'

export const isValidCollection = (slug: string) => {
  return plainData.includes(slug.toLowerCase())
}
