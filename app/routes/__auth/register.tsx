import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useActionData, useTransition } from '@remix-run/react'
import { Button, Input, Select } from '~/components'
import { teamsData } from '~/constants/teams'
import { getUser, register } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect('/home') : null
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = String(formData.get('username'))
  const name = String(formData.get('name'))
  const password = String(formData.get('password'))
  const passwordConfirmation = String(formData.get('confirm_password'))

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

  if (username)
    if (name.toString().length < 2) {
      return json({
        error: {
          name: 'El nombre debe tener al menos 2 caracteres',
        },
      })
    }

  if (password.length < 8) {
    return json({
      error: {
        password: 'La contraseña debe tener al menos 8 caracteres',
      },
    })
  }

  if (password !== passwordConfirmation) {
    return json({
      error: {
        password: 'Las contraseñas no coinciden',
      },
    })
  }

  return await register({ username: username.toLowerCase(), name, password })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Regístrate',
  }
}

export default function Register() {
  const errors = useActionData()
  const { state } = useTransition()

  return (
    <div className="mt-20 flex h-full flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-5xl font-semibold">Regístrate</h1>
      <Form
        method="post"
        className="flex w-full max-w-md flex-col rounded-2xl border border-gray-300 p-10"
      >
        <Input
          label="Nombre"
          name="name"
          placeholder="Escribe tu nombre"
          className="mb-4"
          error={errors?.error?.username}
          min={2}
          max={20}
        />
        <Input
          label="Nombre de usuario"
          name="username"
          placeholder="Escribe tu nombre de usuario"
          className="mb-4"
          error={errors?.error?.username}
          min={2}
          max={20}
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
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Escribe tu contraseña"
          className="mb-6"
          error={errors?.error?.password}
        />
        <Input
          label="Confirma tu contraseña"
          name="confirm_password"
          type="password"
          placeholder="Vuelve a escribir tu contraseña"
          className="mb-6"
          error={errors?.error?.password}
        />
        <Button type="submit" disabled={state === 'loading'}>
          {state === 'loading' ? 'Cargando...' : 'Registrarse'}
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
      <p>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="font-semibold">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
