import { useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Debt } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { AddOrEditDebtSheet } from '@/components/add-or-edit-debt-sheet'
import { Badge } from '@/components/ui/badge'
import { ConfirmDeleteDebit } from '@/components/confirm-delete-debt'

interface DebtListProps {
    debts: Debt[]
    onUpdateDebt: (debt: Debt) => void
    onDeleteDebt: (id: string) => void
    onAddDebt: (debt: Debt) => void
}

export function DebtList({ debts, onUpdateDebt, onDeleteDebt, onAddDebt }: DebtListProps) {
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
            <h2 className="text-xl font-semibold mb-4">Lista de Dívidas</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Input
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                        />
                    <Select defaultValue='ALL' onValueChange={setStatusFilter} value={statusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        <SelectItem value={"ALL"}>Todos</SelectItem>
                        <SelectItem value="PENDING">Pendente</SelectItem>
                        <SelectItem value="PAID">Pago</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead>Ações</TableHead>
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
                                {debt.status === "PENDING" && "Pendente"}
                                {debt.status === "PAID" && "Pago"}
                                {debt.status === "LATE" && "Atrasado"}
                            </Badge>
                        </TableCell>
                        <TableCell>{debt.observations || '-'}</TableCell>
                        <TableCell>
                            <AddOrEditDebtSheet
                                open={editingId === debt.id}
                                setIsOpen={(isOpen: boolean) => {
                                    if (!isOpen) setEditingId(null);
                                }}
                                debt={debt}
                                onUpdateDebt={onUpdateDebt}
                            >
                                <Button onClick={() => handleEdit(debt)} variant="outline" size="sm" className="mr-2 rounded-xl text-white">
                                    Editar
                                </Button>
                            </AddOrEditDebtSheet>
                            <ConfirmDeleteDebit onDeleteDebt={onDeleteDebt} debt={debt}>
                                <Button variant="destructive" size="sm" className='rounded-xl text-white'>
                                    Excluir
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