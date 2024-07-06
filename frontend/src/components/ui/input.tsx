import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { FieldError } from "react-hook-form";
import { Label } from "./label";

const inputVariants = cva(
  "flex h-10 w-full rounded-md placeholder:text-sm placeholder:text-mainBlack-secondary border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-mainBlack bg-primary focus:border-2",
        image: "border border-mainBlack bg-hover-switch",
      },
      isize: {
        default: "h-12 px-4 py-2",
        image: "h-12 px-4 py-2 w-[50%]",
        big: "h-32 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      isize: "default",
    },
  },
);

export interface InputProps
  extends VariantProps<typeof inputVariants>,
    React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: FieldError | undefined;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", variant, isize, error, label, ...props },
    ref,
  ) => {
    return (
      <div className="relative">
        {label && <Label>{label}</Label>}
        <input
          type={type}
          className={cn(inputVariants({ variant, isize, className }))}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="absolute right-0 top-0 py-3 pr-4 font-light text-red-600">
            You need to name your recipe!
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
