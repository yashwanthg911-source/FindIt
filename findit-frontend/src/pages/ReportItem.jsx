import './ReportItem.css'
import Navbar from '../components/Navbar'
import { PackageSearch, PackageCheck } from 'lucide-react'
import { useState, useRef } from 'react'  
function ReportItem() {
  const [reportType, setReportType] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
const [imagePreview, setImagePreview] = useState('')
const [imageType, setImageType] = useState('NONE')
const [imageError, setImageError] = useState('')
const fileInputRef = useRef(null)
const [itemName, setItemName] = useState('')
const [itemCategory, setItemCategory] = useState('')
const [itemLocation, setItemLocation] = useState('')
const [itemDate, setItemDate] = useState('')
const [itemDescription, setItemDescription] = useState('')
const [formErrors, setFormErrors] = useState({})
const [showSuccess, setShowSuccess] = useState(false)
const [showReview, setShowReview] = useState(false)


const handleImageChange = (e) => {
  const file = e.target.files[0]

  if (!file) return

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ]

 if (!allowedTypes.includes(file.type)) {
  setImageError('Please upload a JPG, PNG or WEBP image.')
  e.target.value = ''
  return
}

 if (file.size > 5 * 1024 * 1024) {
  setImageError('Image size must be less than 5 MB.')
  e.target.value = ''
  return
}

  setImageError('')
  setSelectedImage(file)
  setImagePreview(URL.createObjectURL(file))

  setImageType(
    reportType === 'LOST' ? 'REFERENCE' : 'ACTUAL'
  )
}
const handleRemoveImage = () => {
  setSelectedImage(null)
  setImagePreview('')
  setImageType('NONE')
  setImageError('')

  if (fileInputRef.current) {
    fileInputRef.current.value = ''
  }
}
const isFormReady =
  itemName.trim() !== '' &&
  itemCategory !== '' &&
  itemLocation.trim() !== '' &&
  itemDate !== '' &&
  itemDescription.trim() !== '' &&
  imageError === ''

const validateForm = () => {
  const errors = {}
if (imageError) {
  return false
}
  if (!itemName.trim()) {
    errors.itemName = 'Please enter the item name.'
  }

  if (!itemCategory) {
    errors.itemCategory = 'Please select a category.'
  }

  if (!itemLocation.trim()) {
    errors.itemLocation = 'Please enter the location.'
  }

  if (!itemDate) {
    errors.itemDate = 'Please select the date.'
  }

  if (!itemDescription.trim()) {
    errors.itemDescription = 'Please describe the item.'
  }

  setFormErrors(errors)

  return Object.keys(errors).length === 0
}

