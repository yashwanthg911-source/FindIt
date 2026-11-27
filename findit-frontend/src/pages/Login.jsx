import './Login.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { Eye, EyeOff , Package } from 'lucide-react'
function Login() {
  const [showPassword, setShowPassword] = useState(false)
 return (
  <div className="login-page">

    <Navbar />

    <main className="login-container">

      <section className="login-form-section">
       <div className="login-form-content">

  <div className="login-heading">
    <span className="login-eyebrow">WELCOME BACK</span>

    <h1>Sign in to FindIt</h1>

    <p>
      Reconnect with what matters. Sign in to continue your
      lost and found journey.
    </p>
  </div>
<form className="login-form">

  <div className="login-input-group">
    <label htmlFor="loginEmail">Email Address</label>

    <input
      type="email"
      id="loginEmail"
      placeholder="Enter your email address"
      autoComplete="email"
      required
    />
  </div>
<div className="login-input-group">
  <label htmlFor="loginPassword">Password</label>

 <div className="password-input-wrapper">

  <input
    type={showPassword ? 'text' : 'password'}
    id="loginPassword"
    placeholder="Enter your password"
    autoComplete="current-password"
    required
  />

  <button
    type="button"
    className="password-toggle-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>

</div>
<div className="forgot-password">
  <a href="#">Forgot password?</a>
</div>
</div>
<button type="submit" className="login-submit-btn">
  Sign In
  <span>→</span>
</button>
</form>
<div className="login-register-link">
  <p>
    Don't have an account? <a href="/register">Create account</a>
  </p>
</div>
</div>
      </section>

      <section className="login-visual-section">

  <div className="login-visual-content">

    <div className="login-visual-icon">
      <Package size={36} />
    </div>
<span className="login-visual-label">
  THE FINDIT COMMUNITY
</span>
    <h2>Every lost item deserves a way home.</h2>

    <p>
      Join a community that helps people reconnect with
      their lost belongings through the power of kindness.
    </p>
<div className="login-visual-footer">
  <span>✦</span>
  <p>One community. Countless reunions.</p>
</div>
  </div>

</section>

    </main>

  </div>
)
}

export default Login