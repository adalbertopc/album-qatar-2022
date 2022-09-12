import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { register } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));
  const name = String(formData.get("name"));

  if (username.length < 2) {
    return json({
      error: "Username must be at least 2 characters",
    });
  }

  if (username)
    if (name.toString().length < 2) {
      return json({
        error: "Name must be at least 2 characters",
      });
    }

  if (password.length < 8) {
    return json({
      error: "Password must be at least 8 characters",
    });
  }

  return await register({ username, name, password });
};

export default function Register() {
  const data = useActionData();
  console.log(data);
  const { state, submission } = useTransition();

  return (
    <div>
      {state === "submitting" ? <div>Loading...</div> : null}
      <Form method="post">
        <label>
          username
          <input type="text" name="username" />
        </label>
        <label>
          name
          <input type="text" name="name" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
      <Link to="/auth/login">Login</Link>
    </div>
  );
}
