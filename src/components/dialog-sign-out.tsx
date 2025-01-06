"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function DialogSignOut({
  children
}: {
  children: React.ReactNode
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    toast.dismiss();
    toast.loading(t('toast.logging-out-label'))
    await signOut();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white text-black shadow-none border-none">
        <DialogHeader>
          <DialogTitle className="text-black">
            {t('login.sign-out-dialog-title')}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
          {t('login.sign-out-dialog-description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="hover:bg-gray-200 text-black border-bg-gray-400/30 border"
          >
            {t('login.cancel-button-label')}
          </Button>
          <Button
            onClick={handleLogout}
            variant={"destructive"}
            className="text-white hover:bg-red-800"
          >
            {t('login.sign-out-button-label')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
