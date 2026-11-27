
import './MyReports.css'
import Navbar from '../components/Navbar'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Plus,
  Package,
  MapPin,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  FileText
} from 'lucide-react'

const sampleReports = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    type: 'LOST',
    location: 'BTM Layout, Bengaluru',
    date: '2026-11-22',
    status: 'ACTIVE',
    description: 'Black wireless headphones lost near the main bus stop.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700'
  },
  {
    id: 2,
    name: 'Blue Backpack',
    category: 'Bags',
    type: 'FOUND',
    location: 'Jayanagar, Bengaluru',
    date: '2026-11-20',
    status: 'PENDING',
    description: 'A blue backpack was found near a shopping complex.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700'
  },
  {
    id: 3,
    name: 'College ID Card',
    category: 'Documents',
    type: 'LOST',
    location: 'Rajajinagar, Bengaluru',
    date: '2026-11-18',
    status: 'RESOLVED',
    description: 'College identity card lost while travelling.',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=700'
  },
  {
    id: 4,
    name: 'Smart Watch',
    category: 'Electronics',
    type: 'FOUND',
    location: 'Electronic City, Bengaluru',
    date: '2026-11-15',
    status: 'ACTIVE',
    description: 'A smartwatch was found near a park entrance.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700'
  },
  {
    id: 5,
    name: 'House Keys',
    category: 'Accessories',
    type: 'LOST',
    location: 'JP Nagar, Bengaluru',
    date: '2026-11-12',
    status: 'REJECTED',
    description: 'A set of house keys with a small keychain.',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=700'
  },
  {
    id: 6,
    name: 'Water Bottle',
    category: 'Others',
    type: 'FOUND',
    location: 'Banashankari, Bengaluru',
    date: '2026-11-10',
    status: 'PENDING',
    description: 'A stainless steel water bottle was found.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700'
  },
  {
    id: 7,
    name: 'Laptop Charger',
    category: 'Electronics',
    type: 'LOST',
    location: 'BTM Layout, Bengaluru',
    date: '2026-11-08',
    status: 'ACTIVE',
    description: 'Laptop charger misplaced inside a library.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700'
  }
]

