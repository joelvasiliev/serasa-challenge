"use server";

import { prisma } from "@/lib/prisma";

type DebtInputProps = {
  debt_id: string;
};

export async function deleteDebt({ debt_id }: DebtInputProps) {
  const debt = await prisma.debt.findFirst({
    where: {
      id: debt_id,
    },
  });
  if (!debt) throw new Error("Dívida não encontrada.");

  return await prisma.debt.delete({
    where: {
      id: debt_id,
    },
  });
}
