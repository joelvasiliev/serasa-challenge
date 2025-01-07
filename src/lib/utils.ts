import { UserRole } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function adjustDateRange(from: Date | undefined, to: Date | undefined) {
  if (!from || !to) return;
  return {
    from: new Date(from.setHours(0, 0, 0, 0)), // Início do dia
    to: new Date(to.setHours(23, 59, 59, 999)), // Fim do dia
  };
}

export function generateRandomPassword(form: UseFormReturn<any>) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  const allCharacters = uppercase + lowercase + numbers + symbols;

  let password = "";

  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = password.length; i < 12; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  form.setValue("password", password);
  return password;
}

export const formatRole = (role: UserRole) => {
  const t = useTranslations();
  switch (role) {
    case "ADMIN":
      return t("dashboard.role.admin");
    case "MEMBER":
      return t("dashboard.role.member");
  }
};
