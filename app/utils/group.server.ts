import { json } from "@remix-run/node";
import { prisma } from "~/lib/db.server";

export async function createGroup(name: string) {
  const exists = await prisma.group.findFirst({
    where: { name },
  });
  if (exists) {
    return json({ id: exists.id, name: exists.name });
  }
  const newGroup = await prisma.group.create({
    data: {
      name: name,
    },
  });
  return json({ id: newGroup.id, name: newGroup.name });
}

export async function getGroups() {
  const groups = await prisma.group.findMany();
  return groups;
}
