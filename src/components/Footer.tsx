'use client';

import Link from 'next/link';

const FOOTER_LINKS = {
  'Shop': [
    { href: '/shop', label: 'All Products' },
    { href: '/shop/for-ecovacs', label: 'For Ecovacs' },
    { href: '/shop/for-roborock', label: 'For Roborock' },
    { href: '/shop/for-tineco', label: 'For Tineco' },
  ],
  'Support': [
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/order-tracking', label: 'Order Tracking' },
  ],
  'Policies': [
    { href: '/shipping-policy', label: 'Shipping Policy' },
    { href: '/refund-policy', label: 'Refund Policy' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-white">EcoCleanPath</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted source for high-quality robot vacuum accessories and replacement parts.
              Compatible with major brands including Ecovacs, Roborock, Tineco, and more.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm hover:text-primary-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EcoCleanPath. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Secured by WooCommerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}