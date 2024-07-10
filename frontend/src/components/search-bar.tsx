import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleClick() {
    if (ref.current != null) {
      ref.current.focus();
    }
  }

  return (
    <section
      className="inline-flex h-10 w-full max-w-80 items-center gap-2 rounded-lg border border-mainBlack bg-white px-2"
      onClick={handleClick}
    >
      <FaMagnifyingGlass size={13} />
      <input
        ref={ref}
        type="text"
        className="w-full bg-transparent font-inter font-normal outline-none"
        placeholder="Search for new cooking recipes"
        onKeyDown={(e: any) => {
          if (e.key === "Enter" && e.target.value !== "") {
            navigate(`/recipes/search/${e.target.value}`);
          }
        }}
      />
    </section>
  );
};

export default SearchBar;
