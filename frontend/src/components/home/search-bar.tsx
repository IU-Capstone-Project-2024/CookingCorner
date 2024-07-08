import { FaMagnifyingGlass } from "react-icons/fa6";
import { Dispatch, SetStateAction, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setSearch }: SearchBarProps) => {
  const ref = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (ref.current != null) {
      ref.current.focus();
    }
  }

  return (
    <section
      className="inline-flex h-8 w-80 items-center gap-2 rounded-lg border-2 border-mainBlack bg-white px-2"
      onClick={handleClick}
    >
      <FaMagnifyingGlass size={13} />
      <input
        ref={ref}
        type="text"
        className="w-full bg-transparent font-inter font-normal outline-none"
        placeholder="Filter your recipes"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </section>
  );
};

export default SearchBar;
