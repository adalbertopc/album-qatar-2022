import bcrypt from "bcryptjs";
import { prisma } from "~/lib/db.server";
import type { RegisterForm } from "./types.server";

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      name: user.name,
      password: passwordHash,
    },
  });
  return { id: newUser.id, username: user.username, name: user.name };
};
