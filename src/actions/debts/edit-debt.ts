"use server";

import { prisma } from "@/lib/prisma";
import { DebtStatus } from "@prisma/client";

type DebtInputProps = {
  debt_id: string;
  title: string;
  value: number;
  dueDate: Date;
  status: DebtStatus;
  observations: string;
  user_id: string;
};

export async function editDebt({
  debt_id,
  title,
  value,
  dueDate,
  status,
  observations,
  user_id,
}: DebtInputProps) {
  const debt = await prisma.debt.findFirst({
    where: {
      id: debt_id,
    },
  });
  if (!debt) throw new Error("Dívida não encontrada.");

  return await prisma.debt.update({
    where: {
      id: debt_id,
    },
    data: {
      title,
      value,
      dueDate,
      status,
      observations,
      user_id,
    },
  });
}
