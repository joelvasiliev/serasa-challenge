"use server";

import { prisma } from "@/lib/prisma";
import { DebtStatus } from "@prisma/client";

type DebtInputProps = {
  title: string;
  value: number;
  dueDate: Date;
  status: DebtStatus;
  observations: string;
  user_id: string;
};

export async function createDebt({
  title,
  value,
  dueDate,
  status,
  observations,
  user_id,
}: DebtInputProps) {
  return await prisma.debt.create({
    data: {
      title,
      value: Number(value),
      dueDate,
      status,
      observations,
      user_id,
    },
  });
}
