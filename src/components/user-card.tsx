"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Loader2, Plus, Trash } from "lucide-react";
import { User } from "@prisma/client";
import { Input } from "./ui/input";
import { CreateUserDialog } from "./create-user-dialog";
import { SelectRole } from "./select-role";
import { useForm } from "react-hook-form";
import { useUser } from "@/hooks/use-user";

const USERS_PER_PAGE = 5;

export function UserCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = useUser()
  
  const [totalPages, setTotalPages] = useState(Math.ceil(users.length / USERS_PER_PAGE));
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "AFFILIATE",
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / USERS_PER_PAGE));
  }, [users]);

  const fetchUsers = async () => {
    const res = await fetch(`/api/user`);
    const users = await res.json();
    setUsers(users);
    setLoading(false);
    setOpenCreateUserDialog(false);
  };

  const handleCreateUser = async (email: string, password: string, role: string) => {
    try {
      if (password === "" || email === "" || role === "") {
        throw new Error("Preencha todos os campos");
      }

      const res = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
          godfather_id: user?.id || null,
        }),
      });
      if (res.status === 201) {
        toast.dismiss()
        toast.success("Usuário criado com sucesso");
        setOpenCreateUserDialog(false);
        fetchUsers();
        form.reset();
        return;
      }

      const { error } = await res.json();
      throw new Error(error);
    } catch (e: any) {
      toast.dismiss()
      toast.error(e.message);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const res = await fetch(`/api/user/update-role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          role,
        }),
      });

      if (res.status === 201) {
        toast.success("Permissão atualizada com sucesso!");
        return;
      }
      throw new Error("");
    } catch (e) {
      toast.error("Ocorreu um erro ao mudar a role");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (query: string) => {
    if(query === "") {
        setSearchQuery("")
        fetchUsers()
        return;
    }
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = users.filter((user) =>
      user.email?.toLowerCase().includes(lowerCaseQuery)
    );
    setUsers(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (user_id: string) => {
    try {
      await fetch(`/api/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
        }),
      });
      toast.success(`Usuário deletado com sucesso`);
      fetchUsers();
    } catch (e: any) {
      toast.error(`${e.message}`);
    }
  };

  const paginatedUsers = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return users.slice(startIndex, startIndex + USERS_PER_PAGE);
  };

  return (
    <div className="space-y-4 w-full flex flex-col">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Pesquisar"
        />
        {
        (
          user && user.role === "ADMIN"
        ) && (
          <CreateUserDialog
            form={form}
            open={openCreateUserDialog}
            setOpen={setOpenCreateUserDialog}
            handleCreateUser={handleCreateUser}
          >
            <Button>
              Criar usuário <Plus />
            </Button>
          </CreateUserDialog>
        )}
      </div>

      {loading && 
          <Loader2 className="animate animate-spin"/>
        }
      {!loading &&
        paginatedUsers().map((u) => (
          <Card key={u?.id} className="flex items-center justify-between p-4 group">
            <div className="flex items-center space-x-4">
              <img
                src={u?.image || `https://ui-avatars.com/api/?name=${u?.email}`}
                alt={`${u?.name|| "Nameless - "}' profile photo.`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-medium">{u?.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {
                user && user.role === "ADMIN" &&
                <SelectRole
                  defaultValue={u.role}
                  handleRoleChange={(selected_role) => handleRoleChange(u?.id, selected_role)}
                />
              }
              {
                (user && user.role === "ADMIN") &&
                <Button
                  onClick={() => {
                    handleDelete(u?.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[40px]"
                  variant={"destructive"}
                >
                  <Trash />
                </Button>
              }
            </div>
          </Card>
        ))}
      <div className="flex items-center justify-center space-x-2 h-full mt-auto">
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </Button>
        <span className="text-sm font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>Próxima</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
