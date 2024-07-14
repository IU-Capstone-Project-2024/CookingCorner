import { ContextState, FilterConditions } from "@/services/types/types";
import { createContext, useState } from "react";

export const FilterContext = createContext<ContextState | null>(null);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterConditions>({
    category_name: "",
    is_favourite: false,
    ascending_order: false,
  });

  function handleFiltersChange(name: string, value?: string | boolean) {
    setFilters({ ...filters, [name]: value ?? !filters[name] });
  }

  return (
    <FilterContext.Provider
      value={{ setFilters, filters, handleFiltersChange }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
