import { json } from "@remix-run/node";
import { prisma } from "~/lib/db.server";
import type { TeamForm } from "./types.server";

export async function createTeam({ groupId, name }: TeamForm) {
  const exists = await prisma.team.findUnique({
    where: { name },
  });
  if (exists) {
    return json({ id: exists.id, name: exists.name, groupId: exists.groupId });
  }
  const newTeam = await prisma.team.create({
    data: {
      name,
      groupId,
    },
  });
  return json({ id: newTeam.id, name: newTeam.name });
}

export async function getTeamByName(name: string) {
  const team = await prisma.team.findUnique({
    where: { name },
  });
  return team;
}
