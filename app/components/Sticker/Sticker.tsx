import { DocumentIcon, InformationCircleIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Form } from '@remix-run/react'
import clsx from 'clsx'
import { countries } from '~/constants/countries'

interface StickerProps {
  id: string
  number: number
  team: string
  quantity: number
  name?: string
  showButtons?: boolean
  className?: string
}

export const Sticker: React.FC<StickerProps> = ({
  id,
  number,
  team,
  name,
  showButtons,
  quantity,
  className,
}) => {
  const country: string = countries[team.toLowerCase()].name
  const color = countries[team.toLowerCase()].colors[0]
  const textColor: string = color === 'white' ? 'text-black' : 'text-white'
  return (
    <div
      className={clsx(className, `group h-52 w-40 overflow-hidden rounded-xl border p-4 shadow-sm`)}
    >
      <div
        className={clsx(
          'relative flex h-full w-full  items-center justify-center rounded-lg transition-transform hover:scale-105',
          `bg-${color}${color === 'white' || color === 'black' ? '' : '-500'}`,
          {
            'bg-opacity-50': quantity === 0 || quantity === undefined || quantity === null,
          }
        )}
      >
        <img
          src={`https://img.icons8.com/color/48/000000/${country}.png`}
          alt={country}
          className="absolute left-1/2 top-1 h-8 w-8 -translate-x-1/2 object-contain drop-shadow-lg"
        />
        <div className={clsx('z-20 text-center', textColor)}>
          <div className="flex items-center justify-center">
            <DocumentIcon className="h-3 w-3 text-white" />
            <span className="text-xs font-medium text-white">{quantity}</span>
          </div>
          <span className="block text-xl font-bold drop-shadow-md">{team}</span>
          <span className="mt-1 block text-3xl font-bold drop-shadow-md">{number}</span>
          <span className="mt-2 block text-sm font-medium">{name}</span>
        </div>
        {showButtons && (
          <div className="absolute left-1/2 bottom-1 flex -translate-x-1/2 items-center justify-center gap-4 md:hidden md:group-hover:flex">
            <Form method="post">
              <input type="hidden" name="sticker_id" value={id} />
              <button
                name="_action"
                value="add"
                className="flex items-center justify-center rounded-lg bg-green-600 shadow-sm transition-all hover:scale-105 hover:bg-green-700"
              >
                <PlusIcon width={30} height={30} className="fill-white" />
              </button>
            </Form>
            <Form method="post">
              <input type="hidden" name="sticker_id" value={id} />
              <button
                name="_action"
                value="remove"
                className="flex items-center justify-center rounded-lg bg-red-600 shadow-sm transition-all hover:scale-105 hover:bg-red-700"
              >
                <MinusIcon width={30} height={30} className="fill-white" />
              </button>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}
