import { Form, Link, NavLink, Outlet } from '@remix-run/react'
import { Button } from '~/components'

export default function PrivateApp() {
  return (
    <div>
      <div className="relative md:flex md:min-h-screen">
        {/* <!-- mobile menu bar --> */}
        <div className="flex justify-between bg-gray-800 text-gray-100 md:hidden">
          {/* <!-- logo --> */}
          <a href="#" className="block p-4 font-bold text-white">
            Better Dev
          </a>

          {/* <!-- mobile menu button --> */}
          <button className="mobile-menu-button p-4 focus:bg-gray-700 focus:outline-none">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* <!-- sidebar --> */}
        <div className="sidebar top-0 left-0 hidden w-64 -translate-x-full transform space-y-6 bg-blue-800 py-7 px-2 text-blue-100 transition duration-200 ease-in-out md:relative md:block md:h-screen md:translate-x-0">
          {/* <!-- logo --> */}
          <Link to="/home" className="flex items-center space-x-2 px-4 text-white">
            <span className="text-2xl font-extrabold">Qatar</span>
          </Link>

          {/* <!-- nav --> */}
          <nav>
            <NavLink
              to="/home"
              className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Home
            </NavLink>
            <NavLink
              to="/test"
              className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Test
            </NavLink>

            <Form action="/logout" method="post">
              <Button
                type="submit"
                className="block rounded py-2.5 px-4 transition duration-200 hover:bg-blue-700 hover:text-white"
              >
                Logout
              </Button>
            </Form>
          </nav>
        </div>

        {/* <!-- content --> */}
        <main className="max-h-screen min-h-screen w-full overflow-y-auto p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
