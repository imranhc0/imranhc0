"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  pendingLabel?: string;
}

export function SubmitButton({
  children,
  pendingLabel = "Please wait...",
  className,
  disabled,
  type,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || Boolean(disabled);

  return (
    <button
      {...props}
      type={type ?? "submit"}
      disabled={isDisabled}
      aria-busy={pending}
      className={`${className ?? ""} ${isDisabled ? "cursor-not-allowed opacity-70" : ""}`.trim()}
    >
      <span className="inline-flex items-center gap-2">
        {pending ? (
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        ) : null}
        <span>{pending ? pendingLabel : children}</span>
      </span>
    </button>
  );
}
