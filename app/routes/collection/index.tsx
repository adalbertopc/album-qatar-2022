import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { data } from "~/lib/data";
import { requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function Index() {
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
