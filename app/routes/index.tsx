import { Button, Header } from '~/components'

export default function Index() {
  return (
    <div className="mx-auto max-w-5xl px-2">
      <Header />
      <section className="mt-8 grid  md:grid-cols-2">
        <div className="mb-8 text-center md:text-left">
          <div className="flex flex-col md:justify-start">
            <h1 className="tracking-tighest mt-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold uppercase text-transparent sm:text-5xl lg:text-7xl">
              Qatar 2022 Sticker Album Tracker
            </h1>{' '}
          </div>{' '}
          <p className="mt-8 text-lg text-white">
            Comienza a registrar tus stickers del album Panini Copa Mundial de la FIFA Qatar 2022
          </p>
          <div className="mt-8 flex justify-center gap-4 md:justify-start">
            <Button href="register">Regístrate</Button>
            <Button href="login" variant="secondary">
              Inicia sesión
            </Button>
          </div>
        </div>
        <div>
          <img
            src="/assets/img/panini-album.webp"
            alt="Panini Sticker Album"
            className="drop-shadow-lg"
          />
        </div>
      </section>

      <footer className="mt-8 text-center md:text-left">
        <h2 className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-medium tracking-wide text-transparent">
          Hecho con 🧡 por{' '}
          <a className="font-bold" href="https://adal.dev">
            adal
          </a>
        </h2>
      </footer>
    </div>
  )
}
