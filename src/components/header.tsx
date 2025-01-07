import { PieChart } from "lucide-react";
import Link from "next/link";
import { ExpandUserPopover } from "./expand-user-popover";
import { UserProfileButton } from "./user-profile-button";
import Image from 'next/image';

type HeaderProps = {
    landing_page?: boolean
}

export function Header({
    landing_page
}: HeaderProps){
    return (
        <header className="px-4 lg:px-6 h-20 flex items-center justify-between">
            <Link className="flex items-center justify-center hover:scale-105" href="#">
                <Image alt="Logo" width={150} height={50} src={"/logo.svg"}/>
                {/* <span className="ml-2 text-2xl font-bold text-gray-900">Serasa</span> */}
            </Link>
           {
            landing_page ?
            <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
                <Link className="text-[18px] hover:scale-105" href="#features">
                    Recursos
                </Link>
                <Link className="text-[18px] hover:scale-105" href="#how-it-works">
                    Como Funciona
                </Link>
                <Link className="text-[18px] hover:scale-105" href="#testimonials">
                    Depoimentos
                </Link>
            </nav>
            :
            <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
                <ExpandUserPopover>
                    <UserProfileButton/>
                </ExpandUserPopover>
            </nav>
           }
        </header>
    )
}