import {
  render as originalRender,
  renderHook as originalRenderHook,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { FiltersContextProvider } from "src/contexts/FiltersContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const render = (element: React.ReactElement) => {
  return originalRender(
    <FiltersContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{element}</BrowserRouter>
      </QueryClientProvider>
    </FiltersContextProvider>,
  );
};

export const renderHook: typeof originalRenderHook = (render) => {
  return originalRenderHook(render, {
    wrapper: ({ children }) => (
      <FiltersContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </FiltersContextProvider>
    ),
  });
};
