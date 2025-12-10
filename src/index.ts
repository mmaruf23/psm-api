import { cors } from "hono/cors";
import { app } from "./app/factory";
import { psm } from "./app/router";
import { env } from "cloudflare:workers";

app.use(
  "/psm/*",
  cors({
    origin: [env.ORIGIN],
    allowMethods: ["GET"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/env", (c) => {
  return c.json({
    env: env
  });
});

app.get("/origin", (c) => {
  console.log(env.ORIGIN)
  return c.text(env.ORIGIN || "ORIGIN not set!");
});


app.route("psm", psm);

export default app;
