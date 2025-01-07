import { useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Debt } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { AddOrEditDebtSheet } from '@/components/add-or-edit-debt-sheet'
import { Badge } from '@/components/ui/badge'
import { ConfirmDeleteDebit } from '@/components/confirm-delete-debt'
import { ObservationDialog } from './observations-dialog'
import { useTranslations } from 'next-intl'

interface DebtListProps {
    debts: Debt[]
    onUpdateDebt: (debt: Debt) => void
    onDeleteDebt: (id: string) => void
}

export function DebtList({ debts, onUpdateDebt, onDeleteDebt }: DebtListProps) {
    const t = useTranslations();
    const [editingId, setEditingId] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string | undefined>("ALL")

    const filteredDebts = useMemo(() => {
        return debts.filter(debt => {
            const matchesSearch = debt.title.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "ALL" || debt.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [debts, search, statusFilter]);

    const handleEdit = (debt: Debt) => {
        setEditingId(debt.id)
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full min-h-screen">
            <h2 className="text-xl font-semibold mb-4">{t('dashboard.debt-list.title')}</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Input
                        placeholder={t('dashboard.debt-list.table.search-placeholder')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                        />
                    <Select defaultValue='ALL' onValueChange={setStatusFilter} value={statusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={t('dashboard.debt-list.table.filter-placeholder')} />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        <SelectItem value={"ALL"}>{t('dashboard.status.all') || 'Todos'}</SelectItem>
                        <SelectItem value="PENDING">{t('dashboard.status.pending') || 'Pendente'}</SelectItem>
                        <SelectItem value="PAID">{t('dashboard.status.paid') || 'Pago'}</SelectItem>
                        <SelectItem value="LATE">{t('dashboard.status.late') || 'Atrasado'}</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>{t('dashboard.debt-list.table.title')}</TableHead>
                        <TableHead>{t('dashboard.debt-list.table.value')}</TableHead>
                        <TableHead>{t('dashboard.debt-list.table.expires')}</TableHead>
                        <TableHead>{t('dashboard.debt-list.table.status')}</TableHead>
                        <TableHead>{t('dashboard.debt-list.table.obs')}</TableHead>
                        <TableHead>{t('dashboard.debt-list.table.actions.title')}</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredDebts.map((debt) => (
                        <TableRow key={debt.id}>
                        <TableCell>{debt.title}</TableCell>
                        <TableCell>R$ {debt.value.toFixed(2)}</TableCell>
                        <TableCell>{new Date(debt.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge 
                                className={`rounded-xl hover:scale-105
                                            ${debt.status === "PENDING" && "bg-status-pending"}
                                            ${debt.status === "PAID" && "bg-status-paid"}
                                            ${debt.status === "LATE" && "bg-status-late"}
                                         `}>
                                {debt.status === "PENDING" && t('dashboard.status.pending')}
                                {debt.status === "PAID" && t('dashboard.status.paid')}
                                {debt.status === "LATE" && t('dashboard.status.late')}
                            </Badge>
                        </TableCell>
                        <TableCell><ObservationDialog debt={debt} observation={debt.observations} /></TableCell>
                        <TableCell>
                            <AddOrEditDebtSheet
                                open={editingId === debt.id}
                                setIsOpen={(isOpen: boolean) => {
                                    if (!isOpen) setEditingId(null);
                                }}
                                debt={debt}
                                onUpdateDebt={onUpdateDebt}
                            >
                                <Button onClick={() => handleEdit(debt)} variant="outline" size="sm" className="mr-2 rounded-xl">
                                    {t('dashboard.debt-list.table.actions.button-edit')}
                                </Button>
                            </AddOrEditDebtSheet>
                            <ConfirmDeleteDebit onDeleteDebt={onDeleteDebt} debt={debt}>
                                <Button variant="destructive" size="sm" className='rounded-xl text-white'>
                                    {t('dashboard.debt-list.table.actions.button-delete')}
                                </Button>
                            </ConfirmDeleteDebit>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}