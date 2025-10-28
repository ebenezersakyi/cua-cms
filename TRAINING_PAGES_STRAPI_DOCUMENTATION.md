# Training Pages - Strapi CMS Requirements Documentation

This document provides comprehensive Strapi CMS requirements for the **Training** section of the CUA Ghana website.

## Table of Contents
1. [Overview](#overview)
2. [Page Summary](#page-summary)
3. [Content Types](#content-types)
4. [Components](#components)
5. [API Endpoints](#api-endpoints)
6. [Implementation Checklist](#implementation-checklist)
7. [Timeline Estimate](#timeline-estimate)

---

## Overview

The Training section showcases the Credit Union Training and Advisory Centre (CUTRAC) services, including training programs, calendar, pricing, registration, and travel information. This section consists of **6 Single Type pages** and **1 Collection Type** (Training Programs).

### Pages Structure
- **CUTRAC Overview** - `/training/cutrac-overview`
- **Training Calendar** - `/training/training-calendar`
- **Prices** - `/training/prices`
- **CUTRAC Registration** - `/training/cutrac-registration`
- **Contact CUTRAC** - `/training/contact-cutrac`
- **Travel for Training** - `/training/travel-for-training`

---

## Page Summary

### 1. CUTRAC Overview Page
**Purpose**: Introduce CUTRAC and its training programs
**URL**: `/training/cutrac-overview`
**Type**: Single Type

**Content Needed**:
- Hero section (badge, title, description, background image)
- About CUTRAC introduction text
- Key features (4 items with icons, titles, descriptions)
- Training programs categories (3 programs with details)
- Call-to-action section

---

### 2. Training Calendar Page
**Purpose**: Display upcoming training programs with dates and locations
**URL**: `/training/training-calendar`
**Type**: Single Type (page) + Collection Type (training programs)

**Content Needed**:
- Hero section
- Upcoming training programs (from collection)
- View toggle (list/calendar modes)
- Download calendar section
- Training programs collection with:
  - Title, dates (start/end), duration
  - Location, target participants
  - Registration status
  - Month grouping

---

### 3. Prices Page
**Purpose**: Display transparent pricing for facilities, accommodation, and meals
**URL**: `/training/prices`
**Type**: Single Type

**Content Needed**:
- Hero section
- Hall & conference facilities pricing (12 items)
- Accommodation pricing (7 room types)
- Meals pricing (Normal and Buffet)
- Important notes (payment terms, amenities, T&C)
- Call-to-action section

---

### 4. CUTRAC Registration Page
**Purpose**: Registration form for training programs
**URL**: `/training/cutrac-registration`
**Type**: Single Type

**Content Needed**:
- Hero section
- Registration form configuration
  - Form fields (name, email, phone, credit union, position, program, date)
  - Program options dropdown
  - Position/role options
  - Special requirements textarea
- Help section with links
- Form submission endpoint

---

### 5. Contact CUTRAC Page
**Purpose**: Contact information and inquiry form for training team
**URL**: `/training/contact-cutrac`
**Type**: Single Type

**Content Needed**:
- Hero section
- Contact information (4 cards):
  - Office location
  - Phone numbers
  - Email addresses
  - Office hours
- Contact form configuration
- Map integration (location coordinates)
- Quick links section

---

### 6. Travel for Training Page
**Purpose**: Travel and accommodation information for training participants
**URL**: `/training/travel-for-training`
**Type**: Single Type

**Content Needed**:
- Hero section
- Training locations (3 cities: Accra, Kumasi, Tamale)
  - Address, accommodation, transport info
- Accommodation & amenities (3 items)
  - Partner hotels
  - Meals & refreshments
  - Transport assistance
- Travel tips (5 numbered tips)
- Call-to-action section

---

## Content Types

### 1. Training CUTRAC Overview Page (Single Type)

**API Name**: `training-cutrac-overview-page`
**Display Name**: Training CUTRAC Overview Page
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroSection` | Component | Yes | Hero with badge, title, description, background image |
| `aboutSection` | Component | Yes | Intro text with title and content (rich text) |
| `featuresSection` | Component | Yes | Grid of 4 key features with icons |
| `programsSection` | Component | Yes | 3 training program categories |
| `ctaSection` | Component | Yes | Call-to-action with title, description, button |
| `seo` | Component | No | SEO metadata |

---

### 2. Training Calendar Page (Single Type)

**API Name**: `training-calendar-page`
**Display Name**: Training Calendar Page
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroSection` | Component | Yes | Hero section |
| `calendarSection` | Component | Yes | Calendar intro and view toggle |
| `downloadSection` | Component | Yes | Download calendar CTA with icon, title, description |
| `seo` | Component | No | SEO metadata |

---

### 3. Training Programs (Collection Type)

**API Name**: `training-programs`
**Display Name**: Training Programs
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | Text | Yes | Program title |
| `slug` | UID (from title) | Yes | URL-friendly identifier |
| `startDate` | Date | Yes | Program start date |
| `endDate` | Date | Yes | Program end date |
| `duration` | Text | Yes | Duration (e.g., "3 Days", "5 Days") |
| `location` | Text | Yes | Training location |
| `participants` | Text | Yes | Target participants |
| `status` | Enumeration | Yes | Registration status |
| `description` | Rich Text | No | Program description |
| `category` | Enumeration | No | Program category |

**Enumeration Values**:
- **status**:
  - `open` - Open for Registration
  - `closing-soon` - Closing Soon
  - `full` - Fully Booked
  - `completed` - Completed
- **category**:
  - `leadership` - Leadership Development
  - `operations` - Operations Training
  - `specialized` - Specialized Courses
  - `financial` - Financial Management
  - `governance` - Governance & Compliance

---

### 4. Training Prices Page (Single Type)

**API Name**: `training-prices-page`
**Display Name**: Training Prices Page
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroSection` | Component | Yes | Hero section |
| `hallFacilitiesSection` | Component | Yes | Hall & conference facilities pricing |
| `accommodationSection` | Component | Yes | Accommodation pricing |
| `mealsSection` | Component | Yes | Meals pricing (Normal & Buffet) |
| `importantNotesSection` | Component | Yes | Important notes and terms |
| `ctaSection` | Component | Yes | Call-to-action section |
| `lastUpdated` | Date | Yes | Pricing last updated date |
| `seo` | Component | No | SEO metadata |

---

### 5. Training Registration Page (Single Type)

**API Name**: `training-registration-page`
**Display Name**: Training CUTRAC Registration Page
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroSection` | Component | Yes | Hero section |
| `formIntroSection` | Component | Yes | Form introduction |
| `registrationForm` | Component | Yes | Form configuration |
| `helpSection` | Component | Yes | Help section with links |
| `seo` | Component | No | SEO metadata |

---

### 6. Contact CUTRAC Page (Single Type)

**API Name**: `contact-cutrac-page`
**Display Name**: Contact CUTRAC Page
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroSection` | Component | Yes | Hero section |
| `contactInfoSection` | Component | Yes | 4 contact information cards |
| `contactForm` | Component | Yes | Contact form configuration |
| `mapSection` | Component | Yes | Map configuration with coordinates |
| `quickLinksSection` | Component | Yes | Quick links |
| `seo` | Component | No | SEO metadata |

---

### 7. Travel for Training Page (Single Type)

**API Name**: `travel-for-training-page`
**Display Name**: Travel for Training Page
**Draft & Publish**: Yes

#### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroSection` | Component | Yes | Hero section |
| `locationsSection` | Component | Yes | 3 training locations |
| `amenitiesSection` | Component | Yes | 3 accommodation amenities |
| `travelTipsSection` | Component | Yes | 5 numbered travel tips |
| `ctaSection` | Component | Yes | Call-to-action section |
| `seo` | Component | No | SEO metadata |

---

## Components

### Shared Components

#### 1. `sections.hero-simple`
Used across all Training pages

**Fields**:
- `badge` (Text) - Badge text
- `title` (Text) - Hero title
- `description` (Text) - Hero description
- `backgroundImage` (Media) - Hero background image

---

#### 2. `sections.intro-with-content`
For about/intro sections

**Fields**:
- `title` (Text) - Section title
- `content` (Rich Text) - Main content
- `subtitle` (Text, Optional) - Subtitle

---

#### 3. `sections.icon-features-grid`
For features display

**Fields**:
- `title` (Text) - Section title
- `description` (Text, Optional) - Section description
- `features` (Component: Repeatable) - Array of features
  - `icon` (Text) - Icon name (e.g., "FiBook")
  - `title` (Text) - Feature title
  - `description` (Text) - Feature description
  - `color` (Text, Optional) - Hex color code

---

#### 4. `sections.training-programs-grid`
For training programs categories

**Fields**:
- `title` (Text) - Section title
- `description` (Text, Optional)
- `programs` (Component: Repeatable)
  - `title` (Text) - Program title
  - `description` (Text) - Program description
  - `topics` (JSON or Text) - Array of topics/items
  - `icon` (Text, Optional) - Icon name

---

#### 5. `sections.pricing-table`
For pricing displays

**Fields**:
- `title` (Text) - Section title
- `description` (Text, Optional)
- `items` (Component: Repeatable)
  - `facility` (Text) - Facility/item name
  - `price` (Text) - Price
  - `notes` (Text, Optional) - Additional notes

---

#### 6. `sections.dual-pricing-tables`
For Normal vs Buffet meals

**Fields**:
- `title` (Text) - Section title
- `description` (Text, Optional)
- `leftTable` (Component) - First table
  - `tableTitle` (Text)
  - `items` (Repeatable)
- `rightTable` (Component) - Second table
  - `tableTitle` (Text)
  - `items` (Repeatable)
  - `notes` (Text, Optional)

---

#### 7. `sections.important-notes`
For important information

**Fields**:
- `title` (Text) - Section title
- `icon` (Text, Optional) - Icon name
- `notes` (Component: Repeatable)
  - `title` (Text) - Note title
  - `content` (Text) - Note content

---

#### 8. `sections.form-config`
For form configuration

**Fields**:
- `title` (Text) - Form title
- `description` (Text, Optional)
- `submitUrl` (Text) - API endpoint URL
- `successMessage` (Text) - Success message
- `fieldGroups` (Component: Repeatable)
  - `groupTitle` (Text) - Field group title
  - `fields` (Component: Repeatable)
    - `name` (Text) - Field name
    - `label` (Text) - Field label
    - `type` (Enumeration) - Input type
    - `required` (Boolean) - Required flag
    - `placeholder` (Text, Optional)
    - `options` (JSON, Optional) - For select/dropdown

---

#### 9. `sections.contact-info-cards`
For contact information

**Fields**:
- `title` (Text) - Section title
- `cards` (Component: Repeatable)
  - `icon` (Text) - Icon name
  - `title` (Text) - Card title
  - `details` (JSON or Component: Repeatable) - Array of detail lines
  - `color` (Text, Optional) - Color scheme

---

#### 10. `sections.map-config`
For map display

**Fields**:
- `centerLat` (Decimal) - Map center latitude
- `centerLng` (Decimal) - Map center longitude
- `zoom` (Integer) - Default zoom level
- `markers` (Component: Repeatable)
  - `lat` (Decimal) - Marker latitude
  - `lng` (Decimal) - Marker longitude
  - `title` (Text) - Marker title
  - `infoWindow` (Rich Text) - Info window content

---

#### 11. `sections.training-locations`
For training location cards

**Fields**:
- `title` (Text) - Section title
- `description` (Text, Optional)
- `locations` (Component: Repeatable)
  - `city` (Text) - City name
  - `address` (Text) - Full address
  - `accommodation` (Text) - Accommodation info
  - `transport` (Text) - Transport info
  - `icon` (Text, Optional) - Icon name

---

#### 12. `sections.amenities-grid`
For accommodation amenities

**Fields**:
- `title` (Text) - Section title
- `description` (Text, Optional)
- `amenities` (Component: Repeatable)
  - `icon` (Text) - Icon name
  - `title` (Text) - Amenity title
  - `description` (Text) - Amenity description
  - `color` (Text, Optional) - Color scheme

---

#### 13. `sections.numbered-list`
For travel tips and similar content

**Fields**:
- `title` (Text) - Section title
- `items` (Component: Repeatable)
  - `number` (Integer) - Item number
  - `title` (Text) - Item title (bold part)
  - `content` (Text) - Item description

---

#### 14. `sections.cta-single-button`
For call-to-action sections

**Fields**:
- `title` (Text) - CTA title
- `description` (Text) - CTA description
- `button` (Component)
  - `text` (Text) - Button text
  - `url` (Text) - Button URL
  - `variant` (Enumeration) - Button style (primary, secondary)
- `backgroundColor` (Text, Optional) - Background color

---

#### 15. `sections.quick-links`
For quick links section

**Fields**:
- `title` (Text) - Section title
- `links` (Component: Repeatable)
  - `text` (Text) - Link text
  - `url` (Text) - Link URL
  - `icon` (Text, Optional) - Icon name

---

### Element Components

#### 1. `elements.feature-item`
**Fields**:
- `icon` (Text)
- `title` (Text)
- `description` (Text)
- `color` (Text, Optional)

#### 2. `elements.pricing-item`
**Fields**:
- `facility` (Text)
- `price` (Text)
- `notes` (Text, Optional)

#### 3. `elements.contact-info-card`
**Fields**:
- `icon` (Text)
- `title` (Text)
- `details` (JSON or Text)
- `color` (Text, Optional)

#### 4. `elements.location-card`
**Fields**:
- `city` (Text)
- `address` (Text)
- `accommodation` (Text)
- `transport` (Text)

#### 5. `elements.numbered-list-item`
**Fields**:
- `number` (Integer)
- `title` (Text)
- `content` (Text)

---

## API Endpoints

### Base URL
```
http://localhost:1337
```

### Single Type Endpoints

#### 1. CUTRAC Overview Page
```bash
GET /api/training-cutrac-overview-page?populate=deep
```

**Example Response**:
```json
{
  "data": {
    "id": 1,
    "documentId": "cutrac123",
    "heroSection": {
      "badge": "CUA Training",
      "title": "CUTRAC Overview",
      "description": "Credit Union Training and Advisory Centre...",
      "backgroundImage": {
        "url": "/uploads/hero1.jpg"
      }
    },
    "aboutSection": {
      "title": "About CUTRAC",
      "content": "<p>The Credit Union Training and Advisory Centre...</p>"
    },
    "featuresSection": {
      "title": "Key Features",
      "features": [
        {
          "icon": "FiBook",
          "title": "Comprehensive Curriculum",
          "description": "Expert-designed training programs..."
        }
      ]
    },
    "programsSection": {
      "title": "Our Training Programs",
      "programs": [
        {
          "title": "Leadership Development",
          "description": "Programs designed for board members...",
          "topics": ["Strategic Planning", "Governance & Compliance"]
        }
      ]
    },
    "ctaSection": {
      "title": "Ready to Enhance Your Skills?",
      "description": "Join hundreds of credit union professionals...",
      "button": {
        "text": "Register for Training",
        "url": "/training/cutrac-registration"
      }
    }
  }
}
```

---

#### 2. Training Calendar Page
```bash
GET /api/training-calendar-page?populate=deep
```

---

#### 3. Training Programs Collection
```bash
# Get all programs
GET /api/training-programs?populate=*&sort=startDate:asc

# Get upcoming programs only
GET /api/training-programs?filters[startDate][$gte]=${today}&populate=*

# Get by status
GET /api/training-programs?filters[status][$eq]=open&populate=*

# Get by category
GET /api/training-programs?filters[category][$eq]=leadership&populate=*
```

**Example Response**:
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "prog123",
      "title": "Credit Union Governance & Leadership",
      "slug": "governance-leadership",
      "startDate": "2025-03-15",
      "endDate": "2025-03-17",
      "duration": "3 Days",
      "location": "Accra Training Centre",
      "participants": "Board Members & Executives",
      "status": "open",
      "category": "leadership",
      "description": "<p>Comprehensive governance training...</p>"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

---

#### 4. Training Prices Page
```bash
GET /api/training-prices-page?populate=deep
```

**Example Response**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Training",
      "title": "Training Prices",
      "description": "Transparent pricing for CUTraC facilities..."
    },
    "hallFacilitiesSection": {
      "title": "Hall & Conference Facilities",
      "description": "Professional training and conference facilities...",
      "items": [
        {
          "facility": "Hall B (with CUTraC Food Service) - 300 Capacity",
          "price": "GHC 1,500.00"
        }
      ]
    },
    "accommodationSection": {
      "title": "Accommodation",
      "items": [
        {
          "facility": "Rooms With Single Beds",
          "price": "GHC 110.00"
        }
      ]
    },
    "mealsSection": {
      "title": "Meals & Catering",
      "leftTable": {
        "tableTitle": "Meals (Normal)",
        "items": [
          { "meal": "Breakfast", "price": "GHC 20.00" }
        ]
      },
      "rightTable": {
        "tableTitle": "Meals (Buffet)",
        "items": [
          { "meal": "Breakfast", "price": "GHC 25.00-ABOVE" }
        ],
        "notes": "For buffet services, prices can vary..."
      }
    },
    "importantNotesSection": {
      "title": "Important Notes",
      "icon": "FiAlertCircle",
      "notes": [
        {
          "title": "Payment Terms",
          "content": "Not less than 50% payment for all bookings..."
        }
      ]
    },
    "lastUpdated": "2022-01-01"
  }
}
```

---

#### 5. Training Registration Page
```bash
GET /api/training-registration-page?populate=deep
```

---

#### 6. Contact CUTRAC Page
```bash
GET /api/contact-cutrac-page?populate=deep
```

**Example Response**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Training",
      "title": "Contact CUTraC",
      "description": "Get in touch with our training team..."
    },
    "contactInfoSection": {
      "title": "Get In Touch",
      "cards": [
        {
          "icon": "FiMapPin",
          "title": "Office Location",
          "details": [
            "CUA Ghana Head Office",
            "Ring Road Central, Accra",
            "Ghana"
          ],
          "color": "bg-blue-100 text-blue-600"
        },
        {
          "icon": "FiPhone",
          "title": "Phone Numbers",
          "details": [
            "+233 XX XXX XXXX",
            "+233 XX XXX XXXX (Training Coordinator)"
          ],
          "color": "bg-green-100 text-green-600"
        }
      ]
    },
    "contactForm": {
      "title": "Send a Message",
      "submitUrl": "/api/contact-messages",
      "successMessage": "Thank you! We'll get back to you soon.",
      "fields": [
        {
          "name": "name",
          "label": "Full Name",
          "type": "text",
          "required": true,
          "placeholder": "Your name"
        },
        {
          "name": "subject",
          "label": "Subject",
          "type": "select",
          "required": true,
          "options": [
            { "value": "registration", "label": "Registration Inquiry" },
            { "value": "pricing", "label": "Pricing Information" }
          ]
        }
      ]
    },
    "mapSection": {
      "centerLat": 5.6037,
      "centerLng": -0.1870,
      "zoom": 15,
      "markers": [
        {
          "lat": 5.6037,
          "lng": -0.1870,
          "title": "CUA Ghana - Training Centre",
          "infoWindow": "<div><h3>CUA Ghana Training Centre</h3><p>Ring Road Central, Accra</p></div>"
        }
      ]
    },
    "quickLinksSection": {
      "title": "Quick Links",
      "links": [
        {
          "text": "Register for Training",
          "url": "/training/cutrac-registration"
        }
      ]
    }
  }
}
```

---

#### 7. Travel for Training Page
```bash
GET /api/travel-for-training-page?populate=deep
```

**Example Response**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Training",
      "title": "Travel for Training",
      "description": "Information about training locations..."
    },
    "locationsSection": {
      "title": "Training Locations",
      "description": "We offer training programs at convenient locations...",
      "locations": [
        {
          "city": "Accra",
          "address": "CUA Ghana Head Office, Ring Road Central",
          "accommodation": "Recommended hotels within 5km radius",
          "transport": "Public transport and taxi services readily available"
        },
        {
          "city": "Kumasi",
          "address": "CUA Regional Office, Adum",
          "accommodation": "Partner hotels with special rates for trainees",
          "transport": "Airport shuttle and local transport available"
        }
      ]
    },
    "amenitiesSection": {
      "title": "Accommodation & Amenities",
      "description": "Comfortable facilities to ensure...",
      "amenities": [
        {
          "icon": "FiHome",
          "title": "Partner Hotels",
          "description": "We have partnerships with quality hotels...",
          "color": "bg-blue-100 text-blue-600"
        }
      ]
    },
    "travelTipsSection": {
      "title": "Travel Tips",
      "items": [
        {
          "number": 1,
          "title": "Book Early",
          "content": "Reserve your accommodation as soon as you register..."
        }
      ]
    },
    "ctaSection": {
      "title": "Need Travel Assistance?",
      "description": "Our team is here to help you plan your travel...",
      "button": {
        "text": "Contact Training Coordinator",
        "url": "/training/contact-cutrac"
      }
    }
  }
}
```

---

### Form Submission Endpoints

#### Training Registration Form
```bash
POST /api/training-registrations
Content-Type: application/json

{
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+233 XX XXX XXXX",
    "creditUnion": "Accra Credit Union",
    "position": "board-member",
    "trainingProgram": "governance",
    "preferredDate": "2025-03-15",
    "specialRequirements": "Dietary restrictions: vegetarian"
  }
}
```

#### Contact Form
```bash
POST /api/contact-messages
Content-Type: application/json

