import { Link } from '@remix-run/react'
import { Header } from '~/components'

export default function Index() {
  return (
    <div className="mx-auto max-w-5xl">
      <Header />
      <section className="grid md:grid-cols-2">
        <div className="mb-8 text-center md:text-left">
          <div className="flex flex-col  md:justify-start">
            <h1 className="tracking-tighest mt-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold uppercase text-transparent sm:text-5xl lg:text-7xl">
              Qatar 2022 Sticker Album Tracker
            </h1>{' '}
            <h2 className="order-first bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-medium tracking-wide text-transparent">
              Hecho con 🧡 por{' '}
              <a className="font-bold" href="https://adal.dev">
                adal
              </a>
            </h2>
          </div>{' '}
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-white">
            Comienza a registrar tus stickers del album Panini Copa Mundial de la FIFA Qatar 2022
          </p>
          <Link
            to="register"
            className="mt-8 inline-block rounded-lg bg-gradient-to-bl from-cyan-500 via-blue-500 to-purple-500  py-4 px-10 font-medium text-white transition-all hover:brightness-110"
          >
            Regístrate
          </Link>
        </div>
        <div>
          <img
            src="/assets/img/panini-album.webp"
            alt="Panini Sticker Album"
            className="drop-shadow-lg"
          />
        </div>
      </section>
    </div>
  )
}
