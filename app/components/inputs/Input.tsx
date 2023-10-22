"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const Input: React.FC<Props> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`
                peer 
                w-full 
                p-4 
                pt-6 
                outline-none 
                bg-white 
                font-light 
                border-2 
                rounded-md 
                transition 
                disabled:opacity-70 
                disabled:cursor-not-allowed ${
                  errors[id]
                    ? "border-rose-400 focus:border-rose-400"
                    : "border-gray-300 focus:border-gray-300"
                }`}
      />

      <label
        htmlFor={id}
        className={`absolute 
            cursor-text 
            text-md 
            duration-150 
            transform 
            -translate-y-3 
            top-5 
            z-10 
            origin-[0] 
            left-4 
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 
            peer-focus:-translate-y-4 ${
              errors[id] ? " text-rose-500" : " text-slate-400"
            }`}
      >
        {label}
      </label>
    </div>
  );
};
