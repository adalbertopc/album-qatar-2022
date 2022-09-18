import { NavLink as Link } from '@remix-run/react'

export const Header: React.FC = () => (
  <header className="mx-2 mb-4 py-4 md:mx-0">
    <nav className="flex items-center justify-between gap-6">
      <Link to="/">
        <img src="/assets/img/world-cup.svg" alt="World Cup Logo" className="w-6" />
      </Link>
      <ul className="flex gap-4 text-sm font-semibold text-white">
        <li className="">
          <Link to="/credits" className="underline-offset-4 hover:underline">
            Créditos
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)
