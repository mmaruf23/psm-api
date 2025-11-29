import { app } from "./app/factory";
import { env, psm } from "./app/router";

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("psm", psm);

app.route("env", env);

export default app;
