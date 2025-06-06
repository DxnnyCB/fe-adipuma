import React, { useState } from "react";
import type { FC } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  required?: boolean;
}

const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const InputPrices: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  minValue,
  maxValue,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  required = false,
}) => {
  const [internalValue, setInternalValue] = useState<string>(value ? value.toString() : "");
  const [inputError, setInputError] = useState<string | null>(null);


  // Maneja el cambio y el formateo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Solo números
    const numericValue = Number(rawValue);

    // Validación de rango
    if (typeof minValue === "number" && numericValue < minValue) {
      setInputError(`El valor mínimo es ${COP_FORMATTER.format(minValue)}`);
    } else if (typeof maxValue === "number" && numericValue > maxValue) {
      setInputError(`El valor máximo es ${COP_FORMATTER.format(maxValue)}`);
    } else {
      setInputError(null);
    }

    setInternalValue(rawValue);

    // Llama al onChange del padre con el valor numérico
    if (onChange) {
      // Simula un evento con el valor numérico
      const event = {
        ...e,
        target: {
          ...e.target,
          value: rawValue,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Muestra el valor formateado en el input
  const displayValue =
    internalValue && !isNaN(Number(internalValue))
      ? COP_FORMATTER.format(Number(internalValue))
      : "";

  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error || inputError) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        min={minValue}
        max={maxValue}
        step={step}
        disabled={disabled}
        className={inputClasses}
        required={required}
        inputMode="numeric"
        autoComplete="off"
      />

      {(hint || inputError) && (
        <p
          className={`mt-1.5 text-xs ${
            error || inputError
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {inputError ? inputError : hint}
        </p>
      )}
    </div>
  );
};

export default InputPrices;