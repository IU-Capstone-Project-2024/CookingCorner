import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-primary p-2 font-inter">
      <Button
        variant={"icon"}
        size={"icon"}
        onClick={() => navigate("/recipes")}
      >
        <FaArrowLeft size={20} />
      </Button>
      <Button variant={"icon"} className="text-xl uppercase">
        Save
      </Button>
    </div>
  );
};

export default Navigation;
