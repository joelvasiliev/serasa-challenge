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
                variant="ghost" className="text-black border border-gray-400/40 bg-white rounded-xl h-[50px] w-[50px] hover:bg-gray-300"
            >
                <LogOut />
            </Button>
        </DialogSignOut>
    )
}