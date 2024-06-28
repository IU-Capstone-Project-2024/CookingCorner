import { Button } from "../ui/button";

interface RecipeSwitchButtonProps {
  setIsSteps: (value: boolean) => void;
}

const RecipeSwitchButton = ({ setIsSteps }: RecipeSwitchButtonProps) => {
  return (
    <div className="space-x-2">
      <Button onClick={() => setIsSteps(true)}>Cooking steps</Button>
      <Button onClick={() => setIsSteps(false)}>Ingredients</Button>
    </div>
  );
};

export default RecipeSwitchButton;
