
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  Filter,
  ArrowUpDown,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  MapPin,
  CalendarDays,
  Package,
  ShieldCheck,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import './MyClaims.css'

const initialClaims = [
  {
    id: 1,
    itemName: 'Black Leather Wallet',
    category: 'Accessories',
    location: 'BTM Layout, Bengaluru',
    claimDate: '2026-11-24',
    itemDate: '2026-11-22',
    status: 'PENDING',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    description:
      'I believe this is my wallet. It has a small scratch near the front corner.',
    proof:
      'The wallet contains my college ID card and a small family photograph.',
    reference: 'CLM-2026-001',
  },
  {
    id: 2,
    itemName: 'Wireless Earbuds',
    category: 'Electronics',
    location: 'Jayanagar, Bengaluru',
    claimDate: '2026-11-20',
    itemDate: '2026-11-18',
    status: 'APPROVED',
    image:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800',
    description:
      'These look like the earbuds I lost near the metro station.',
    proof:
      'I can identify the unique sticker on the charging case and provide the purchase details.',
    reference: 'CLM-2026-002',
  },
  {
    id: 3,
    itemName: 'Blue College Backpack',
    category: 'Bags',
    location: 'Electronic City, Bengaluru',
    claimDate: '2026-11-18',
    itemDate: '2026-11-16',
    status: 'REJECTED',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    description:
      'The backpack resembles the one I misplaced during my commute.',
    proof:
      'It contains a notebook with my name and a few personal belongings.',
    reference: 'CLM-2026-003',
  },
  {
    id: 4,
    itemName: 'Silver Wrist Watch',
    category: 'Accessories',
    location: 'Koramangala, Bengaluru',
    claimDate: '2026-11-15',
    itemDate: '2026-11-13',
    status: 'PENDING',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    description:
      'I lost a similar silver wrist watch while visiting the area.',
    proof:
      'The watch has a distinctive mark on the back and a specific strap design.',
    reference: 'CLM-2026-004',
  },
  {
    id: 5,
    itemName: 'Student ID Card',
    category: 'Documents',
    location: 'Rajajinagar, Bengaluru',
    claimDate: '2026-11-12',
    itemDate: '2026-11-10',
    status: 'APPROVED',
    image:
      'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800',
    description:
      'This appears to be my missing student identification card.',
    proof:
      'I can verify the registration number and other details printed on the card.',
    reference: 'CLM-2026-005',
  },
  {
    id: 6,
    itemName: 'Black Smartphone',
    category: 'Electronics',
    location: 'Vijayanagar, Bengaluru',
    claimDate: '2026-11-09',
    itemDate: '2026-11-07',
    status: 'PENDING',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    description:
      'The phone looks similar to the device I lost recently.',
    proof:
      'I can verify the lock screen wallpaper, device model and IMEI details privately.',
    reference: 'CLM-2026-006',
  },
  {
    id: 7,
    itemName: 'Laptop Charger',
    category: 'Electronics',
    location: 'Malleshwaram, Bengaluru',
    claimDate: '2026-11-05',
    itemDate: '2026-11-03',
    status: 'WITHDRAWN',
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800',
    description:
      'I submitted a claim for a laptop charger I thought was mine.',
    proof:
      'I can identify the charger model and its unique cable marking.',
    reference: 'CLM-2026-007',
  },
]

