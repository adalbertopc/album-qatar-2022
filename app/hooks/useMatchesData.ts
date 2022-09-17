import { useMemo } from 'react'
import { useMatches } from '@remix-run/react'

export const useMatchesData = (id: string): Record<string, unknown> | undefined => {
  const matchingRoutes = useMatches()
  const route = useMemo(() => matchingRoutes.find(route => route.id === id), [matchingRoutes, id])
  return route?.data
}
