import { reasons } from "@/lib/maisha-data";
import { Mail, MessageCircle, Phone } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Shopping highlights">
      <div><span>01</span><strong>For home &amp; business</strong></div>
      <div><span>02</span><strong>Everyday and bulk sizes</strong></div>
      <div><span>03</span><strong>Order directly on WhatsApp</strong></div>
    </section>
  );
}

export function WhyChooseMaisha() {
  return (
    <section className="why section" aria-labelledby="why-us-title">
      <h2 id="why-us-title">Why customers choose us</h2>
      <div className="reason-grid">
        {reasons.map((reason) => (
          <article key={reason.number}><span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.text}</p></article>
        ))}
      </div>
    </section>
  );
}

export function AboutStory() {
  return (
    <section className="about section" aria-labelledby="about-title">
      <div className="about-copy">
        <p className="eyebrow">Made possible by MAISHA</p>
        <h2 id="about-title">Quality for everyday life</h2>
        <p>At <strong>Maisha</strong>, we believe every home, business, and community deserves quality hygiene and cleaning products without premium prices.</p>
        <p>Based in <strong>KuGompo City (formerly East London)</strong>, our company was founded on a simple principle: cleanliness and hygiene should be accessible to everyone.</p>
        <p>We are proud to serve households, businesses, and communities with affordable, reliable, and high-quality hygiene and cleaning solutions.</p>
        <p className="about-promise">Because everyone deserves a clean and healthy space to live and work.</p>
      </div>
    </section>
  );
}

export function ContactOptions() {
  const methods = [
    { href: "tel:+27688386199", label: "Call us", value: "+27 68 838 6199", Icon: PhoneIcon },
    { href: "mailto:sales@maishahub.co.za", label: "Email", value: "sales@maishahub.co.za", Icon: MailIcon },
    { href: "https://wa.me/27688386199", label: "WhatsApp", value: "Message us to place an order", Icon: WhatsappIcon },
  ];

  return (
    <section className="contact-page section" aria-labelledby="contact-page-title">
      <div className="page-intro-copy"><p className="eyebrow">Get in touch</p><h1 id="contact-page-title">How can we help?</h1><p>Ask us about products, pack sizes, pricing, or placing an order.</p></div>
      <div className="contact-grid">
        {methods.map(({ href, label, value, Icon }, index) => (
          <a className={`contact-card${index === 2 ? " contact-card-whatsapp" : ""}`} href={href} key={href} target={index === 2 ? "_blank" : undefined} rel={index === 2 ? "noopener noreferrer" : undefined}>
            <Icon /><span className="contact-card-label">{label}</span><span className="contact-card-value">{value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

const PhoneIcon = () => <Phone aria-hidden="true" />;
const MailIcon = () => <Mail aria-hidden="true" />;
const WhatsappIcon = () => <MessageCircle aria-hidden="true" />;