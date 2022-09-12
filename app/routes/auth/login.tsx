import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import { login, getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/collection") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  if (username.length < 2) {
    return json({
      error: "Username must be at least 2 characters",
    });
  }

  if (password.length < 1) {
    return json({
      error: "Password must be at least 1 characters",
    });
  }

  return await login({ username, password });
};

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Form method="post">
        <label>
          username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </Form>
      <Link to="/auth/register">Register</Link>
    </div>
  );
}
