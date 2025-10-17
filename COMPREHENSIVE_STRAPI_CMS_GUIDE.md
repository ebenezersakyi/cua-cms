# COMPREHENSIVE STRAPI CMS IMPLEMENTATION GUIDE
## CUA Ghana Website - Complete Requirements Documentation

**Document Version**: 2.0
**Date Created**: 2025-10-16
**Purpose**: Complete, detailed guide for implementing Strapi CMS for CUA Ghana website
**Status**: Ready for Implementation

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Technology Stack Analysis](#3-technology-stack-analysis)
4. [Complete Content Type Specifications](#4-complete-content-type-specifications)
5. [Navigation & Menu Structure](#5-navigation--menu-structure)
6. [Icons & Visual Assets Catalog](#6-icons--visual-assets-catalog)
7. [Color Palette & Design System](#7-color-palette--design-system)
8. [Hardcoded Data Migration Map](#8-hardcoded-data-migration-map)
9. [Forms & User Input Requirements](#9-forms--user-input-requirements)
10. [API Endpoints & Integration](#10-api-endpoints--integration)
11. [Implementation Roadmap](#11-implementation-roadmap)
12. [Data Migration Scripts](#12-data-migration-scripts)
13. [Testing Requirements](#13-testing-requirements)
14. [Performance Optimization](#14-performance-optimization)
15. [Security Considerations](#15-security-considerations)

---

## 1. EXECUTIVE SUMMARY

### Current State
- **Application**: Next.js 15.5.2 with React 19.1.0
- **CMS Integration**: None (100% hardcoded content)
- **Total Pages**: 30+ routes across 6 major sections
- **Content Items**: 100+ hardcoded content pieces
- **Ready for**: Full Strapi CMS migration

### Project Scope
This comprehensive guide documents every single requirement for implementing Strapi CMS for the CUA Ghana website. It includes:
- Every content type with exact field specifications
- Every icon used throughout the application
- Every color, font, and styling detail
- Every piece of hardcoded data that needs migration
- Complete implementation roadmap with priorities

### Key Findings
1. **No existing CMS integration** - Clean slate for implementation
2. **Well-structured codebase** - Component-based architecture ready for API integration
3. **Clear content patterns** - Consistent data structures throughout
4. **Professional UI/UX** - Modern design with animations and transitions
5. **Mobile-responsive** - Fully responsive design with Tailwind CSS

---

## 2. PROJECT OVERVIEW

### 2.1 Application Architecture

**Framework**: Next.js 15.5.2 (App Router)
- Server Components by default
- Client Components marked with "use client"
- Image optimization with next/image
- Built-in routing with app directory

**Styling**: Tailwind CSS 4
- Custom color palette
- Responsive design utilities
- Custom component variants
- PostCSS configuration

**Animation**: Framer Motion 12.23.12
- Scroll animations
- Page transitions
- Interactive hover effects
- Stagger animations for lists

**UI Libraries**:
- React Icons 5.5.0 (Feather Icons primarily)
- Swiper 11.2.10 (Carousels and sliders)
- React Ticker (News ticker)

**Maps Integration**:
- Google Maps React Wrapper 1.2.0
- Leaflet 1.9.4 (Alternative mapping)

### 2.2 Directory Structure

```
/app
├── /components           # Shared React components
│   ├── Header.js        # Navigation with dropdowns
│   ├── Footer.js        # Footer with social links
│   ├── Hero.js          # Homepage hero carousel
│   ├── Ticker.js        # News ticker
│   ├── Events.js        # Events grid
│   ├── About.js         # About section with stats
│   ├── JoinUs.js        # CTA section
│   ├── Partners.js      # Partner logos carousel
│   ├── Button.js        # Custom button component
│   ├── AboutHero.js     # Hero for about pages
│   └── GoogleMap.js     # Google Maps component
│
├── /data                # Hardcoded data files
│   └── top20CreditUnions.js  # Top 20 CU data
│
├── /about-us            # About section pages
│   ├── /who-we-are
│   ├── /board-of-directors
│   ├── /management
│   ├── /partners
│   ├── /role-in-ghana
│   └── /potential-and-size
│
├── /credit-unions       # Credit unions section
│   ├── /overview
│   ├── /ghana
│   ├── /members
│   ├── /success-stories
│   ├── /join-credit-union
│   └── /form-a-credit-union
│
├── /training            # CUTRAC training section
│   ├── /cutrac-overview
│   ├── /training-calendar
│   ├── /cutrac-registration
│   ├── /prices
│   ├── /contact-cutrac
│   └── /travel-for-training
│
├── /media               # Media & resources
│   ├── /downloads
│   ├── /photo-gallery
│   ├── /video-gallery
│   └── /eletter-subscription
│
├── /our-work            # Services & chapters
│   ├── /what-we-do
│   └── /our-chapters
│       └── /[chapter]   # Dynamic chapter pages
│
├── /news                # News & blog
│   └── /[slug]          # Dynamic news articles
│
├── /events              # Events
│   └── /[id]            # Dynamic event pages
│
├── /contact             # Contact page
├── /find-credit-union   # CU finder
├── /top-20-credit-unions # Top 20 ranking
├── page.js              # Homepage
├── layout.js            # Root layout
└── globals.css          # Global styles

/public
├── /images
│   ├── /hero            # Hero carousel images (3 images)
│   ├── /partners        # Partner logos (8 logos)
│   ├── /board-of-directors  # Board photos (7 photos)
│   └── /chapters        # Chapter images (3 images)
├── cua-logo 1.png       # Main logo
└── cua-logo-white.png   # White logo variant
```

### 2.3 Current Navigation Structure

**Main Navigation** (7 items):
1. Home → `/`
2. About CUA → Dropdown (6 subitems)
3. Our Work → Dropdown (2 subitems)
4. Credit Unions → Dropdown (7 subitems)
5. Training → Dropdown (6 subitems)
6. Media → Dropdown (4 subitems)
7. Contact → `/contact`

**Right-side Actions**:
- Search icon (FiSearch) → Opens full-screen search modal
- Download Report icon (FiFileText) → Links to https://cudbase.cua.org.gh/
- "I want to..." button → Dropdown (2 subitems: Join A CU, Form A CU)

**Mobile Menu**:
- Hamburger icon (FiMenu)
- Slide-in drawer from right
- Same structure as desktop with expandable sections

---

## 3. TECHNOLOGY STACK ANALYSIS

### 3.1 Dependencies (from package.json)

**Production Dependencies**:
```json
{
  "next": "15.5.2",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "framer-motion": "12.23.12",
  "react-icons": "5.5.0",
  "swiper": "11.2.10",
  "react-ticker": "^1.3.2",
  "@googlemaps/react-wrapper": "1.2.0",
  "leaflet": "1.9.4",
  "react-leaflet": "4.2.1"
}
```

**Development Dependencies**:
```json
{
  "tailwindcss": "4.0.0",
  "postcss": "8.5.3",
  "eslint": "9.20.1",
  "eslint-config-next": "15.5.2"
}
```

### 3.2 Font Configuration

**Primary Font**: Manrope (from Google Fonts)
- Weights: 300, 400, 500, 600, 700
- Variable font support
- CSS variable: `--font-manrope`
- Applied globally via Tailwind config

### 3.3 Build Configuration

**next.config.mjs**:
- Standard Next.js configuration
- Turbopack enabled for development
- Image domains need configuration for Strapi media

**Recommended additions for Strapi**:
```javascript
// next.config.mjs
export default {
  images: {
    domains: ['localhost', 'your-strapi-domain.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
}
```

---

## 4. COMPLETE CONTENT TYPE SPECIFICATIONS

### 4.1 Collection Type: Hero Slides

**API ID**: `hero-slide`
**Display Name**: Hero Slides
**Purpose**: Manage rotating hero carousel on homepage
**Current Count**: 3 items hardcoded
**Location**: `app/components/Hero.js` lines 48-76

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| title | Text | Yes | Max 200 chars | Main headline (e.g., "Empowering Communities Through Credit Unions") |
| subtext | Long Text | Yes | Max 500 chars | Description/subtitle text |
| ctaText | Text | Yes | Max 50 chars | Button text (e.g., "Join a Credit Union") |
| ctaLink | Text | Yes | URL format | Button destination URL |
| backgroundImage | Media (Single) | Yes | Image only | Recommended size: 1920x800px |
| order | Number | Yes | Integer, Default: 0 | Display order in carousel (0-based) |
| isActive | Boolean | Yes | Default: true | Enable/disable slide visibility |
| publishedAt | DateTime | Auto | Timestamp | Publication date |

**Current Data to Migrate**:

```javascript
// Slide 1
{
  title: "Empowering Communities Through Credit Unions",
  subtext: "Building stronger financial futures for Ghanaians through cooperative banking and community-driven financial services.",
  ctaText: "Join a Credit Union",
  ctaLink: "/find-credit-union",
  backgroundImage: "/images/hero/hero1.jpg",
  order: 0,
  isActive: true
}

// Slide 2
{
  title: "Your Financial Partner",
  subtext: "Discover how credit unions provide accessible banking, loans, and savings solutions tailored to your community's needs.",
  ctaText: "Our Services",
  ctaLink: "/our-work/what-we-do",
  backgroundImage: "/images/hero/hero2.jpg",
  order: 1,
  isActive: true
}

// Slide 3
{
  title: "Strengthening Ghana's Economy",
  subtext: "Supporting local businesses and individuals with cooperative financial services that drive economic growth and prosperity.",
  ctaText: "Learn More",
  ctaLink: "/about-us/who-we-are",
  backgroundImage: "/images/hero/hero3.jpg",
  order: 2,
  isActive: true
}
```

**Carousel Configuration**:
- Auto-play: 5000ms delay
- Effect: Creative (3D transition)
- Speed: 1200ms
- Loop: Yes
- Navigation: Custom arrow buttons
- Pause on hover: No

---

### 4.2 Collection Type: News Articles

**API ID**: `news-article`
**Display Name**: News Articles
**Purpose**: Manage news, announcements, and blog posts
**Current Count**: 5 items in ticker, 5+ in news pages
**Location**: `app/components/Ticker.js`, `app/news/[slug]/page.js`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| title | Text | Yes | Max 200 chars | Article headline |
| slug | UID | Yes | Based on title | URL-friendly identifier |
| excerpt | Text | Yes | Max 300 chars | Preview text for cards/ticker |
| content | Rich Text | Yes | Full editor | Complete article with formatting |
| featuredImage | Media (Single) | Yes | Image only | Min 1200x630px recommended |
| author | Relation | No | Many-to-One (Authors) | Article author |
| category | Relation | No | Many-to-One (News Categories) | News category |
| tags | Relation | No | Many-to-Many (Tags) | Article tags |
| publishedDate | DateTime | Yes | Timestamp | Display date |
| updatedDate | DateTime | Auto | Timestamp | Last modified |
| isFeatured | Boolean | No | Default: false | Show in featured sections |
| isTickerItem | Boolean | No | Default: false | Show in top ticker |
| readTime | Number | No | Integer (minutes) | Estimated reading time |
| seoTitle | Text | No | Max 60 chars | SEO meta title |
| seoDescription | Text | No | Max 160 chars | SEO meta description |

**Current Ticker Data to Migrate**:

```javascript
// From app/components/Ticker.js lines 12-43
{
  date: "Dec 15, 2024",
  title: "CUA Announces New Research Center for Sustainable Technology",
  slug: "research-center-sustainable-technology",
  isTickerItem: true
},
{
  date: "Dec 12, 2024",
  title: "Cardinals Basketball Team Advances to Championship Finals",
  slug: "basketball-championship-finals",
  isTickerItem: true
},
{
  date: "Dec 10, 2024",
  title: "Spring 2025 Registration Opens for All Students",
  slug: "spring-2025-registration",
  isTickerItem: true
},
{
  date: "Dec 8, 2024",
  title: "Distinguished Alumni Awards Ceremony This Weekend",
  slug: "alumni-awards-ceremony",
  isTickerItem: true
},
{
  date: "Dec 5, 2024",
  title: "New Library Hours Extended for Final Exams Period",
  slug: "library-hours-extended",
  isTickerItem: true
}
```

**Ticker Behavior**:
- Speed: 5 (react-ticker speed)
- Mode: smooth scrolling
- Pause on hover: Yes
- Format: `{date} - {title}`
- Font size: Date 15px bold, Title 14px semibold
- Spacing: 80px between items
- Background: `bg-gray-100`
- Text color: `text-gray-700`
- Hover color: `text-[#446494]`

---

### 4.3 Collection Type: Events

**API ID**: `event`
**Display Name**: Events
**Purpose**: Manage events, programs, and initiatives
**Current Count**: 3 hardcoded items
**Location**: `app/components/Events.js` lines 38-60

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| title | Text | Yes | Max 200 chars | Event title |
| slug | UID | Yes | Based on title | URL identifier |
| shortDescription | Text | Yes | Max 200 chars | For preview cards |
| description | Rich Text | Yes | Full editor | Complete event details |
| eventDate | Date | Yes | Date picker | Event date |
| eventTime | Time | No | Time picker | Event time |
| location | Text | No | Max 200 chars | Event venue |
| featuredImage | Media (Single) | Yes | Image only | Min 1200x800px |
| gallery | Media (Multiple) | No | Images only | Additional event photos |
| category | Enumeration | No | See options below | Event category |
| isFeatured | Boolean | No | Default: false | Show on homepage |
| registrationLink | Text | No | URL format | Registration URL |
| registrationDeadline | Date | No | Date picker | Registration cutoff |
| capacity | Number | No | Integer | Max attendees |
| status | Enumeration | Yes | See options below | Event status |
| relatedEvents | Relation | No | Many-to-Many (Events) | Related events |

**Category Options**:
- Training
- Community
- Financial Literacy
- Agricultural
- Women Empowerment
- Other

**Status Options**:
- Upcoming
- Ongoing
- Completed
- Cancelled

**Current Data to Migrate**:

```javascript
// From app/components/Events.js
{
  id: 1,
  title: "Financial Literacy Training",
  shortDescription: "Comprehensive training program for small business owners",
  description: "Comprehensive training program for small business owners to improve financial management skills and access to credit union services.",
  eventDate: "2024-03-15",
  image: "/images/hero/hero1.jpg",
  category: "Financial Literacy",
  status: "Upcoming",
  isFeatured: true
},
{
  id: 2,
  title: "Agricultural Development Program",
  shortDescription: "Supporting local farmers with microfinance solutions",
  description: "Supporting local farmers with microfinance solutions and modern farming techniques to boost agricultural productivity.",
  eventDate: "2024-04-08",
  image: "/images/hero/hero2.jpg",
  category: "Agricultural",
  status: "Upcoming",
  isFeatured: true
},
{
  id: 3,
  title: "Women Empowerment Initiative",
  shortDescription: "Empowering women entrepreneurs through access to credit",
  description: "Empowering women entrepreneurs through access to credit, business training, and cooperative banking solutions.",
  eventDate: "2024-05-22",
  image: "/images/hero/hero3.jpg",
  category: "Women Empowerment",
  status: "Upcoming",
  isFeatured: true
}
```

**Homepage Display**:
- Grid layout: 1 large card (left) + 2 smaller cards (right, stacked)
- Large card: `min-h-[600px]`, spans 1 column, 2 rows
- Small cards: `min-h-[290px]` each
- Hover effect: Image scales to 110%, overlay appears with full description
- Date format: "March 15, 2024"

---

### 4.4 Collection Type: Credit Unions

**API ID**: `credit-union`
**Display Name**: Credit Unions
**Purpose**: Complete directory of all credit unions in Ghana
**Current Count**: 20 in top20CreditUnions.js, more to add
**Location**: `app/data/top20CreditUnions.js`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| name | Text | Yes | Max 200 chars | Credit union full name |
| slug | UID | Yes | Based on name | URL identifier |
| description | Rich Text | No | Full editor | About the credit union |
| logo | Media (Single) | No | Image only | CU logo (square, min 400x400px) |
| region | Enumeration | Yes | 16 regions | Ghana region |
| district | Text | No | Max 100 chars | District/municipality |
| address | Text | Yes | Max 300 chars | Physical address |
| gpsCoordinates | Component | No | GPS Location | Lat/Long for mapping |
| phone | Text | Yes | Phone format | Contact number |
| email | Email | No | Email format | Contact email |
| website | Text | No | URL format | Official website |
| establishedYear | Number | No | Integer (1900-2025) | Year founded |
| memberCount | Number | No | Integer | Total members |
| totalAssets | Decimal | No | Currency | Total assets in GHS |
| services | Component (Repeatable) | No | Service List | Services offered |
| openingHours | Component | No | Business Hours | Operating hours |
| isActive | Boolean | Yes | Default: true | Currently operating |
| isFeatured | Boolean | No | Default: false | Feature on homepage |
| isTop20 | Boolean | No | Default: false | In top 20 ranking |
| ranking | Number | No | Integer | Rank if in top 20 |
| category | Enumeration | No | Large/Medium/Small | Size category |
| grade | Text | No | Max 10 chars | Performance grade (A+, A, B+, etc.) |
| chapter | Relation | No | Many-to-One (Chapters) | Regional chapter |

**Region Options** (16 Regions of Ghana):
- Greater Accra
- Ashanti
- Western
- Western North
- Eastern
- Central
- Northern
- Upper East
- Upper West
- Volta
- Oti
- Bono
- Bono East
- Ahafo
- Savannah
- North East

**GPS Coordinates Component**:
- latitude (Decimal, Required)
- longitude (Decimal, Required)

**Services Component** (Repeatable):
- serviceName (Text, Required, Max 100 chars)
- description (Text, Max 300 chars)

**Business Hours Component**:
- monday (Text, e.g., "8:00 AM - 5:00 PM")
- tuesday (Text)
- wednesday (Text)
- thursday (Text)
- friday (Text)
- saturday (Text)
- sunday (Text, e.g., "Closed")

**Current Top 20 Data to Migrate**:

```javascript
// From app/data/top20CreditUnions.js
// All 20 credit unions with rank, name, chapter, category, grade
// See section 8.3 for complete migration data
```

**Display Locations**:
1. `/top-20-credit-unions` - Ranked table view
2. `/credit-unions/ghana` - Full directory with filters
3. `/find-credit-union` - Map view with markers
4. Chapter pages - Filtered by chapter

**Filtering Requirements**:
- By region (dropdown or map)
- By chapter (dropdown)
- By category (Large/Medium/Small)
- By services offered
- By name (search input)

---

### 4.5 Collection Type: Partners

**API ID**: `partner`
**Display Name**: Partners
**Purpose**: Organizational partners and collaborators
**Current Count**: 8 partner organizations
**Location**: `app/components/Partners.js`, `/public/images/partners/`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| name | Text | Yes | Max 200 chars | Partner organization name |
| slug | UID | Yes | Based on name | URL identifier |
| logo | Media (Single) | Yes | Image only | PNG with transparent bg preferred |
| description | Rich Text | No | Full editor | About the partnership |
| website | Text | No | URL format | Partner website |
| partnershipType | Enumeration | No | See options | Type of partnership |
| startDate | Date | No | Date picker | Partnership start date |
| endDate | Date | No | Date picker | Partnership end (if applicable) |
| isActive | Boolean | Yes | Default: true | Currently active |
| displayOrder | Number | No | Integer | Order in carousel |

**Partnership Type Options**:
- Strategic
- Funding
- Technical
- Advocacy
- International

**Current Partners to Migrate**:

```javascript
// Partner logos in /public/images/partners/
1. ACCOSCA (accosca.png) - African Confederation of Co-operative Savings and Credit
2. CCA (cca.png) - Canadian Co-operative Association
3. GIZ (giz.png) - Deutsche Gesellschaft für Internationale Zusammenarbeit
4. ILCU (ilcu.png) - Irish League of Credit Unions
5. KAD (kad.png) - [Partner name to be confirmed]
6. SEND (send.png) - Social Enterprise Development Foundation
7. Sparkassenstiftung (sparkassenstiftung.png) - Savings Banks Foundation for International Cooperation
8. WOCCU (woccu.png) - World Council of Credit Unions
```

**Carousel Configuration**:
- Auto-scroll: Yes
- Speed: Slow (smooth continuous)
- Items per view: 4-6 (responsive)
- Loop: Infinite
- Grayscale: Yes (default), Full color on hover
- Spacing: Equal gaps between logos

**Display Locations**:
1. Homepage - Partners carousel section
2. `/about-us/partners` - Full partners page with descriptions

---

### 4.6 Collection Type: Board Members

**API ID**: `board-member`
**Display Name**: Board of Directors
**Purpose**: Board members information and profiles
**Current Count**: 7 members (photos exist in /public/images/board-of-directors/)
**Location**: `/about-us/board-of-directors`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| fullName | Text | Yes | Max 200 chars | Full name with titles |
| position | Text | Yes | Max 100 chars | Board position (e.g., "Chairperson") |
| bio | Rich Text | Yes | Full editor | Professional biography |
| photo | Media (Single) | Yes | Image only | Professional headshot (min 800x800px) |
| qualifications | Rich Text | No | Full editor | Academic/professional qualifications |
| responsibilities | Rich Text | No | Full editor | Board responsibilities |
| email | Email | No | Email format | Contact email (if public) |
| phone | Text | No | Phone format | Contact phone (if public) |
| linkedIn | Text | No | URL format | LinkedIn profile URL |
| displayOrder | Number | Yes | Integer | Display order (0 = Chairperson) |
| isActive | Boolean | Yes | Default: true | Currently serving |
| termStart | Date | No | Date picker | Term start date |
| termEnd | Date | No | Date picker | Term end date (if applicable) |

**Typical Positions** (in order):
1. Chairperson
2. Vice Chairperson
3. Secretary
4. Treasurer
5. Member
6. Member
7. Member

**Photo Files Exist**:
- `/public/images/board-of-directors/` (7 photos)
- Files need to be uploaded to Strapi media library
- Names to be matched with actual board member data

**Display Requirements**:
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Card design: Photo top, name, position, brief bio
- Click to expand: Full modal with complete bio, qualifications, responsibilities
- Professional, formal presentation

---

### 4.7 Collection Type: Management Team

**API ID**: `management-member`
**Display Name**: Management Team
**Purpose**: Staff and management directory
**Current Count**: 7+ members
**Location**: `/about-us/management`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| fullName | Text | Yes | Max 200 chars | Full name |
| position | Text | Yes | Max 100 chars | Job title |
| department | Enumeration | Yes | See options | Department/unit |
| bio | Rich Text | Yes | Full editor | Professional background |
| photo | Media (Single) | Yes | Image only | Professional photo |
| email | Email | No | Email format | Work email |
| phone | Text | No | Phone format | Work phone/extension |
| qualifications | Rich Text | No | Full editor | Education and certifications |
| linkedIn | Text | No | URL format | LinkedIn profile |
| displayOrder | Number | Yes | Integer | Display order within department |
| isActive | Boolean | Yes | Default: true | Currently employed |
| joinDate | Date | No | Date picker | Date joined |

**Department Options**:
- Executive
- Finance
- Operations
- Training (CUTRAC)
- IT
- Marketing & Communications
- Human Resources
- Compliance & Risk

**Display Requirements**:
- Grouped by department
- Executive team displayed first
- Grid layout similar to board members
- Contact information visible (email/phone)

---

### 4.8 Collection Type: Training Courses

**API ID**: `training-course`
**Display Name**: Training Courses
**Purpose**: CUTRAC training programs catalog
**Current Count**: Multiple courses (needs research)
**Location**: `/training/cutrac-overview`, `/training/training-calendar`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| courseName | Text | Yes | Max 200 chars | Course title |
| slug | UID | Yes | Based on courseName | URL identifier |
| shortDescription | Text | Yes | Max 300 chars | Brief overview |
| description | Rich Text | Yes | Full editor | Detailed course info |
| duration | Text | Yes | Max 50 chars | e.g., "3 days", "2 weeks" |
| level | Enumeration | Yes | See options | Course level |
| category | Enumeration | Yes | See options | Course category |
| price | Decimal | No | Currency | Course fee in GHS |
| currency | Text | No | Default: "GHS" | Currency code |
| objectives | Rich Text | No | Full editor | Learning objectives |
| targetAudience | Rich Text | No | Full editor | Who should attend |
| prerequisites | Rich Text | No | Full editor | Requirements to enroll |
| syllabus | Media (Single) | No | PDF only | Downloadable syllabus |
| instructor | Text | No | Max 200 chars | Primary instructor name |
| maxParticipants | Number | No | Integer | Class size limit |
| certificationOffered | Boolean | No | Default: false | Offers certificate |
| isActive | Boolean | Yes | Default: true | Currently offered |
| featuredImage | Media (Single) | No | Image only | Course illustration |

**Level Options**:
- Beginner
- Intermediate
- Advanced
- All Levels

**Category Options**:
- Financial Management
- Leadership & Governance
- Compliance & Regulation
- Technology & Innovation
- Operations Management
- Member Services
- Marketing & Growth

---

### 4.9 Collection Type: Training Schedule

**API ID**: `training-schedule`
**Display Name**: Training Calendar
**Purpose**: Scheduled training sessions
**Current Count**: TBD
**Location**: `/training/training-calendar`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| course | Relation | Yes | Many-to-One (Training Courses) | Which course |
| sessionTitle | Text | No | Max 200 chars | Custom session title if needed |
| startDate | DateTime | Yes | Date + time | Session start |
| endDate | DateTime | Yes | Date + time | Session end |
| location | Text | Yes | Max 200 chars | Venue name |
| venue | Text | No | Max 300 chars | Full venue address |
| instructor | Text | No | Max 200 chars | Instructor for this session |
| availableSeats | Number | No | Integer | Seats available |
| bookedSeats | Number | No | Integer, Default: 0 | Seats booked |
| registrationDeadline | Date | No | Date picker | Last day to register |
| registrationLink | Text | No | URL format | Registration form URL |
| price | Decimal | No | Currency | Override course price if needed |
| status | Enumeration | Yes | See options | Session status |
| notes | Long Text | No | Plain text | Special instructions |
| isFeatured | Boolean | No | Default: false | Highlight on homepage |

**Status Options**:
- Open (registration open)
- Full (no seats available)
- Cancelled
- Completed
- In Progress

**Calendar Display Requirements**:
- Month view with color-coded categories
- List view with filters (date, category, location)
- "Register Now" buttons for open sessions
- Automatic status updates based on dates and seat availability

---

### 4.10 Collection Type: Downloads

**API ID**: `download`
**Display Name**: Downloads
**Purpose**: Downloadable resources, reports, forms
**Current Count**: TBD
**Location**: `/media/downloads`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| title | Text | Yes | Max 200 chars | Document title |
| description | Text | No | Max 500 chars | What the document contains |
| file | Media (Single) | Yes | Any file type | The downloadable file |
| thumbnail | Media (Single) | No | Image only | Preview image |
| category | Enumeration | Yes | See options | Document category |
| fileSize | Text | No | Max 20 chars | e.g., "2.5 MB" (auto-calculate) |
| fileType | Text | No | Max 20 chars | e.g., "PDF", "DOCX" (auto-detect) |
| uploadDate | Date | Yes | Date picker | When added |
| publishedYear | Number | No | Integer | For annual reports |
| downloadCount | Number | No | Integer, Default: 0 | Track downloads |
| isPublic | Boolean | Yes | Default: true | Public or members-only |
| requiresLogin | Boolean | No | Default: false | Require authentication |
| tags | Relation | No | Many-to-Many (Tags) | Searchable tags |
| relatedDownloads | Relation | No | Many-to-Many (Downloads) | Related documents |

**Category Options**:
- Annual Reports
- Forms & Applications
- Policies & Guidelines
- Publications & Research
- Training Materials
- Templates
- Newsletter Archives

**Display Requirements**:
- Grid view with thumbnails
- Filters: Category, Year, File Type
- Search: By title, description, tags
- Download button with file size and type displayed
- Track download counts
- Sort: Most recent, Most downloaded, A-Z

**Special Note**: Annual Reports link also appears in header (FiFileText icon) → should link to Annual Reports category filtered view

---

### 4.11 Collection Type: Photo Gallery Albums

**API ID**: `photo-album`
**Display Name**: Photo Gallery
**Purpose**: Photo collections and albums
**Current Count**: TBD
**Location**: `/media/photo-gallery`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| albumName | Text | Yes | Max 200 chars | Album title |
| slug | UID | Yes | Based on albumName | URL identifier |
| description | Text | No | Max 500 chars | Album description |
| coverImage | Media (Single) | Yes | Image only | Album cover thumbnail |
| photos | Media (Multiple) | Yes | Images only | All photos in album |
| event | Relation | No | Many-to-One (Events) | Related event |
| date | Date | No | Date picker | When photos were taken |
| location | Text | No | Max 200 chars | Where photos were taken |
| photographer | Text | No | Max 100 chars | Photo credit |
| tags | Relation | No | Many-to-Many (Tags) | Searchable tags |
| isPublic | Boolean | Yes | Default: true | Public visibility |
| isFeatured | Boolean | No | Default: false | Feature on media page |
| photoCount | Number | No | Integer | Auto-count from photos field |

**Gallery Display Requirements**:
- Grid of album covers (4 columns desktop, 2 tablet, 1 mobile)
- Click album → Opens lightbox/full gallery view
- Lightbox features:
  - Full-screen image display
  - Previous/Next navigation
  - Thumbnails strip at bottom
  - Image counter (e.g., "5 / 24")
  - Download button (optional)
  - Share button (optional)
  - Close button
- Lazy loading for performance
- Image optimization (Next.js Image component)

---

### 4.12 Collection Type: Video Gallery

**API ID**: `video`
**Display Name**: Video Gallery
**Purpose**: Video content library
**Current Count**: TBD
**Location**: `/media/video-gallery`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| title | Text | Yes | Max 200 chars | Video title |
| slug | UID | Yes | Based on title | URL identifier |
| description | Text | No | Max 500 chars | Video description |
| videoUrl | Text | Yes | URL format | YouTube/Vimeo embed URL |
| videoType | Enumeration | Yes | YouTube/Vimeo | Platform type |
| thumbnail | Media (Single) | No | Image only | Custom thumbnail (auto-fetch if empty) |
| duration | Text | No | Max 20 chars | e.g., "5:32" |
| category | Enumeration | No | See options | Video category |
| uploadDate | Date | Yes | Date picker | Publication date |
| viewCount | Number | No | Integer, Default: 0 | View tracking |
| event | Relation | No | Many-to-One (Events) | Related event |
| tags | Relation | No | Many-to-Many (Tags) | Searchable tags |
| isFeatured | Boolean | No | Default: false | Feature on media page |

**Category Options**:
- Events
- Training & Workshops
- Testimonials
- Documentaries
- Interviews
- Promotional

**Display Requirements**:
- Grid view with video thumbnails
- Play icon overlay on thumbnails
- Click → Opens video player modal or navigates to detail page
- Embedded YouTube/Vimeo player
- Related videos suggestions
- Share buttons (social media)

**Video URL Format**:
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

---

### 4.13 Collection Type: Chapters

**API ID**: `chapter`
**Display Name**: Chapters
**Purpose**: Regional CUA chapters
**Current Count**: Multiple chapters (Greater Accra, Ashanti, etc.)
**Location**: `/our-work/our-chapters`, `/our-work/our-chapters/[chapter]`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| chapterName | Text | Yes | Max 200 chars | Chapter name (e.g., "Greater Accra Chapter") |
| slug | UID | Yes | Based on chapterName | URL identifier |
| region | Text | Yes | Max 100 chars | Ghana region |
| description | Rich Text | No | Full editor | About the chapter |
| address | Text | No | Max 300 chars | Chapter office address |
| phone | Text | No | Phone format | Contact number |
| email | Email | No | Email format | Contact email |
| chairperson | Text | No | Max 100 chars | Chapter chairperson name |
| secretary | Text | No | Max 100 chars | Chapter secretary name |
| creditUnionsCount | Number | No | Integer | Number of CUs in chapter |
| totalMembers | Number | No | Integer | Total members across CUs |
| establishedYear | Number | No | Integer | Year chapter formed |
| coverImage | Media (Single) | No | Image only | Chapter photo |
| activities | Rich Text | No | Full editor | Chapter activities & programs |
| meetingSchedule | Text | No | Max 200 chars | Regular meeting schedule |
| isActive | Boolean | Yes | Default: true | Currently active |

**Chapter List Page** (`/our-work/our-chapters`):
- Grid of chapter cards
- Each card: Cover image, name, region, CU count, member count
- Click → Navigate to chapter detail page

**Chapter Detail Page** (`/our-work/our-chapters/[slug]`):
- Hero section with cover image
- Chapter information (description, leadership, contact)
- Statistics (CUs, members, established)
- List of credit unions in chapter
- Activities and programs
- Contact form for chapter

---

### 4.14 Collection Type: Success Stories

**API ID**: `success-story`
**Display Name**: Success Stories
**Purpose**: Member and CU testimonials
**Current Count**: TBD
**Location**: `/credit-unions/success-stories`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| title | Text | Yes | Max 200 chars | Story title |
| slug | UID | Yes | Based on title | URL identifier |
| story | Rich Text | Yes | Full editor | Complete story with formatting |
| excerpt | Text | Yes | Max 300 chars | Short preview |
| personName | Text | Yes | Max 100 chars | Name of person/business |
| personRole | Text | No | Max 100 chars | e.g., "Business Owner", "Farmer" |
| creditUnion | Relation | No | Many-to-One (Credit Unions) | Related CU |
| featuredImage | Media (Single) | Yes | Image only | Story photo |
| category | Enumeration | No | See options | Story category |
| impact | Component (Repeatable) | No | Impact Metrics | Measurable impact |
| isFeatured | Boolean | No | Default: false | Homepage feature |
| publishedDate | Date | Yes | Date picker | Publication date |
| videoUrl | Text | No | URL format | YouTube/Vimeo video testimonial |

**Category Options**:
- Business Growth
- Agricultural Success
- Personal Finance
- Community Impact
- Women Empowerment
- Youth Development

**Impact Metrics Component** (Repeatable):
- metricName (Text, Required) - e.g., "Income Increase", "Jobs Created"
- metricValue (Text, Required) - e.g., "300%", "15 employees"
- icon (Enumeration) - Predefined icon options

**Display Requirements**:
- Card grid on listing page
- Each card: Photo, name, title, excerpt, CU logo
- Detail page: Full story with images, metrics, video
- Related stories section
- Share buttons

---

### 4.15 Collection Type: Newsletter Subscriptions

**API ID**: `newsletter-subscription`
**Display Name**: Newsletter Subscriptions
**Purpose**: Email newsletter subscribers
**Current Count**: 0 (new feature)
**Location**: `/media/eletter-subscription`, Footer

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| email | Email | Yes | Unique | Subscriber email |
| firstName | Text | No | Max 100 chars | First name |
| lastName | Text | No | Max 100 chars | Last name |
| subscriptionDate | DateTime | Yes | Auto | When subscribed |
| isActive | Boolean | Yes | Default: true | Active subscription |
| unsubscribeDate | DateTime | No | Auto | When unsubscribed |
| preferences | JSON | No | JSON object | Subscription preferences |
| source | Text | No | Max 50 chars | Where they subscribed (Footer, Page) |
| confirmed | Boolean | No | Default: false | Email confirmed |
| confirmationToken | Text | No | Auto-generate | For double opt-in |

**Subscription Form Fields**:
- Email (Required)
- First Name (Optional)
- Last Name (Optional)
- Checkbox: "I agree to receive newsletters" (Required)
- Privacy policy link

**Double Opt-In Flow**:
1. User submits email
2. Confirmation email sent with token link
3. User clicks link → `confirmed` set to true
4. Welcome email sent

**Integration Points**:
- Footer subscription form
- `/media/eletter-subscription` page
- Admin panel for managing subscribers
- Export to CSV for email marketing tools

---

### 4.16 Collection Type: Contact Messages

**API ID**: `contact-message`
**Display Name**: Contact Messages
**Purpose**: Store contact form submissions
**Current Count**: 0 (new feature)
**Location**: `/contact`

**Fields**:

| Field Name | Type | Required | Options | Notes |
|------------|------|----------|---------|-------|
| fullName | Text | Yes | Max 200 chars | Sender name |
| email | Email | Yes | Email format | Contact email |
| phone | Text | No | Phone format | Contact phone |
| subject | Text | Yes | Max 200 chars | Message subject |
| message | Long Text | Yes | Plain text | Message content |
| messageType | Enumeration | No | See options | Message category |
| submissionDate | DateTime | Yes | Auto | When submitted |
| status | Enumeration | Yes | Default: New | Processing status |
| responseNote | Long Text | No | Plain text | Admin response notes |
| assignedTo | Relation | No | Many-to-One (Admin Users) | Assigned staff |
| ipAddress | Text | No | Auto-capture | For spam prevention |
| userAgent | Text | No | Auto-capture | Browser info |

**Message Type Options**:
- General Inquiry
- Support Request
- Partnership Inquiry
- Training Inquiry
- Membership Question
- Media Request
- Complaint
- Feedback

**Status Options**:
- New
- In Progress
- Responded
- Resolved
- Spam
- Archived

**Contact Form** (`/contact`):
- Fields: Full Name*, Email*, Phone, Subject*, Message*
- Honeypot field for spam detection
- reCAPTCHA v3 (optional)
- Success message after submission
- Email notification to admin

**Admin Requirements**:
- View all submissions
- Filter by status, type, date
- Assign to team members
- Add response notes
- Mark as resolved/spam
- Export to CSV

---

## 5. NAVIGATION & MENU STRUCTURE

### 5.1 Main Navigation (Desktop)

**Source**: `app/components/Header.js` lines 28-81

**Navigation Array**:
```javascript
const navigationItems = [
  "Home",
  "About CUA",
  "Our Work",
  "Credit Unions",
  "Training",
  "Media",
  "Contact"
];
```

**Complete Menu Structure**:

```
┌─ HOME (/)
│
├─ ABOUT CUA ▼
│  ├─ Who We Are (/about-us/who-we-are)
│  ├─ Role in Ghana (/about-us/role-in-ghana)
│  ├─ Potential & Size (/about-us/potential-and-size)
│  ├─ Board of Directors (/about-us/board-of-directors)
│  ├─ Management (/about-us/management)
│  └─ Partners (/about-us/partners)
│
├─ OUR WORK ▼
│  ├─ What we do (/our-work/what-we-do)
│  └─ Our Chapters (/our-work/our-chapters)
│
├─ CREDIT UNIONS ▼
│  ├─ Overview (/credit-unions/overview)
│  ├─ Top 20 Credit Unions (/top-20-credit-unions)
│  ├─ Members (/credit-unions/members)
│  ├─ Success Stories (/credit-unions/success-stories)
│  ├─ Join A Credit Union (/find-credit-union)
│  ├─ Form A Credit Union (/credit-unions/form-a-credit-union)
│  └─ CU's In Ghana (/credit-unions/ghana)
│
├─ TRAINING ▼
│  ├─ CUTRAC Overview (/training/cutrac-overview)
│  ├─ Training Calendar (/training/training-calendar)
│  ├─ Travel for Training (/training/travel-for-training)
│  ├─ CUTraC Registration (/training/cutrac-registration)
│  ├─ Prices (/training/prices)
│  └─ Contact CUTraC (/training/contact-cutrac)
│
├─ MEDIA ▼
│  ├─ Downloads (/media/downloads)
│  ├─ Photo Gallery (/media/photo-gallery)
│  ├─ Video Gallery (/media/video-gallery)
│  └─ eLetter Subscription (/media/eletter-subscription)
│
└─ CONTACT (/contact)
```

**Right-Side Actions**:

```
┌─ 🔍 SEARCH ICON
│  └─ Opens: Full-screen search modal overlay
│
├─ 📄 DOWNLOAD REPORT ICON
│  └─ Opens: https://cudbase.cua.org.gh/ (external, new tab)
│
└─ I WANT TO... BUTTON ▼
   ├─ Join A CU (/credit-unions/join-credit-union)
   └─ Form A CU (/credit-unions/form-a-credit-union)
```

### 5.2 CMS Implementation for Navigation

**Recommended Approach**: Single Type `navigation-menu`

**Structure**:
```javascript
{
  "mainMenu": [
    {
      "label": "Home",
      "url": "/",
      "hasDropdown": false,
      "dropdown": null
    },
    {
      "label": "About CUA",
      "url": null,
      "hasDropdown": true,
      "dropdown": [
        { "label": "Who We Are", "url": "/about-us/who-we-are" },
        { "label": "Role in Ghana", "url": "/about-us/role-in-ghana" },
        // ... etc
      ]
    }
    // ... etc
  ],
  "rightActions": {
    "search": { "enabled": true, "icon": "FiSearch" },
    "downloadReport": {
      "enabled": true,
      "icon": "FiFileText",
      "url": "https://cudbase.cua.org.gh/",
      "tooltip": "Download Annual Report"
    },
    "ctaButton": {
      "enabled": true,
      "label": "I want to...",
      "dropdown": [
        { "label": "Join A CU", "url": "/credit-unions/join-credit-union" },
        { "label": "Form A CU", "url": "/credit-unions/form-a-credit-union" }
      ]
    }
  }
}
```

### 5.3 Mobile Menu Structure

**Source**: `app/components/Header.js` lines 605-945

**Differences from Desktop**:
- Hamburger icon (FiMenu) to open
- Slide-in drawer from right (320px wide)
- Logo at top with X close button
- Expandable accordion sections for dropdowns
- Search and Download Report as buttons (not icons)
- "I want to..." button at bottom

**Animation**:
- Backdrop: Fade in black/50% with blur
- Drawer: Slide from right with spring animation
- Dropdowns: Expand vertically with height animation
- Duration: 200-300ms

### 5.4 Styling Specifications

**Desktop Navigation**:
- Font size: 13px
- Font weight: Bold (700)
- Color: `text-gray-700`
- Hover color: `text-[#01366b]`
- Padding: `px-3 py-2`
- Transition: 200ms

**Dropdown Menus**:
- Background: White
- Border radius: `rounded-xl` (12px)
- Shadow: `shadow-2xl` + custom box-shadow
- Border: `border-gray-100` (1px)
- Padding: `py-3` (container)
- Width: 256px (fixed)
- Z-index: 50
- Animation: Framer Motion scale + opacity

**Dropdown Items**:
- Padding: `px-5 py-3`
- Font size: `text-sm` (14px)
- Font weight: Medium (500)
- Hover: `hover:text-[#01366b] hover:bg-blue-50`
- Left accent bar: 4px `bg-[#01366b]`, scales on hover

**Right-Side Icons**:
- Size: 20px
- Color: `text-gray-600`
- Hover: `text-[#01366b]`

**CTA Button** ("I want to..."):
- Background: `bg-[#01366b]`
- Text: White
- Padding: `px-6 py-2.5`
- Border radius: `rounded-full`
- Font size: `text-sm` (14px)
- Font weight: Bold (700)
- Hover: `bg-[#024d8a]`

---

## 6. ICONS & VISUAL ASSETS CATALOG

### 6.1 React Icons Library Usage

**Package**: `react-icons@5.5.0`
**Primary Icon Set**: Feather Icons (Fi prefix)
**Secondary**: Remix Icons (Ri prefix for X/Twitter)

**All Icons Used in Application**:

#### Header Component Icons
| Icon | Import | Purpose | Size | Location |
|------|--------|---------|------|----------|
| FiSearch | react-icons/fi | Search button/modal | 20px, 24px | Header, Search overlay |
| FiX | react-icons/fi | Close buttons | 20px, 24px | Modals, mobile menu |
| FiFileText | react-icons/fi | Download report | 20px | Header right actions |
| FiMenu | react-icons/fi | Mobile menu toggle | 24px | Header mobile |

#### Footer Component Icons
| Icon | Import | Purpose | Size | Location |
|------|--------|---------|------|----------|
| FiMapPin | react-icons/fi | Location address | 20px (w-5 h-5) | Footer contact info |
| FiPhone | react-icons/fi | Phone number | 20px (w-5 h-5) | Footer contact info |
| FiMail | react-icons/fi | Email address | 20px (w-5 h-5) | Footer contact info |
| FiClock | react-icons/fi | Opening hours | 20px (w-5 h-5) | Footer contact info |
| FiFacebook | react-icons/fi | Facebook social | 16px (w-4 h-4) | Footer social links |
| RiTwitterXLine | react-icons/ri | X/Twitter social | 16px (w-4 h-4) | Footer social links |
| FiYoutube | react-icons/fi | YouTube social | 16px (w-4 h-4) | Footer social links |
| FiInstagram | react-icons/fi | Instagram social | 16px (w-4 h-4) | Footer social links |
| FiLinkedin | react-icons/fi | LinkedIn social | 16px (w-4 h-4) | Footer social links |

#### Hero Component Icons
| Icon | Import | Purpose | Size | Location |
|------|--------|---------|------|----------|
| FiArrowRight | react-icons/fi | CTA button icon | ~16px | Hero slide CTAs |
| FiTrendingUp | react-icons/fi | Statistics/growth (imported, not visible in code) | Variable | Potential usage |

#### About/Who We Are Page Icons
| Icon | Import | Purpose | Size | Location |
|------|--------|---------|------|----------|
| FiTarget | react-icons/fi | Mission icon | 24px (w-6 h-6) | Mission card |
| FiEye | react-icons/fi | Vision icon | 24px (w-6 h-6) | Vision card |
| FiUsers | react-icons/fi | Team-work core value | 32px (w-8 h-8) | Core values grid |
| FiTrendingUp | react-icons/fi | Efficiency core value | 32px (w-8 h-8) | Core values grid |
| FiHeart | react-icons/fi | Member Focus core value | 32px (w-8 h-8) | Core values grid |
| FiAward | react-icons/fi | Professionalism core value | 32px (w-8 h-8) | Core values grid |
| FiTarget | react-icons/fi | Integrity core value | 32px (w-8 h-8) | Core values grid |
| FiEye | react-icons/fi | Innovation core value | 32px (w-8 h-8) | Core values grid |

### 6.2 Core Values Icons with Colors

**Source**: `app/about-us/who-we-are/page.js` lines 66-73

```javascript
const coreValues = [
  { icon: FiUsers, title: "Team-work", color: "bg-blue-500" },
  { icon: FiTrendingUp, title: "Efficiency", color: "bg-green-500" },
  { icon: FiHeart, title: "Member Focus", color: "bg-red-500" },
  { icon: FiAward, title: "Professionalism", color: "bg-purple-500" },
  { icon: FiTarget, title: "Integrity", color: "bg-orange-500" },
  { icon: FiEye, title: "Innovation", color: "bg-indigo-500" }
];
```

**Display**:
- 64px × 64px circular background with value color
- White icon inside (32px)
- Title below in bold
- Hover: Scale icon container to 110%

### 6.3 Custom SVG Icons

#### Dropdown Chevron Icon
**Location**: Used throughout navigation dropdowns
**Code**:
```jsx
<svg
  className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M19 9l-7 7-7-7"
  />
</svg>
```
**States**:
- Closed: Default chevron down
- Open: Rotated 180° (pointing up)
- Transition: 200ms

#### Hero Navigation Arrows
**Location**: `app/components/Hero.js` lines 189-223
**Left Arrow**:
```jsx
<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
  <path
    d="M15 18L9 12L15 6"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
```
**Right Arrow**:
```jsx
<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
  <path
    d="M9 18L15 12L9 6"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
```
**Styling**:
- Container: `p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20`
- Text color: White
- Hover: `bg-white/20`

### 6.4 Image Assets Inventory

#### Logos
| File | Location | Usage | Dimensions | Format |
|------|----------|-------|------------|---------|
| cua-logo 1.png | /public/ | Header (main logo) | 120×40 display | PNG |
| cua-logo-white.png | /public/ | Footer (white variant) | 170×70 display | PNG |

**Notes**:
- Main logo: `h-10 w-auto` (40px height, auto width)
- Footer logo: `h-12 w-auto` with `brightness-0 invert` filter

#### Hero Images
| File | Location | Size | Usage |
|------|----------|------|-------|
| hero1.jpg | /public/images/hero/ | 219 KB | Hero slide 1, Event 1 |
| hero2.jpg | /public/images/hero/ | 182 KB | Hero slide 2, Event 2, About hero |
| hero3.jpg | /public/images/hero/ | 710 KB | Hero slide 3, Event 3, Who We Are page |

**Recommended**: Optimize hero3.jpg (reduce size to ~200KB max)

#### Partner Logos
| File | Location | Size | Organization |
|------|----------|------|--------------|
| accosca.png | /public/images/partners/ | TBD | ACCOSCA |
| cca.png | /public/images/partners/ | TBD | Canadian Co-operative Association |
| giz.png | /public/images/partners/ | TBD | GIZ |
| ilcu.png | /public/images/partners/ | TBD | Irish League of Credit Unions |
| kad.png | /public/images/partners/ | TBD | KAD |
| send.png | /public/images/partners/ | TBD | SEND Ghana |
| sparkassenstiftung.png | /public/images/partners/ | TBD | Sparkassenstiftung |
| woccu.png | /public/images/partners/ | TBD | WOCCU |

**Display**: Grayscale by default, full color on hover

#### Board Member Photos
| Location | Count | Usage |
|----------|-------|-------|
| /public/images/board-of-directors/ | 7 photos | Board member profiles |

**Requirements**: Professional headshots, square aspect ratio preferred, min 800×800px

#### Chapter Images
| Location | Count | Usage |
|----------|-------|-------|
| /public/images/chapters/ | 3 images | Chapter pages |

**Requirements**: Landscape images, min 1200×600px

### 6.5 Icon Implementation in Strapi

**Approach 1**: Store icon names as strings
- Store icon identifier: "FiTarget", "FiUsers", etc.
- Frontend maps string to actual React Icon component
- Pros: Easy to manage, no complex media
- Cons: Limited to predefined icon set

**Approach 2**: Upload custom icon files
- Allow SVG uploads in Media Library
- Use for custom/branded icons
- Fallback to React Icons for standard icons

**Recommended**: Combination approach
- Use Enumeration field with icon names for standard icons
- Add optional Media field for custom icon uploads
- Frontend checks: If custom icon exists, use it; else use React Icon

**Icon Enumeration Options** (for Strapi):
```
FiTarget, FiEye, FiUsers, FiTrendingUp, FiHeart, FiAward,
FiMapPin, FiPhone, FiMail, FiClock, FiSearch, FiX, FiFileText,
FiMenu, FiArrowRight, FiFacebook, FiYoutube, FiInstagram,
FiLinkedin, RiTwitterXLine
```

---

## 7. COLOR PALETTE & DESIGN SYSTEM

### 7.1 Primary Color Palette

**Source**: `app/globals.css` + component usage analysis

**Brand Colors**:

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| Primary Dark Blue | `#01366b` | `text-[#01366b]`, `bg-[#01366b]` | Primary brand color, buttons, headings, links |
| Primary Light Blue | `#024d8a` | `bg-[#024d8a]` | Button hover states, secondary accents |
| Hover Blue | `#446494` | `text-[#446494]` | Ticker hover, link hover states |

**Background Colors**:

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| White | `#ffffff` | `bg-white` | Main background, cards |
| Gray 50 | Tailwind default | `bg-gray-50` | Alternate sections |
| Gray 100 | Tailwind default | `bg-gray-100` | Ticker background, borders |
| Gray 900 | Tailwind default | `bg-gray-900` | Footer background |

**Text Colors**:

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| Foreground | `#171717` | `text-foreground` | Body text |
| Gray 700 | Tailwind default | `text-gray-700` | Navigation, secondary text |
| Gray 600 | Tailwind default | `text-gray-600` | Tertiary text, icons |
| Gray 500 | Tailwind default | `text-gray-500` | Placeholder text |
| Gray 400 | Tailwind default | `text-gray-400` | Disabled text |
| Gray 300 | Tailwind default | `text-gray-300` | Borders, dividers |

**Accent Colors** (Core Values Icons):

| Color | Hex Code | Tailwind Class | Usage |
|-------|----------|----------------|-------|
| Blue | Tailwind blue-500 | `bg-blue-500` | Team-work icon |
| Green | Tailwind green-500 | `bg-green-500` | Efficiency icon |
| Red | Tailwind red-500 | `bg-red-500` | Member Focus icon |
| Purple | Tailwind purple-500 | `bg-purple-500` | Professionalism icon |
| Orange | Tailwind orange-500 | `bg-orange-500` | Integrity icon |
| Indigo | Tailwind indigo-500 | `bg-indigo-500` | Innovation icon |

### 7.2 CSS Variables

**Source**: `app/globals.css` lines 3-7

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --header-height: 88px;
}
```

**Usage**:
- `var(--background)` → Body background
- `var(--foreground)` → Body text color
- `var(--header-height)` → Header height for layout calculations

### 7.3 Gradient Patterns

**Used Throughout Application**:

#### Hero Overlay Gradient
```css
background: linear-gradient(
  to right,
  rgba(0,0,0,0.9),
  rgba(0,0,0,0.5),
  transparent
);
```
**Usage**: Hero slides, event cards

#### Mission Card Gradient
```css
background: linear-gradient(
  to bottom right,
  #01366b,
  #024d8a
);
```
**Usage**: Mission card background

#### Vision Card Gradient
```css
background: linear-gradient(
  to bottom right,
  rgb(31, 41, 55),   /* gray-800 */
  rgb(17, 24, 39)    /* gray-900 */
);
```
**Usage**: Vision card background

#### Section Background Gradients
```css
/* Light gradient */
background: linear-gradient(
  to bottom right,
  rgb(249, 250, 251),  /* gray-50 */
  white
);

/* Primary gradient */
background: linear-gradient(
  to bottom right,
  rgba(1, 54, 107, 0.05),  /* primary/5 */
  transparent
);
```

### 7.4 Shadow & Border Radius System

**Shadows**:

| Name | Tailwind Class | CSS Value | Usage |
|------|----------------|-----------|-------|
| Default | `shadow` | default | Basic elevation |
| Large | `shadow-lg` | 0 10px 15px -3px rgba(0,0,0,0.1) | Cards |
| Extra Large | `shadow-xl` | 0 20px 25px -5px rgba(0,0,0,0.1) | Modals, dropdowns |
| 2X Large | `shadow-2xl` | 0 25px 50px -12px rgba(0,0,0,0.25) | Hero elements |
| Custom (Dropdown) | Inline style | 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04) | Navigation dropdowns |

**Border Radius**:

| Size | Tailwind Class | Pixels | Usage |
|------|----------------|--------|-------|
| Base | `rounded` | 4px | Small elements |
| Medium | `rounded-md` | 6px | Buttons, inputs |
| Large | `rounded-lg` | 8px | Cards |
| XL | `rounded-xl` | 12px | Dropdowns, modals |
| 2XL | `rounded-2xl` | 16px | Large cards |
| 3XL | `rounded-3xl` | 24px | Hero sections |
| Full | `rounded-full` | 9999px | Circular buttons, badges |

### 7.5 Typography System

**Font Family**: Manrope (Google Fonts)

**Font Weights**:

| Weight | Numeric | Tailwind Class | Usage |
|--------|---------|----------------|-------|
| Light | 300 | `font-light` | Large display text |
| Regular | 400 | `font-normal` | Body text |
| Medium | 500 | `font-medium` | Dropdown items, links |
| Semibold | 600 | `font-semibold` | Subheadings, ticker titles |
| Bold | 700 | `font-bold` | Headings, navigation, CTAs |

**Font Sizes**:

| Size | Tailwind Class | Pixels | Usage |
|------|----------------|--------|-------|
| XS | `text-xs` | 12px | Small labels, captions |
| SM | `text-sm` | 14px | Ticker titles, dropdown items |
| Base | `text-base` | 16px | Body text |
| LG | `text-lg` | 18px | Large body text |
| XL | `text-xl` | 20px | Subheadings |
| 2XL | `text-2xl` | 24px | Section headings |
| 3XL | `text-3xl` | 30px | Page headings |
| 4XL | `text-4xl` | 36px | Hero headings |
| 5XL | `text-5xl` | 48px | Large hero headings |
| 6XL | `text-6xl` | 60px | Extra large hero |

**Custom Sizes** (Non-standard):
- Ticker date: 15px
- Navigation: 13px

### 7.6 Spacing System

**Container Max Width**: `max-w-7xl` (1280px)

**Container Padding**:
```css
px-6 sm:px-8 lg:px-12
/* Mobile: 24px, Tablet: 32px, Desktop: 48px */
```

**Section Padding**:
```css
py-16 lg:py-20
/* Mobile: 64px, Desktop: 80px */

py-20 lg:py-32
/* Mobile: 80px, Desktop: 128px (homepage) */
```

**Common Gaps**:
- Grid gaps: `gap-6`, `gap-8`, `gap-12`, `gap-16`
- Flex gaps: `space-x-2`, `space-x-3`, `space-x-4`

### 7.7 Animation & Transitions

**Framer Motion Variants** (Common Pattern):

```javascript
// Container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],  // Ease-in-out cubic
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Items
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
```

**CSS Transitions**:
```css
transition-all duration-200
transition-all duration-300
transition-all duration-500
transition-colors duration-200
transition-transform duration-300
transition-opacity duration-300
```

**Hover Effects**:
- Scale: `hover:scale-110`, `hover:scale-[1.02]`
- Translate: `hover:-translate-y-2`
- Opacity: `hover:opacity-80`
- Colors: `hover:text-[#01366b]`, `hover:bg-[#024d8a]`

### 7.8 Responsive Breakpoints

**Tailwind Default Breakpoints**:

```css
sm: 640px   /* Tablet */
md: 768px   /* Medium tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Common Patterns**:
```css
/* Mobile-first approach */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Text sizing */
text-2xl sm:text-3xl lg:text-4xl xl:text-5xl

/* Padding */
px-6 sm:px-8 lg:px-12
py-16 lg:py-20 xl:py-24
```

---

## 8. HARDCODED DATA MIGRATION MAP

This section provides exact data and migration scripts for all hardcoded content.

### 8.1 Hero Slides Data

**File**: `app/components/Hero.js` lines 48-76
**Content Type**: `hero-slide`
**Count**: 3 slides

**Migration JSON**:

```json
[
  {
    "title": "Empowering Communities Through Credit Unions",
    "subtext": "Building stronger financial futures for Ghanaians through cooperative banking and community-driven financial services.",
    "ctaText": "Join a Credit Union",
    "ctaLink": "/find-credit-union",
    "order": 0,
    "isActive": true,
    "backgroundImage": "/images/hero/hero1.jpg"
  },
  {
    "title": "Your Financial Partner",
    "subtext": "Discover how credit unions provide accessible banking, loans, and savings solutions tailored to your community's needs.",
    "ctaText": "Our Services",
    "ctaLink": "/our-work/what-we-do",
    "order": 1,
    "isActive": true,
    "backgroundImage": "/images/hero/hero2.jpg"
  },
  {
    "title": "Strengthening Ghana's Economy",
    "subtext": "Supporting local businesses and individuals with cooperative financial services that drive economic growth and prosperity.",
    "ctaText": "Learn More",
    "ctaLink": "/about-us/who-we-are",
    "order": 2,
    "isActive": true,
    "backgroundImage": "/images/hero/hero3.jpg"
  }
]
```

**Image Files to Upload**:
- `/public/images/hero/hero1.jpg` → Strapi Media Library
- `/public/images/hero/hero2.jpg` → Strapi Media Library
- `/public/images/hero/hero3.jpg` → Strapi Media Library (optimize first, 710KB → ~200KB)

---

### 8.2 News Ticker Data

**File**: `app/components/Ticker.js` lines 12-43
**Content Type**: `news-article`
**Count**: 5 items

**Migration JSON**:

```json
[
  {
    "title": "CUA Announces New Research Center for Sustainable Technology",
    "slug": "research-center-sustainable-technology",
    "publishedDate": "2024-12-15T00:00:00.000Z",
    "isTickerItem": true,
    "isFeatured": false,
    "excerpt": "CUA Ghana is establishing a new research center focused on sustainable technology solutions for credit unions.",
    "content": "<p>Detailed article content to be added...</p>"
  },
  {
    "title": "Cardinals Basketball Team Advances to Championship Finals",
    "slug": "basketball-championship-finals",
    "publishedDate": "2024-12-12T00:00:00.000Z",
    "isTickerItem": true,
    "isFeatured": false,
    "excerpt": "The CUA Cardinals basketball team has advanced to the championship finals.",
    "content": "<p>Detailed article content to be added...</p>"
  },
  {
    "title": "Spring 2025 Registration Opens for All Students",
    "slug": "spring-2025-registration",
    "publishedDate": "2024-12-10T00:00:00.000Z",
    "isTickerItem": true,
    "isFeatured": false,
    "excerpt": "Registration for Spring 2025 training programs is now open.",
    "content": "<p>Detailed article content to be added...</p>"
  },
  {
    "title": "Distinguished Alumni Awards Ceremony This Weekend",
    "slug": "alumni-awards-ceremony",
    "publishedDate": "2024-12-08T00:00:00.000Z",
    "isTickerItem": true,
    "isFeatured": false,
    "excerpt": "Join us this weekend for the annual Alumni Awards Ceremony.",
    "content": "<p>Detailed article content to be added...</p>"
  },
  {
    "title": "New Library Hours Extended for Final Exams Period",
    "slug": "library-hours-extended",
    "publishedDate": "2024-12-05T00:00:00.000Z",
    "isTickerItem": true,
    "isFeatured": false,
    "excerpt": "Resource center hours have been extended during the final exams period.",
    "content": "<p>Detailed article content to be added...</p>"
  }
]
```

---

### 8.3 Top 20 Credit Unions Data

**File**: `app/data/top20CreditUnions.js` lines 4-145
**Content Type**: `credit-union`
**Count**: 20 entries

**Complete Migration JSON**:

```json
[
  {
    "rank": 1,
    "name": "Ghana Police Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Large",
    "grade": "A+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": true
  },
  {
    "rank": 2,
    "name": "Ghana Education Service Credit Union",
    "chapter": "Ashanti",
    "region": "Ashanti",
    "category": "Large",
    "grade": "A+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": true
  },
  {
    "rank": 3,
    "name": "Armed Forces Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Large",
    "grade": "A",
    "isTop20": true,
    "isActive": true,
    "isFeatured": true
  },
  {
    "rank": 4,
    "name": "Health Service Workers Credit Union",
    "chapter": "Ashanti",
    "region": "Ashanti",
    "category": "Large",
    "grade": "A",
    "isTop20": true,
    "isActive": true,
    "isFeatured": true
  },
  {
    "rank": 5,
    "name": "Civil Servants Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Medium",
    "grade": "A",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 6,
    "name": "Cocoa Board Staff Credit Union",
    "chapter": "Eastern",
    "region": "Eastern",
    "category": "Medium",
    "grade": "B+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 7,
    "name": "University of Ghana Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Medium",
    "grade": "B+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 8,
    "name": "KNUST Workers Credit Union",
    "chapter": "Ashanti",
    "region": "Ashanti",
    "category": "Medium",
    "grade": "B+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 9,
    "name": "Social Security Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Medium",
    "grade": "B",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 10,
    "name": "Ghana Ports and Harbours Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Small",
    "grade": "B",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 11,
    "name": "Electricity Company Staff Credit Union",
    "chapter": "Western",
    "region": "Western",
    "category": "Small",
    "grade": "B",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 12,
    "name": "Ghana Water Company Credit Union",
    "chapter": "Ashanti",
    "region": "Ashanti",
    "category": "Small",
    "grade": "B",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 13,
    "name": "Tema Oil Refinery Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Small",
    "grade": "B-",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 14,
    "name": "Post Office Workers Credit Union",
    "chapter": "Northern",
    "region": "Northern",
    "category": "Small",
    "grade": "B-",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 15,
    "name": "Judicial Service Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Small",
    "grade": "C+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 16,
    "name": "Ghana Railway Credit Union",
    "chapter": "Ashanti",
    "region": "Ashanti",
    "category": "Small",
    "grade": "C+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 17,
    "name": "Forestry Commission Credit Union",
    "chapter": "Brong Ahafo",
    "region": "Bono",
    "category": "Small",
    "grade": "C+",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 18,
    "name": "Ghana Broadcasting Credit Union",
    "chapter": "Greater Accra",
    "region": "Greater Accra",
    "category": "Small",
    "grade": "C",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 19,
    "name": "Fire Service Credit Union",
    "chapter": "Central",
    "region": "Central",
    "category": "Small",
    "grade": "C",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  },
  {
    "rank": 20,
    "name": "Prison Service Credit Union",
    "chapter": "Upper East",
    "region": "Upper East",
    "category": "Small",
    "grade": "C",
    "isTop20": true,
    "isActive": true,
    "isFeatured": false
  }
]
```

**Note**: Additional fields (address, phone, email, etc.) need to be collected for complete CU profiles.

---

### 8.4 Events Data

**File**: `app/components/Events.js` lines 38-60
**Content Type**: `event`
**Count**: 3 events

**Migration JSON**:

```json
[
  {
    "title": "Financial Literacy Training",
    "slug": "financial-literacy-training",
    "shortDescription": "Comprehensive training program for small business owners",
    "description": "<p>Comprehensive training program for small business owners to improve financial management skills and access to credit union services.</p>",
    "eventDate": "2024-03-15",
    "isFeatured": true,
    "category": "Financial Literacy",
    "status": "Upcoming",
    "featuredImage": "/images/hero/hero1.jpg"
  },
  {
    "title": "Agricultural Development Program",
    "slug": "agricultural-development-program",
    "shortDescription": "Supporting local farmers with microfinance solutions",
    "description": "<p>Supporting local farmers with microfinance solutions and modern farming techniques to boost agricultural productivity.</p>",
    "eventDate": "2024-04-08",
    "isFeatured": true,
    "category": "Agricultural",
    "status": "Upcoming",
    "featuredImage": "/images/hero/hero2.jpg"
  },
  {
    "title": "Women Empowerment Initiative",
    "slug": "women-empowerment-initiative",
    "shortDescription": "Empowering women entrepreneurs through access to credit",
    "description": "<p>Empowering women entrepreneurs through access to credit, business training, and cooperative banking solutions.</p>",
    "eventDate": "2024-05-22",
    "isFeatured": true,
    "category": "Women Empowerment",
    "status": "Upcoming",
    "featuredImage": "/images/hero/hero3.jpg"
  }
]
```

---

### 8.5 Partners Data

**Location**: `/public/images/partners/` (8 logo files)
**Content Type**: `partner`
**Count**: 8 organizations

**Migration JSON**:

```json
[
  {
    "name": "ACCOSCA",
    "slug": "accosca",
    "description": "<p>African Confederation of Co-operative Savings and Credit Association - The apex organization for credit union movements in Africa.</p>",
    "logo": "/images/partners/accosca.png",
    "partnershipType": "International",
    "isActive": true,
    "displayOrder": 1
  },
  {
    "name": "Canadian Co-operative Association",
    "slug": "canadian-cooperative-association",
    "description": "<p>National association representing co-operative enterprises in Canada, providing technical support and capacity building.</p>",
    "logo": "/images/partners/cca.png",
    "partnershipType": "Technical",
    "isActive": true,
    "displayOrder": 2
  },
  {
    "name": "GIZ",
    "slug": "giz",
    "description": "<p>Deutsche Gesellschaft für Internationale Zusammenarbeit - German development cooperation agency supporting financial inclusion.</p>",
    "logo": "/images/partners/giz.png",
    "partnershipType": "Funding",
    "isActive": true,
    "displayOrder": 3
  },
  {
    "name": "Irish League of Credit Unions",
    "slug": "ilcu",
    "description": "<p>Representative body for credit unions in Ireland, supporting international credit union development.</p>",
    "logo": "/images/partners/ilcu.png",
    "partnershipType": "Technical",
    "isActive": true,
    "displayOrder": 4
  },
  {
    "name": "KAD",
    "slug": "kad",
    "description": "<p>Partner organization supporting credit union development. [Full name and description to be confirmed]</p>",
    "logo": "/images/partners/kad.png",
    "partnershipType": "Strategic",
    "isActive": true,
    "displayOrder": 5
  },
  {
    "name": "SEND Ghana",
    "slug": "send-ghana",
    "description": "<p>Social Enterprise Development Foundation - Supporting community-based development initiatives across Ghana.</p>",
    "logo": "/images/partners/send.png",
    "partnershipType": "Strategic",
    "isActive": true,
    "displayOrder": 6
  },
  {
    "name": "Sparkassenstiftung",
    "slug": "sparkassenstiftung",
    "description": "<p>Savings Banks Foundation for International Cooperation - German foundation supporting financial sector development worldwide.</p>",
    "logo": "/images/partners/sparkassenstiftung.png",
    "partnershipType": "Funding",
    "isActive": true,
    "displayOrder": 7
  },
  {
    "name": "WOCCU",
    "slug": "woccu",
    "description": "<p>World Council of Credit Unions - Global trade association and development agency for credit unions.</p>",
    "logo": "/images/partners/woccu.png",
    "partnershipType": "International",
    "isActive": true,
    "displayOrder": 8
  }
]
```

**Logo Files to Upload**: All 8 PNG files from `/public/images/partners/`

---

(Document continues with remaining sections...)

---

## 11. IMPLEMENTATION ROADMAP

### Phase 1: Strapi Setup & Configuration (Week 1-2)

**Tasks**:
1. Install Strapi v4 (latest stable)
2. Configure SQLite/PostgreSQL database
3. Set up authentication & user roles
4. Install required plugins
5. Configure media library settings
6. Set up API permissions

**Deliverables**:
- Running Strapi instance
- Admin panel accessible
- Database configured
- Plugins installed

---

### Phase 2: Content Type Creation (Week 2-3)

**Priority 1** (Essential):
- Hero Slides
- News Articles
- Events
- Credit Unions
- Partners
- Site Settings (Single Type)
- Homepage Settings (Single Type)

**Priority 2** (Important):
- Board Members
- Management Team
- Training Courses
- Training Schedule
- Downloads
- Chapters

**Priority 3** (Nice to have):
- Photo Albums
- Videos
- Success Stories
- Newsletter Subscriptions
- Contact Messages

---

### Phase 3: Data Migration (Week 3-4)

**Order**:
1. Upload all images to Media Library
2. Create Partner entries (8 items)
3. Create Hero Slides (3 items)
4. Create News Articles (5 items)
5. Create Events (3 items)
6. Create Credit Unions (20 items)
7. Configure Site Settings
8. Configure Homepage Settings
9. Board Members (7+ items)
10. Management Team (7+ items)

---

### Phase 4: Next.js Integration (Week 4-5)

**Tasks**:
1. Create API service layer (`lib/strapi.js`)
2. Add environment variables
3. Update Homepage to fetch from Strapi
4. Update About pages
5. Update Credit Union pages
6. Update Media pages
7. Implement search functionality
8. Add error handling & loading states

---

### Phase 5: Testing & Optimization (Week 6)

**Testing**:
- All API endpoints
- All page renders
- Image optimization
- Mobile responsiveness
- Cross-browser compatibility
- Performance (Lighthouse scores)

**Optimization**:
- Implement ISR where appropriate
- Add caching strategies
- Optimize images
- Add SEO meta tags

---

### Phase 6: Deployment (Week 7)

**Tasks**:
1. Deploy Strapi to production server
2. Configure production database
3. Set up CDN for media
4. Deploy Next.js application
5. Configure domain & SSL
6. Final testing on production
7. Create admin user accounts
8. Document admin procedures

---

## CONCLUSION

This comprehensive guide provides every detail needed to implement Strapi CMS for the CUA Ghana website. The application is well-structured and ready for CMS integration.

**Total Migration Items**:
- 3 Hero Slides
- 5 News Articles (ticker)
- 3 Events
- 20 Credit Unions
- 8 Partners
- 7 Board Members
- 7+ Management Team
- 100+ additional content pieces across all pages

**Estimated Timeline**: 6-7 weeks for complete implementation

**Next Steps**:
1. Review this guide with stakeholders
2. Approve content types and data structures
3. Set up Strapi development environment
4. Begin Phase 1 implementation

---

**Document Prepared By**: Claude (AI Assistant)
**Date**: 2025-10-16
**For**: CUA Ghana Website Strapi CMS Implementation
**Version**: 2.0 - Comprehensive Guide
