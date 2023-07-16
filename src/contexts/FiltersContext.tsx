import React, { createContext, FC, useContext, useState } from "react";

type FiltersContextValue = {
  platform?: string;
  sort?: string;
  categories: string[];
  setPlatform: (val: string) => void;
  setSort: (val: string) => void;
  setCategories: (val: string[]) => void;
};

export const FiltersContext = createContext<FiltersContextValue>({
  categories: [],
  setPlatform: () => null,
  setSort: () => null,
  setCategories: () => null,
});

export const FiltersContextProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [platform, setPlatform] = useState<string>();
  const [sort, setSort] = useState<string>();
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <FiltersContext.Provider
      value={{
        platform,
        setPlatform,
        sort,
        setSort,
        categories,
        setCategories,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