{
  "data": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+233 XX XXX XXXX",
    "subject": "registration",
    "message": "I would like to inquire about..."
  }
}
```

---

## Implementation Checklist

### Phase 1: Content Types Setup (4-6 hours)
- [ ] Create `training-cutrac-overview-page` single type
- [ ] Create `training-calendar-page` single type
- [ ] Create `training-programs` collection type
- [ ] Create `training-prices-page` single type
- [ ] Create `training-registration-page` single type
- [ ] Create `contact-cutrac-page` single type
- [ ] Create `travel-for-training-page` single type
- [ ] Create `training-registrations` collection for form submissions
- [ ] Configure all field types, validations, and relationships

### Phase 2: Components Creation (6-8 hours)
- [ ] Create shared hero component
- [ ] Create intro/about section components
- [ ] Create icon features grid component
- [ ] Create training programs grid component
- [ ] Create pricing table components
- [ ] Create dual pricing tables component
- [ ] Create important notes component
- [ ] Create form configuration component
- [ ] Create contact info cards component
- [ ] Create map configuration component
- [ ] Create training locations component
- [ ] Create amenities grid component
- [ ] Create numbered list component
- [ ] Create CTA components
- [ ] Create quick links component
- [ ] Configure all element components

### Phase 3: Content Population (8-10 hours)
- [ ] Populate CUTRAC Overview page
- [ ] Populate Training Calendar page
- [ ] Add 4+ training programs to collection
- [ ] Populate Prices page with all pricing tables
- [ ] Configure Registration form
- [ ] Populate Contact page with info and map
- [ ] Populate Travel page with locations and tips
- [ ] Upload all required images (hero backgrounds)
- [ ] Add SEO metadata for all pages
- [ ] Test all API endpoints

### Phase 4: Testing & Optimization (2-3 hours)
- [ ] Test all API endpoints
- [ ] Verify populate queries return complete data
- [ ] Test form submissions
- [ ] Check image uploads and URLs
- [ ] Validate date formats for training programs
- [ ] Test filtering and sorting for programs
- [ ] Verify rich text content renders correctly
- [ ] Performance optimization

---

## Timeline Estimate

| Phase | Task | Estimated Time |
|-------|------|----------------|
| 1 | Content Types Setup | 4-6 hours |
| 2 | Components Creation | 6-8 hours |
| 3 | Content Population | 8-10 hours |
| 4 | Testing & Optimization | 2-3 hours |
| **Total** | | **20-27 hours** |

---

## Special Considerations

### 1. Training Programs Collection
- Implement date-based filtering for upcoming/past programs
- Consider adding capacity/enrollment tracking
- Add featured program flag for homepage display
- Implement registration deadline dates

### 2. Pricing Updates
- Include `lastUpdated` date field
- Consider adding pricing history or version control
- Seasonal pricing variations may be needed
- Currency formatting considerations

### 3. Form Submissions
- Implement email notifications for registrations
- Add confirmation emails to users
- Consider adding status tracking (pending, confirmed, completed)
- Integration with payment systems for deposits

### 4. Map Integration
- Store coordinates for all training locations
- Consider adding directions/navigation links
- Multiple markers for different facilities

### 5. Calendar Features
- Export calendar to PDF/ICS format
- Integration with Google Calendar
- Automated reminders for registered participants
- Recurring training programs

### 6. Search & Filtering
- Search training programs by title, category, location
- Filter by date range, status, category
- Sort by date, popularity, relevance

---

## Notes

1. **Form Submissions**: Both registration and contact forms will need corresponding collection types to store submissions.

2. **Image Requirements**:
   - Hero backgrounds: 1920x1080px minimum
   - Feature icons: Use icon library (react-icons)
   - Location images: 800x600px recommended

3. **Date Handling**: Use ISO 8601 format (YYYY-MM-DD) for all dates.

4. **Pricing Format**: Store prices as text to preserve "GHC" prefix and formatting like "25.00-ABOVE".

5. **Rich Text**: About sections and program descriptions should support rich text formatting.

6. **Responsive Design**: All components should be mobile-friendly as implemented in the frontend.

7. **Accessibility**: Ensure form labels, alt text for images, and semantic HTML structure.

8. **Localization**: Consider future translation needs if supporting multiple languages.

---

## API Integration Examples

### Frontend Integration (Next.js)

```javascript
// lib/strapi.js

