import bcrypt from 'bcryptjs'
import { prisma } from '~/lib/db.server'
import type { RegisterForm } from './types.server'

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
