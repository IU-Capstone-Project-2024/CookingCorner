import { FaArrowDownWideShort, FaRegHeart, FaHeart } from "react-icons/fa6";
import Category from "./category";
import NewRecipe from "./new-recipe";
import { Dispatch, SetStateAction } from "react";

interface SettingsProps {
  isFavourite?: boolean;
  handleChangeAscending?: () => void;
  handleChangeFavourite?: Dispatch<SetStateAction<boolean>>;
}

const Settings = ({
  isFavourite,
  handleChangeFavourite,
  handleChangeAscending,
}: SettingsProps) => {
  return (
    <section className="inline-flex h-12 w-full items-center justify-center gap-4 border-2 border-x-transparent border-y-mainBlack bg-hover-secondary">
      <NewRecipe />
      <Category />
      <FaArrowDownWideShort size={24} onClick={handleChangeAscending} />
      {!isFavourite ? (
        <FaRegHeart
          size={24}
          className="text-hover"
          onClick={() => handleChangeFavourite!(!isFavourite)}
        />
      ) : (
        <FaHeart
          size={24}
          className="text-hover"
          onClick={() => handleChangeFavourite!(!isFavourite)}
        />
      )}
    </section>
  );
};

export default Settings;
