
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  MapPin,
  CalendarDays,
  ImagePlus,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Pencil,
  ShieldCheck
} from 'lucide-react'
import Navbar from '../components/Navbar'
import './EditReport.css'

function EditReport() {
  const navigate = useNavigate()
  const location = useLocation()

  const report = location.state?.report

  const [formData, setFormData] = useState({
    reportType: report?.reportType || report?.type || 'LOST',
    itemName: report?.itemName || report?.name || '',
    category: report?.category || '',
    location: report?.location || '',
    date: report?.date || report?.createdAt?.slice(0, 10) || '',
    description: report?.description || ''
  })

  const [imagePreview, setImagePreview] = useState(
    report?.image || report?.imageUrl || ''
  )
  const [imageFile, setImageFile] = useState(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [error, setError] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [saved, setSaved] = useState(false)

  const categories = [
    'Electronics',
    'Bags',
    'Accessories',
    'Documents',
    'Clothing',
    'Keys',
    'Books',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    setError('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ]

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG or WEBP image.')
      e.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
      setImageFile(file)
      setRemoveImage(false)
      setError('')
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImagePreview('')
    setImageFile(null)
    setRemoveImage(true)
  }

  const handleReview = (e) => {
    e.preventDefault()

    if (!formData.itemName.trim()) {
      setError('Please enter the item name.')
      return
    }

    if (!formData.category) {
      setError('Please select a category.')
      return
    }

    if (!formData.location.trim()) {
      setError('Please enter the location.')
      return
    }

    if (!formData.date) {
      setError('Please select the date.')
      return
    }

    if (!formData.description.trim()) {
      setError('Please enter an item description.')
      return
    }

    setError('')
    setReviewing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleConfirmSave = () => {
    // Frontend demonstration only.
    // Backend update API integration will be added later.
    setSaved(true)
    setReviewing(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!report) {
    return (
      <>
        <Navbar />
        <main className="edit-report-page">
          <div className="edit-report-empty">
            <div className="edit-report-empty-icon">
              <Package size={35} />
            </div>
            <h1>Report Not Found</h1>
            <p>
              We couldn't find the report you want to edit.
              Please open My Reports and select a report again.
            </p>
            <button
              className="edit-report-primary-btn"
              onClick={() => navigate('/my-reports')}
            >
              Go to My Reports
            </button>
          </div>
        </main>
      </>
    )
  }

  if (saved) {
    return (
      <>
        <Navbar />
        <main className="edit-report-page">
          <div className="edit-report-success">
            <div className="edit-report-success-icon">
              <CheckCircle2 size={48} />
            </div>
            <span className="edit-report-success-label">
              EDIT COMPLETED
            </span>
            <h1>Your changes are ready!</h1>
            <p>
              Your updated details for <strong>{formData.itemName}</strong>
              {' '}have been confirmed in this frontend demo.
              Backend saving will be connected later.
            </p>
            <button
              className="edit-report-primary-btn"
              onClick={() => navigate('/my-reports')}
            >
              Back to My Reports
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="edit-report-page">
        <div className="edit-report-container">

          <button
            type="button"
            className="edit-report-back-btn"
            onClick={() => {
              if (reviewing) {
                setReviewing(false)
              } else {
                navigate('/my-reports')
              }
            }}
          >
            <ArrowLeft size={18} />
            {reviewing ? 'Back to Editing' : 'Back to My Reports'}
          </button>

          <section className="edit-report-heading">
            <div className="edit-report-heading-icon">
              <Pencil size={24} />
            </div>
            <span>MANAGE YOUR REPORT</span>
            <h1>{reviewing ? 'Review Your Changes' : 'Edit Report'}</h1>
            <p>
              {reviewing
                ? 'Check the updated information carefully before confirming.'
                : 'Update your item information and keep your report accurate.'}
            </p>
          </section>

          {reviewing ? (
            <section className="edit-report-review-card">
              <div className="edit-report-review-header">
                <div>
                  <h2>Review Updated Details</h2>
                  <p>Please verify the information before saving.</p>
                </div>
                <span className="edit-report-review-badge">
                  REVIEW
                </span>
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Updated item"
                  className="edit-report-review-image"
                />
              )}

              <div className="edit-report-review-type">
                {formData.reportType} ITEM
              </div>

              <h3>{formData.itemName}</h3>

              <div className="edit-report-review-grid">
                <div>
                  <span>Category</span>
                  <strong>{formData.category}</strong>
                </div>
                <div>
                  <span>Date</span>
                  <strong>{formData.date}</strong>
                </div>
                <div className="edit-report-review-full">
                  <span>Location</span>
                  <strong>{formData.location}</strong>
                </div>
                <div className="edit-report-review-full">
                  <span>Description</span>
                  <strong>{formData.description}</strong>
                </div>
              </div>

              <div className="edit-report-review-actions">
                <button
                  type="button"
                  className="edit-report-secondary-btn"
                  onClick={() => setReviewing(false)}
                >
                  Edit Again
                </button>
                <button
                  type="button"
                  className="edit-report-primary-btn"
                  onClick={handleConfirmSave}
                >
                  <CheckCircle2 size={18} />
                  Confirm Changes
                </button>
              </div>
            </section>
          ) : (
            <section className="edit-report-form-card">
              <div className="edit-report-form-header">
                <div>
                  <h2>Update Item Details</h2>
                  <p>Fields marked with * are required.</p>
                </div>
                <span className="edit-report-id">
                  Editing Report
                </span>
              </div>

              <form onSubmit={handleReview}>
                <div className="edit-report-section">
                  <h3>
                    <Package size={19} />
                    Report Type
                  </h3>

                  <div className="edit-report-type-options">
                    <label
                      className={`edit-report-type-option ${formData.reportType === 'LOST' ? 'active lost' : ''}`}
                    >
                      <input
                        type="radio"
                        name="reportType"
                        value="LOST"
                        checked={formData.reportType === 'LOST'}
                        onChange={handleChange}
                      />
                      <span>LOST ITEM</span>
                      <small>Something you have lost</small>
                    </label>

                    <label
                      className={`edit-report-type-option ${formData.reportType === 'FOUND' ? 'active found' : ''}`}
                    >
                      <input
                        type="radio"
                        name="reportType"
                        value="FOUND"
                        checked={formData.reportType === 'FOUND'}
                        onChange={handleChange}
                      />
                      <span>FOUND ITEM</span>
                      <small>Something you have found</small>
                    </label>
                  </div>
                </div>

                <div className="edit-report-divider" />

                <div className="edit-report-section">
                  <h3>
                    <FileText size={19} />
                    Item Information
                  </h3>

                  <div className="edit-report-field">
                    <label htmlFor="editItemName">
                      Item Name <span>*</span>
                    </label>
                    <input
                      id="editItemName"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      placeholder="Enter item name"
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="edit-report-field-row">
                    <div className="edit-report-field">
                      <label htmlFor="editCategory">
                        Category <span>*</span>
                      </label>
                      <select
                        id="editCategory"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="edit-report-field">
                      <label htmlFor="editDate">
                        Date <span>*</span>
                      </label>
                      <div className="edit-report-input-icon">
                        <CalendarDays size={17} />
                        <input
                          id="editDate"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          max={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="edit-report-field">
                    <label htmlFor="editLocation">
                      Location <span>*</span>
                    </label>
                    <div className="edit-report-input-icon">
                      <MapPin size={17} />
                      <input
                        id="editLocation"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Where was the item lost or found?"
                        maxLength={150}
                        required
                      />
                    </div>
                  </div>

                  <div className="edit-report-field">
                    <label htmlFor="editDescription">
                      Description <span>*</span>
                    </label>
                    <textarea
                      id="editDescription"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the item, including its color, brand, unique features and other useful details."
                      rows={5}
                      maxLength={500}
                      required
                    />
                    <div className="edit-report-character-count">
                      {formData.description.length}/500
                    </div>
                  </div>
                </div>

                <div className="edit-report-divider" />

                <div className="edit-report-section">
                  <h3>
                    <ImagePlus size={19} />
                    Item Image
                    <span className="edit-report-optional">OPTIONAL</span>
                  </h3>

                  <p className="edit-report-upload-hint">
                    You can keep the existing image, replace it or remove it.
                  </p>

                  {imagePreview ? (
                    <div className="edit-report-image-preview">
                      <img src={imagePreview} alt="Item preview" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Remove image"
                      >
                        <X size={17} />
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <label className="edit-report-upload-area">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        hidden
                      />
                      <ImagePlus size={28} />
                      <strong>Upload an item image</strong>
                      <span>JPG, PNG or WEBP · Maximum 5 MB</span>
                    </label>
                  )}

                  {imagePreview && (
                    <label className="edit-report-replace-image">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        hidden
                      />
                      Replace Image
                    </label>
                  )}
                </div>

                {error && (
                  <div className="edit-report-error">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <div className="edit-report-form-actions">
                  <button
                    type="button"
                    className="edit-report-secondary-btn"
                    onClick={() => navigate('/my-reports')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="edit-report-primary-btn"
                  >
                    Review Changes
                    <ArrowLeft size={17} className="edit-report-forward-icon" />
                  </button>
                </div>

                <p className="edit-report-footer-note">
                  <ShieldCheck size={15} />
                  Review your changes before confirming.
                </p>
              </form>
            </section>
          )}
        </div>
      </main>
    </>
  )
}

export default EditReport
