
import './BrowseItems.css'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Package,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  ArrowUpDown,
  ArrowRight,
  PackageSearch,
  X
} from 'lucide-react'

const items = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    location: 'Central Library',
    date: 'Today, 10:30 AM',
    status: 'FOUND',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 2,
    name: 'Leather Wallet',
    category: 'Accessories',
    location: 'College Cafeteria',
    date: 'Today, 9:15 AM',
    status: 'LOST',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 3,
    name: 'Blue Backpack',
    category: 'Bags',
    location: 'Main Building',
    date: 'Yesterday, 4:20 PM',
    status: 'FOUND',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 4,
    name: 'Smartphone',
    category: 'Electronics',
    location: 'Sports Ground',
    date: 'Yesterday, 2:45 PM',
    status: 'LOST',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 5,
    name: 'Travel Documents',
    category: 'Documents',
    location: 'Computer Lab',
    date: 'Yesterday, 11:30 AM',
    status: 'FOUND',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 6,
    name: 'School Bag',
    category: 'Bags',
    location: 'Parking Area',
    date: 'Yesterday, 10:00 AM',
    status: 'LOST',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85'
  },
  {
    id: 7,
    name: 'Smart Watch',
    category: 'Electronics',
    location: 'Library',
    date: 'Yesterday, 9:00 AM',
    status: 'FOUND',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85'
  }
]

