import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";

interface NavigationProps {
  submitForm: () => void;
}

const Navigation = ({ submitForm }: NavigationProps) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-[100] flex w-full items-center justify-between bg-primary p-2 font-inter">
      <Button variant={"icon"} size={"icon"} onClick={() => navigate(-1)}>
        <FaArrowLeft size={20} />
      </Button>
      <Button
        variant={"icon"}
        className="text-xl uppercase"
        onClick={() => submitForm()}
      >
        Save
      </Button>
    </div>
  );
};

export default Navigation;
