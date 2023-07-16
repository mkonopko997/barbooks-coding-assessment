import { useQuery } from "react-query";

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  minimumSystemRequirements: MinimumSystemRequirements;
  screenshots: Screenshot[];
};

export type MinimumSystemRequirements = {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

type Screenshot = {
  id: number;
  image: string;
};

export const useGame = (id = "") => {
  return useQuery(
    ["game", id],
    async () => (await (await fetch(`/api/game?id=${id}`)).json()) as Game,
    { enabled: !!id },
  );
};
