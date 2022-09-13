import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useParams } from "@remix-run/react";
import { Link } from "react-router-dom";
import { dataGen } from "~/lib/dataGen";
import { prisma } from "~/lib/db.server";
import { getUser } from "~/utils/auth.server";

import { isValidCollection } from "~/utils/isValidCollection";
import { getStickersByTeamName } from "~/utils/sticker.server";

export const loader: LoaderFunction = async ({ params }) => {
  const collection = params.slug;
  const isValid = isValidCollection(collection);

  if (!isValid || !collection) {
    return redirect("/collection");
  }

  const stickers = await getStickersByTeamName(collection.toUpperCase());
  console.log(stickers);
  return json(stickers);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  if (values._action === "add") {
    const user = await getUser(request);

    if (!user) {
      return redirect("/auth/login");
    }
    const exists = await prisma.userSticker.findUnique({
      where: { userId_stickerId: { userId: user.id, stickerId: "arg2" } },
    });
    // if exists sum 1 to quantity
    // else create new
    if (exists) {
      return await prisma.userSticker.update({
        where: { userId_stickerId: { userId: user.id, stickerId: "arg2" } },
        data: { quantity: { increment: 1 } },
      });
    } else {
      return await prisma.userSticker.create({
        data: {
          userId: user.id,
          stickerId: "arg2",
          quantity: 1,
        },
      });
    }
  }

  if (values._action === "remove") {
    //   supabase sum -1
  }
  return "hola";
};

export default function Slug() {
  const { slug } = useParams();
  const stickers = useLoaderData();
  console.log(stickers);
  return (
    <div>
      <h1>Collection</h1>
      <Link to="/collection">Back to collection</Link>
      {stickers.map((sticker, i) => {
        return (
          <div key={sticker.id}>
            <div>
              <span>{sticker.team.name}</span>
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
