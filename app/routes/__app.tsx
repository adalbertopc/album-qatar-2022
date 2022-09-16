import { Outlet } from '@remix-run/react'
import { Sidebar } from '~/components'

export default function PrivateApp() {
  return (
    <div>
      <div className="relative md:flex md:min-h-screen">
        <Sidebar />
        <main className="max-h-screen min-h-screen w-full overflow-y-auto p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
