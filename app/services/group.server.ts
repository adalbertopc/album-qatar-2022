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
  return json(groups)

  // count userStickers for the user and group
  const userStickers = await prisma.userSticker.findMany({
    where: {
      userId,
    },
    select: {
      sticker: {
        select: {
          team: {
            select: {
              groupId: true,
            },
          },
        },
      },
    },
  })
  // create a map of group ids and userSticker counts
  const userStickerMap = userStickers.reduce((acc, cur) => {
    const groupId = cur.sticker.team.groupId
    const count = acc.get(groupId) || 0
    acc.set(groupId, count + 1)
    return acc
  }, new Map<string, number>())

  // add the userSticker count to the group
  const groupsWithUserStickers = groups.map(group => {
    const count = userStickerMap.get(group.id) || 0
    return {
      ...group,
      userStickerCount: count,
    }
  })

  return json(groupsWithUserStickers)
}
