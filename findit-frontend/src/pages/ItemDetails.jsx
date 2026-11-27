
import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Tag,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  UserRound,
  MessageCircle,
  Search,
  ArrowRight,
  Info,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import './ItemDetails.css'

const sampleItems = [
  {
    id: 1,
    name: 'Black Leather Wallet',
    type: 'LOST',
    category: 'Accessories',
    location: 'BTM Layout, Bengaluru',
    date: '2026-11-25',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200',
    description:
      'A black leather wallet was misplaced around BTM Layout. It is a medium-sized wallet with multiple card slots and a small zip compartment. It may contain important personal documents and cards. If anyone has found it, please report it through FindIt.',
    reporter: 'Rahul K.',
    reporterType: 'Item Owner',
    reference: 'FND-2026-001',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    type: 'FOUND',
    category: 'Electronics',
    location: 'Jayanagar, Bengaluru',
    date: '2026-11-24',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=1200',
    description:
      'A pair of wireless earbuds was found near a public seating area in Jayanagar. They are stored safely. The rightful owner can submit a claim and provide identifying details to verify ownership.',
    reporter: 'Priya S.',
    reporterType: 'Finder',
    reference: 'FND-2026-002',
  },
  {
    id: 3,
    name: 'Blue College Backpack',
    type: 'LOST',
    category: 'Bags',
    location: 'Electronic City, Bengaluru',
    date: '2026-11-23',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200',
    description:
      'A blue college backpack was lost near Electronic City. It contains a few notebooks and everyday college essentials. The owner is looking for help recovering it.',
    reporter: 'Arjun M.',
    reporterType: 'Item Owner',
    reference: 'FND-2026-003',
  },
  {
    id: 4,
    name: 'Silver Wrist Watch',
    type: 'FOUND',
    category: 'Accessories',
    location: 'Koramangala, Bengaluru',
    date: '2026-11-22',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200',
    description:
      'A silver wrist watch was found in Koramangala. The owner can submit a claim by describing distinctive features of the watch and providing suitable ownership verification details.',
    reporter: 'Sneha R.',
    reporterType: 'Finder',
    reference: 'FND-2026-004',
  },
  {
    id: 5,
    name: 'Student ID Card',
    type: 'FOUND',
    category: 'Documents',
    location: 'Rajajinagar, Bengaluru',
    date: '2026-11-21',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=1200',
    description:
      'A student identification card was found near Rajajinagar. The card is being kept safely. The owner should submit a claim and privately verify the information printed on the card.',
    reporter: 'Kiran P.',
    reporterType: 'Finder',
    reference: 'FND-2026-005',
  },
  {
    id: 6,
    name: 'Black Smartphone',
    type: 'LOST',
    category: 'Electronics',
    location: 'Vijayanagar, Bengaluru',
    date: '2026-11-20',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200',
    description:
      'A black smartphone was lost in the Vijayanagar area. The device has a protective case. The owner is requesting anyone who finds it to report it on FindIt.',
    reporter: 'Vikram R.',
    reporterType: 'Item Owner',
    reference: 'FND-2026-006',
  },
  {
    id: 7,
    name: 'Laptop Charger',
    type: 'FOUND',
    category: 'Electronics',
    location: 'Malleshwaram, Bengaluru',
    date: '2026-11-19',
    status: 'ACTIVE',
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1200',
    description:
      'A laptop charger was found in Malleshwaram. The owner can identify the charger model and any distinctive cable markings while submitting a claim.',
    reporter: 'Ananya D.',
    reporterType: 'Finder',
    reference: 'FND-2026-007',
  },
]

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function ItemDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  // Supports both direct URL access and navigation from Browse Items.
  const passedItem = location.state?.item

  const item = useMemo(() => {
    if (passedItem) {
      return {
        ...passedItem,
        id: passedItem.id ?? id,
        name: passedItem.name ?? passedItem.itemName ?? 'Reported Item',
        type: passedItem.type ?? passedItem.reportType ?? 'FOUND',
        category: passedItem.category ?? 'Other',
        location: passedItem.location ?? 'Location not provided',
        date: passedItem.date ?? passedItem.createdAt ?? '2026-11-25',
        status: passedItem.status ?? 'ACTIVE',
        image:
          passedItem.image ??
          passedItem.imageUrl ??
          'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200',
        description:
          passedItem.description ?? 'No description has been provided.',
        reporter: passedItem.reporter ?? 'FindIt User',
        reporterType:
          passedItem.reporterType ??
          (passedItem.type === 'LOST' ? 'Item Owner' : 'Finder'),
        reference: passedItem.reference ?? `FND-${passedItem.id ?? id}`,
      }
    }

    return sampleItems.find((sample) => String(sample.id) === String(id))
  }, [passedItem, id])

  const isFound = item?.type === 'FOUND'

  const similarItems = useMemo(() => {
    if (!item) return []

    return sampleItems
      .filter(
        (sample) =>
          String(sample.id) !== String(item.id) &&
          (sample.category === item.category || sample.type === item.type)
      )
      .slice(0, 3)
  }, [item])

  if (!item) {
    return (
      <>
        <Navbar />

        <main className="item-details-not-found">
          <div className="item-not-found-icon">
            <Package size={35} />
          </div>

          <h1>Item Not Found</h1>

          <p>
            We couldn't find the item you're looking for. It may have been
            removed or the link may be incorrect.
          </p>

          <button onClick={() => navigate('/items')}>
            <ArrowLeft size={17} />
            Back to Browse Items
          </button>
        </main>
      </>
    )
  }

  const handleClaim = () => {
    navigate('/claim', {
      state: {
        item,
      },
    })
  }

  return (
    <>
      <Navbar />

      <main className="item-details-page">
        <div className="item-details-container">
          <button
            className="item-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="item-details-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <ArrowRight size={13} />
            <span onClick={() => navigate('/items')}>Browse Items</span>
            <ArrowRight size={13} />
            <strong>Item Details</strong>
          </div>

          <section className="item-details-main">
            <div className="item-details-image-section">
              <div className="item-details-image">
                <img src={item.image} alt={item.name} />

                <span
                  className={`item-type-badge ${isFound ? 'found' : 'lost'}`}
                >
                  {isFound ? 'FOUND ITEM' : 'LOST ITEM'}
                </span>

                {item.status === 'RESOLVED' && (
                  <span className="item-resolved-badge">
                    <CheckCircle size={14} />
                    Resolved
                  </span>
                )}
              </div>

              <div className="item-image-caption">
                <Info size={15} />
                <span>
                  Verify the item's unique details before submitting a claim.
                </span>
              </div>
            </div>

            <div className="item-details-information">
              <div className="item-reference">
                <span>ITEM REFERENCE</span>
                <strong>{item.reference}</strong>
              </div>

              <h1>{item.name}</h1>

              <div className="item-details-tags">
                <span className="item-category-tag">
                  <Tag size={14} />
                  {item.category}
                </span>

                <span
                  className={`item-status-tag ${
                    item.status === 'RESOLVED' ? 'resolved' : 'active'
                  }`}
                >
                  {item.status === 'RESOLVED' ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Clock size={14} />
                  )}
                  {item.status === 'RESOLVED' ? 'Resolved' : 'Active'}
                </span>
              </div>

              <div className="item-details-divider"></div>

              <div className="item-facts">
                <div className="item-fact">
                  <div className="item-fact-icon">
                    <MapPin size={19} />
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>{item.location}</strong>
                  </div>
                </div>

                <div className="item-fact">
                  <div className="item-fact-icon">
                    <CalendarDays size={19} />
                  </div>
                  <div>
                    <span>Date Reported</span>
                    <strong>{formatDate(item.date)}</strong>
                  </div>
                </div>

                <div className="item-fact">
                  <div className="item-fact-icon">
                    <UserRound size={19} />
                  </div>
                  <div>
                    <span>Reported By</span>
                    <strong>{item.reporter}</strong>
                    <small>{item.reporterType}</small>
                  </div>
                </div>
              </div>

              <div className="item-details-description">
                <h3>About This Item</h3>
                <p>{item.description}</p>
              </div>

              {isFound && item.status !== 'RESOLVED' ? (
                <div className="item-claim-panel">
                  <div className="item-claim-panel-icon">
                    <ShieldCheck size={23} />
                  </div>

                  <div className="item-claim-panel-text">
                    <strong>Is this your lost item?</strong>
                    <span>
                      Submit a claim and provide details to help verify
                      ownership.
                    </span>
                  </div>

                  <button onClick={handleClaim}>
                    Submit Claim
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : isFound ? (
                <div className="item-unavailable-notice">
                  <AlertCircle size={18} />
                  <span>
                    This item has been marked as resolved. New claims are
                    currently unavailable.
                  </span>
                </div>
              ) : (
                <div className="item-lost-notice">
                  <Info size={18} />
                  <span>
                    This item has been reported as lost. If you find it,
                    please use the Report Item page to submit a found report.
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="item-safety-section">
            <div className="item-safety-icon">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3>Stay Safe While Recovering Your Item</h3>
              <p>
                Never share passwords, OTPs or sensitive personal information.
                Ownership verification should be completed through the
                platform. Coordinate item collection safely.
              </p>
            </div>
          </section>

          {similarItems.length > 0 && (
            <section className="similar-items-section">
              <div className="similar-items-heading">
                <div>
                  <span>DISCOVER MORE</span>
                  <h2>Similar Items</h2>
                  <p>Explore other reported items on FindIt.</p>
                </div>

                <button onClick={() => navigate('/items')}>
                  View All Items
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="similar-items-grid">
                {similarItems.map((similar) => (
                  <article
                    className="similar-item-card"
                    key={similar.id}
                    onClick={() =>
                      navigate(`/items/${similar.id}`, {
                        state: { item: similar },
                      })
                    }
                  >
                    <div className="similar-item-image">
                      <img src={similar.image} alt={similar.name} />

                      <span
                        className={
                          similar.type === 'FOUND'
                            ? 'similar-found-badge'
                            : 'similar-lost-badge'
                        }
                      >
                        {similar.type}
                      </span>
                    </div>

                    <div className="similar-item-body">
                      <span>{similar.category}</span>
                      <h3>{similar.name}</h3>
                      <p>
                        <MapPin size={13} />
                        {similar.location}
                      </p>
                      <div className="similar-item-link">
                        View Details
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="item-details-bottom">
            <button onClick={() => navigate('/items')}>
              <Search size={17} />
              Browse More Items
            </button>

            <button onClick={() => navigate('/report')}>
              <MessageCircle size={17} />
              Report an Item
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default ItemDetails
