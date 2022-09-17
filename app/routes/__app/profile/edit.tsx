import { useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useClickOutside } from '~/hooks/useClickOutside'
import { Form, Link, useActionData, useNavigate, useTransition } from '@remix-run/react'
import { Button, Input, Select } from '~/components'
import { teamsData } from '~/constants/teams'
import type { ActionFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { editUser } from '~/services/user.server'
import { useUser } from '~/hooks/useUser'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const userId = String(formData.get('userId'))
  const username = String(formData.get('username'))
  const team = String(formData.get('team'))

  // validate username no special characters
  const regex = /^[a-zA-Z0-9]+$/
  if (!regex.test(username)) {
    return json({
      error: {
        username: 'El nombre de usuario no puede contener caracteres especiales',
      },
    })
  }

  if (username.length < 2) {
    return json({
      error: {
        username: 'El nombre de usuario debe tener al menos 2 caracteres',
      },
    })
  }

  const updatedUser = await editUser({
    userId,
    username: username.toLowerCase(),
    favoriteTeam: team,
  })

  return json(updatedUser)
}

export const meta: MetaFunction = () => {
  return {
    title: 'Registrarse',
  }
}

export default function EditUser() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  useClickOutside({
    ref: ref,
    onClickOutside: () => navigate('..'),
  })
  const errors = useActionData()
  const user = useUser()
  const { state } = useTransition()

  return (
    <div className="h-modal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-90 md:inset-0 md:h-full">
      <div ref={ref} className="relative h-full w-full max-w-md p-4 md:h-auto">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <Link
            to=".."
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close modal</span>
          </Link>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Editar perfil
            </h3>
            <Form method="post" className="flex w-full flex-col">
              <input type="hidden" name="userId" value={user.id} />
              <Input
                label="Nombre de usuario"
                name="username"
                placeholder="Escribe tu nombre de usuario"
                className="mb-4"
                error={errors?.error?.username}
                min={2}
                max={20}
                defaultValue={user.username}
              />
              <Select
                options={Object.keys(teamsData).map(team => ({
                  value: team.toUpperCase(),
                  label: teamsData[team].name.replace('-', ' '),
                }))}
                label="Equipo Favorito del mundial"
                firstOption="Selecciona tu equipo favorito"
                name="team"
                className="mb-4"
                defaultValue={user.favoriteTeam}
              />
              <Button type="submit" disabled={state === 'loading'}>
                {state === 'submitting' ? 'Cargando...' : 'Guardar cambios'}
              </Button>
              {state !== 'loading' && (
                <>
                  {errors?.error === 'Username already exists' && (
                    <p className="mt-2 text-center text-sm text-red-500">
                      El nombre de usuario ya existe, porfavor vuelve a intentarlo
                    </p>
                  )}
                  {errors?.error === 'Something went wrong' && (
                    <p className="mt-2 text-center text-sm text-red-500">
                      Algo salió mal, porfavor vuelve a intentarlo
                    </p>
                  )}
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
