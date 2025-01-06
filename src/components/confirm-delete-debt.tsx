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
import { toast } from "sonner"
import { Debt } from "@prisma/client"
import { deleteDebt } from "@/actions/debts/delete-debt"

export function ConfirmDeleteDebit({
  children,
  debt,
  onDeleteDebt
}: {
  children: React.ReactNode,
  debt: Debt
  onDeleteDebt: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    try{
    toast.dismiss();
    toast.loading('Excluindo dívida...')
    await deleteDebt({debt_id: debt.id});
    toast.dismiss();
    toast.success("Dívida excluída com sucesso")
    setOpen(false);
    onDeleteDebt(debt.id);
  }catch(e: any){
    toast.dismiss();
    toast.error(e.message);
  }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white shadow-none border-none">
        <DialogHeader>
          <DialogTitle className="text-black">
            {`Você tem certeza que quer excluir a dívida "${debt.title}"?`}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Essa ação não pode ser desfeita
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="hover:bg-gray-200 text-black border-bg-gray-400/30 border"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="text-white bg-status-late hover:bg-destructive"
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
