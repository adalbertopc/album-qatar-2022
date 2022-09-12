import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { Link } from "react-router-dom";
import { isValidCollection } from "~/utils/isValidCollection";

export const loader: LoaderFunction = ({ params }) => {
  const collection = params.slug;
  const isValid = isValidCollection(collection);

  if (!isValid) {
    return redirect("/collection");
  }
  return {};
  //   return plainData(collection);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  if (values._action === "add") {
    //   supabase sum +1
  }

  if (values._action === "remove") {
    //   supabase sum -1
  }
  return "hola";
};

export default function Slug() {
  const { slug } = useParams();
  const qty = slug === "fwc" ? 29 : 20;

  return (
    <div>
      <h1>Collection</h1>
      <Link to="/collection">Back to collection</Link>
      {new Array(qty).fill(0).map((_, i) => {
        return (
          <div key={i + 1}>
            <div>
              <span>{slug}</span>
              <span>{i + 1}</span>
              <Form method="post">
                <input type="hidden" name={slug} value={i + 1} />
                <button name="_action" value="add">
                  +
                </button>
              </Form>
              <Form method="post">
                <input type="hidden" name={slug} value={i + 1} />
                <button name="_action" value="remove">
                  -
                </button>
              </Form>
              <span> cantidad: {3}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
