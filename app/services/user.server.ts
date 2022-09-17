import { json } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import { prisma } from '~/lib/db.server'

import type { RegisterForm, EditUserForm } from './types.server'

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      name: user.name,
      password: passwordHash,
    },
  })
  return { id: newUser.id, username: user.username, name: user.name }
}

export const editUser = async (user: EditUserForm) => {
  const exists = await prisma.user.findUnique({
    where: { id: user.userId },
  })

  if (!exists) {
    return json({ error: 'User does not exist' }, { status: 400 })
  }
  if (exists.username !== user.username) {
    const usernameExists = await prisma.user.findUnique({
      where: { username: user.username },
    })
    if (usernameExists) {
      console.log('username exists')
      return { error: 'Username already exists', status: 400 }
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.userId },
    data: {
      username: user.username,
      favoriteTeam: user.favoriteTeam,
    },
  })

  return updatedUser
}

export const getUsersWithMostUniqueStickers = async () => {
  const users = await prisma.userSticker.groupBy({
    by: ['userId'],

    where: {
      quantity: {
        gt: 0,
      },
    },
    _count: {
      quantity: true,
    },
    orderBy: {
      _count: {
        quantity: 'desc',
      },
    },
  })

  const usersWithNames = await Promise.all(
    users.map(async user => {
      const userWithNames = await prisma.user.findUnique({
        where: {
          id: user.userId,
        },
        select: {
          username: true,
          name: true,
          favoriteTeam: true,
        },
      })
      return {
        ...userWithNames,
        uniqueStickers: user._count.quantity,
      }
    })
  )

  return usersWithNames
}

export const getUserLastStickers = async (userId: string) => {
  const stickers = await prisma.userSticker.findMany({
    where: {
      userId,
    },
    select: {
      stickerId: true,
      quantity: true,
      addedAt: true,
      sticker: {
        select: {
          id: true,
          name: true,
          number: true,
          team: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 10,
  })

  return stickers
}

export const getUserRepeatedStickers = async (userId: string) => {
  const stickers = await prisma.userSticker.findMany({
    where: {
      userId,
      quantity: {
        gt: 1,
      },
    },
    select: {
      stickerId: true,
      quantity: true,
      sticker: {
        select: {
          id: true,
          name: true,
          number: true,
          team: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      quantity: 'desc',
    },
  })

  return stickers
}
