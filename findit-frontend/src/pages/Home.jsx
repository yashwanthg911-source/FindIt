
import './Home.css'
import Navbar from '../components/Navbar.jsx'
import {
  ShieldCheck,
  Search,
  PencilLine,
  MapPin,
  Check,
  ArrowRight,
  Handshake,
  Clock3,
  ArrowUpRight
} from 'lucide-react'
const recentItems = [
  {
    id: 1,
    name: 'Leather Wallet',
    category: 'Accessories',
    location: 'Near Library',
    date: '2 hours ago',
    status: 'LOST',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    category: 'Electronics',
    location: 'Main Building',
    date: '5 hours ago',
    status: 'FOUND',
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 3,
    name: 'Blue Backpack',
    category: 'Bags',
    location: 'College Cafeteria',
    date: 'Yesterday',
    status: 'LOST',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85'
  }
]
function Home() {
  return (
    <main className="home-page">

      {/* Decorative Background */}
      <div className="bg-circle-glow"></div>
      <div className="bg-dots">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      {/* Existing Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero">

        {/* Left Content */}
        <div className="hero-left">

          <div className="platform-badge">
            <ShieldCheck size={18} />
            SMART LOST & FOUND PLATFORM
          </div>

          <h1 className="hero-title">
            Lost something?
            <br />
            Let's help you
            <br />
            <span className="highlight-find">
              find it.
              <svg
                className="underline-svg"
                viewBox="0 0 240 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 11C65 4 165 3 237 8"
                  stroke="#0047FF"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M35 16C95 12 155 12 205 14"
                  stroke="#0047FF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-subtitle">
            A smarter way to reconnect people
            with their lost belongings.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-lg">
              <Search size={20} />
              Explore Items
              <ArrowRight size={19} />
            </button>

            <button className="btn-outline-lg">
              <PencilLine size={19} />
              Report an Item
            </button>
          </div>

        </div>

        {/* Right Visual Composition */}
        <div className="hero-right">

          {/* LOST Wallet Card */}
          <div className="float-card card-lost">
            <div className="card-img-box">
              <span className="status-pill status-lost">
                <span className="status-dot">!</span>
                LOST
              </span>
              <img
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80"
                alt="Brown leather wallet"
              />
            </div>

            <div className="card-title">Wallet</div>
            <div className="card-loc">
              <MapPin size={13} />
              Near Library
            </div>
          </div>

          {/* FOUND Earbuds Card */}
          <div className="float-card card-found">
            <div className="card-img-box">
              <span className="status-pill status-found">
                <span className="status-dot">✓</span>
                FOUND
              </span>
              <img
                src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=80"
                alt="Wireless earbuds"
              />
            </div>

            <div className="card-title">Earbuds</div>
            <div className="card-loc">
              <MapPin size={13} />
              Main Building
            </div>
          </div>

          {/* Backpack */}
          <div className="backpack-wrapper">
            <img
              className="backpack-img"
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"
              alt="Navy blue backpack"
            />
          </div>

          {/* Reunited Notification */}
          <div className="reunited-toast">
            <div className="toast-sparkles">
              ✦
            </div>

            <div className="check-circle-lg">
              <Check size={23} />
            </div>

            <div className="toast-text">
              <h4>Item Reunited!</h4>
              <p>A happy ending 💙</p>
            </div>
          </div>

          {/* Pedestal */}
          <div className="pedestal"></div>

        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">

        <div className="hiw-header">
          <h3>How FindIt works?</h3>
          <p>Just 4 simple steps</p>
        </div>

        <div className="steps-container">

          <div className="step-item">
            <div className="step-top">
              <span className="step-num">1</span>
              <PencilLine size={29} />
            </div>
            <span className="step-label">Report an item</span>
          </div>

          <ArrowRight className="step-arrow" size={24} />

          <div className="step-item">
            <div className="step-top">
              <span className="step-num">2</span>
              <Search size={30} />
            </div>
            <span className="step-label">Discover a match</span>
          </div>

          <ArrowRight className="step-arrow" size={24} />

          <div className="step-item">
            <div className="step-top">
              <span className="step-num">3</span>
              <ShieldCheck size={30} />
            </div>
            <span className="step-label">Verify ownership</span>
          </div>

          <ArrowRight className="step-arrow" size={24} />

          <div className="step-item">
            <div className="step-top">
              <span className="step-num">4</span>
              <Handshake size={30} />
            </div>
            <span className="step-label">Reunite</span>
          </div>

        </div>
      </section>

{/* Recently Reported Items */}
<section className="recent-items">

  <div className="recent-heading">
    <div>
      <span className="section-label">EXPLORE FINDIT</span>
      <h2>Recently Reported Items</h2>
      <p>
        Discover lost and found items reported by our community.
      </p>
    </div>

    <button className="view-all-btn">
      View All Items
      <ArrowUpRight size={18} />
    </button>
  </div>

  <div className="items-grid">

    {recentItems.map((item) => (
      <article className="item-card" key={item.id}>

        <div className="item-image">
          <img src={item.image} alt={item.name} />

          <span
            className={`item-status ${
              item.status === 'LOST' ? 'lost-status' : 'found-status'
            }`}
          >
            {item.status}
          </span>
        </div>

        <div className="item-details">

          <span className="item-category">
            {item.category}
          </span>

          <h3>{item.name}</h3>

          <div className="item-meta">
            <span>
              <MapPin size={15} />
              {item.location}
            </span>

            <span>
              <Clock3 size={15} />
              {item.date}
            </span>
          </div>

          <button className="item-view-btn">
            View Details
            <ArrowRight size={17} />
          </button>

        </div>
      </article>
    ))}

  </div>

</section>

{/* Call To Action Section */}
<section className="cta-section">
  <div className="cta-content">
    <span className="cta-label">BE PART OF THE SOLUTION</span>

    <h2>
      Lost something?
      <br />
      Or found something?
      <br />
      <span>Let's make it right.</span>
    </h2>

    <p>
      A small action can make someone's day.
      Report an item and help reunite people with
      the things they value.
    </p>

    <div className="cta-buttons">
      <button className="cta-primary">
        Report Lost Item <ArrowRight size={18} />
      </button>

      <button className="cta-secondary">
        Report Found Item <Handshake size={18} />
      </button>
    </div>
  </div>

  <div className="cta-decoration">
    <div className="cta-circle">
      <Handshake size={100} strokeWidth={1.2} />
    </div>
    <span className="cta-floating cta-floating-one">
      <Check size={16} /> Helping each other
    </span>
    <span className="cta-floating cta-floating-two">
      <ShieldCheck size={16} /> Safe & trusted
    </span>
  </div>
</section>

{/* Footer Section */}
<footer className="footer">
  <div className="footer-main">
    <div className="footer-brand">
      <h2>
        Find<span>It.</span>
      </h2>

      <p>
        Lost something? Found something?
        FindIt brings people together to reunite
        lost belongings with their rightful owners.
      </p>

      <div className="footer-trust">
        <ShieldCheck size={17} />
        <span>Building a safer, more connected community.</span>
      </div>
    </div>

    <div className="footer-links">
      <div className="footer-column">
        <h3>Explore</h3>
        <a href="/">Home</a>
        <a href="/items">Browse Items</a>
        <a href="/how-it-works">How It Works</a>
      </div>

      <div className="footer-column">
        <h3>Get Started</h3>
        <a href="/report-lost">Report Lost Item</a>
        <a href="/report-found">Report Found Item</a>
        <a href="/login">Sign In</a>
      </div>

      <div className="footer-column">
        <h3>Support</h3>
        <a href="/contact">Contact Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2026 FindIt. All rights reserved.</p>

    <p>
      Made with <span>♥</span> to bring things back together.
    </p>
  </div>
</footer>

    </main>
  )
}

export default Home