function MyReports() {
  const navigate = useNavigate()

  const [reports, setReports] = useState(sampleReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('NEWEST')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedReport, setSelectedReport] = useState(null)
  const [deleteReportId, setDeleteReportId] = useState(null)

  const reportsPerPage = 6

  const stats = useMemo(() => ({
    total: reports.length,
    lost: reports.filter(report => report.type === 'LOST').length,
    found: reports.filter(report => report.type === 'FOUND').length,
    active: reports.filter(report => report.status === 'ACTIVE').length,
    resolved: reports.filter(report => report.status === 'RESOLVED').length
  }), [reports])

  const filteredReports = useMemo(() => {
    let result = [...reports]

    if (searchTerm.trim()) {
      result = result.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'ALL') {
      result = result.filter(report => report.type === typeFilter)
    }

    if (statusFilter !== 'ALL') {
      result = result.filter(report => report.status === statusFilter)
    }

    result.sort((a, b) => {
      return sortOrder === 'NEWEST'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    })

    return result
  }, [reports, searchTerm, typeFilter, statusFilter, sortOrder])

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage)

  const startIndex = (currentPage - 1) * reportsPerPage
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + reportsPerPage
  )

  const formatDate = (date) => {
    return new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle2 size={15} />
      case 'PENDING':
        return <Clock size={15} />
      case 'RESOLVED':
        return <CheckCircle2 size={15} />
      case 'REJECTED':
        return <XCircle size={15} />
      default:
        return <AlertCircle size={15} />
    }
  }

  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  const handleDeleteReport = () => {
    setReports(previous =>
      previous.filter(report => report.id !== deleteReportId)
    )
    setDeleteReportId(null)
    setSelectedReport(null)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setTypeFilter('ALL')
    setStatusFilter('ALL')
    setSortOrder('NEWEST')
    setCurrentPage(1)
  }

  return (
    <div className="my-reports-page">
      <Navbar />

      <main className="my-reports-container">

        {/* Page Header */}
        <section className="my-reports-header">
          <div>
            <span className="my-reports-eyebrow">MY ACCOUNT</span>
            <h1>My Reports</h1>
            <p>
              Manage and track all the lost and found items
              you've reported on FindIt.
            </p>
          </div>

          <button
            className="my-reports-create-btn"
            onClick={() => navigate('/report')}
          >
            <Plus size={18} />
            Report an Item
          </button>
        </section>

        {/* Statistics */}
        <section className="my-reports-stats">
          <div className="my-report-stat-card">
            <div className="my-report-stat-icon total">
              <FileText size={21} />
            </div>
            <span>Total Reports</span>
            <h2>{stats.total}</h2>
          </div>

          <div className="my-report-stat-card">
            <div className="my-report-stat-icon lost">
              <Package size={21} />
            </div>
            <span>Lost Reports</span>
            <h2>{stats.lost}</h2>
          </div>

          <div className="my-report-stat-card">
            <div className="my-report-stat-icon found">
              <Package size={21} />
            </div>
            <span>Found Reports</span>
            <h2>{stats.found}</h2>
          </div>

          <div className="my-report-stat-card">
            <div className="my-report-stat-icon active">
              <Clock size={21} />
            </div>
            <span>Active Reports</span>
            <h2>{stats.active}</h2>
          </div>

          <div className="my-report-stat-card">
            <div className="my-report-stat-icon resolved">
              <CheckCircle2 size={21} />
            </div>
            <span>Resolved Reports</span>
            <h2>{stats.resolved}</h2>
          </div>
        </section>

        {/* Reports Section */}
        <section className="my-reports-content">

          <div className="my-reports-section-heading">
            <div>
              <h2>Your Reported Items</h2>
              <p>
                View, manage and track your submitted reports.
              </p>
            </div>
            <span className="my-reports-count">
              {filteredReports.length} Reports
            </span>
          </div>

          {/* Filters */}
          <div className="my-reports-filters">

            <div className="my-reports-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by item name or location..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('')
                    setCurrentPage(1)
                  }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="my-reports-filter-controls">
              <div className="my-reports-filter-group">
                <SlidersHorizontal size={16} />
                <select
                  value={typeFilter}
                  onChange={e => handleFilterChange(setTypeFilter, e.target.value)}
                  aria-label="Filter by report type"
                >
                  <option value="ALL">All Types</option>
                  <option value="LOST">Lost Items</option>
                  <option value="FOUND">Found Items</option>
                </select>
              </div>

              <div className="my-reports-filter-group">
                <select
                  value={statusFilter}
                  onChange={e => handleFilterChange(setStatusFilter, e.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="my-reports-filter-group">
                <select
                  value={sortOrder}
                  onChange={e => handleFilterChange(setSortOrder, e.target.value)}
                  aria-label="Sort reports"
                >
                  <option value="NEWEST">Newest First</option>
                  <option value="OLDEST">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report Cards */}
          {paginatedReports.length > 0 ? (
            <>
              <div className="my-reports-grid">
                {paginatedReports.map(report => (
                  <article className="my-report-card" key={report.id}>

                    <div className="my-report-image-wrapper">
                      <img
                        src={report.image}
                        alt={report.name}
                        className="my-report-image"
                      />

                      <span className={`my-report-type ${report.type.toLowerCase()}`}>
                        {report.type}
                      </span>
                    </div>

                    <div className="my-report-card-body">
                      <div className="my-report-card-title">
                        <div>
                          <span>{report.category}</span>
                          <h3>{report.name}</h3>
                        </div>
                        <span className={`my-report-status ${report.status.toLowerCase()}`}>
                          {getStatusIcon(report.status)}
                          {report.status}
                        </span>
                      </div>

                      <div className="my-report-meta">
                        <span>
                          <MapPin size={15} />
                          {report.location}
                        </span>
                        <span>
                          <CalendarDays size={15} />
                          {formatDate(report.date)}
                        </span>
                      </div>

                      <div className="my-report-card-actions">
                        <button
                          className="my-report-view-btn"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye size={16} />
                          View Details
                        </button>

                        <button
                          className="my-report-edit-btn"
                          onClick={() => navigate('/edit-report', {
                            state: { report }
                          })}
                          aria-label={`Edit ${report.name}`}
                          title="Edit report"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="my-report-delete-btn"
                          onClick={() => setDeleteReportId(report.id)}
                          aria-label={`Delete ${report.name}`}
                          title="Delete report"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="my-reports-pagination">
                  <span>
                    Showing {startIndex + 1}–{Math.min(
                      startIndex + reportsPerPage,
                      filteredReports.length
                    )} of {filteredReports.length} reports
                  </span>

                  <div className="my-reports-page-controls">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(previous => previous - 1)}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(previous => previous + 1)}
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="my-reports-empty">
              <div className="my-reports-empty-icon">
                <Package size={32} />
              </div>
              <h3>No reports found</h3>
              <p>
                We couldn't find any reports matching your search or filters.
                Try changing your filters or report your first item.
              </p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </section>
      </main>

      {/* View Details Modal */}
      {selectedReport && (
        <div
          className="my-report-modal-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="my-report-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="my-report-modal-title"
          >
            <button
              className="my-report-modal-close"
              onClick={() => setSelectedReport(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <img
              src={selectedReport.image}
              alt={selectedReport.name}
            />

            <div className="my-report-modal-content">
              <div className="my-report-modal-badges">
                <span className={`my-report-type ${selectedReport.type.toLowerCase()}`}>
                  {selectedReport.type}
                </span>
                <span className={`my-report-status ${selectedReport.status.toLowerCase()}`}>
                  {getStatusIcon(selectedReport.status)}
                  {selectedReport.status}
                </span>
              </div>

              <span className="my-report-modal-category">
                {selectedReport.category}
              </span>
              <h2 id="my-report-modal-title">{selectedReport.name}</h2>
              <p>{selectedReport.description}</p>

              <div className="my-report-modal-meta">
                <span><MapPin size={16} /> {selectedReport.location}</span>
                <span><CalendarDays size={16} /> {formatDate(selectedReport.date)}</span>
              </div>

              <button
                className="my-report-modal-edit"
                onClick={() => {
                  setSelectedReport(null)
                  navigate('/edit-report', {
                    state: { report: selectedReport }
                  })
                }}
              >
                <Pencil size={16} />
                Edit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteReportId !== null && (
        <div
          className="my-report-delete-overlay"
          onClick={() => setDeleteReportId(null)}
        >
          <div
            className="my-report-delete-modal"
            onClick={e => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
          >
            <div className="my-report-delete-icon">
              <Trash2 size={25} />
            </div>
            <h3>Delete this report?</h3>
            <p>
              Are you sure you want to delete this report?
              This action cannot be undone.
            </p>
            <div className="my-report-delete-actions">
              <button onClick={() => setDeleteReportId(null)}>
                Cancel
              </button>
              <button onClick={handleDeleteReport}>
                Delete Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyReports
