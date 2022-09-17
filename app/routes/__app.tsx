import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
import { Sidebar } from '~/components'
import { getUser, requireUserId } from '~/services/auth.server'

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)
  if (!user) return redirect('/login')
  return user
}

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

export function ErrorBoundary({ error }) {
  return (
    <div className="text-center text-white">
      <h1 className="text-5xl">An Error Occurred</h1>
      <p className="text-2xl">There was a {error.message}</p>
      <p className="text-xl">
        <Link to="/">Go Home</Link>
      </p>
    </div>
  )
}
