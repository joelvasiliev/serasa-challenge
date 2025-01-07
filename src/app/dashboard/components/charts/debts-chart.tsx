"use client";

import { Debt } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DebtChartProps {
  debts: Debt[];
}

export function DebtsChart({ debts }: DebtChartProps) {
  const t = useTranslations('dashboard')
  const [isClient, setIsClient] = useState(false);

  const statusTranslation: Record<string, string> = {
    PENDING: t('status.pending'),
    PAID: t('status.paid'),
    LATE: t('status.late'),
  };

  const data = useMemo(() => {
    const statusCounts = debts.reduce((acc, debt) => {
      acc[debt.status] = (acc[debt.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({
      name: statusTranslation[name] || name, // Traduz o status ou mantém o original
      value,
    }));
  }, [debts]);

  useEffect(() => {
    if (data && data.length > 0) setIsClient(true); // Define que estamos no cliente
  }, [data]);

  const COLORS = ["#34eb40", "#fad107", "#fa0707"];

  if (!isClient) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>{`${data.value} ${data.value === 1 ? "item" : "itens"}`}</p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, entry) => sum + entry.value, 0) || 0;

  return (
    <div className="flex items-center w-full">
      <div className="relative justify-start flex w-[60%]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={114}
              innerRadius={100}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <text
              className="items-center"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              <tspan x="50%" dy="-0.25em" fontSize="2em" fontWeight="bold">
                {total}
              </tspan>
              <tspan x="50%" dy="1.7em" fontSize="1em">
                {t('graphs.card.total-label')}
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2 w-[35%]">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center w-full">
            <div className="flex w-full items-center space-x-1 text-start">
              <div
                className="w-4 h-4 mr-2 items-center border-none rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-black w-full">{entry.name}:</span>
            </div>
            <p className="text-black w-full text-right">{entry.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
