import Image from 'next/image'
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'

const categories = [
  { name: 'Household cleaning', target: 'dish-washing-liquid', image: 0 },
  { name: 'Laundry & fabric', target: 'fabric-softener', image: 1 },
  { name: 'Personal care', target: 'shower-gel', image: 2 },
  { name: 'Auto care', target: 'car-shampoo', image: 3 },
]
const products = [
  { name: 'Dish Washing Liquid', size: '1 Litre', price: 'R25', image: 0 },
  { name: 'Pine Gel', size: '500ml', price: 'R20', image: 1 },
  { name: 'Fabric Softener', size: '1 Litre', price: 'R30', image: 2 },
  { name: 'Tyre Shine', size: '500ml', price: 'R25', image: 3 },
]
const priceGroups = [
  { name: 'Dish Washing Liquid', prices: [['1 Litre', 'R25.00'], ['5 Litres', 'R110.00'], ['20 Litres', 'R400.00']] },
  { name: 'Fabric Softener', prices: [['1 Litre', 'R30.00'], ['5 Litres', 'R120.00'], ['25 Litres', 'R520.00']] },
  { name: 'Handy Andy', prices: [['1 Litre', 'R25.00'], ['5 Litres', 'R110.00'], ['20 Litres', 'R350.00']] },
  { name: 'Tile Cleaner', prices: [['1 Litre', 'R25.00'], ['5 Litres', 'R100.00'], ['20 Litres', 'R350.00']] },
  { name: 'Hair & Body Wash', prices: [['1 Litre', 'R35.00'], ['5 Litres', 'R140.00'], ['20 Litres', 'R430.00']] },
  { name: 'Bubble Bath', prices: [['500ml', 'R25.00'], ['1 Litre', 'R40.00'], ['5 Litres', 'R145.00']] },
  { name: 'Shower Gel', prices: [['1 Litre', 'R35.00'], ['5 Litres', 'R140.00']] },
  { name: 'Air Fresheners', prices: [['Sweet Cherry 200ml', 'R20.00'], ['Smoke Busta 200ml', 'R25.00'], ['Lavender 200ml', 'R25.00']] },
  { name: 'Car Shampoo', prices: [['1 Litre', 'R30.00'], ['5 Litres', 'R130.00']] },
  { name: "Madubula J's Fluid", prices: [['500ml', 'R20.00'], ['5 Litres', 'R160.00']] },
  { name: 'Multipurpose Cleaner', prices: [['1 Litre', 'R25.00'], ['5 Litres', 'R110.00']] }, 
  { name: 'Tyre Shine', prices: [['500ml', 'R25.00'], ['1 Litre', 'R45.00'], ['5 Litres', 'R215.00']] },
  { name: 'Dashboard Polish', prices: [['500ml', 'R30.00'], ['1 Litre', 'R50.00'], ['5 Litres', 'R230.00']] },
  { name: 'Bleach', prices: [['1 Litre', 'R25.00'], ['5 Litres', 'R70.00'], ['25 Litres', 'R300.00']] },
  { name: 'Thick Bleach', prices: [['1 Litre', 'R25.00'], ['5 Litres', 'R80.00'], ['20 Litres', 'R320.00']] },
  { name: 'Pine Gel', prices: [['500ml', 'R20.00'], ['5 Litres', 'R130.00'], ['20 Litres', 'R550.00']] },
  { name: 'Liquid Hand Soap', prices: [['1 Litre', 'R45.00'], ['5 Litres', 'R150.00'], ['20 Litres', 'R350.00']] },
  { name: 'Laundry Washing Powder', prices: [['500g', 'R25.00'], ['5kg', 'R200.00'], ['10kg', 'R350.00']] },
  { name: 'Fabric Stain Remover', prices: [['1 Litre', 'R30.00'], ['5 Litres', 'R140.00'], ['20 Litres', 'R450.00']] },
]
const reasons = [
  { number: '1', title: 'Value for money', text: 'High quality for the best price.' },
  { number: '2', title: 'On-time delivery', text: 'We deliver on time, all the time.' },
  { number: '3', title: 'Local business support', text: 'All our base chemicals are sourced locally.' },
]

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="MAISHA home"><Image src="/maisha-logo-reference.png" alt="MAISHA" width={66} height={20} priority /></a>
        <nav aria-label="Main navigation">
          <a href="#products">Shop</a><a href="#price-list">Prices</a><a href="#about">Our story</a>
        </nav>
        <a className="header-cta" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer">WhatsApp orders</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">For homes, businesses &amp; communities</p>
          <h1>Good clean.<br />Good value.<br /><span>Every day.</span></h1>
          <p className="hero-description">Shop quality MAISHA hygiene and cleaning products—from everyday essentials to bulk sizes. Browse clear prices and message us to order.</p>
          <div className="hero-actions"><a className="button button-primary" href="#price-list">Browse prices <ArrowUpRight aria-hidden="true" /></a><a className="button button-outline" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /> Order on WhatsApp</a></div>
          <p className="hero-note">Sizes from 200ml to bulk · Prices in South African rand</p>
        </div>
        <div className="hero-image"><Image src="/maisha-hero-reference.png" alt="MAISHA household cleaning products with the original logo and Life Made Possible tagline" fill priority sizes="(max-width: 700px) 100vw, 50vw" /></div>
      </section>

      <section className="trust-strip" aria-label="Shopping highlights">
        <div><span>01</span><strong>For home &amp; business</strong></div>
        <div><span>02</span><strong>Everyday and bulk sizes</strong></div>
        <div><span>03</span><strong>Order directly on WhatsApp</strong></div>
      </section>

      <section className="categories section" aria-labelledby="categories-title">
        <div className="section-heading"><div><p className="eyebrow">Find it faster</p><h2 id="categories-title">Shop by category</h2></div><a className="text-link" href="#price-list">See all products <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="category-grid">{categories.map((category) => <a href={`#${category.target}`} key={category.target}><div className={`category-photo photo-${category.image}`}><Image src="/maisha-category-photos.png" alt="" fill sizes="(max-width: 620px) 45vw, 22vw" /></div><div className="category-label"><span>{category.name}</span><ArrowUpRight aria-hidden="true" /></div></a>)}</div>
      </section>

      <section className="products section" id="products" aria-labelledby="products-title">
        <div className="section-heading"><div><p className="eyebrow">Popular picks</p><h2 id="products-title">A good place to start</h2></div><a className="text-link" href="#price-list">Browse full price list <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}>
          <div className={`product-image photo-${product.image}`}><Image src="/maisha-lifestyle.png" alt={`${product.name} in a lifestyle setting`} fill sizes="(max-width: 640px) 50vw, 25vw" /></div>
          <div className="product-info"><h3>{product.name}</h3><p>{product.size}</p><strong>{product.price}</strong></div>
        </article>)}</div>
      </section>

      <section className="price-list section" id="price-list" aria-labelledby="price-list-title">
        <div className="section-heading price-list-heading"><div><p className="eyebrow">The full range</p><h2 id="price-list-title">Product prices</h2></div><p>Compare sizes and prices at a glance. All prices are in ZAR.</p></div>
        <div className="price-grid">{priceGroups.map((group) => <article className="price-card" id={group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')} key={group.name}><h3>{group.name}</h3><dl>{group.prices.map(([size, price]) => <div className="price-row" key={size}><dt>{size}</dt><dd>{price}</dd></div>)}</dl></article>)}</div>
        <div className="price-bottom"><p className="price-note">Prices may change without notice. Specials are available while stocks last.</p><a className="text-link" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer">Need help choosing a size? <ArrowUpRight aria-hidden="true" /></a></div>
      </section>

      <section className="why section" id="why-us">
        <h2>Why customers choose us</h2>
        <div className="reason-grid">{reasons.map((reason) => <article key={reason.number}><span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div>
      </section>

      <section className="about section" id="about">
        <h2>About us</h2>
        <div className="about-copy"><p>At Maisha, we believe every home, business, and community deserves access to quality hygiene and cleaning products without having to pay premium prices.</p>
          <p>Based in <strong>KuGompo City (formerly East London)</strong>, our company was founded on a simple but powerful principle: cleanliness and hygiene should be accessible to everyone. Having experienced firsthand the realities of South Africa&apos;s diverse socio-economic landscape, our founders recognized the unfair challenges many families and businesses face in accessing effective, high-quality cleaning products.</p>
          <p>This insight inspired the creation of a brand committed to bridging that gap by providing affordable, reliable, and high-quality hygiene and cleaning solutions that meet everyday needs.</p>
          <p>Today, we are proud to serve households, businesses, and communities with products that combine quality, value, and dependability. Our mission is to help create cleaner, healthier environments while making hygiene more accessible for all.</p>
          <p className="about-promise">Because everyone deserves a clean and healthy space to live and work.</p>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-main"><div><h2>Ready to order?</h2><div className="contact-links"><a href="tel:+27688386199"><Phone aria-hidden="true" />+27 68 838 6199</a><a href="mailto:sales@maishahub.co.za"><Mail aria-hidden="true" />sales@maishahub.co.za</a></div></div><a className="whatsapp" href="https://wa.me/27688386199" target="_blank" rel="noreferrer">Message us on WhatsApp</a></div>
        <div className="copyright">MAISHA - Hygiene &amp; Cleaning Products | www.maishahub.co.za</div>
      </footer>
      <a className="mobile-order-bar" href="https://wa.me/27688386199" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /> Order on WhatsApp</a>
    </main>
  )
}
