import { json } from '@remix-run/node'
import type { StickerForm } from './types.server'
import { prisma } from '~/lib/db.server'

export async function createSticker({ name, number, team }: StickerForm) {
  const exists = await prisma.sticker.findFirst({
    where: {
      name,
      number,
      team: {
        id: team,
      },
    },
  })

  if (exists) {
    return json({ error: `Sticker already exists with that number` }, { status: 400 })
  }

  const newSticker = await prisma.sticker.create({
    data: {
      name,
      number,
      team: {
        connect: {
          id: team,
        },
      },
    },
  })

  return newSticker
}

export async function getStickersByUserId(userId: string) {
  const stickers = await prisma.userSticker.findMany({
    where: {
      userId,
    },
    select: {
      stickerId: true,
      quantity: true,
      sticker: {
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          team: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
  console.log(stickers)
  return stickers
}

export async function getStickersByTeamName(teamName: string) {
  const stickers = await prisma.sticker.findMany({
    orderBy: {
      number: 'asc',
    },
    where: {
      team: {
        name: teamName,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      number: true,
      description: true,
      team: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })

  return stickers
}

export async function getStickersByTeamNameAndUserId(teamName: string, userId: string) {
  const stickers = await prisma.$queryRaw`
    SELECT
        s.id,
        s.name,
        s.image,
        s.description,
        s.teamId,
        t.name as teamName,
        us.quantity
    FROM

        Sticker s
    INNER JOIN

        Team t
    ON

        s.teamId = t.id
    LEFT JOIN

        UserSticker us
    ON

        s.id = us.stickerId
    WHERE

        t.name = ${teamName}
    AND

        us.userId = ${userId}
    OR

        us.userId IS NULL
    ORDER BY

        s.number ASC
    `
  return stickers
}

export async function sumOneToUserSticker(userId: string, stickerId: string) {
  const exists = await prisma.userSticker.findFirst({
    where: {
      userId,
      stickerId,
    },
  })

  if (exists) {
    const updated = await prisma.userSticker.update({
      where: {
        userId_stickerId: {
          userId,
          stickerId,
        },
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    })
    return json(updated)
  }

  const newSticker = await prisma.userSticker.create({
    data: {
      userId,
      stickerId,
      quantity: 1,
    },
  })

  return json(newSticker)
}

export async function subtractOneToUserSticker(userId: string, stickerId: string) {
  const exists = await prisma.userSticker.findFirst({
    where: {
      userId,
      stickerId,
    },
  })

  if (exists) {
    if (exists.quantity > 1) {
      const updated = await prisma.userSticker.update({
        where: {
          userId_stickerId: {
            userId,
            stickerId,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      })
      return json(updated)
    }

    const deleted = await prisma.userSticker.delete({
      where: {
        userId_stickerId: {
          userId,
          stickerId,
        },
      },
    })
    return json(deleted)
  }
}
