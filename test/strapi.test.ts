import { describe, expect, it } from 'vitest';
import { getSliders, getTours, getArticles } from '../lib/strapi';

describe('strapi client data layer', () => {
  it('handles getSliders gracefully without throwing', async () => {
    const sliders = await getSliders('vi');
    expect(Array.isArray(sliders)).toBe(true);
  });

  it('handles getTours query structure', async () => {
    const res = await getTours({ locale: 'vi', pageSize: 2 });
    expect(res).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('handles getArticles query structure', async () => {
    const res = await getArticles({ locale: 'vi', pageSize: 2 });
    expect(res).toBeDefined();
    expect(Array.isArray(res.data)).toBe(true);
  });
});
