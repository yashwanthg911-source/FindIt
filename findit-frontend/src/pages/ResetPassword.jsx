import './ResetPassword.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
function ResetPassword() {
  const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const [errors, setErrors] = useState({})
const [success, setSuccess] = useState(false)
const passwordChecks = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password)
}
const strengthCount = Object.values(passwordChecks).filter(Boolean).length

const handleResetPassword = (e) => {
  e.preventDefault()

  const newErrors = {}

  if (strengthCount !== 5) {
    newErrors.password = 'Password must meet all five requirements.'
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match.'
  }

  setErrors(newErrors)

  if (Object.keys(newErrors).length > 0) {
    setSuccess(false)
    return
  }

  setSuccess(true)
}
  return (
    <div className="reset-password-page">
      <Navbar />

      <main className="reset-password-container">
        <div className="reset-password-card">

          <div className="reset-password-icon">
            🔐
          </div>

          <span className="reset-password-eyebrow">
            ACCOUNT SECURITY
          </span>

          <h1>Reset your password</h1>

          <p>
            Create a new password for your FindIt account.
            Make sure it's strong and secure.
          </p>
           <form
  className="reset-password-form"
  onSubmit={handleResetPassword}
>

  <div className="reset-password-field">
    <label>New Password</label>
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your new password"
      value={password}
onChange={(e) => setPassword(e.target.value)}
    />
    {errors.password && (
  <span className="reset-password-error">
    {errors.password}
  </span>
)}
    <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? 'Hide' : 'Show'}
</button>
{password.length > 0 && (
  <div className="password-strength">
    <div className="password-strength-bar">
      <div
        className={`password-strength-fill strength-${strengthCount}`}
      ></div>
    </div>

    <span>
      {strengthCount <= 2
        ? 'Weak'
        : strengthCount <= 4
        ? 'Medium'
        : 'Strong'}
    </span>
  </div>
)}
<div className="password-requirements">
  <span className={passwordChecks.length ? 'requirement-met' : ''}>
    ✓ At least 8 characters
  </span>

  <span className={passwordChecks.uppercase ? 'requirement-met' : ''}>
    ✓ One uppercase letter
  </span>

  <span className={passwordChecks.lowercase ? 'requirement-met' : ''}>
    ✓ One lowercase letter
  </span>

  <span className={passwordChecks.number ? 'requirement-met' : ''}>
    ✓ One number
  </span>

  <span className={passwordChecks.special ? 'requirement-met' : ''}>
    ✓ One special character
  </span>
</div>
  </div>

  <div className="reset-password-field">
    <label>Confirm New Password</label>
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      placeholder="Re-enter your new password"
       value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
    />
    {errors.confirmPassword && (
  <span className="reset-password-error">
    {errors.confirmPassword}
  </span>
)}
    <button
  type="button"
  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
>
  {showConfirmPassword ? 'Hide' : 'Show'}
</button>
  </div>

  <button type="submit" className="reset-password-button">
    Reset Password
  </button>

</form>
{success && (
  <div className="reset-password-success">
    <h3>Password reset successful!</h3>
    <p>
      Your password has been updated successfully.
      You can now sign in using your new password.
    </p>
  </div>
)}
        </div>
      </main>
    </div>
  )
}

export default ResetPassword