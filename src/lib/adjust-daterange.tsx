"use client"

export function adjustDateRange(from: Date, to: Date) {
    return {
      from: new Date(from.setHours(0, 0, 0, 0)), // Início do dia
      to: new Date(to.setHours(23, 59, 59, 999)), // Fim do dia
    };
  }
  