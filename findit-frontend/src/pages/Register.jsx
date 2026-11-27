import './Register.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { Package } from 'lucide-react'
function Register() {
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
const [errors, setErrors] = useState({})
const [successMessage, setSuccessMessage] = useState('')
const passwordStrength = [
  password.length >= 8,
  /[A-Z]/.test(password),
  /[a-z]/.test(password),
  /[0-9]/.test(password),
  /[^A-Za-z0-9]/.test(password)
].filter(Boolean).length

const handleRegister = (e) => {
  e.preventDefault()
const newErrors = {}

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/

if (!name.trim()) {
  newErrors.name = 'Please enter your full name'
} else if (!nameRegex.test(name.trim())) {
  newErrors.name = 'Name should contain only letters and spaces'
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!email.trim()) {
  newErrors.email = 'Please enter your email address'
} else if (!emailRegex.test(email)) {
  newErrors.email = 'Please enter a valid email address'
}
const phoneRegex = /^[6-9]\d{9}$/

if (!phone.trim()) {
  newErrors.phone = 'Please enter your phone number'
} else if (!phoneRegex.test(phone.trim())) {
  newErrors.phone = 'Please enter a valid 10-digit Indian mobile number'
}
if (!password) {
  newErrors.password = 'Please enter a password'
} else if (passwordStrength < 5) {
  newErrors.password = 'Password must contain at least 8 characters, uppercase, lowercase, a number and a special character'
}
if (!confirmPassword) {
  newErrors.confirmPassword = 'Please confirm your password'
} else if (password !== confirmPassword) {
  newErrors.confirmPassword = 'Passwords do not match'
}
setErrors(newErrors)
if (Object.keys(newErrors).length > 0) {
  return
}
setSuccessMessage('Validation successful! Your details are ready.')
  console.log('Full Name:', name)
  console.log('Email:', email)
  console.log('Phone:', phone)
  console.log('Password:', password)
  console.log('Confirm Password:', confirmPassword)
}
  return (
    <div className="register-page">

      <Navbar />

      <main className="register-container">
        <section className="register-form-section">

  <div className="register-form-content">

   <div className="register-heading">

  <span className="register-eyebrow">
    JOIN THE FINDIT COMMUNITY
  </span>

  <h1>Create your account</h1>

  <p>
    Start your journey with FindIt. Help others find what
    they've lost and share the joy of reunions.
  </p>

</div>
<form className="register-form" onSubmit={handleRegister} noValidate>
  {successMessage && (
  <p className="register-success">{successMessage}</p>
)}

<div className="register-input-group">

  <label htmlFor="registerName">Full Name</label>

  <input
  type="text"
  id="registerName"
  placeholder="Enter your full name"
  autoComplete="name"
  value={name}
  onChange={(e) => {
  setName(e.target.value)
  setErrors((prev) => ({ ...prev, name: '' }))
  setSuccessMessage('')
}}
  required
/>
{errors.name && (
  <p className="register-error">{errors.name}</p>
)}
</div>
<div className="register-input-group">

  <label htmlFor="registerEmail">Email Address</label>

 <input
  type="email"
  id="registerEmail"
  placeholder="Enter your email address"
  autoComplete="email"
  value={email}
  onChange={(e) => {
  setEmail(e.target.value)
  setErrors((prev) => ({ ...prev, email: '' }))
  setSuccessMessage('')
}}
  required
/>
{errors.email && (
  <p className="register-error">{errors.email}</p>
)}
</div>
<div className="register-input-group">

  <label htmlFor="registerPhone">Phone Number</label>

  <input
  type="tel"
  id="registerPhone"
  placeholder="Enter your phone number"
  autoComplete="tel"
  value={phone}
 onChange={(e) => {
  setPhone(e.target.value)
  setErrors((prev) => ({ ...prev, phone: '' }))
  setSuccessMessage('')
}}
  required
/>
{errors.phone && (
  <p className="register-error">{errors.phone}</p>
)}
</div>
<div className="register-input-group">

  <label htmlFor="registerPassword">Password</label>

  <div className="register-password-wrapper">

    <input
      type={showPassword ? 'text' : 'password'}
      id="registerPassword"
      placeholder="Create a password"
      autoComplete="new-password"
      value={password}
      onChange={(e) => {
  setPassword(e.target.value)
 setErrors((prev) => ({
  ...prev,
  password: '',
  confirmPassword: ''
}))
  setSuccessMessage('')
}}
      required
    />
{errors.password && (
  <p className="register-error">{errors.password}</p>
)}
    <button
      type="button"
      className="register-password-toggle"
      onChange={(e) => {
  setConfirmPassword(e.target.value)
  setErrors((prev) => ({ ...prev, confirmPassword: '' }))
  setSuccessMessage('')
}}
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>

  </div>
{password.length > 0 && (
  <div className="password-strength">

    <div className="password-strength-bars">
      {[1, 2, 3, 4, 5].map((level) => (
        <span
          key={level}
          className={level <= passwordStrength ? 'active' : ''}
        ></span>
      ))}
    </div>

    <p>
      {passwordStrength <= 2
        ? 'Weak password'
        : passwordStrength <= 4
        ? 'Medium password'
        : 'Strong password'}
    </p>

  </div>
)}
</div>
<div className="register-input-group">

  <label htmlFor="confirmPassword">Confirm Password</label>

  <div className="register-password-wrapper">

    <input
      type={showConfirmPassword ? 'text' : 'password'}
      id="confirmPassword"
      placeholder="Re-enter your password"
      autoComplete="new-password"
      value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
{errors.confirmPassword && (
  <p className="register-error">{errors.confirmPassword}</p>
)}
    <button
      type="button"
      className="register-password-toggle"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      {showConfirmPassword ? 'Hide' : 'Show'}
    </button>

  </div>
{confirmPassword.length > 0 && (
  <p className={`password-match-message ${
    password === confirmPassword ? 'matched' : 'not-matched'
  }`}>
    {password === confirmPassword
      ? '✓ Passwords match'
      : '✕ Passwords do not match'}
  </p>
)}
</div>
<button type="submit" className="register-submit-btn">
  Create Account
  <span>→</span>
</button>
</form>
<div className="register-login-link">
  <p>
    Already have an account? <a href="/login">Sign in</a>
  </p>
</div>
  </div>

</section>

<section className="register-visual-section">

  <div className="register-visual-content">

    <div className="register-visual-icon">
      <Package size={36} />
    </div>

    <span className="register-visual-label">
      MORE THAN JUST LOST & FOUND
    </span>

    <h2>Be the reason someone finds their way back.</h2>

    <p>
      Every small act of kindness matters. Join FindIt
      and help bring lost belongings back to their owners.
    </p>

    <div className="register-visual-footer">
      <span>✦</span>
      <p>Connect. Help. Reunite.</p>
    </div>

  </div>

</section>
      </main>

    </div>
  )
}

export default Register