
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  User,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Package,
  LockKeyhole
} from 'lucide-react'
import Navbar from '../components/Navbar'
import './ClaimSubmission.css'

function ClaimSubmission() {
  const navigate = useNavigate()
  const location = useLocation()

  const item = location.state?.item

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    lostDate: '',
    identifyingDetails: '',
    additionalMessage: ''
  })

  const [attachment, setAttachment] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const itemName =
    item?.name || item?.itemName || 'Reported Item'

  const itemImage =
    item?.image || item?.imageUrl || ''

  const itemLocation =
    item?.location || 'Location not specified'

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    setError('')
  }

  const handleAttachment = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf'
    ]

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, WEBP or PDF file.')
      e.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5 MB.')
      e.target.value = ''
      return
    }

    setAttachment(file)
    setError('')
  }

  const removeAttachment = () => {
    setAttachment(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!agreed) {
      setError('Please confirm that the information provided is accurate.')
      return
    }

    if (!item) {
      setError('Item information is missing. Please return to Browse Items and select an item.')
      return
    }

    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Navbar />

        <main className="claim-success-page">
          <div className="claim-success-card">
            <div className="claim-success-icon">
              <CheckCircle2 size={48} />
            </div>

            <span className="claim-success-label">
              CLAIM SUBMITTED
            </span>

            <h1>Your claim has been submitted!</h1>

            <p>
              Your claim for <strong>{itemName}</strong> has been
              recorded in this demo. The verification process
              will be connected to the backend later.
            </p>

            <div className="claim-success-info">
              <ShieldCheck size={20} />
              <span>
                Keep your identifying details private until
                the claim is verified.
              </span>
            </div>

            <button
              className="claim-primary-btn"
              onClick={() => navigate('/my-claims')}
            >
              View My Claims
            </button>

            <button
              className="claim-secondary-btn"
              onClick={() => navigate('/items')}
            >
              Browse More Items
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="claim-page">
        <div className="claim-container">

          <button
            className="claim-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <section className="claim-heading">
            <div className="claim-heading-icon">
              <FileText size={25} />
            </div>

            <span className="claim-eyebrow">
              ITEM OWNERSHIP VERIFICATION
            </span>

            <h1>Submit a Claim</h1>

            <p>
              Tell us why this item belongs to you.
              Provide accurate details to help verify your ownership.
            </p>
          </section>

          <div className="claim-layout">

            <section className="claim-form-card">
              <div className="claim-form-header">
                <div>
                  <h2>Claim Information</h2>
                  <p>Fill in the details below to submit your claim.</p>
                </div>

                <span className="claim-required-note">
                  * Required fields
                </span>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="claim-form-section">
                  <h3>
                    <User size={19} />
                    Personal Information
                  </h3>

                  <div className="claim-field">
                    <label htmlFor="fullName">
                      Full Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      maxLength={80}
                    />
                  </div>

                  <div className="claim-field-row">
                    <div className="claim-field">
                      <label htmlFor="email">
                        Email Address <span>*</span>
                      </label>

                      <div className="claim-input-icon">
                        <Mail size={17} />

                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="claim-field">
                      <label htmlFor="phone">
                        Phone Number <span>*</span>
                      </label>

                      <div className="claim-input-icon">
                        <Phone size={17} />

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          pattern="[0-9+\-\s()]{10,15}"
                          title="Enter a valid phone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="claim-form-divider" />

                <div className="claim-form-section">
                  <h3>
                    <ShieldCheck size={19} />
                    Ownership Verification
                  </h3>

                  <div className="claim-field">
                    <label htmlFor="lostDate">
                      When did you lose this item? <span>*</span>
                    </label>

                    <div className="claim-input-icon">
                      <CalendarDays size={17} />

                      <input
                        type="date"
                        id="lostDate"
                        name="lostDate"
                        value={formData.lostDate}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="claim-field">
                    <label htmlFor="identifyingDetails">
                      Describe unique identifying details <span>*</span>
                    </label>

                    <textarea
                      id="identifyingDetails"
                      name="identifyingDetails"
                      placeholder="Mention details only the actual owner would know, such as a hidden mark, scratch, sticker, contents, or other identifying feature."
                      value={formData.identifyingDetails}
                      onChange={handleChange}
                      rows={5}
                      maxLength={500}
                      required
                    />

                    <div className="claim-character-count">
                      {formData.identifyingDetails.length}/500
                    </div>

                    <small className="claim-field-hint">
                      Avoid sharing passwords, PINs or other sensitive information.
                    </small>
                  </div>

                  <div className="claim-field">
                    <label htmlFor="additionalMessage">
                      Additional Explanation
                    </label>

                    <textarea
                      id="additionalMessage"
                      name="additionalMessage"
                      placeholder="Where did you last see the item? Add any other information that may help verify your claim."
                      value={formData.additionalMessage}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                    />

                    <div className="claim-character-count">
                      {formData.additionalMessage.length}/500
                    </div>
                  </div>
                </div>

                <div className="claim-form-divider" />

                <div className="claim-form-section">
                  <h3>
                    <Upload size={19} />
                    Supporting Evidence
                    <span className="claim-optional-tag">OPTIONAL</span>
                  </h3>

                  <p className="claim-upload-description">
                    Upload a photo or document that may help
                    establish ownership.
                  </p>

                  {!attachment ? (
                    <label className="claim-upload-area">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={handleAttachment}
                        hidden
                      />

                      <div className="claim-upload-icon">
                        <Upload size={23} />
                      </div>

                      <strong>Click to upload a file</strong>

                      <span>
                        JPG, PNG, WEBP or PDF · Maximum 5 MB
                      </span>
                    </label>
                  ) : (
                    <div className="claim-file-preview">
                      <div className="claim-file-icon">
                        <FileText size={21} />
                      </div>

                      <div className="claim-file-details">
                        <strong>{attachment.name}</strong>
                        <span>
                          {(attachment.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={removeAttachment}
                        className="claim-remove-file"
                        aria-label="Remove attachment"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="claim-confirmation">
                  <input
                    type="checkbox"
                    id="claimAgreement"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked)
                      setError('')
                    }}
                  />

                  <label htmlFor="claimAgreement">
                    I confirm that the information provided is
                    accurate and that I am the rightful owner
                    or authorized claimant of this item.
                  </label>
                </div>

                {error && (
                  <div className="claim-error-message">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="claim-submit-btn"
                >
                  <ShieldCheck size={19} />
                  Submit Claim
                </button>

                <p className="claim-form-footer">
                  <LockKeyhole size={14} />
                  Your information should only be used for claim verification.
                </p>

              </form>
            </section>

            <aside className="claim-sidebar">

              <div className="claim-item-card">
                <div className="claim-sidebar-title">
                  <Package size={19} />
                  <h3>Claiming This Item</h3>
                </div>

                {itemImage ? (
                  <img
                    src={itemImage}
                    alt={itemName}
                    className="claim-item-image"
                  />
                ) : (
                  <div className="claim-item-image-placeholder">
                    <Package size={42} />
                  </div>
                )}

                <h4>{itemName}</h4>

                <div className="claim-item-location">
                  <MapPin size={16} />
                  {itemLocation}
                </div>

                <div className="claim-item-status">
                  <span>FOUND ITEM</span>
                  <span>Claim Verification</span>
                </div>
              </div>

              <div className="claim-tips-card">
                <div className="claim-tips-icon">
                  <ShieldCheck size={21} />
                </div>

                <h3>Tips for a Successful Claim</h3>

                <ul>
                  <li>
                    Provide specific details about your item.
                  </li>
                  <li>
                    Mention unique marks or features.
                  </li>
                  <li>
                    Include supporting evidence if available.
                  </li>
                  <li>
                    Make sure your contact information is correct.
                  </li>
                </ul>
              </div>

              <div className="claim-privacy-card">
                <LockKeyhole size={19} />

                <div>
                  <strong>Stay Safe</strong>
                  <p>
                    Never share passwords, OTPs, banking
                    details or private security codes.
                  </p>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </main>
    </>
  )
}

export default ClaimSubmission
