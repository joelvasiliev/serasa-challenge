"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useTranslations } from "next-intl"
import React, { useState } from "react"

export function SettingsSheet({
    children
}: {
    children: React.ReactNode
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="text-white">
        <SheetHeader >
          <SheetTitle className="text-white text-[24px]">{t('header.settings-label')}</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-[85%]">
        </div>
      </SheetContent>
    </Sheet>
  )
}
