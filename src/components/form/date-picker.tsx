import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  value,
  defaultDate,
  label,
  placeholder,
  required = false,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fp = flatpickr(inputRef.current!, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate: value || defaultDate,
      maxDate: new Date(), // <-- Limita la fecha máxima a hoy
      onChange: (selectedDates) => {
        if (onChange) {
          onChange(selectedDates[0] || null);
        }
      },
    });

    return () => {
      fp.destroy();
    };
  }, [mode, onChange, id, defaultDate, value]);

  // Sincroniza el valor externo con el input
  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.value = value instanceof Date
        ? value.toISOString().slice(0, 10)
        : value;
    }
    if (inputRef.current && !value) {
      inputRef.current.value = "";
    }
  }, [value]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          required={required}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
          readOnly
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}