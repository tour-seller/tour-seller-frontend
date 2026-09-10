'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';

export function NewsletterForm() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      // Send to Strapi API or local route
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'dangkynhantin' }),
      }).catch(() => {});

      setSubmitted(true);
      setEmail('');
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {submitted ? (
        <div className="flex items-center gap-2 text-xs text-white/70 bg-white/5 p-3 rounded-lg border border-white/10">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span>Đăng ký nhận tin thành công! Cảm ơn bạn đã đồng hành cùng Nasatourist.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletterPlaceholder')}
            required
            className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-brand-ocean text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow flex-shrink-0 disabled:opacity-50"
          >
            <span>Gửi</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
