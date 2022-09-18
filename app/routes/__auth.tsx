import { Outlet } from '@remix-run/react'
import { Header } from '~/components'

export default function Auth() {
  return (
    <div className="mx-auto max-w-5xl px-2">
      <Header />
      <Outlet />
    </div>
  )
}
