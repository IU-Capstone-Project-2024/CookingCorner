import { Step } from "@/types/types";
import StepCard from "./step-card";

interface StepsProps {
  steps: Step[];
}

const Steps = ({ steps }: StepsProps) => {
  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <StepCard
          key={`step-card-${step.stepNumber}`}
          step={step.stepNumber}
          img={step.img}
          description={step.description}
        />
      ))}
    </div>
  );
};

export default Steps;
