import { cors } from "hono/cors";
import { app } from "./app/factory";
import { psm } from "./app/router";
import { env } from "cloudflare:workers";

app.use(
  "/psm/*",
  cors({
    origin: [env.ORIGIN, env.DEV_ORIGIN, env.PREVIEW_ORIGIN],
    allowMethods: ["GET"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("psm", psm);

// app.route("env", env);

export default app;
