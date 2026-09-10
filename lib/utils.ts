import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount?: number | null,
  locale = 'vi-VN',
  currency = 'VND'
): string {
  if (amount === undefined || amount === null || amount <= 0) {
    return 'Liên hệ';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  dateInput?: string | number | null,
  locale = 'vi-VN'
): string {
  if (!dateInput) return 'Đang cập nhật';
  try {
    let date: Date;
    if (typeof dateInput === 'number') {
      // Unix timestamp (seconds vs milliseconds check)
      date = dateInput < 10000000000 ? new Date(dateInput * 1000) : new Date(dateInput);
    } else {
      date = new Date(dateInput);
    }
    if (isNaN(date.getTime())) return 'Đang cập nhật';

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  } catch {
    return 'Đang cập nhật';
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStrapiMediaUrl(url?: string | null): string {
  if (!url || url === '/placeholder.jpg') {
    return 'https://images.pexels.com/photos/18501642/pexels-photo-18501642.jpeg?auto=compress&cs=tinysrgb&w=1600';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}