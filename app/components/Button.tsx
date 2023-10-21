"use client";

import { IconType } from "react-icons";

interface Props {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<Props> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="sm:max-w-[300px]">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-black/70
      ${
        outline
          ? "bg-white text-black/70 shadow-[2px_2px_0px_#333]"
          : "bg-black/90 text-white"
      }
        ${
          small
            ? "text-sm font-light py-1 px-2 border-[1px]"
            : "text-md font-semibold py-3 px-4 border-2"
        }
      ${custom && custom}
      `}
      >
        {Icon && <Icon size={24} />}
        {label}
      </button>
    </div>
  );
};
