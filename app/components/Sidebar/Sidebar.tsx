import { useRef, useState } from 'react'
import { Form, Link, NavLink } from '@remix-run/react'
import { Bars3BottomRightIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Button } from '~/components'
import { useClickOutside } from '~/hooks/useClickOutside'

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<React.MutableRefObject<HTMLElement>>(null)

  useClickOutside({ ref: ref, onClickOutside: () => setIsOpen(false) })

  return (
    <div>
      {' '}
      <div className="flex justify-between bg-gradient-to-b from-gray-800  to-gray-900  text-gray-100 md:hidden">
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
          `absolute top-0 left-0 z-50 h-full w-64 transform space-y-6 
          bg-gradient-to-r from-gray-800  to-gray-900 
          py-7 px-2 text-blue-100 shadow-lg 
          transition duration-200 ease-in-out
          md:relative md:left-0 md:block md:h-screen md:translate-x-0`,
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
          <SidebarNavLink url="/home">Mi colección</SidebarNavLink>
          <SidebarNavLink url="/ranking">Ranking</SidebarNavLink>
          <SidebarNavLink url="/following">
            Seguidos <span className="text-xs font-light">(Proximamente)</span>
          </SidebarNavLink>

          <Form action="/logout" method="post" className="absolute bottom-4 left-4">
            <Button type="submit" className="block rounded py-2.5 px-4 transition duration-200">
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              Logout
            </Button>
          </Form>
        </nav>
      </div>
    </div>
  )
}

interface SidebarNavLinkProps {
  url: string
  children: React.ReactNode
}
export const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ url, children }) => (
  <NavLink
    to={url}
    className="block rounded from-blue-900 via-blue-700 to-blue-900 py-2.5 px-4 transition duration-200 hover:bg-gradient-to-r hover:text-white"
  >
    {children}
  </NavLink>
)
