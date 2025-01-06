import { clsx, type ClassValue } from "clsx";
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
