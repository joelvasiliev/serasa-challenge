import { Debt } from "@prisma/client"
import { DebtsChart } from "./charts/debts-chart"
import { Card } from "@/components/ui/card"

interface DebtSummaryProps {
    debts: Debt[]
}

export function DebtGraph({ debts }: DebtSummaryProps) {
    return (
        <Card className="bg-white flex flex-col space-y-2 h-[400px] p-6 shadow-md mb-6 rounded-xl">
            <h2 className="">Gráfico de dívidas</h2>
            <DebtsChart debts={debts}/>
        </Card>
    )
}