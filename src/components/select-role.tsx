"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserRole } from "@prisma/client";
import { useUser } from "@/hooks/use-user";

export function SelectRole({
    handleRoleChange,
    defaultValue
}: {
    handleRoleChange: (role: UserRole) => void;
    defaultValue: UserRole
}){

    const {user} = useUser();
    return (
        <Select
              defaultValue={defaultValue}
              onValueChange={handleRoleChange}
            >
            <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Selecionar função" />
            </SelectTrigger>
            <SelectContent className="bg-white">
            {
                user && user.role === "ADMIN" &&
                <SelectItem value="ADMIN">Admin</SelectItem>
            }
            {
            <SelectItem value="MEMBER">Membro</SelectItem>
            }
            </SelectContent>
        </Select>
    )
}