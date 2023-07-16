import { useQuery } from "react-query";

export const useCategories = () => {
  return useQuery(
    ["categories"],
    async () => (await (await fetch(`/api/categories`)).json()) as string[],
  );
};
