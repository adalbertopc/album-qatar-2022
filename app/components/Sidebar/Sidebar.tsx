import { useRef, useState } from 'react'
import { Form, Link, NavLink } from '@remix-run/react'
import { ArrowLeftOnRectangleIcon, Bars3BottomLeftIcon } from '@heroicons/react/20/solid'
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
      <div className="flex justify-between bg-gradient-to-b  from-gray-800 to-gray-900 text-gray-100 md:hidden">
        <Link
          to="/home"
          className="absolute left-1/2 block -translate-x-1/2 p-2 font-display font-bold text-white md:static"
        >
          <img src="/assets/img/world-cup.svg" alt="Fifa World Cup Logo" className="w-4" />
        </Link>
        <button
          className="mobile-menu-button order-first p-4 focus:bg-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars3BottomLeftIcon className="h-6 w-6" />
        </button>
      </div>
      <div
        className={clsx(
          `spb-2 fixed top-0 left-0 z-50 h-screen w-64 
          transform flex-col 
          justify-between
          bg-slate-800 px-2 pt-7 pb-2
          text-blue-100 shadow-lg
          transition duration-200 ease-in-out
          md:sticky md:left-0 md:flex md:translate-x-0 md:gap-5`,
          {
            '-translate-x-full': !isOpen,
          }
        )}
        ref={ref}
      >
        <Link to="/home" className="mb-6 flex items-center px-4 text-white">
          <img
            src="/assets/img/world-cup-text-logo.svg"
            alt="Fifa World Cup Logo"
            className="drop-shadow-lg"
          />
        </Link>

        <nav className="flex h-full flex-col justify-between">
          <div className="grid gap-2">
            <SidebarNavLink url="/home">Mi colección</SidebarNavLink>
            <SidebarNavLink url="/profile">Mi perfil</SidebarNavLink>
            <SidebarNavLink url="/repeated">Repetidos</SidebarNavLink>
            <SidebarNavLink url="/ranking">Ranking</SidebarNavLink>
            <div className="rounded py-2.5 pr-4 pl-4 transition-all duration-200 hover:bg-blue-500 hover:pl-6 hover:text-white">
              Seguidos <span className="text-xs font-light">(Proximamente)</span>
            </div>
          </div>
        </nav>
        <div className="absolute bottom-4 w-60 md:static  md:w-full">
          <Form action="/logout" method="post" className="w-full p-2">
            <Button
              type="submit"
              className="flex w-full items-center gap-2 rounded py-2.5 px-4 transition-all duration-200 hover:-translate-y-1"
              size="full"
              variant="secondary"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 stroke-2" />
              Logout
            </Button>
          </Form>
        </div>
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
    className={({ isActive }) =>
      clsx(
        'block rounded py-2.5 pr-4 pl-4 transition-all duration-200 hover:bg-blue-500 hover:pl-6 hover:text-white',
        {
          'bg-blue-500': isActive,
        }
      )
    }
  >
    {children}
  </NavLink>
)
