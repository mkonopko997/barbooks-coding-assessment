import { Games } from "src/components/Games/Games";
import { render } from "src/testUtils/testUtils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiltersContext } from "src/contexts/FiltersContext";

describe("Games", () => {
  it("should display games", async () => {
    render(<Games />);

    await waitFor(() => {
      expect(screen.getByText("Overwatch 2")).toBeInTheDocument();
      expect(screen.getByText("Diablo Immortal")).toBeInTheDocument();
      expect(screen.getByText("Lost Ark")).toBeInTheDocument();
      expect(screen.getAllByRole("img").length).toEqual(3);
      expect(screen.getAllByRole("link", { name: "View More" }).length).toEqual(
        3,
      );
    });
  });

  it("should filter by title", async () => {
    render(<Games />);

    const input = screen.getByPlaceholderText("Search by Name...");

    await waitFor(() => {
      expect(screen.queryByText("Diablo Immortal")).toBeInTheDocument();
    });

    await userEvent.type(input, "overwatch");

    expect(screen.getByText("Overwatch 2")).toBeInTheDocument();
    expect(screen.queryByText("Diablo Immortal")).not.toBeInTheDocument();
    expect(screen.queryByText("Lost Ark")).not.toBeInTheDocument();
  });

  it("should filter by platform", async () => {
    const setPlatformMock = jest.fn();
    render(
      <FiltersContext.Provider
        value={{
          platform: "",
          setPlatform: setPlatformMock,
          sort: "",
          setSort: () => null,
          categories: [],
          setCategories: () => null,
        }}
      >
        <Games />
      </FiltersContext.Provider>,
    );

    const input = screen.getAllByRole("combobox")[0];
    const option = screen.getByRole("option", { name: "PC" });

    await userEvent.selectOptions(input, option);

    expect(setPlatformMock).toBeCalledWith("pc");
  });

  it("should sort", async () => {
    const setSortMock = jest.fn();
    render(
      <FiltersContext.Provider
        value={{
          platform: "",
          setPlatform: () => null,
          sort: "",
          setSort: setSortMock,
          categories: [],
          setCategories: () => null,
        }}
      >
        <Games />
      </FiltersContext.Provider>,
    );

    const input = screen.getAllByRole("combobox")[2];
    const option = screen.getByRole("option", { name: "Alphabetical" });

    await userEvent.selectOptions(input, option);

    expect(setSortMock).toBeCalledWith("alphabetical");
  });

  it("should filter by categories", async () => {
    const setCategoriesMock = jest.fn();
    render(
      <FiltersContext.Provider
        value={{
          platform: "",
          setPlatform: () => null,
          sort: "",
          setSort: () => null,
          categories: ["moba"],
          setCategories: setCategoriesMock,
        }}
      >
        <Games />
      </FiltersContext.Provider>,
    );

    const input = screen.getAllByRole("combobox")[1];

    await userEvent.type(input, "mmorpg{enter}");

    expect(setCategoriesMock).toBeCalledWith(["moba", "mmorpg"]);
  });
});
