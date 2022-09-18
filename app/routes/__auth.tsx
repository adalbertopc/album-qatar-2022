import { Outlet } from '@remix-run/react'
import { Header } from '~/components'

export default function Auth() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
