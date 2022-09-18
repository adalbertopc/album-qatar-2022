import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { useChangeLanguage } from 'remix-i18next'
import { useTranslation } from 'react-i18next'
import i18next from '~/i18next.server'

import styles from './styles/app.css'

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'true' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;900&display=swap',
    },
    {
      rel: 'icon',
      href: '/assets/img/world-cup.svg',
      type: 'image/svg+xml',
    },
  ]
}

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18next.getLocale(request)
  return json<LoaderData>({ locale })
}
type LoaderData = { locale: string }

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Qatar 2022 Sticker Album',
  description:
    'Lleva un registro de tu álbum de stickers de la Copa Mundial de la FIFA Qatar 2022™',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  let { locale } = useLoaderData<LoaderData>()

  let { i18n } = useTranslation()

  useChangeLanguage(locale)
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
