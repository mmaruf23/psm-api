import { env } from "cloudflare:workers";
import { createFactory } from "hono/factory";

export const factory = createFactory<{ Bindings: CloudflareBindings }>();

export const app = factory.createApp();

export const dev_mode = env.DEV === "development";
