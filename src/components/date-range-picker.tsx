"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { adjustDateRange, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from "react"
import { ptBR } from 'date-fns/locale';
import { useTranslations } from "next-intl"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onRangeChange: (range: DateRange | undefined) => void
}

export function DateRangePicker({ className, onRangeChange }: DateRangePickerProps) {
  const t = useTranslations('dashboard')
  const [date, setDate] = React.useState<DateRange | undefined>(adjustDateRange(
    addDays(new Date(), -7),
    addDays(new Date(), -0)
  ));

  useEffect(() => {
    onRangeChange(date)
  }, [date, onRangeChange])

  return (
  <div className="flex space-x-2">
    <Button
      onClick={() => {
        setDate(adjustDateRange(new Date(), new Date()));
      }}
      className={cn(
        date?.from?.toDateString() === new Date().toDateString() &&
          date?.to?.toDateString() === new Date().toDateString()
          ? "bg-black text-white hover:bg-black"
          : ""
      )}
    >
      {t('filters.today')}
    </Button>
    <Button
      onClick={() => {
        setDate(adjustDateRange(
          addDays(new Date(), -1),
          addDays(new Date(), -1)
        ));
      }}
      className={cn(
        date?.from?.toDateString() === addDays(new Date(), -1).toDateString() &&
          date?.to?.toDateString() === addDays(new Date(), -1).toDateString()
          ? "bg-black text-white hover:bg-black"
          : ""
      )}
    >
      {t('filters.yesterday')}
    </Button>
    <Button
      onClick={() => {
        setDate(adjustDateRange(
          addDays(new Date(), -7),
          new Date()
        ));
      }}
      className={cn(
        date?.from?.toDateString() === addDays(new Date(), -7).toDateString() &&
          date?.to?.toDateString() === new Date().toDateString()
          ? "bg-black text-white hover:bg-black"
          : ""
      )}
    >
      {t('filters.last-seven-days')}
    </Button>
    <Button
      onClick={() => {
        setDate(adjustDateRange(
          addDays(new Date(), -30),
          new Date()
        ));
      }}
      className={cn(
        date?.from?.toDateString() === addDays(new Date(), -30).toDateString() &&
          date?.to?.toDateString() === new Date().toDateString()
          ? "bg-black text-white hover:bg-black"
          : ""
      )}
    >
      {t('filters.last-month')}
    </Button>
    <Button
      onClick={() => {
        setDate(adjustDateRange(
          addDays(new Date(), -60),
          new Date()
        ));
      }}
      className={cn(
        date?.from?.toDateString() === addDays(new Date(), -60).toDateString() &&
          date?.to?.toDateString() === new Date().toDateString()
          ? "bg-black text-white hover:bg-black"
          : ""
      )}
    >
      {t('filters.last-sixty-days')}
    </Button>


    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date && date.from && date.to ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", {locale: ptBR})} -{" "}
                  {format(date.to, "LLL dd, y", {locale: ptBR})}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <></>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            lang="ptBR"
            locale={ptBR}
            className="bg-white"
            selected={date}
            onSelect={(value) => {
              if(!value){
                setDate(undefined)
                return
              }
              setDate(adjustDateRange(
                value.from,
                value.to || value.from
              ))
              onRangeChange(date)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>
  )
}
