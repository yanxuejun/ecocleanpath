'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function MyAccountPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ email: '', password: '', first_name: '', last_name: '', username: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecocleanpath.com'}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.email, password: form.password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('woo_token', data.token);
        router.push('/my-account');
      } else {
        setError('Invalid credentials.');
      }
    } catch {
      setError('Login is handled on the original store. Please visit the store website to manage your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Account</h1>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex mb-6 border-b border-gray-200">
            {(['login', 'register'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'}`}>
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
                <input name="email" type="text" value={form.email} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} className="input-field" required />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-center text-sm text-gray-500">
                For full account access, please{' '}
                <a href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecocleanpath.com'}/my-account`} className="text-primary-500 hover:underline">log in on the store</a>.
              </p>
            </form>
          ) : (
            <div className="text-center text-gray-500 py-6">
              <p>Registration is handled on the original store.</p>
              <a href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecocleanpath.com'}/my-account`} className="btn-primary inline-block mt-4">Register on Store</a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}