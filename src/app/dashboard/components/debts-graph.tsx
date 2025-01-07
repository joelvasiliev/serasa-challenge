import { Debt } from "@prisma/client"
import { DebtsChart } from "./charts/debts-chart"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl"

interface DebtSummaryProps {
    debts: Debt[]
}

export function DebtGraph({ debts }: DebtSummaryProps) {
    const t = useTranslations('dashboard.graphs');
    return (
        <Card className="bg-white flex flex-col space-y-2 h-[400px] p-6 shadow-md mb-6 rounded-xl">
            <h2 className="">{t('title')}</h2>
            <DebtsChart debts={debts}/>
        </Card>
    )
}