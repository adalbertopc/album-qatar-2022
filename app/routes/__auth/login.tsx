import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { Button, Input } from '~/components'

import { login, getUser } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect('/collection') : null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = String(formData.get('username'))
  const password = String(formData.get('password'))

  if (username.length < 2) {
    return json({
      error: {
        username: 'El nombre de usuario debe tener al menos 2 caracteres',
      },
    })
  }

  if (password.length < 1) {
    return json({
      error: {
        password: 'La contraseña es requerida',
      },
    })
  }

  return await login({ username, password })
}
export const meta: MetaFunction = () => {
  return {
    title: 'Iniciar sesión',
  }
}

export default function Login() {
  const errors = useActionData()
  return (
    <div className="mt-20 flex h-full flex-col items-center justify-center gap-4 text-white">
      <h1 className="mb-4 text-5xl font-bold">Inicia sesión</h1>
      <Form
        method="post"
        className="flex w-full max-w-md flex-col rounded-2xl border border-gray-300 p-10"
      >
        <Input
          label="Nombre de usuario"
          name="username"
          placeholder="Escribe tu nombre de usuario"
          className="mb-4"
          error={errors?.error?.username}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Escribe tu contraseña"
          className="mb-6"
          error={errors?.error?.password}
        />
        <Button type="submit">Iniciar sesión</Button>
        {errors?.error === 'Incorrect login' && (
          <p className="mt-2 text-center text-sm text-red-500">
            El nombre de usuario o la contraseña son incorrectos
          </p>
        )}
      </Form>
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="font-semibold">
          Regístrate
        </Link>
      </p>
    </div>
  )
}
