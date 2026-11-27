import './ForgotPassword.css'
import Navbar from '../components/Navbar'
  import { useState } from 'react'
function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleForgotPassword = (e) => {
  e.preventDefault()

  console.log('Registered Email:', email)

  setSubmitted(true)
}

  return (
    <div className="forgot-password-page">
      <Navbar />

      <main className="forgot-password-container">
  <div className="forgot-password-card">

    <div className="forgot-password-icon">
      ✉
    </div>

    <span className="forgot-password-eyebrow">
      ACCOUNT RECOVERY
    </span>

    <h1>Forgot your password?</h1>

    <p>
      Don't worry! Enter the email address associated with your
      FindIt account and we'll help you reset your password.
    </p>

   <form
  className="forgot-password-form"
  onSubmit={handleForgotPassword}
>
      <label htmlFor="forgotEmail">Email Address</label>

      <input
  type="email"
  id="forgotEmail"
  placeholder="Enter your registered email"
  autoComplete="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

      <button type="submit">
        Send Reset Link
        <span>→</span>
      </button>
    </form>
    {submitted && (
  <div className="forgot-password-success">
    <h3>Check your inbox!</h3>
    <p>
      If an account exists with this email address,
      you will receive instructions to reset your password.
    </p>
  </div>
)}
    <div className="forgot-password-back">
      <a href="/login">← Back to Sign In</a>
    </div>

  </div>
</main>
    </div>
  )
}

export default ForgotPassword