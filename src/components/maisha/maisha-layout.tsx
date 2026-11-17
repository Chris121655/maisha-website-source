import type { ReactNode } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

import maishaLogo from "@/assets/maisha-logo-exact.png.asset.json";

const links = [
  { href: "/products", label: "Products" },
  { href: "/prices", label: "Prices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MaishaLayout({ children, homeNavigation = false }: { children: ReactNode; homeNavigation?: boolean }) {
  const { pathname } = useLocation();

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="MAISHA home" aria-current={pathname === "/" ? "page" : undefined}>
          <img src={maishaLogo.url} alt="MAISHA — Life Made Possible" />
        </Link>
        <nav aria-label="Main navigation">
          {(homeNavigation ? links.filter((link) => link.href !== "/prices") : links).map((link) => (
            link.href === "/about" && homeNavigation ? <span className="home-story-links" key={link.href}><Link to="/" hash="why-us" activeOptions={{ includeHash: true }}>Why us</Link><Link to="/about">About</Link></span> :
            <Link to={link.href} key={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>
          ))}
        </nav>
        <a className="header-cta" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer">WhatsApp orders</a>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <p className="footer-eyebrow">MAISHA · Life Made Possible</p>
            <h2>Ready to order?</h2>
            <div className="contact-links">
              <a href="tel:+27688386199"><Phone aria-hidden="true" />+27 68 838 6199</a>
              <a href="mailto:sales@maishahub.co.za"><Mail aria-hidden="true" />sales@maishahub.co.za</a>
            </div>
          </div>
          <a className="footer-whatsapp" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer">Message us on WhatsApp <MessageCircle aria-hidden="true" /></a>
        </div>
        <div className="copyright">MAISHA — Hygiene &amp; Cleaning Products · maishahub.co.za</div>
        <a className="mobile-order-bar" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />Order on WhatsApp</a>
      </footer>
    </>
  );
}