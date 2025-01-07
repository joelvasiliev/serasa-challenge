"use client"

import { useEffect, useState } from 'react'
import { DebtGraph } from "./components/debts-graph"
import { DebtList } from "./components/debts-list"
import { Debt } from '@prisma/client'
import { Header } from '@/components/header'
import { DebtSummary } from './components/debts-summary'
import { StyledCheckbox } from '@/components/styled-checkbox'
import { getDebts } from '@/actions/debts/get-debts'
import { useUser } from '@/hooks/use-user'
import { motion, AnimatePresence } from "framer-motion"
import { DateRange } from 'react-day-picker'
import { DateRangePicker } from '@/components/date-range-picker'
import { useTranslations } from 'next-intl'

export default function Page() {
    const t = useTranslations('dashboard')
    const [toggleDebtsGraph, setToggleDebtsGraph] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const { user } = useUser();

    useEffect(() => {
        const fetchDebits = async () => {
            if (user) {
                const debts = await getDebts(user.id, dateRange);
                setDebts(debts);
            }
        };
        fetchDebits();
    }, [user, dateRange]);

    const [debts, setDebts] = useState<Debt[]>([]);

    const addDebt = (newDebt: Debt) => {
        setDebts([...debts, { ...newDebt }]);
    };

    const updateDebt = (updatedDebt: Debt) => {
        setDebts(debts.map(debt => debt.id === updatedDebt.id ? updatedDebt : debt));
    };

    const deleteDebt = (id: string) => {
        setDebts(debts.filter(debt => debt.id !== id));
    };

    const debtListVariants = {
        expanded: { width: "100%" },
        compressed: { width: "60%" },
    };

    const debtGraphVariants = {
        visible: { x: 0, opacity: 1 },
        hidden: { x: 50, opacity: 0 },
    };

    const handleDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range);
      };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 overflow-x-hidden">
            <Header />
            <main className="flex-grow p-6">
                <div className='flex w-full justify-between'>
                    <div className='flex space-x-2'>
                        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
                        <DateRangePicker lang="ptbr" onRangeChange={handleDateRangeChange}/>
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <p>{t('graphs.checkbox-label')}</p>
                        <StyledCheckbox 
                            initialChecked={toggleDebtsGraph} 
                            onChange={() => setToggleDebtsGraph(!toggleDebtsGraph)} 
                        />
                    </div>
                </div>
                <DebtSummary debts={debts} onAddDebt={addDebt} />

                <div className="flex space-x-2 flex-col md:flex-row">
                    {/* Animação da tabela de dívidas */}
                    <motion.div
                        className="transition-all duration-300 min-w-[70%]"
                        variants={debtListVariants}
                        animate={toggleDebtsGraph ? "compressed" : "expanded"}
                        transition={{ duration: 0.5 }}
                    >
                        <DebtList debts={debts} onUpdateDebt={updateDebt} onDeleteDebt={deleteDebt} />
                    </motion.div>

                    {/* Animação do gráfico */}
                    <AnimatePresence>
                        {toggleDebtsGraph && (
                            <motion.div
                                className="w-full md:w-[40%] ml-auto"
                                variants={debtGraphVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ duration: 0.5 }}
                            >
                                <DebtGraph debts={debts} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
