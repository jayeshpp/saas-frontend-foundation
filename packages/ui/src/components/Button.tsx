import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-primary))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[hsl(var(--brand-primary))] text-white hover:bg-[hsl(var(--brand-primary))]/90",
        secondary:
          "bg-[hsl(var(--brand-secondary))] text-white hover:bg-[hsl(var(--brand-secondary))]/90",
        outline:
          "border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:text-zinc-50",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-900 dark:text-zinc-50"
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, ...props },
  ref
) {
  return (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
});

