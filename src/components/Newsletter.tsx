'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-primary-500 rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
      <p className="text-primary-100 text-sm mb-4">Subscribe for new arrivals and exclusive offers.</p>
      {status === 'success' ? (
        <p className="text-sm text-primary-100">✓ Thanks for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-2.5 rounded-lg text-gray-800 text-sm focus:outline-none"
            required
          />
          <button type="submit" className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 rounded-lg text-sm font-medium transition-colors">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}