const statusConfig = {
  PENDING: {
    label: 'Under Review',
    className: 'pending',
    icon: Clock,
  },
  APPROVED: {
    label: 'Approved',
    className: 'approved',
    icon: CheckCircle,
  },
  REJECTED: {
    label: 'Rejected',
    className: 'rejected',
    icon: XCircle,
  },
  WITHDRAWN: {
    label: 'Withdrawn',
    className: 'withdrawn',
    icon: AlertCircle,
  },
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function MyClaims() {
  const navigate = useNavigate()

  const [claims, setClaims] = useState(initialClaims)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [claimToWithdraw, setClaimToWithdraw] = useState(null)

  const itemsPerPage = 6

  const stats = useMemo(
    () => ({
      total: claims.length,
      pending: claims.filter((claim) => claim.status === 'PENDING').length,
      approved: claims.filter((claim) => claim.status === 'APPROVED').length,
      rejected: claims.filter((claim) => claim.status === 'REJECTED').length,
    }),
    [claims]
  )

  const filteredClaims = useMemo(() => {
    let result = [...claims]

    if (search.trim()) {
      const query = search.toLowerCase()

      result = result.filter(
        (claim) =>
          claim.itemName.toLowerCase().includes(query) ||
          claim.location.toLowerCase().includes(query) ||
          claim.reference.toLowerCase().includes(query)
      )
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((claim) => claim.status === statusFilter)
    }

    result.sort((a, b) => {
      const comparison =
        new Date(b.claimDate) - new Date(a.claimDate)

      return sortOrder === 'newest' ? comparison : -comparison
    })

    return result
  }, [claims, search, statusFilter, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClaims.length / itemsPerPage)
  )

  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedClaims = filteredClaims.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  )

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleStatusFilter = (value) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleWithdraw = () => {
    setClaims((previousClaims) =>
      previousClaims.map((claim) =>
        claim.id === claimToWithdraw
          ? { ...claim, status: 'WITHDRAWN' }
          : claim
      )
    )

    setClaimToWithdraw(null)
    setSelectedClaim(null)
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('ALL')
    setSortOrder('newest')
    setCurrentPage(1)
  }

  return (
    <>
      <Navbar />

      <main className="my-claims-page">
        <section className="claims-hero">
          <div className="claims-hero-content">
            <div className="claims-eyebrow">
              <ShieldCheck size={16} />
              <span>CLAIM MANAGEMENT</span>
            </div>

            <h1>
              My <span>Claims</span>
            </h1>

            <p>
              Keep track of your submitted claims, monitor verification
              progress, and stay updated on your lost belongings.
            </p>

            <div className="claims-hero-note">
              <FileText size={17} />
              <span>Your claims and their latest status, all in one place.</span>
            </div>
          </div>

          <div className="claims-hero-visual">
            <div className="claims-visual-circle circle-one"></div>
            <div className="claims-visual-circle circle-two"></div>

            <div className="claims-visual-card">
              <div className="claims-visual-icon">
                <ShieldCheck size={31} />
              </div>
              <div>
                <strong>Claim submitted</strong>
                <span>Verification in progress</span>
              </div>
              <Clock size={19} className="claims-visual-clock" />
            </div>

            <div className="claims-visual-check">
              <CheckCircle size={21} />
            </div>
          </div>
        </section>

        <section className="claims-stats">
          <div className="claim-stat-card">
            <div className="claim-stat-icon total">
              <FileText size={21} />
            </div>
            <div>
              <span>Total Claims</span>
              <strong>{stats.total}</strong>
            </div>
          </div>

          <div className="claim-stat-card">
            <div className="claim-stat-icon pending">
              <Clock size={21} />
            </div>
            <div>
              <span>Pending</span>
              <strong>{stats.pending}</strong>
            </div>
          </div>

          <div className="claim-stat-card">
            <div className="claim-stat-icon approved">
              <CheckCircle size={21} />
            </div>
            <div>
              <span>Approved</span>
              <strong>{stats.approved}</strong>
            </div>
          </div>

          <div className="claim-stat-card">
            <div className="claim-stat-icon rejected">
              <XCircle size={21} />
            </div>
            <div>
              <span>Rejected</span>
              <strong>{stats.rejected}</strong>
            </div>
          </div>
        </section>

        <section className="claims-content">
          <div className="claims-section-heading">
            <div>
              <h2>Your Submitted Claims</h2>
              <p>
                Review and manage the claims you have submitted.
              </p>
            </div>

            <button
              className="claims-browse-btn"
              onClick={() => navigate('/items')}
            >
              <Package size={17} />
              Browse Items
            </button>
          </div>

          <div className="claims-toolbar">
            <div className="claims-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search by item, location or claim ID..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {search && (
                <button
                  className="claims-clear-search"
                  onClick={() => handleSearch('')}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="claims-toolbar-actions">
              <div className="claims-filter">
                <Filter size={17} />
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  aria-label="Filter claims by status"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="WITHDRAWN">Withdrawn</option>
                </select>
                <ChevronRight size={15} />
              </div>

              <button
                className="claims-sort-btn"
                onClick={() =>
                  setSortOrder((previous) =>
                    previous === 'newest' ? 'oldest' : 'newest'
                  )
                }
              >
                <ArrowUpDown size={16} />
                {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
              </button>
            </div>
          </div>

          <div className="claims-results-info">
            <span>
              Showing <strong>{paginatedClaims.length}</strong> of{' '}
              <strong>{filteredClaims.length}</strong> claims
            </span>

            {(search || statusFilter !== 'ALL' || sortOrder !== 'newest') && (
              <button onClick={clearFilters}>Clear filters</button>
            )}
          </div>

          {paginatedClaims.length > 0 ? (
            <>
              <div className="claims-grid">
                {paginatedClaims.map((claim) => {
                  const StatusIcon = statusConfig[claim.status].icon

                  return (
                    <article className="claim-card" key={claim.id}>
                      <div className="claim-card-image">
                        <img src={claim.image} alt={claim.itemName} />

                        <span
                          className={`claim-status-badge ${statusConfig[claim.status].className}`}
                        >
                          <StatusIcon size={14} />
                          {statusConfig[claim.status].label}
                        </span>
                      </div>

                      <div className="claim-card-body">
                        <div className="claim-card-topline">
                          <span className="claim-reference">
                            {claim.reference}
                          </span>
                          <span className="claim-category">
                            {claim.category}
                          </span>
                        </div>

                        <h3>{claim.itemName}</h3>

                        <div className="claim-card-meta">
                          <span>
                            <MapPin size={15} />
                            {claim.location}
                          </span>
                          <span>
                            <CalendarDays size={15} />
                            Claimed {formatDate(claim.claimDate)}
                          </span>
                        </div>

                        <div className="claim-card-footer">
                          <button
                            className="claim-view-btn"
                            onClick={() => setSelectedClaim(claim)}
                          >
                            <Eye size={16} />
                            View Details
                          </button>

                          {claim.status === 'PENDING' && (
                            <button
                              className="claim-withdraw-btn"
                              onClick={() => setClaimToWithdraw(claim.id)}
                              aria-label={`Withdraw claim for ${claim.itemName}`}
                              title="Withdraw claim"
                            >
                              <Trash2 size={17} />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <div className="claims-pagination">
                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={safeCurrentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={
                        safeCurrentPage === index + 1 ? 'active' : ''
                      }
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    disabled={safeCurrentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="claims-empty-state">
              <div className="claims-empty-icon">
                <Inbox size={34} />
              </div>

              <h3>No claims found</h3>

              <p>
                {search || statusFilter !== 'ALL'
                  ? 'Try changing your search or filters to find your claims.'
                  : "You haven't submitted any claims yet. Browse reported items and submit a claim if you recognize something."}
              </p>

              <div className="claims-empty-actions">
                {(search || statusFilter !== 'ALL') && (
                  <button
                    className="claims-empty-clear"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                )}

                <button
                  className="claims-empty-browse"
                  onClick={() => navigate('/items')}
                >
                  Browse Items
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {selectedClaim && (
        <div
          className="claim-modal-overlay"
          onClick={() => setSelectedClaim(null)}
        >
          <div
            className="claim-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="claim-modal-header">
              <div>
                <span>CLAIM DETAILS</span>
                <h2>{selectedClaim.itemName}</h2>
              </div>

              <button
                onClick={() => setSelectedClaim(null)}
                aria-label="Close claim details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="claim-modal-content">
              <img
                src={selectedClaim.image}
                alt={selectedClaim.itemName}
                className="claim-modal-image"
              />

              <div className="claim-modal-reference">
                <span>Claim Reference</span>
                <strong>{selectedClaim.reference}</strong>
              </div>

              <div className="claim-modal-status">
                <span>Current Status</span>
                <span
                  className={`claim-status-badge ${statusConfig[selectedClaim.status].className}`}
                >
                  {statusConfig[selectedClaim.status].label}
                </span>
              </div>

              <div className="claim-modal-info-grid">
                <div>
                  <span>Category</span>
                  <strong>{selectedClaim.category}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{selectedClaim.location}</strong>
                </div>

                <div>
                  <span>Item Reported On</span>
                  <strong>{formatDate(selectedClaim.itemDate)}</strong>
                </div>

                <div>
                  <span>Claim Submitted On</span>
                  <strong>{formatDate(selectedClaim.claimDate)}</strong>
                </div>
              </div>

              <div className="claim-modal-description">
                <h4>Why are you claiming this item?</h4>
                <p>{selectedClaim.description}</p>
              </div>

              <div className="claim-modal-proof">
                <h4>
                  <ShieldCheck size={17} />
                  Ownership Verification Details
                </h4>
                <p>{selectedClaim.proof}</p>
              </div>

              {selectedClaim.status === 'PENDING' && (
                <div className="claim-review-notice">
                  <Clock size={18} />
                  <p>
                    Your claim is currently under review. The administrator
                    will verify your ownership details.
                  </p>
                </div>
              )}

              {selectedClaim.status === 'APPROVED' && (
                <div className="claim-review-notice success">
                  <CheckCircle size={18} />
                  <p>
                    Your claim has been approved. Follow the administrator's
                    instructions to coordinate item collection.
                  </p>
                </div>
              )}

              {selectedClaim.status === 'REJECTED' && (
                <div className="claim-review-notice rejected">
                  <AlertCircle size={18} />
                  <p>
                    This claim was rejected. Contact the administrator if
                    you need clarification.
                  </p>
                </div>
              )}

              {selectedClaim.status === 'WITHDRAWN' && (
                <div className="claim-review-notice">
                  <AlertCircle size={18} />
                  <p>You have withdrawn this claim.</p>
                </div>
              )}
            </div>

            <div className="claim-modal-footer">
              {selectedClaim.status === 'PENDING' && (
                <button
                  className="claim-modal-withdraw"
                  onClick={() => setClaimToWithdraw(selectedClaim.id)}
                >
                  <Trash2 size={16} />
                  Withdraw Claim
                </button>
              )}

              <button
                className="claim-modal-close"
                onClick={() => setSelectedClaim(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {claimToWithdraw !== null && (
        <div
          className="claim-modal-overlay"
          onClick={() => setClaimToWithdraw(null)}
        >
          <div
            className="claim-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="claim-confirm-icon">
              <AlertCircle size={28} />
            </div>

            <h3>Withdraw this claim?</h3>

            <p>
              Are you sure you want to withdraw this claim? This action will
              update its status to Withdrawn.
            </p>

            <div className="claim-confirm-actions">
              <button
                className="claim-confirm-cancel"
                onClick={() => setClaimToWithdraw(null)}
              >
                Keep Claim
              </button>

              <button
                className="claim-confirm-delete"
                onClick={handleWithdraw}
              >
                Yes, Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MyClaims
