import './Profile.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Profile() {

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('Yashwanth G.')
const [email, setEmail] = useState('yashwanth@example.com')
const [phone, setPhone] = useState('')
const navigate = useNavigate()
const handleSaveProfile = (e) => {
  e.preventDefault()

  setIsEditing(false)
}

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">

        <div className="profile-header">
          <span className="profile-eyebrow">MY ACCOUNT</span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and keep track
            of your FindIt activity.
          </p>
        </div>
          <section className="profile-overview">

  <div className="profile-avatar">
    Y
  </div>

  <div className="profile-user-info">
   <h2>{name}</h2>
    <p>FindIt Member</p>
    <span>Member since 2026</span>
  </div>

  <button
  className="profile-edit-btn"
  onClick={() => setIsEditing(!isEditing)}
>
  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
</button>

</section>
<section className="profile-details">

  <div className="profile-section-heading">
    <div>
      <h2>Personal Information</h2>
      <p>Your account details</p>
    </div>
  </div>

  {!isEditing && (
  <div className="profile-details-grid">

    <div className="profile-detail-item">
      <span>Full Name</span>
     <h3>{name}</h3>
    </div>

    <div className="profile-detail-item">
      <span>Email Address</span>
     <h3>{email}</h3>
    </div>

    <div className="profile-detail-item">
      <span>Phone Number</span>
     <h3>{phone || 'Not added yet'}</h3>
    </div>

    <div className="profile-detail-item">
      <span>Account Type</span>
      <h3>Standard Member</h3>
    </div>

    </div>
)}
{isEditing && (
  <form
  className="profile-edit-form"
  onSubmit={handleSaveProfile}
>

    <div className="profile-edit-field">
      <label>Full Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="profile-edit-field">
      <label>Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="profile-edit-field">
      <label>Phone Number</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>

    <button type="submit">Save Changes</button>

  </form>
)}
</section>
<section className="profile-activity">

  <div className="profile-section-heading">
    <div>
      <h2>My Activity</h2>
      <p>Track your contributions to the FindIt community</p>
    </div>
  </div>

  <div className="profile-stats-grid">

    <div className="profile-stat-card">
      <div className="profile-stat-icon lost-icon">📦</div>
      <span>Lost Reports</span>
      <h3>0</h3>
    </div>

    <div className="profile-stat-card">
      <div className="profile-stat-icon found-icon">🎒</div>
      <span>Found Reports</span>
      <h3>0</h3>
    </div>

    <div className="profile-stat-card">
      <div className="profile-stat-icon claims-icon">🔍</div>
      <span>Claims Submitted</span>
      <h3>0</h3>
    </div>

  </div>

</section>
<section className="profile-reports">

  <div className="profile-section-heading">
    <div>
      <h2>My Reports</h2>
      <p>Items you have reported on FindIt</p>
    </div>

    <button
  className="profile-view-all-btn"
  onClick={() => navigate('/items')}
>
  View All Reports
</button>
  </div>

  <div className="profile-empty-state">
    <div className="profile-empty-icon">📋</div>

    <h3>No reports yet</h3>

    <p>
      Items you report as lost or found will appear here.
      Start by reporting your first item.
    </p>

    <button
  className="profile-report-btn"
  onClick={() => navigate('/report')}
>
  Report an Item
</button>
  </div>

</section>
<section className="profile-claims">

  <div className="profile-section-heading">
    <div>
      <h2>My Claims</h2>
      <p>Track the items you have claimed</p>
    </div>
  </div>

  <div className="profile-empty-state">
    <div className="profile-empty-icon">🔎</div>

    <h3>No claims submitted</h3>

    <p>
      When you submit a claim for a found item,
      you can track its status here.
    </p>

    <button
  className="profile-browse-btn"
  onClick={() => navigate('/items')}
>
  Browse Items
</button>
  </div>

</section>
<section className="profile-settings">

  <div className="profile-section-heading">
    <div>
      <h2>Account Settings</h2>
      <p>Manage your account security</p>
    </div>
  </div>

  <div className="profile-setting-item">
    <div>
      <h3>Change Password</h3>
      <p>Update your password to keep your account secure.</p>
    </div>

    <button className="profile-setting-btn">
      Change Password
    </button>
  </div>

  <div className="profile-setting-item">
    <div>
      <h3>Sign Out</h3>
      <p>Sign out of your FindIt account on this device.</p>
    </div>

    <button className="profile-logout-btn">
      Log Out
    </button>
  </div>

</section>
      </main>
    </div>
  )
}

export default Profile