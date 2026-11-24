import {
  MapPin,
  Camera,
  Briefcase,
  Code2,
  ArrowUpRight
} from 'lucide-react'

import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND INFORMATION */}
        <div className="footer-brand">

          <div className="footer-logo">
            <MapPin size={27} />
            <span>FindIt</span>
          </div>

          <p>
            Helping people reconnect with their lost
            belongings through a smarter and simpler
            lost and found platform.
          </p>

         <div className="footer-socials">
  <a href="#" aria-label="Instagram">
    <Camera size={19} />
  </a>

  <a href="#" aria-label="LinkedIn">
    <Briefcase size={19} />
  </a>

  <a href="#" aria-label="GitHub">
    <Code2 size={19} />
  </a>
</div>

        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#recent-items">Explore Items</a>
          <a href="#">Report an Item</a>
        </div>

        {/* ACCOUNT LINKS */}
        <div className="footer-links">
          <h3>Your Account</h3>
          <a href="#">Login</a>
          <a href="#">Register</a>
          <a href="#">My Reports</a>
        </div>

        {/* PLATFORM INFORMATION */}
        <div className="footer-about">
          <h3>About FindIt</h3>

          <p>
            Every lost item deserves a chance
            to find its way home.
          </p>

          <a href="#how-it-works">
            How It Works <ArrowUpRight size={16} />
          </a>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>
          © 2026 FindIt. All rights reserved.
        </p>

        <p>
          Made with care for our community.
        </p>
      </div>

    </footer>
  )
}

export default Footer