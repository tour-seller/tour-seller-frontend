import { describe, expect, it } from 'vitest';
import { formatCurrency, slugify, formatDate, cn, getStrapiMediaUrl } from '../lib/utils';

describe('web utilities', () => {
  it('formats Vietnamese currency', () => {
    expect(formatCurrency(125000)).toContain('125.000');
    expect(formatCurrency(0)).toBe('Liên hệ');
    expect(formatCurrency(null)).toBe('Liên hệ');
  });

  it('creates URL-safe slugs', () => {
    expect(slugify('Đà Nẵng Tour')).toBe('da-nang-tour');
    expect(slugify('Hà Nội - Sapa 4N3Đ')).toBe('ha-noi-sapa-4n3d');
  });

  it('formats dates properly', () => {
    expect(formatDate('2026-09-10')).toContain('10');
    expect(formatDate(null)).toBe('Đang cập nhật');
  });

  it('merges tailwind class names with cn', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('resolves strapi media URLs', () => {
    expect(getStrapiMediaUrl('/uploads/image.jpg')).toContain('/uploads/image.jpg');
    expect(getStrapiMediaUrl('https://images.com/pic.jpg')).toBe('https://images.com/pic.jpg');
    expect(getStrapiMediaUrl('')).toContain('images.pexels.com');
    expect(getStrapiMediaUrl(null)).toContain('images.pexels.com');
  });
});