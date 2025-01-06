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
import React from "react"

export function NotificationsSheet({
    children,
    open,
    setIsOpen
}: {
    children: React.ReactNode,
    open: boolean,
    setIsOpen: (v: boolean) => void,
}) {
  const t = useTranslations();

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
        {open && (
          <SheetContent
            side="right"
            className="text-white"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-[24px]">{t('notifications.title')}</SheetTitle>
              <SheetDescription>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        )}
    </Sheet>
  )
}
