import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { SelectRole } from "./select-role"
import { UseFormReturn, useWatch } from "react-hook-form"
import { Eye, Plus } from "lucide-react"
import { generateRandomPassword } from "@/lib/utils"

export function CreateUserDialog({
    children,
    handleCreateUser,
    open,
    setOpen,
    form
}: {
    children: React.ReactNode,
    handleCreateUser: any,
    open: boolean,
    setOpen: any,
    form: UseFormReturn<{
      email: string,
      password: string,
      role: string
    }>
}) {

    

    const email = useWatch({
        control: form.control,
        name: 'email',
    })
    const password = useWatch({
        control: form.control,
        name: 'password',
    })
    const role = useWatch({
        control: form.control,
        name: 'role',
    })

    const handleRoleChange = (role: string) => {
        form.setValue('role', role);
    }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => setOpen(o)}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Adicionar usuário</DialogTitle>
          <DialogDescription>
            Cria um novo acesso à plataforma como membro ou administrador
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-2">
            <Input {...form.register("email")} id="email" placeholder="Email" type="email" className="col-span-3" />
            <div className="flex space-x-2 justify-between">
                <Input {...form.register("password")} id="password" placeholder="Senha" type="text" className="col-span-3" value={password} />
                <Button onClick={() => generateRandomPassword(form)} type="button">
                    <Eye/>
                    Gerar aleatória
                </Button>
            </div>
            <SelectRole defaultValue="MEMBER" handleRoleChange={handleRoleChange}/>
        </form>
        <DialogFooter>
          <Button onClick={() => handleCreateUser(email, password, role)}>Criar <Plus/></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
