
import { Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Styles', href: '/styles' },
    { label: 'How it works', href: '/#steps' },
    { label: 'Community', href: '/community' },
    { label: 'Pricing', href: '/tokens' },
  ],
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy', href: '/legal/privacy' },
    { label: 'Terms', href: '/legal/terms' },
    { label: 'Cookies', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--dominant-alt)] border-t border-[var(--border-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo (text only) */}
        <div className="flex justify-center mb-12">
          <a href="/" className="font-bold text-2xl text-[var(--text-primary)]">
            GlowHaus
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--border-light)]">
          <p className="text-sm text-[var(--text-tertiary)] mb-4 md:mb-0">
            © 2026 GlowHaus. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#E11D48] hover:text-white transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#E11D48] hover:text-white transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#E11D48] hover:text-white transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
