"use client";

import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { adjustDateRange } from "@/lib/adjust-daterange";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useDateRange } from "@/hooks/use-daterange";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  onRangeChange,
}: DateRangePickerProps) {
  const { dateRange, setDateRange } = useDateRange();

  const isSelected = (from: Date, to: Date) =>
    dateRange?.from?.getTime() === from.getTime() &&
    dateRange?.to?.getTime() === to.getTime();

  const handleRangeChange = (from: Date, to: Date) => {
    const range = adjustDateRange(from, to);
    setDateRange(range);
    onRangeChange(range);
  };

  const handleSelect = (value: DateRange | undefined) => {
    if (!value || !value.from) {
      setDateRange(undefined);
      onRangeChange(undefined);
      return;
    }
    if (value.to) {
      // Intervalo completo selecionado
      handleRangeChange(value.from, value.to);
    } else {
      // Apenas o início do intervalo selecionado
      setDateRange({ from: value.from, to: undefined });
    }
  };

  return (
    <div className="flex flex-col">
      <section className="p-2 flex w-full justify-center">
        {dateRange && dateRange.from && dateRange.to ? (
          <div className="items-center flex">
            <p className="text-[18px] mr-2 font-semibold">
              {"Mostrando dados de "}
            </p>
            {format(dateRange.from, "dd LLL - y", { locale: ptBR })} -{" "}
            {format(dateRange.to, "dd LLL - y", { locale: ptBR })}
          </div>
        ) : (
          <span>Escolha uma data</span>
        )}
      </section>
      <div className="flex space-x-2">
        <div className="flex flex-col space-y-2">
          <Button
            className={
              "hover:bg-secondary " +
              cn(isSelected(new Date(), new Date()) && "bg-secondary")
            }
            onClick={() => handleRangeChange(new Date(), new Date())}
          >
            Hoje
          </Button>
          <Button
            className={
              "hover:bg-secondary " +
              cn(
                isSelected(addDays(new Date(), -1), addDays(new Date(), -1)) &&
                  "bg-secondary"
              )
            }
            onClick={() =>
              handleRangeChange(addDays(new Date(), -1), addDays(new Date(), -1))
            }
          >
            Ontem
          </Button>
          <Button
            className={
              "hover:bg-secondary " +
              cn(
                isSelected(addDays(new Date(), -7), new Date()) &&
                  "bg-secondary"
              )
            }
            onClick={() =>
              handleRangeChange(addDays(new Date(), -7), new Date())
            }
          >
            Últimos 7 dias
          </Button>
          <Button
            className={
              "hover:bg-secondary " +
              cn(
                isSelected(addDays(new Date(), -30), new Date()) &&
                  "bg-secondary"
              )
            }
            onClick={() =>
              handleRangeChange(addDays(new Date(), -30), new Date())
            }
          >
            Últimos 30 dias
          </Button>
          <Button
            className={
              "hover:bg-secondary " +
              cn(
                isSelected(addDays(new Date(), -60), new Date()) &&
                  "bg-secondary"
              )
            }
            onClick={() =>
              handleRangeChange(addDays(new Date(), -60), new Date())
            }
          >
            Últimos 60 dias
          </Button>
        </div>

        <div className={cn("grid gap-2 w-auto p-0", className)}>
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            modifiers={{
              hoverRange: (date: Date) =>
                !!dateRange?.from && !dateRange?.to && date >= dateRange.from,
            }}
            modifiersClassNames={{
              hoverRange: "bg-secondary/50",
            }}
          />
        </div>
      </div>
    </div>
  );
}
