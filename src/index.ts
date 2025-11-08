import { Hono } from "hono";
import { psm, testRoute } from "./app/router";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("test", testRoute);
app.route("psm", psm);

export default app;
