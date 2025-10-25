import { describe, expect, it } from 'vitest';
import app from '.';
import { env } from 'cloudflare:workers';

describe('test ', () => {
  it('should ok', async () => {
    const res = await app.request('/', {}, env);

    expect(res.status).toBe(200);
  });
});
