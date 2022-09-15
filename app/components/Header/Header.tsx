import { NavLink as Link } from '@remix-run/react'

export const Header: React.FC = () => (
  <header className="mx-auto max-w-lg py-4">
    <ul className="flex justify-evenly text-center text-sm font-light text-white">
      <li className="w-24">
        <Link to="/" className="underline-offset-4 hover:underline">
          Home
        </Link>
      </li>
      <li className="w-24">
        <Link to="/login" className="underline-offset-4 hover:underline">
          Inicia sesión
        </Link>
      </li>
      <li className="w-24">
        <Link to="/credits" className="underline-offset-4 hover:underline">
          Créditos
        </Link>
      </li>
      <li className="w-24">
        <Link to="/home" className="underline-offset-4 hover:underline">
          Mi colección
        </Link>
      </li>
    </ul>
  </header>
)
