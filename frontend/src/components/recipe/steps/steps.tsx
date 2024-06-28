import { Step } from "@/types/types";
import StepCard from "./step-card";

interface StepsProps {
  steps: Step[];
}

const Steps = ({ steps }: StepsProps) => {
  return (
    <>
      {steps.map((step) => (
        <StepCard
          key={`step-card-${step.stepNumber}`}
          step={step.stepNumber}
          img={step.img}
          description={step.description}
        />
      ))}
    </>
  );
};

export default Steps;
