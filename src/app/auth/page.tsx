"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { BackgroundPattern } from "./components/background-pattern";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const { handleRefreshUser } = useUser();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("login");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            toast.dismiss();
            toast.loading("Entrando...");
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");
            const response = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            if (response?.error) {
                toast.dismiss();
                toast.error("Email ou senha inválidos");
            } else {
                handleRefreshUser();
                toast.dismiss();
                toast.success("Autenticado com sucesso")
                router.push("/dashboard");
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Ocorreu um erro ao entrar");
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");
            const confirmPassword = formData.get("confirm-password");

            if (password !== confirmPassword) {
                toast.dismiss();
                toast.error("As senhas não coincidem");
                return;
            }

            toast.dismiss();
            toast.loading("Criando usuário...");

            const response = await fetch(`/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 201) {
                toast.dismiss();
                toast.success("Usuário criado com sucesso");
                setActiveTab("login");
                return;
            } else if (response.status === 500) {
                toast.dismiss();
                toast.error("Estamos com problemas em nossos serviços, por favor tente novamente mais tarde.");
                return;
            }
            throw new Error("Ocorreu um erro desconhecido");
        } catch (e) {
            toast.dismiss();
            toast.error("Ocorreu um erro ao se registrar");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-100">
            <BackgroundPattern />
            <div className="w-full max-w-md h-[600px] space-y-8 px-4 bg-white py-8 shadow-lg rounded-lg z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger className="data-[state=active]:text-white border rounded-xl" value="login">
                            Login
                        </TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white border rounded-xl" value="register">
                            Registro
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">Entrar na sua conta</h1>
                            <p className="text-gray-500">Digite suas credenciais para acessar sua conta</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input id="login-email" name="email" type="email" placeholder="seu@email.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="login-password">Senha</Label>
                                <Input id="login-password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Entrar
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="register">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">Crie sua conta</h1>
                            <p className="text-gray-500">Preencha os dados abaixo para se registrar</p>
                        </div>
                        <form onSubmit={handleRegister} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="register-email">Email</Label>
                                <Input id="register-email" name="email" type="email" placeholder="seu@email.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-password">Senha</Label>
                                <Input id="register-password" name="password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password">Confirme a senha</Label>
                                <Input id="register-confirm-password" name="confirm-password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Registrar
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
