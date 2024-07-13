import { Step } from "@/types/types";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { UseFormRegister } from "react-hook-form";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface StepContainerProps {
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  children: React.ReactNode;
}

const StepContainer = ({ children, setSteps }: StepContainerProps) => {
  return (
    <div className="relative flex min-h-full flex-col items-center gap-4 rounded-md border border-mainBlack px-5 py-6">
      <label className="pointer-events-none absolute -top-[0%] left-[17px] -translate-y-[50%] border-none bg-primary p-1 font-inter text-sm">
        Cooking steps
      </label>
      {children}
      <Button
        className="bg-mainBlack"
        size={"icon"}
        type="button"
        onClick={() =>
          setSteps((prev) => [
            ...prev,
            { title: "", description: "", image_path: "" },
          ])
        }
      >
        <FaPlus className="text-primary" />
      </Button>
    </div>
  );
};

const labelVariants = cva(
  "absolute pointer-events-none border-none bg-primary font-inter text-sm p-1 top-[0%]",
  {
    variants: {
      labelPosition: {
        default: "left-[17px] -translate-y-[50%]",
        middle: "left-[50%] -translate-y-[50%] -translate-x-[50%]",
        right: "right-[17px] -translate-y-[50%]",
      },
    },
    defaultVariants: {
      labelPosition: "default",
    },
  },
);

interface StepInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof labelVariants> {
  stepNumber: number;
  register: UseFormRegister<RecipeSchemaFields>;
  className?: string;
  label?: string;
  cooking_step: Step;
}

const StepInput = ({
  stepNumber,
  type = "text",
  register,
  className,
  labelPosition,
  label,
  cooking_step,
  ...props
}: StepInputProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-mainBlack bg-primary py-2">
      <h3 className="font-inter font-semibold">Step {stepNumber + 1}</h3>
      <label
        className="text-md flex h-12 items-center justify-center rounded-md border border-mainBlack bg-hover-switch px-4 py-2 font-bold"
        htmlFor="step-file"
      >
        Add top image
      </label>
      <div className="relative">
        {label && (
          <label className={cn(labelVariants({ labelPosition, className }))}>
            {label}
          </label>
        )}
        <input
          type={type}
          className="flex h-10 w-full rounded-md border border-input border-mainBlack bg-background bg-primary px-3 py-2 text-sm text-mainBlack-secondary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:text-mainBlack-secondary placeholder:text-muted-foreground focus:border-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={cooking_step?.description}
          {...register(`steps.${stepNumber}.description`)}
          {...props}
        />
      </div>
    </div>
  );
};

export { StepInput, StepContainer };
