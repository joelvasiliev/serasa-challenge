"use server";

import { prisma } from "@/lib/prisma";
import { DateRange } from "react-day-picker";

export async function getDebts(user_id: string, date: DateRange | undefined) {
  if (!date || !date.from || !date.to) {
    return [];
  }
  const user = await prisma.user.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  const debts = await prisma.debt.findMany({
    where: {
      user_id,
      createdAt: {
        gte: date.from,
        lte: date.to,
      },
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
