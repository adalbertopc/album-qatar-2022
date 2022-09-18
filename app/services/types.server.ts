export type RegisterForm = {
  username: string
  favoriteTeam?: string
  password: string
}

export type LoginForm = {
  username: string
  password: string
}

export type StickerForm = {
  team: string
  name?: string
  number: number
}

export type TeamForm = {
  name: string
  groupId: string
}

export type EditUserForm = {
  userId: string
  username?: string
  favoriteTeam: string
}