// Get CUTRAC Overview Page
export async function getCutracOverviewPage() {
  const data = await fetchAPI('/api/training-cutrac-overview-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Training Calendar Page
export async function getTrainingCalendarPage() {
  const data = await fetchAPI('/api/training-calendar-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Training Programs
export async function getTrainingPrograms(filters = {}) {
  const queryParams = {
    'populate': '*',
    'sort': 'startDate:asc',
  };

  // Filter by status
  if (filters.status) {
    queryParams['filters[status][$eq]'] = filters.status;
  }

  // Filter upcoming only
  if (filters.upcomingOnly) {
    const today = new Date().toISOString().split('T')[0];
    queryParams['filters[startDate][$gte]'] = today;
  }

  // Filter by category
  if (filters.category) {
    queryParams['filters[category][$eq]'] = filters.category;
  }

  const data = await fetchAPI('/api/training-programs', {
    next: { revalidate: 3600 },
  }, queryParams);
  return data;
}

// Get Prices Page
export async function getTrainingPricesPage() {
  const data = await fetchAPI('/api/training-prices-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Registration Page
export async function getTrainingRegistrationPage() {
  const data = await fetchAPI('/api/training-registration-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Contact Page
export async function getContactCutracPage() {
  const data = await fetchAPI('/api/contact-cutrac-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Travel Page
export async function getTravelForTrainingPage() {
  const data = await fetchAPI('/api/travel-for-training-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Submit Training Registration
export async function submitTrainingRegistration(formData) {
  const data = await fetchAPI('/api/training-registrations', {
    method: 'POST',
    body: JSON.stringify({ data: formData }),
  });
  return data;
}

// Submit Contact Message
export async function submitCutracContact(formData) {
  const data = await fetchAPI('/api/contact-messages', {
    method: 'POST',
    body: JSON.stringify({ data: formData }),
  });
  return data;
}
```

---

## Support

For implementation questions or clarifications:
- [Strapi Documentation](https://docs.strapi.io)
- [CUA Ghana API Documentation](./API_DOCUMENTATION.md)
- Project repository issues

---

**Last Updated**: 2025-10-27
**API Version**: Strapi v5.25.0
**Status**: Documentation complete, awaiting implementation