function BrowseItems() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('ALL')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [location, setLocation] = useState('')
  const [sortOrder, setSortOrder] = useState('LATEST')
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  // Close modal when Escape is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null)
      }
    }

    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedItem])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchTerm,
    activeTab,
    selectedCategories,
    location,
    sortOrder
  ])

  const handleCategoryChange = (category) => {
    setSelectedCategories((previousCategories) =>
      previousCategories.includes(category)
        ? previousCategories.filter((item) => item !== category)
        : [...previousCategories, category]
    )
  }

  // Navigate to the dedicated Item Details page
  const handleViewFullDetails = (item) => {
    const itemForDetailsPage = {
      ...item,
      itemName: item.name,
      reportType: item.status,
      type: item.status,
      imageUrl: item.image,
      description: `This ${item.name.toLowerCase()} was reported ${item.status.toLowerCase()} near ${item.location}. Please review the details and submit a claim if this item belongs to you.`,
      reporter: 'FindIt Community'
    }

    navigate(`/items/${item.id}`, {
      state: {
        item: itemForDetailsPage
      }
    })
  }

  // Search and filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesLocation = item.location
      .toLowerCase()
      .includes(location.toLowerCase())

    const matchesTab =
      activeTab === 'ALL' || item.status === activeTab

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category)

    return (
      matchesSearch &&
      matchesTab &&
      matchesCategory &&
      matchesLocation
    )
  })

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'LATEST') {
      return b.id - a.id
    }

    if (sortOrder === 'OLDEST') {
      return a.id - b.id
    }

    if (sortOrder === 'NAME') {
      return a.name.localeCompare(b.name)
    }

    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = sortedItems.slice(startIndex, endIndex)

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('')
    setActiveTab('ALL')
    setSelectedCategories([])
    setLocation('')
    setSortOrder('LATEST')
  }

  return (
    <main className="browse-page">
      <Navbar />

      {/* Hero Section */}
      <section className="browse-hero">
        <div className="browse-hero-content">
          <span className="browse-eyebrow">
            EXPLORE THE COMMUNITY
          </span>

          <h1>
            Find what's lost.
            <br />
            <span>Discover what's found.</span>
          </h1>

          <p>
            Explore reported lost and found items.
            Your next search might bring something
            important back home.
          </p>
        </div>

        <div className="browse-search">
          <div className="search-input-wrapper">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button className="browse-search-btn">
            Search Items <Search size={17} />
          </button>
        </div>
      </section>

      {/* Item Filters */}
      <section className="browse-filters">
        <div className="filter-heading">
          <div>
            <span className="filter-eyebrow">FIND YOUR ITEM</span>
            <h2>Explore Listings</h2>
          </div>

          <div className="listing-count">
            <Package size={17} />
            <span>All reported items</span>
          </div>
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            All Items
          </button>

          <button
            className={`filter-tab ${activeTab === 'LOST' ? 'active' : ''}`}
            onClick={() => setActiveTab('LOST')}
          >
            Lost Items
          </button>

          <button
            className={`filter-tab ${activeTab === 'FOUND' ? 'active' : ''}`}
            onClick={() => setActiveTab('FOUND')}
          >
            Found Items
          </button>
        </div>
      </section>

      {/* Browse Content */}
      <section className="browse-content">

        {/* Filter Sidebar */}
        <aside className="browse-sidebar">
          <div className="sidebar-heading">
            <SlidersHorizontal size={18} />
            <h3>Filters</h3>
          </div>

          <div className="sidebar-group">
            <h4>Categories</h4>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes('Electronics')}
                onChange={() => handleCategoryChange('Electronics')}
              />
              Electronics
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes('Accessories')}
                onChange={() => handleCategoryChange('Accessories')}
              />
              Accessories
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes('Bags')}
                onChange={() => handleCategoryChange('Bags')}
              />
              Bags
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes('Documents')}
                onChange={() => handleCategoryChange('Documents')}
              />
              Documents
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes('Others')}
                onChange={() => handleCategoryChange('Others')}
              />
              Others
            </label>
          </div>

          <div className="sidebar-divider"></div>

          <div className="sidebar-group">
            <h4>Location</h4>

            <div className="location-input">
              <MapPin size={17} />

              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </aside>

        {/* Items Area */}
        <div className="browse-results">
          <div className="results-header">
            <div>
              <h2>Recently Reported</h2>

              <p>
                Showing {sortedItems.length === 0 ? 0 : startIndex + 1}
                {' – '}
                {Math.min(endIndex, sortedItems.length)} of {sortedItems.length} items
              </p>
            </div>

            <div className="sort-button">
              <ArrowUpDown size={16} />

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="LATEST">Latest First</option>
                <option value="OLDEST">Oldest First</option>
                <option value="NAME">Name (A–Z)</option>
              </select>

              <ChevronDown size={15} />
            </div>
          </div>

          {/* Items Grid */}
          <div className="items-grid">
            {currentItems.length > 0 &&
              currentItems.map((item) => (
                <article className="browse-item-card" key={item.id}>
                  <div className="browse-item-image">
                    <img src={item.image} alt={item.name} />

                    <span
                      className={`browse-item-status ${
                        item.status === 'LOST'
                          ? 'lost-badge'
                          : 'found-badge'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="browse-item-details">
                    <span className="browse-item-category">
                      {item.category}
                    </span>

                    <h3>{item.name}</h3>

                    <div className="browse-item-meta">
                      <span>
                        <MapPin size={14} />
                        {item.location}
                      </span>

                      <span>{item.date}</span>
                    </div>

                    <button
                      className="browse-item-btn"
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="browse-empty-state show">
              <div className="empty-icon">
                <PackageSearch size={38} />
              </div>

              <h3>No items found</h3>

              <p>
                We couldn't find any matching items.
                Try changing your search or filters.
              </p>

              <button
                className="clear-filters-btn"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedItem && (
        <div
          className="item-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="item-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedItem(null)}
              aria-label="Close item preview"
            >
              <X size={20} />
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="modal-item-image"
            />

            <div className="modal-item-content">
              <span
                className={`browse-item-status ${
                  selectedItem.status === 'LOST'
                    ? 'lost-badge'
                    : 'found-badge'
                }`}
              >
                {selectedItem.status}
              </span>

              <span className="browse-item-category">
                {selectedItem.category}
              </span>

              <h2>{selectedItem.name}</h2>

              <p>
                <MapPin size={16} />
                {selectedItem.location}
              </p>

              <span>{selectedItem.date}</span>

              {/* Open Complete Item Details Page */}
              <button
                className="browse-item-btn"
                onClick={() => handleViewFullDetails(selectedItem)}
              >
                View Full Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default BrowseItems
