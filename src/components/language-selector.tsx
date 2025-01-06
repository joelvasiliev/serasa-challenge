'use client'

import { useState } from 'react'
import { Globe} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import setLanguage from '@/actions/translation/set-translation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const languages = [
  { name: 'Português (Brasil)', value: 'pt-BR', flag: <Image width={40} height={25} src={"/countries/brazil.svg"} alt="Brazil flag"/> },
  { name: 'English', value: 'en-US', flag: <Image draggable={false} width={40} height={25} src={"/countries/usa.svg"} alt="USA flag"/> },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations();

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          tippy={t('header.language-selector-label')}
          side="left"
          className='text-white w-[50px] h-[50px] hover:bg-secondary'
        >
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-white bg-background border border-background-foreground' align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            className='focus:bg-background-foreground !text-white'
            key={lang.value}
            textValue={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

