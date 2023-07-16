import React from "react";
import ReactDOM from "react-dom/client";
import style from "./main.module.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Games } from "src/components/Games/Games";
import { Game } from "src/components/Game/Game";
import { FiltersContextProvider } from "src/contexts/FiltersContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FiltersContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className={style.page}>
          <div className={style.container}>
            <h1>Find & track the best free-to-play games!</h1>
            <h3>Search for what to play next!</h3>
            <BrowserRouter>
              <Routes>
                <Route index element={<Games />} />
                <Route path=":id" element={<Game />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </QueryClientProvider>
    </FiltersContextProvider>
  </React.StrictMode>,
);
