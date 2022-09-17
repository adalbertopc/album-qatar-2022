import { useMatchesData } from './useMatchesData'

export const useUser = () => {
  const user = useMatchesData('routes/__app')

  if (!user) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    )
  }
  return user
}
