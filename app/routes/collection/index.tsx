import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { data } from "~/lib/data";
import { getUser, requireUserId } from "~/utils/auth.server";
import { getStickersByUserId } from "~/utils/sticker.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const user = await getUser(request);
  if (!user) return redirect("/auth/login");
  const stickers = await getStickersByUserId(user.id);
  return stickers;
};

export default function Index() {
  const userdata = useLoaderData();
  console.log(userdata);
  return (
    <div>
      <h1>Collection</h1>
      {data.map((item) => {
        return (
          <div key={item.name}>
            <h2 className="text-xl font-bold uppercase">{item.name}</h2>
            <div className="grid gap-2">
              {item.items.map((item) => {
                return (
                  <Link key={item} to={`/collection/${item}`}>
                    <div className="p-2 cursor-pointer rounded-md border border-gray-200 hover:bg-gray-200">
                      {item}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
