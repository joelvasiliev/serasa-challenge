"use server";

import { prisma } from "@/lib/prisma";

export async function getDebts(user_id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  if (user.role === "ADMIN") {
    const debts = await prisma.debt.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return debts;
  }

  const debts = await prisma.debt.findMany({
    where: {
      user_id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return debts;
}
