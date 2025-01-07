"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Settings, Users2, User2 } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { UserCard } from "./user-card";
import { UserRole } from "@prisma/client";
import { formatRole } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { LanguageSelector } from "./language-selector";
import { Tippy } from "./ui/tooltip";
import { useTranslations } from "next-intl";

export function SettingsDialog({
    
}: {
}){
    const t = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState("");
    const {user} = useUser();
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
            modal
        >
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="hover:bg-gray-300 border border-gray-400/40 h-[50px] bg-white rounded-xl flex">
                    <Settings size={16} className="flex w-full text-center items-center animate-spin-slow"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 !max-w-5xl !max-h-lg bg-card truncate h-max min-h-96 transition-all duration-200">
                <Tabs defaultValue={tab ?? 'account'} className="!grid !grid-cols-[max-content_1px_1fr] w-full max-md:!grid-cols-1 max-md:!justify-center">
                    <TabsList className="p-3 rounded-none flex flex-col mt-12">
                        <TabsTrigger value="account">
                            <User2/>
                            <p>{t('settings.account.title')}</p>
                        </TabsTrigger>
                        <DialogDescription className="my-2">
                            {
                                user && (
                                user.role === "ADMIN"
                            ) &&
                            t('settings.membership.label')
                            }
                        </DialogDescription>
                        {
                            (
                                user && user.role === "ADMIN"
                            ) &&
                            <TabsTrigger value="godchildren">
                                <Users2 className="text-gray-500"/>
                                <p className="text-gray-500">{t('settings.membership.title')}</p>
                            </TabsTrigger>
                        }
                    </TabsList>
                    <Separator orientation="vertical" />
                    <TabsContent value="account" className="!py-6">
                        <div className="w-full h-full">
                            <div className="flex flex-col space-y-2 h-[90%]">
                                <section className="flex font-semibold">{t('settings.account.email')}: <p className="font-normal ml-2">{`${user && user.email || ""}`}</p></section>
                                <section className="flex font-semibold">{t('settings.account.role')}: <p className="font-normal ml-2">{formatRole(user && user.role || "" as UserRole)}</p></section>
                                <section className="flex space-x-4 items-center font-semibold">
                                    <p>{t('settings.account.language')}:</p>
                                    <LanguageSelector/>
                                </section>

                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="godchildren" className="!p-2 mt-8">
                        <div className="flex w-full">
                            
                            <UserCard/>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}