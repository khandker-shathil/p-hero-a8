import React from 'react';
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

const socialLinks = [
  { label: "Facebook", icon: "ti-brand-facebook", href: "#" },
  { label: "X / Twitter", icon: "ti-brand-x", href: "#" },
  { label: "GitHub", icon: "ti-brand-github", href: "#" },
  { label: "LinkedIn", icon: "ti-brand-linkedin", href: "#" },
];

const Footer = () => {
    return (
    <footer className="bg-[#1a3c34] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/15">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[34px] h-[34px] rounded-lg bg-white/15 flex items-center justify-center text-white font-bold text-[15px]">
                B
              </div>
              <span className="font-bold text-lg tracking-tight">
                Book<span className="text-[#f4a836]">Borrow</span>
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Your seamless digital library. Explore thousands of books across every genre — anytime, anywhere.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
                >
                  <i className={`ti ${s.icon} text-[15px]`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4 tracking-wide">Quick links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4a836] shrink-0" />
                  <Link href={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4 tracking-wide">Contact us</h3>
            <div className="space-y-3">
              {[
                { icon: "ti-mail", text: "support@bookborrow.io" },
                { icon: "ti-map-pin", text: "Dhaka, Bangladesh" },
                { icon: "ti-phone", text: "+880 1234 567890" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-sm text-white/55">
                  <i className={`ti ${item.icon} text-[15px] text-white/40 shrink-0`} aria-hidden="true"></i>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-xs text-white/35">
          <span>© {new Date().getFullYear()} BookBorrow. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Use</a>
          </div>
        </div>
        </div>

      {/* Tabler icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
    </footer>
  );
}

export default Footer;