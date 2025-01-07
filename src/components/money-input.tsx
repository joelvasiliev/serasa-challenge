import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface BrazilianCurrencyInputProps {
  name: string;
  form: UseFormReturn<any>
}

export function BrazilianCurrencyInput({ name, form }: BrazilianCurrencyInputProps) {

  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <NumericFormat
            id={name}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            onValueChange={(values) => {
              onChange(values.floatValue);
            }}
            value={value}
            className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-xl shadow-sm focus:outline-none sm:text-sm"
          />
        )}
      />
    </div>
  );
};

