import { Header } from '~/components'

export default function Credits() {
  return (
    <div className="mx-auto max-w-5xl px-2">
      <Header />
      <div className=" text-white">
        <h1 className="mb-4 text-3xl font-bold">Créditos</h1>
        <p className="mb-2 text-lg">
          Este proyecto fue creado por{' '}
          <a
            href="https://adal.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            adal
          </a>
          .
        </p>
        <p className="mb-2 text-lg">
          El código está disponible en{' '}
          <a
            href="https://github.com/adalbertopc/album-qatar-2022/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            GitHub
          </a>
          .
        </p>
        <p className="mb-2 text-lg">
          Todos los derechos de las imágenes de logos de la copa mundial pertenecen a la{' '}
          <a
            href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            FIFA
          </a>
          .
        </p>
        <p className="mb-2 text-lg">
          Todos los derechos de las imágenes de los banderas pertenecen a{' '}
          <a
            href="https://icons8.com/icons/set/flags"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            Icons8
          </a>
          .
        </p>
        <p className="mb-2 text-lg">
          Gracias a{' '}
          <a
            href="https://poke.dev/"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            Poke
          </a>{' '}
          por guiarme a aprender Remix 🙌🏼.
        </p>
        <p className="mb-2 text-lg">
          Gracias a{' '}
          <a
            href="https://eduardorl.vercel.app/"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            Edu
          </a>{' '}
          por ayudarme a estilizar esta web app 🙌🏼.
        </p>
      </div>
    </div>
  )
}
