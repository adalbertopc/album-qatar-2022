import { Form, Link } from "@remix-run/react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Form>
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
