"use client";

import { Debt } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { AddOrEditDebtSheet } from "@/components/add-or-edit-debt-sheet";
import { useTranslations } from "next-intl";

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
    const t = useTranslations('dashboard');

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
        <Card className="bg-white flex flex-wrap sm:flex-nowrap justify-between items-center p-6 shadow-md mb-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-4 w-full sm:grid-cols-4 sm:gap-8 md:flex md:col-span-2">
                <div>
                    <p className="text-sm text-gray-600">{t('graphs.card.total-label')}</p>
                    <p className="text-2xl font-bold">{totalDebts}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">{t('graphs.card.pending-label')}</p>
                    <p className="text-2xl font-bold">R$ {totalPendingAmount.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">{t('graphs.card.paid-label')}</p>
                    <p className="text-2xl font-bold">R$ {paidDebts.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">{t('graphs.card.late-label')}</p>
                    <p className="text-2xl font-bold">R$ {lateDebts.toFixed(2)}</p>
                </div>
            </div>
            <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-center">
                <AddOrEditDebtSheet
                    open={openNewDebt}
                    setIsOpen={setOpenNewDebt}
                    onAddDebt={onAddDebt}
                >
                    <Button className="space-x-2 p-3" variant={"outline"}>
                        <Plus />
                        <p className="text-[15px]">{t('graphs.card.new-debt')}</p>
                    </Button>
                </AddOrEditDebtSheet>
            </div>
        </Card>
    );
}
