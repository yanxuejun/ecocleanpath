'use client';
export const runtime = 'edge';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">Have questions about our products or your order? We're here to help.</p>
            <div className="space-y-4 text-sm text-gray-600">
              <p>📧 Email: support@ecocleanpath.com</p>
              <p>📍 We operate online only</p>
              <p>⏰ Response time: Usually within 24 hours</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            {sent ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-3">✓</p>
                <p className="font-semibold text-green-700">Message Sent!</p>
                <p className="text-gray-500 text-sm mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="input-field" required />
                </div>
                <button type="submit" className="btn-primary w-full py-3">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
