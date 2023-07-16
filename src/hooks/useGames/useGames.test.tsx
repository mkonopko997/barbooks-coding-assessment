import { renderHook, waitFor } from "@testing-library/react";
import { useGames } from "src/hooks/useGames/useGames";
import { FiltersContext } from "src/contexts/FiltersContext";
import { QueryClient, QueryClientProvider } from "react-query";

const render = (params: {
  platform: string;
  sort: string;
  categories: string[];
}) => {
  const queryClient = new QueryClient({});
  return renderHook(useGames, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <FiltersContext.Provider
          value={{
            ...params,
            setCategories: () => null,
            setSort: () => null,
            setPlatform: () => null,
          }}
        >
          {children}
        </FiltersContext.Provider>
      </QueryClientProvider>
    ),
  });
};

describe("useGames", () => {
  beforeEach(() => {
    fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => null,
      }),
    );
  });

  it("should fetch with platform filter", async () => {
    render({ platform: "pc", sort: "", categories: [] });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/games?platform=pc");
    });
  });

  it("should fetch with sort", async () => {
    render({ platform: "", sort: "relevance", categories: [] });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/games?sort=relevance");
    });
  });

  it("should fetch with platform filter and sort together", async () => {
    render({ platform: "pc", sort: "relevance", categories: [] });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/games?platform=pc&sort=relevance",
      );
    });
  });

  it("should fetch with changed endpoint with categories filter", async () => {
    render({ platform: "", sort: "", categories: ["mmorpg", "moba"] });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/filter?tag=mmorpg.moba");
    });
  });

  it("should fetch with changed endpoint with all filters", async () => {
    render({
      platform: "browser",
      sort: "alphabetical",
      categories: ["mmorpg", "moba"],
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/filter?platform=browser&sort=alphabetical&tag=mmorpg.moba",
      );
    });
  });
});
