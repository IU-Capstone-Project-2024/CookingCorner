import { FilterContext } from "@/components/filter-provider";
import { useContext } from "react"

const useFilters = () => {
    const context = useContext(FilterContext)

    if (!context) {
        throw new Error("Please use filter provider in the parent element");
    }

    return context;
}

export default useFilters