import { Step } from "@/types/types";
import StepCard from "./step-card";

interface StepsProps {
  steps: Step[];
}

const Steps = ({ steps }: StepsProps) => {
  return (
    <div className="space-y-2">
      {steps === null ? (
        <div className="w-full rounded-[25px] border-2 border-mainBlack p-2">
          <h2 className="text-center text-lg font-bold">No steps provided</h2>
          <p className="text-center text-sm font-medium">
            No steps were provided during creation of the recipe. You can always
            edit your recipe to change that.
          </p>
        </div>
      ) : (
        steps.map((step, idx) => (
          <StepCard
            key={`step-card-${idx}`}
            step={idx + 1}
            description={step.description}
          />
        ))
      )}
    </div>
  );
};

export default Steps;
