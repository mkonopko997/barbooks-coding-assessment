import { rest } from "msw";
import games from "./games.json";
import categories from "./categories.json";

export const handlers = [
  rest.get("api/filter", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(games));
  }),
  rest.get("api/games", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(games));
  }),
  rest.get("api/categories", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categories));
  }),
];
