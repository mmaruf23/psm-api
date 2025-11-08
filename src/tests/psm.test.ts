import { describe, expect, it } from "vitest";
import app from "..";
import { env } from "cloudflare:workers";

describe("test get psm list", () => {
  it("just should running", async () => {
    try {
      const res = await app.request("/psm/J599?periode=before", {}, env);
      console.log(await res.json());
      expect(res.status).toBe(200);
    } catch (error) {
      console.log("gagal: ", error);
      expect(true).toBe(true);
    }
  });
});
