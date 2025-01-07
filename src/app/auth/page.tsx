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
import { useTranslations } from "next-intl";

export default function Page() {
    const { handleRefreshUser } = useUser();
    const router = useRouter();
    const t = useTranslations();

    const [activeTab, setActiveTab] = useState("login");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            toast.dismiss();
            toast.loading(t('toast.logging-in-label'));
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
                toast.error(t('toast.invalid-credentials'));
            } else {
                handleRefreshUser();
                toast.dismiss();
                toast.success(t('toast.log-in-success'))
                router.push("/dashboard");
            }
        } catch (e) {
            toast.dismiss();
            toast.error(t('toast.log-in-failure'));
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
                toast.error(t('toast.passwords-doesnt-match'));
                return;
            }

            toast.dismiss();
            toast.loading(t('toast.creating-user'));

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
                toast.success(t('toast.created-user'));
                setActiveTab("login");
                return;
            } else if (response.status === 500) {
                toast.dismiss();
                toast.error(t('toast.internal-server-error'));
                return;
            }
            throw new Error(t('toast.log-in-failure'));
        } catch (e) {
            toast.dismiss();
            toast.error(t('toast.log-in-failure'));
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-100">
            <BackgroundPattern />
            <div className="w-full max-w-md h-[600px] space-y-8 px-4 bg-white py-8 shadow-lg rounded-lg z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger className="data-[state=active]:text-white data-[state=active]:bg-black border rounded-xl" value="login">
                            {t('login.tab')}
                        </TabsTrigger>
                        <TabsTrigger className="data-[state=active]:text-white data-[state=active]:bg-black border rounded-xl" value="register">
                            {t('register.tab')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">{t('login.title')}</h1>
                            <p className="text-gray-500">{t('login.subtitle')}</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">{t('login.email-input-label')}</Label>
                                <Input id="login-email" name="email" type="email" placeholder={t('login.email-input-placeholder')} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="login-password">{t('login.password-input-label')}</Label>
                                <Input id="login-password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full text-white bg-black hover:bg-black/80">
                                {t('login.sign-in-button')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="register">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">{t('register.title')}</h1>
                            <p className="text-gray-500">{t('register.subtitle')}</p>
                        </div>
                        <form onSubmit={handleRegister} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="register-email">{t('register.email-input-label')}</Label>
                                <Input id="register-email" name="email" type="email" placeholder={t('register.email-input-placeholder')} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-password">{t('register.password-input-label')}</Label>
                                <Input id="register-password" name="password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password">{t('register.password-confirmation-input-label')}</Label>
                                <Input id="register-confirm-password" name="confirm-password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full text-white bg-black hover:bg-black/80">
                                {t('register.button-label')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
