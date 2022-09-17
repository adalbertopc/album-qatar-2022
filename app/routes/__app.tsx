import { Outlet } from '@remix-run/react'
import { Sidebar } from '~/components'

export default function PrivateApp() {
  return (
    <div>
      <div className="relative md:flex md:min-h-screen">
        <Sidebar />
        <main className="container mx-auto overflow-y-auto p-4 md:p-6 ">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
