import { LogOut } from "lucide-react";
import { DialogSignOut } from "@/components/dialog-sign-out";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function LogoutButton(){
    const t = useTranslations();
    return (
        <DialogSignOut>
            <Button 
                tippy={t('header.logout-label')}
                side="left"
                variant="ghost" className="text-secondary bg-background-foreground-fullfiled rounded-full h-[50px] w-[50px] hover:text-white"
            >
                <LogOut />
            </Button>
        </DialogSignOut>
    )
}