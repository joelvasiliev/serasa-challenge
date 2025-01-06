'use client'

import { Label } from './label'
import { Input } from './input'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { SubmitFormTask } from '@/app/(main)/tasks/components/create-or-edit-task'

interface StyledCheckboxProps {
  onChange?: (checked: boolean) => void
  form: UseFormReturn<SubmitFormTask>,
  form_label: string
}

export function StyledCheckbox({ onChange, form, form_label }: StyledCheckboxProps) {
  const has_expire_date = useWatch({
    control: form.control,
    name: form_label as any
  })

  const handleToggle = () => {
    form.setValue(form_label as any, !has_expire_date)
  }

  

  return (
    <Label className="flex items-center cursor-pointer">
      <div className="relative">
        <Input
          {...form.register('has_expire_date')}
          type="checkbox"
          className="sr-only"
          checked={has_expire_date}
          onChange={handleToggle}
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
            has_expire_date ? 'bg-secondary' : 'bg-background-foreground-fullfiled'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
            has_expire_date ? 'transform translate-x-full' : ''
          }`}
        ></div>
      </div>
    </Label>
  )
}

