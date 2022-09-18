import { NavLink as Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
export const Header: React.FC = () => {
  const { i18n, t } = useTranslation()
  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <header className="mx-2 mb-4 py-4 md:mx-0">
      <nav className="flex items-center gap-6">
        <Link to="/">
          <img src="/assets/img/world-cup.svg" alt="World Cup Logo" className="w-6" />
        </Link>
        <ul className="flex gap-4 text-sm font-semibold text-white">
          <li className="">
            <Link to="/login" className="underline-offset-4 hover:underline">
              {t('login')}
            </Link>
          </li>
          <li className="">
            <Link to="/credits" className="underline-offset-4 hover:underline">
              {t('credits')}
            </Link>
          </li>
          <li className="">
            <Link to="/home" className="underline-offset-4 hover:underline">
              {t('my_collection')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-semibold text-white">{t('language')}:</span>
        <select
          className="rounded-md border border-white bg-transparent px-2 py-1 text-sm font-semibold text-white"
          onChange={handleLanguage}
          value={i18n.language}
        >
          <option value="en">{t('english')}</option>
          <option value="es">{t('spanish')}</option>
        </select>
      </div>
    </header>
  )
}
