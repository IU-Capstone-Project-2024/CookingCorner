import { FaPlus, FaArrowDownLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const navigate = useNavigate();
  return (
    <div className="inline-flex gap-2">
      <div className="group inline-flex items-center gap-2">
        <Button
          className="flex items-center gap-1 group-hover:border-hover"
          variant={"icon"}
          size={"icon"}
          onClick={() => navigate("/recipes/create")}
        >
          <FaPlus className="group-hover:text-hover" />
        </Button>
      </div>
      <div className="group inline-flex items-center gap-2">
        <Button
          className="flex items-center gap-1 group-hover:border-hover"
          variant={"icon"}
          size={"icon"}
          onClick={() => navigate("/recipes/upload")}
        >
          <FaArrowDownLong className="group-hover:text-hover" />
        </Button>
      </div>
    </div>
  );
};

export default NewRecipe;
