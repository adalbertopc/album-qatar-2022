import { useRef, useState } from 'react'
import { Form, Link, NavLink } from '@remix-run/react'
import { Bars3BottomRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Button } from '~/components'
import { useClickOutside } from '~/hooks/useClickOutside'

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<React.MutableRefObject<HTMLElement>>(null)

  useClickOutside({ ref: ref, onClickOutside: () => setIsOpen(false) })

  return (
    <div>
      {' '}
      <div className="flex justify-between bg-gradient-to-t from-cyan-800 via-blue-800 to-purple-800 text-gray-100 md:hidden">
        <Link
          to="/home"
          className="absolute left-1/2 block -translate-x-1/2 p-4 font-bold text-white md:static"
        >
          Qatar
        </Link>
        <button
          className="mobile-menu-button order-first p-4 focus:bg-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars3BottomRightIcon className="h-6 w-6" />
        </button>
      </div>
      <div
        className={clsx(
          `absolute top-0 left-0 z-50 h-full w-64 transform space-y-6 bg-gradient-to-tl from-cyan-800 via-blue-800 to-purple-800 py-7 px-2 text-blue-100 transition duration-200 ease-in-out md:relative md:left-0 md:block md:h-screen md:translate-x-0`,
          {
            '-translate-x-full': !isOpen,
          }
        )}
        ref={ref}
      >
        <Link to="/home" className="flex items-center space-x-2 px-4 text-white">
          <span className="text-2xl font-extrabold">Qatar</span>
        </Link>
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
    </div>
  )
}
