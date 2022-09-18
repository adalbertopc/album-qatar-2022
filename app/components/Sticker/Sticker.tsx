import { Form } from '@remix-run/react'
import { DocumentIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { teamsData } from '~/constants/teams'
import { getFlagUrl } from '~/utils/getFlagUrl'

interface StickerProps {
  id: string
  number: number
  team: string
  quantity: number
  name?: string
  showButtons?: boolean
  className?: string
  variant?: 'small' | 'large'
}

export const Sticker: React.FC<StickerProps> = ({
  id,
  number,
  team,
  name,
  showButtons,
  quantity,
  className,
  variant = 'large',
}) => {
  const special = team === 'FWC'
  const color = teamsData[team.toLowerCase()]?.colors[0] || 'slate'
  const textColor: string = color === 'white' ? 'text-black' : 'text-white'
  return (
    <div
      className={clsx(
        className,
        'group mx-auto h-52 w-40 rounded-xl shadow-md transition-all hover:scale-105',
        {
          [`border-${color}-500 border-4 border-opacity-70`]: color,
          'border-4 border-blue-500 ': special,
          'border-opacity-20': quantity === 0 || quantity === undefined || quantity === null,
          'h-52 w-40': variant === 'large',
          'h-36 w-28': variant === 'small',
        }
      )}
    >
      <div
        className={clsx(
          'relative flex h-full w-full  items-center justify-center rounded-lg bg-slate-800'
        )}
      >
        {!special && (
          <img
            src={getFlagUrl(team)}
            alt={team}
            className="absolute left-1/2 top-1 h-8 w-8 -translate-x-1/2 object-contain drop-shadow-lg"
          />
        )}
        <div
          className={clsx('z-20 text-center', textColor, {
            'mt-8': variant === 'small',
          })}
        >
          {variant === 'large' && (
            <div className="flex items-center justify-center">
              <DocumentIcon className="h-3 w-3 text-white" />
              <span className="text-xs font-medium text-white">{quantity}</span>
            </div>
          )}
          <span className="block text-xl font-bold drop-shadow-md">{team}</span>
          <span className="mt-1 block text-3xl font-bold drop-shadow-md">{number}</span>
          <span className="mt-2 block text-sm font-medium">{name}</span>
        </div>
        {showButtons && variant === 'large' && (
          <div className="absolute left-1/2 bottom-2 flex -translate-x-1/2 items-center justify-center gap-4 md:hidden md:group-hover:flex">
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
