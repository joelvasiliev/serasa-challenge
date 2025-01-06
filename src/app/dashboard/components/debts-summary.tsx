"use client";

import { Debt } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { AddOrEditDebtSheet } from "@/components/add-or-edit-debt-sheet";

interface DebtSummaryProps {
    debts: Debt[];
    onAddDebt: (debt: Debt) => void;
}

export function DebtSummary({ debts, onAddDebt }: DebtSummaryProps) {
    const [totalDebts, setTotalDebts] = useState(0);
    const [totalPendingAmount, setTotalPendingAmount] = useState(0);
    const [paidDebts, setPaidDebts] = useState(0);
    const [lateDebts, setLateDebts] = useState(0);
    const [openNewDebt, setOpenNewDebt] = useState(false);

    useEffect(() => {
        setTotalDebts(debts.length);

        const pendingAmount = debts
            .filter((debt) => debt.status === "PENDING")
            .reduce((sum, debt) => sum + debt.value, 0);
        setTotalPendingAmount(pendingAmount);

        const paid = debts
            .filter((debt) => debt.status === "PAID")
            .reduce((sum, debt) => sum + debt.value, 0);
        setPaidDebts(paid);

        const late = debts
            .filter((debt) => debt.status === "LATE")
            .reduce((sum, debt) => sum + debt.value, 0);
        setLateDebts(late);
    }, [debts]);

    return (
        <Card className="bg-white flex justify-between items-center p-6 shadow-md mb-6 rounded-2xl">
            <div className="flex gap-12 row-span-2">
                <div>
                    <p className="text-sm text-gray-600">Total de Dívidas</p>
                    <p className="text-2xl font-bold">{totalDebts}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Dívidas Pendentes</p>
                    <p className="text-2xl font-bold">R$ {totalPendingAmount.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Dívidas Pagas</p>
                    <p className="text-2xl font-bold">R$ {paidDebts.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Dívidas Atrasadas</p>
                    <p className="text-2xl font-bold">R$ {lateDebts.toFixed(2)}</p>
                </div>
            </div>
            <AddOrEditDebtSheet
                open={openNewDebt}
                setIsOpen={setOpenNewDebt}
                onAddDebt={onAddDebt}
            >
                <Button className="text-white space-x-2 p-3" variant={"outline"}>
                    <Plus />
                    <p className="text-[15px]">Nova dívida</p>
                </Button>
            </AddOrEditDebtSheet>
        </Card>
    );
}
