import { Recipe } from "@/types/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react"

interface FilterProps {
    recipes: UseQueryResult<Recipe[], Error>;
}

const useFilters = ({recipes}: FilterProps) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [isAscending, setIsAscending] = useState(true);

    const handleChangeFavourite = () => {
        setIsFavourite(prev => !prev)
    }

    const handleChangeAscending = () => {
        setIsAscending(prev => !prev)
    }

    return {
        isFavourite,
        handleChangeFavourite,
        handleChangeAscending
    }
}

export default useFilters