const handleSubmit = (e) => {
  e.preventDefault()

  const isValid = validateForm()

  if (!isValid) {
    return
  }

 setShowReview(true)
setShowSuccess(false)

}
const handleConfirmSubmit = () => {
  setShowReview(false)
  setShowSuccess(true)

  // Reset form fields
  setItemName('')
  setItemCategory('')
  setItemLocation('')
  setItemDate('')
  setItemDescription('')

  // Reset image
  setSelectedImage(null)
  setImagePreview('')
  setImageType('NONE')
  setImageError('')

  // Clear file input
  if (fileInputRef.current) {
    fileInputRef.current.value = ''
  }

  // Clear validation errors
  setFormErrors({})
}
  return (
    <main className="report-page">

      <Navbar />

      {/* Page Introduction */}
      <section className="report-hero">

        <span className="report-eyebrow">
          HELP YOUR COMMUNITY
        </span>

        <h1>
          Let's get your item
          <span> back where it belongs.</span>
        </h1>

        <p>
          Whether you've lost something or found something,
          you're in the right place. Share a few details and
          let FindIt help make the connection.
        </p>

      </section>
      {/* Report Type Selection */}
<section className="report-type-section">

  <div className="report-section-heading">
    <span>STEP 01</span>
    <h2>What would you like to report?</h2>
    <p>Select the option that best describes your situation.</p>
  </div>

  <div className="report-type-grid">

   <div
  className={`report-type-card lost-card ${
    reportType === 'LOST' ? 'selected' : ''
  }`}
  onClick={() => {
  setReportType('LOST')
  setShowSuccess(false)
  setShowReview(false)
  if (selectedImage) {
  setImageType('REFERENCE')
}
}}
>
  {reportType === 'LOST' && (
  <div className="report-selected-check">✓</div>
)}
      <div className="report-type-icon">
        <PackageSearch size={30} />
      </div>

      <h3>I Lost Something</h3>

      <p>
        Report an item you've misplaced and
        help others identify it.
      </p>

      <span>Report Lost Item →</span>
    </div>

   <div
  className={`report-type-card found-card ${
    reportType === 'FOUND' ? 'selected' : ''
  }`}
  onClick={() => {
  setReportType('FOUND')
  setShowSuccess(false)
  setShowReview(false)
    if (selectedImage) {
    setImageType('ACTUAL')
  }
}}
>
  {reportType === 'FOUND' && (
  <div className="report-selected-check">✓</div>
)}
      <div className="report-type-icon">
        <PackageCheck size={30} />
      </div>

      <h3>I Found Something</h3>

      <p>
        Help someone reconnect with an item
        you've discovered.
      </p>

      <span>Report Found Item →</span>
    </div>

  </div>

</section>
{reportType && (
  <section className="report-form-section">

    {showSuccess && (
  <div className="report-success-message">
    <span className="success-icon">✓</span>

    <div>
      <h3>Your report is ready!</h3>
      <p>
        Your item details have been validated successfully.
      </p>
    </div>
  </div>
)}
    <div className="report-section-heading">
      <span>STEP 02</span>

      <h2>
        {reportType === 'LOST'
          ? 'Tell us what you lost'
          : 'Tell us what you found'}
      </h2>

      <p>
        Share a few details to help us identify the item.
      </p>
    </div>


{!showReview && (
  <form
    className="report-form-grid"
    onSubmit={handleSubmit}
  >

  <div className="report-form-group full-width">

    <label htmlFor="itemName">
      Item Name <span>*</span>
    </label>

    <input
  type="text"
  id="itemName"
  className={
  formErrors.itemName
    ? 'field-invalid'
    : itemName.trim()
      ? 'field-valid'
      : ''
}
  placeholder="e.g. Wireless Headphones"
  value={itemName}
  onChange={(e) => {
  setItemName(e.target.value)

  if (formErrors.itemName) {
    setFormErrors((prev) => ({
      ...prev,
      itemName: ''
    }))
  }
}}
/>
{formErrors.itemName && (
  <small className="field-error">
    {formErrors.itemName}
  </small>
)}
    <small>Enter the name of the item you're reporting.</small>

  </div>
<div className="report-form-group">

  <label htmlFor="itemCategory">
    Category <span>*</span>
  </label>

 <select
  id="itemCategory"
  className={
  formErrors.itemCategory
    ? 'field-invalid'
    : itemCategory
      ? 'field-valid'
      : ''
}
  value={itemCategory}
  onChange={(e) => {
  setItemCategory(e.target.value)

  if (formErrors.itemCategory) {
    setFormErrors((prev) => ({
      ...prev,
      itemCategory: ''
    }))
  }
}}
>
    <option value="" disabled>
      Select a category
    </option>

    <option value="ELECTRONICS">Electronics</option>
    <option value="ACCESSORIES">Accessories</option>
    <option value="BAGS">Bags</option>
    <option value="DOCUMENTS">Documents</option>
    <option value="CLOTHING">Clothing</option>
    <option value="OTHERS">Others</option>
  </select>
{formErrors.itemCategory && (
  <small className="field-error">
    {formErrors.itemCategory}
  </small>
)}
  <small>Choose the category that best describes your item.</small>

</div>
<div className="report-form-group">

  <label htmlFor="itemLocation">
    Location <span>*</span>
  </label>

 <input
  type="text"
  id="itemLocation"
  className={
  formErrors.itemLocation
    ? 'field-invalid'
    : itemLocation.trim()
      ? 'field-valid'
      : ''
}
  placeholder="e.g. Central Library, Bengaluru"
  value={itemLocation}
  onChange={(e) => {
  setItemLocation(e.target.value)

  if (formErrors.itemLocation) {
    setFormErrors((prev) => ({
      ...prev,
      itemLocation: ''
    }))
  }
}}
/>
{formErrors.itemLocation && (
  <small className="field-error">
    {formErrors.itemLocation}
  </small>
)}
  <small>
    Where was the item lost or found?
  </small>

</div>
<div className="report-form-group">

  <label htmlFor="itemDate">
    Date {reportType === 'LOST' ? 'Lost' : 'Found'}
    <span> *</span>
  </label>

 <input
  type="date"
  id="itemDate"
  className={
  formErrors.itemDate
    ? 'field-invalid'
    : itemDate
      ? 'field-valid'
      : ''
}
  value={itemDate}
 onChange={(e) => {
  setItemDate(e.target.value)

  if (formErrors.itemDate) {
    setFormErrors((prev) => ({
      ...prev,
      itemDate: ''
    }))
  }
}}
/>
{formErrors.itemDate && (
  <small className="field-error">
    {formErrors.itemDate}
  </small>
)}
  <small>
    When did you {reportType === 'LOST' ? 'lose' : 'find'} this item?
  </small>

</div>
<div className="report-form-group full-width">

  <label htmlFor="itemDescription">
    Description <span>*</span>
  </label>

 <textarea
  id="itemDescription"
  className={
  formErrors.itemDescription
    ? 'field-invalid'
    : itemDescription.trim()
      ? 'field-valid'
      : ''
}
  rows="4"
  maxLength={500}
  placeholder="Describe the item in detail. Include its color, brand, model, unique marks or other identifying features..."
  value={itemDescription}
 onChange={(e) => {
  setItemDescription(e.target.value)

  if (formErrors.itemDescription) {
    setFormErrors((prev) => ({
      ...prev,
      itemDescription: ''
    }))
  }
}}
/>
<div className="character-counter">
  {itemDescription.length} / 500 characters
</div>
{formErrors.itemDescription && (
  <small className="field-error">
    {formErrors.itemDescription}
  </small>
)}
  <small>
    Provide details that can help identify the correct item.
  </small>
  {imageError && (
  <p className="image-error">
    {imageError}
  </p>
)}

</div>
<div className="report-form-group full-width">

  <label htmlFor="itemImage">
    Upload Item Image
  </label>

  <input
    type="file"
    id="itemImage"
    accept="image/*"
     ref={fileInputRef}
     onChange={handleImageChange}
  />

  <small>
  {reportType === 'LOST'
    ? 'No actual photo? No problem! You can upload a similar-looking reference image downloaded from the internet.'
    : 'Please upload an actual photo of the item you found, if possible, to help its owner identify it.'}
</small>
<small className="image-size-hint">
  Accepted formats: JPG, PNG, WEBP · Maximum size: 5 MB
</small>
{imagePreview && (
  <div className="image-preview">
    <img
      src={imagePreview}
      alt="Selected item preview"
    />
    <button
  type="button"
  className="remove-image-btn"
  onClick={handleRemoveImage}
>
  ×
</button>
    <span className={`image-type-label ${imageType.toLowerCase()}`}>
      {imageType === 'REFERENCE'
        ? 'Reference Image'
        : 'Actual Photo'}
    </span>
  </div>
)}
</div>
<button
  type="submit"
  className="submit-report-btn"
  disabled={!isFormReady}
>
  Submit Report →
</button>
  </form>
)}
{showReview && (
  <div className="report-review-section">

    <div className="report-section-heading">
      <span>STEP 03</span>
      <h2>Review Your Report</h2>
      <p>Please check your details before confirming.</p>
    </div>
<div className="review-details-card">

  <div className="review-detail-row">
    <span>Report Type</span>
    <strong>
      {reportType === 'LOST' ? 'Lost Item' : 'Found Item'}
    </strong>
  </div>

  <div className="review-detail-row">
    <span>Item Name</span>
    <strong>{itemName}</strong>
  </div>

  <div className="review-detail-row">
    <span>Category</span>
    <strong>{itemCategory}</strong>
  </div>

  <div className="review-detail-row">
    <span>Location</span>
    <strong>{itemLocation}</strong>
  </div>

  <div className="review-detail-row">
    <span>Date</span>
    <strong>{itemDate}</strong>
  </div>

  <div className="review-detail-row">
    <span>Description</span>
    <strong>{itemDescription}</strong>
  </div>

</div>
{imagePreview && (
  <div className="review-image-section">

    <h3>Uploaded Image</h3>

    <img
      src={imagePreview}
      alt="Item preview"
      className="review-item-image"
    />

    <span className="review-image-type">
      {imageType === 'REFERENCE'
        ? 'Reference Image'
        : 'Actual Item Image'}
    </span>

  </div>
)}
<div className="review-actions">

  <button
    type="button"
    className="review-back-btn"
    onClick={() => setShowReview(false)}
  >
    ← Back to Edit
  </button>

  <button
    type="button"
    className="review-confirm-btn"
    onClick={handleConfirmSubmit}
  >
    Confirm Report →
  </button>

</div>
  </div>
)}
  </section>
)}
    </main>
  )
}

export default ReportItem