import { json } from '@remix-run/node'
import { prisma } from '~/lib/db.server'

export async function createGroup(name: string) {
  const exists = await prisma.group.findFirst({
    where: { name },
  })
  if (exists) {
    return json({ id: exists.id, name: exists.name })
  }
  const newGroup = await prisma.group.create({
    data: {
      name: name,
    },
  })
  return json({ id: newGroup.id, name: newGroup.name })
}

export async function getGroups() {
  const groups = await prisma.group.findMany()
  return groups
}

export async function getGroupsWithTeams() {
  const groups = await prisma.group.findMany({
    include: {
      teams: true,
    },
  })
  return groups
}

export async function getGroupsWithTeamsAndUserStickers(userId: string) {
  // select all groups with teams and userStickers
  const groups = await prisma.group.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
      teams: {
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              stickers: true,
            },
          },
        },
      },
    },
  })

  // select all userStickers for the user and group and team id
  const userStickers = await prisma.userSticker.findMany({
    where: {
      userId,
    },
    select: {
      sticker: {
        select: {
          team: {
            select: {
              id: true,
            },
          },
        },
      },
      quantity: true,
    },
  })

  // map the userStickers to the group
  const groupsWithUserStickers = groups.map(group => {
    const teams = group.teams.map(team => {
      const stickers = userStickers.filter(userSticker => {
        return userSticker.sticker.team?.id === team.id && userSticker.quantity > 0
      }).length
      return {
        ...team,
        stickers,
      }
    })
    return {
      ...group,
      teams,
    }
  })

  return json(groupsWithUserStickers)
}
