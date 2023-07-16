import { useQuery } from "react-query";
import { useFiltersContext } from "src/contexts/FiltersContext";

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  genre: string;
};

export const useGames = () => {
  const { platform, sort, categories } = useFiltersContext();
  const query = new URLSearchParams();
  if (platform) {
    query.append("platform", platform);
  }
  if (sort) {
    query.append("sort", sort);
  }
  if (categories?.length) {
    query.append("tag", categories.join("."));
  }
  const queryString = [...query.entries()].length ? `?${query.toString()}` : "";
  const endpoint = categories?.length ? "filter" : "games";

  return useQuery(["games", queryString], async () => {
    const response = await fetch(`/api/${endpoint}${queryString}`);
    return (await response.json()) as Game[];
  });
};
