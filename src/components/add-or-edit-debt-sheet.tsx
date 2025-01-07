"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, useWatch } from "react-hook-form";
import { Debt } from "@prisma/client";
import { toast } from "sonner";
import StatusBadge from "./status-badge";
import { createDebt } from "@/actions/debts/create-debt";
import { useUser } from "@/hooks/use-user";
import { editDebt } from "@/actions/debts/edit-debt";
import { BrazilianCurrencyInput } from "./money-input";
import { Calendar } from "./ui/calendar";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

interface AddDebtFormProps {
  children: React.ReactNode;
  open: boolean;
  setIsOpen: (v: boolean) => void;
  debt?: Debt;
  onUpdateDebt?: (debt: Debt) => void
  onAddDebt?: (debt: Debt) => void
}

export function AddOrEditDebtSheet({
  children,
  open,
  setIsOpen,
  debt,
  onUpdateDebt,
  onAddDebt,
}: AddDebtFormProps) {
  const {user} = useUser();
  const form = useForm({
    defaultValues: {
      title: debt?.title || "",
      value: debt?.value || 0,
      dueDate: debt?.dueDate ? new Date(debt.dueDate).toISOString().slice(0, 10) : "",
      status: debt?.status || "PENDING",
      observations: debt?.observations || "",
      user_id: debt?.user_id || "",
    },
  });

  const handleSubmit = async (data: any) => {
    try{
    if(!user) {
      return;
    }
    if (debt) {
      toast.dismiss();
      toast.loading("Editando dívida...")

      await editDebt({
        debt_id: debt.id,
        title,
        value: Number(value),
        dueDate: new Date(dueDate),
        status,
        observations,
        user_id: user.id
      });

      toast.dismiss();
      toast.success("Dívida editada com sucesso");
      setIsOpen(false);
      if(onUpdateDebt)
        onUpdateDebt(debt);

      return;
    } else {
      toast.dismiss();
      toast.loading("Salvando dívida...")

      const new_debt = await createDebt({
        title,
        value,
        dueDate: new Date(dueDate),
        status,
        observations,
        user_id: user.id
      });

      if(onAddDebt){
        onAddDebt(new_debt);
      }

      toast.dismiss();
      toast.success("Dívida salva com sucesso")
      form.reset();
      setIsOpen(false);
      
      return;
    }
    }
    catch(e: any){
      toast.dismiss();
      toast.error(e.message || "Ocorreu um erro desconhecido");
    }
  };

  const title = useWatch({
    control: form.control,
    name: "title",
  });
  const value = useWatch({
    control: form.control,
    name: "value",
  });
  const dueDate = useWatch({
    control: form.control,
    name: "dueDate",
  });
  const status = useWatch({
    control: form.control,
    name: "status",
  });
  const observations = useWatch({
    control: form.control,
    name: "observations",
  });

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      {open && (
        <SheetContent side="right" className="bg-white text-black">
          <SheetHeader>
            <SheetTitle className="text-[24px]">
              {debt ? "Editar Dívida" : "Nova Dívida"}
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-6 space-y-4"
          >
            <Input
              {...form.register("title")}
              placeholder="Título da dívida"
              required
            />
            <BrazilianCurrencyInput form={form} name="value"/>
            
            <Popover>
              <PopoverTrigger>
                <Input
                  {...form.register("dueDate")}
                  type="date"
                  contentEditable={false}
                  required
                  className="select-none cursor-pointer"
                  />
              </PopoverTrigger>
              <PopoverContent>
              <Calendar
                mode="single"
                selected={dueDate ? new Date(dueDate) : undefined}
                onSelect={(date: Date | undefined) => {
                  if (date) {
                    form.setValue("dueDate", date.toISOString().slice(0, 10));
                  }
                }}
                className="bg-white rounded-md border shadow"
              />
              </PopoverContent>
            </Popover>

            
            <Input
              {...form.register("observations")}
              placeholder="Observações (opcional)"
            />
              <h2 className="font-semibold mr-1">{"Status:"}</h2>

            <div className="flex justify-evenly w-full">

              <StatusBadge
                status="PENDING"
                currentStatus={status}
                onClick={() => form.setValue('status', "PENDING")}
                label="Pendente"
                className="bg-status-pending"
              />
              <StatusBadge
                status="PAID"
                currentStatus={status}
                onClick={() => form.setValue('status', "PAID")}
                label="Pago"
                className="bg-status-paid"
              />
              <StatusBadge
                status="LATE"
                currentStatus={status}
                onClick={() => form.setValue('status', "LATE")}
                label="Atrasado"
                className="bg-status-late"
              />

            </div>
            <Button
              type="submit"
              variant={"outline"}
              className="w-full"
            >
              {debt ? "Salvar Alterações" : "Adicionar Dívida"}
            </Button>
          </form>
        </SheetContent>
      )}
    </Sheet>
  );
}
