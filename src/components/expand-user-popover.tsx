"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoutButton } from "@/components/logout-button";
import { useTranslations } from "next-intl";
import { SettingsDialog } from "./settings-dialog";
import { LanguageSelector } from "./language-selector";

export function ExpandUserPopover({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const icons = [
    { icon: <SettingsDialog/>},
    { icon: <LanguageSelector/>},
    { icon: <LogoutButton /> },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, type: "spring", stiffness: 300 },
    }),
    exit: (index: number) => ({
      opacity: 0,
      y: -20,
      transition: { delay: (icons.length - index - 1) * 0.1, type: "spring" },
    }),
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-28 bg-transparent shadow-none border-none">
        <div className="flex flex-col space-y-4">
          <AnimatePresence>
            {isOpen &&
              icons.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center h-full "
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  variants={itemVariants}
                >
                    {item.icon}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  );
}
