# Page and Collection Type Relationships

This document maps the relationships between Single Type pages (page configurations) and Collection Types (data collections) in the CUA Ghana CMS.

## Table of Contents

1. [Overview](#overview)
2. [Homepage](#homepage)
3. [About Section](#about-section)
4. [Our Work Section](#our-work-section)
5. [Credit Unions Section](#credit-unions-section)
6. [Training Section](#training-section)
7. [Media Section](#media-section)
8. [Contact Section](#contact-section)
9. [Quick Reference Table](#quick-reference-table)

---

## Overview

### Single Types vs Collection Types

**Single Types (Pages)** are configuration pages that define:
- Page structure and layout
- Static content (hero sections, descriptions, etc.)
- SEO metadata
- Which collection types to display

**Collection Types (Data)** are repeatable content entries like:
- News articles
- Events
- Credit unions
- Training courses
- etc.

### How They Work Together

Pages (Single Types) configure **how** to display data from Collections (Collection Types). The frontend application:
1. Fetches the page configuration from Single Type API
2. Uses configuration to determine which collections to fetch
3. Fetches required collection data
4. Renders the page using both configuration and collection data

---

## Homepage

### API: `/api/homepage-setting`

**Type:** Single Type

**Collection Types Used:**
- `hero-slides` - Homepage carousel/slider images
- `news-articles` - Latest news (optional, if featured on homepage)
- `events` - Upcoming events (optional, if featured on homepage)

**Relationship Structure:**

```typescript
GET /api/homepage-setting?populate=deep

{
  heroSection: {
    // Uses hero-slides collection
    slides: relation -> hero-slides
  },
  aboutSection: {
    // Static content only
    title: string,
    description: string,
    image: media
  },
  statisticsSection: {
    // Static content only
    stats: [{ value, label }]
  },
  servicesSection: {
    // Static content only
    services: [{ title, description, icon }]
  },
  newsSection: {
    heading: string,
    // Frontend fetches news-articles separately
    // GET /api/news-articles?pagination[limit]=3&sort=publishedDate:desc
  },
  eventsSection: {
    heading: string,
    // Frontend fetches events separately
    // GET /api/events?pagination[limit]=3&sort=startDate:asc
  }
}
```

**Required API Calls:**

```typescript
// 1. Get homepage configuration
const homepage = await fetch('/api/homepage-setting?populate=deep');

// 2. Get hero slides
const heroSlides = await fetch('/api/hero-slides?populate=image&sort=order:asc');

// 3. Get latest news (if showing on homepage)
const news = await fetch('/api/news-articles?pagination[limit]=3&sort=publishedDate:desc&populate=featuredImage,author');

// 4. Get upcoming events (if showing on homepage)
const events = await fetch('/api/events?pagination[limit]=3&sort=startDate:asc&populate=featuredImage');
```

---

## About Section

### 1. Who We Are Page

**API:** `/api/who-we-are-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - all content is configured in the page itself

**Structure:**

```typescript
{
  heroSection: { title, subtitle, backgroundImage },
  introSection: { heading, description, videoUrl },
  historySection: {
    heading,
    content,
    timeline: [{ year, title, description }] // Static in page
  },
  missionSection: { mission, vision, values: [] },
  seo: { ... }
}
```

---

### 2. Management Page

**API:** `/api/management-page`

**Type:** Single Type

**Collection Types Used:**
- `management-team` - Management team members

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  teamSection: {
    heading: string,
    // Frontend fetches management-team collection
    // GET /api/management-teams?populate=photo&sort=order:asc
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/management-page?populate=deep');

// 2. Get management team members
const team = await fetch('/api/management-teams?populate=photo&sort=order:asc');
```

---

### 3. Board of Directors Page

**API:** `/api/board-of-directors-page`

**Type:** Single Type

**Collection Types Used:**
- `board-members` - Board of directors members

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  boardSection: {
    heading: string,
    // Frontend fetches board-members collection
    // GET /api/board-members?populate=photo&sort=order:asc
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/board-of-directors-page?populate=deep');

// 2. Get board members
const board = await fetch('/api/board-members?populate=photo&sort=order:asc');
```

---

### 4. Role in Ghana Page

**API:** `/api/role-in-ghana-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - all content is configured in the page itself

---

### 5. Potential and Size Page

**API:** `/api/potential-and-size-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - uses statistics component for data visualization

---

### 6. Partners Page

**API:** `/api/partners-page`

**Type:** Single Type

**Collection Types Used:**
- `partners` - Partner organizations and logos

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  partnersSection: {
    heading: string,
    description: string,
    // Frontend fetches partners collection
    // GET /api/partners?populate=logo&filters[isActive]=true&sort=order:asc
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/partners-page?populate=deep');

// 2. Get partners
const partners = await fetch('/api/partners?populate=logo&filters[isActive]=true&sort=order:asc');
```

---

## Our Work Section

### 1. What We Do Page

**API:** `/api/what-we-do-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - services are configured in the page itself

---

### 2. Our Chapters Page

**API:** `/api/our-chapters-page`

**Type:** Single Type

**Collection Types Used:**
- `chapters` - Regional chapters

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  chaptersSection: {
    heading: string,
    description: string,
    // Frontend fetches chapters collection
    // GET /api/chapters?populate=logo,leadership&filters[isActive]=true
  },
  mapSection: {
    // Display chapters on map using chapters collection data
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/our-chapters-page?populate=deep');

// 2. Get chapters
const chapters = await fetch('/api/chapters?populate=logo,leadership&filters[isActive]=true');
```

---

## Credit Unions Section

### 1. Credit Unions Overview Page

**API:** `/api/credit-unions-overview-page`

**Type:** Single Type

**Collection Types Used:**
- `credit-unions` - Credit union listings (for statistics)

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  statsSection: {
    // Can use credit-unions collection for dynamic stats
    // GET /api/credit-unions?pagination[limit]=0 (to get total count)
  },
  servicesSection: { ... },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/credit-unions-overview-page?populate=deep');

// 2. Get credit unions count (optional for dynamic stats)
const stats = await fetch('/api/credit-unions?pagination[limit]=0');
const totalCreditUnions = stats.meta.pagination.total;
```

---

### 2. Credit Unions in Ghana Page

**API:** `/api/credit-unions-in-ghana-page`

**Type:** Single Type

**Collection Types Used:**
- `credit-unions` - Credit union directory

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  filterSection: {
    // Configuration for filtering UI
    filterOptions: {
      regions: [],
      categories: []
    }
  },
  directorySection: {
    heading: string,
    description: string,
    // Frontend fetches credit-unions collection
    // GET /api/credit-unions?populate=logo&filters[region]=Northern&filters[isActive]=true
  },
  mapSection: {
    // Display credit unions on map
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/credit-unions-in-ghana-page?populate=deep');

// 2. Get credit unions (with filters)
const creditUnions = await fetch('/api/credit-unions?populate=logo,contact&filters[isActive]=true&sort=name:asc');

// 3. Filter by region (example)
const northern = await fetch('/api/credit-unions?filters[region]=Northern&populate=logo');
```

---

### 3. Join a Credit Union Page

**API:** `/api/credit-unions-join-page`

**Type:** Single Type

**Collection Types Used:**
- `credit-unions` - For finding nearby credit unions

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  benefitsSection: { ... },
  eligibilitySection: { ... },
  processSection: { ... },
  findCreditUnionSection: {
    heading: string,
    // Frontend uses credit-unions collection to find nearby
    // GET /api/credit-unions?filters[region]=${userRegion}&populate=contact
  },
  seo: { ... }
}
```

---

### 4. Credit Union Form Page

**API:** `/api/credit-unions-form-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - form submits to external endpoint or custom handler

---

### 5. Credit Union Members Page

**API:** `/api/credit-unions-members-page`

**Type:** Single Type

**Collection Types Used:**
- `testimonial-members` - Member testimonials

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  benefitsSection: { ... },
  testimonialsSection: {
    heading: string,
    // Frontend fetches testimonial-members collection
    // GET /api/testimonial-members?populate=photo&filters[isPublished]=true
  },
  servicesSection: { ... },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/credit-unions-members-page?populate=deep');

// 2. Get member testimonials
const testimonials = await fetch('/api/testimonial-members?populate=photo&filters[isPublished]=true');
```

---

### 6. Success Stories Page

**API:** `/api/credit-unions-success-stories-page`

**Type:** Single Type

**Collection Types Used:**
- `success-stories` - Success story articles

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  storiesSection: {
    heading: string,
    // Frontend fetches success-stories collection
    // GET /api/success-stories?populate=featuredImage,creditUnion&sort=publishedDate:desc
  },
  categoriesSection: {
    // Filter by story categories
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/credit-unions-success-stories-page?populate=deep');

// 2. Get success stories
const stories = await fetch('/api/success-stories?populate=featuredImage,creditUnion&sort=publishedDate:desc');

// 3. Filter by category (example)
const growthStories = await fetch('/api/success-stories?filters[category]=Growth&populate=featuredImage');
```

---

## Training Section

### 1. CUTRAC Overview Page

**API:** `/api/cutrac-overview-page`

**Type:** Single Type

**Collection Types Used:**
- `training-courses` - Available courses (optional, for overview)

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  programsSection: {
    heading: string,
    // Can reference training-courses for dynamic display
    // GET /api/training-courses?pagination[limit]=6&populate=thumbnail
  },
  facilitiesSection: { ... },
  statsSection: { ... },
  seo: { ... }
}
```

---

### 2. Training Calendar Page

**API:** `/api/training-calendar-page`

**Type:** Single Type

**Collection Types Used:**
- `training-schedules` - Scheduled training sessions
- `training-courses` - Course details

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  calendarSection: {
    heading: string,
    // Frontend fetches training-schedules collection
    // GET /api/training-schedules?populate=course,instructor&filters[startDate][$gte]=today
  },
  filterOptions: {
    // Filter by month, course type, etc.
  },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/training-calendar-page?populate=deep');

// 2. Get upcoming training schedules
const schedules = await fetch('/api/training-schedules?populate=course,instructor&filters[startDate][$gte]=${today}&sort=startDate:asc');

// 3. Get all training courses (for filter options)
const courses = await fetch('/api/training-courses?fields=title,code,category');
```

---

### 3. Training Prices Page

**API:** `/api/training-prices-page`

**Type:** Single Type

**Collection Types Used:**
- `training-courses` - Course prices

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  pricingSection: {
    heading: string,
    // Frontend fetches training-courses for pricing
    // GET /api/training-courses?populate=thumbnail&sort=category:asc
  },
  discountsSection: { ... },
  paymentSection: { ... },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/training-prices-page?populate=deep');

// 2. Get courses with pricing
const courses = await fetch('/api/training-courses?populate=thumbnail&sort=category:asc');
```

---

### 4. Training Registration Page

**API:** `/api/training-registration-page`

**Type:** Single Type

**Collection Types Used:**
- `training-schedules` - Available sessions for registration
- `training-courses` - Course selection

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  registrationFormSection: {
    // Form configuration
    fields: [],
    // User selects from available schedules
    // GET /api/training-schedules?filters[registrationOpen]=true&populate=course
  },
  requirementsSection: { ... },
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/training-registration-page?populate=deep');

// 2. Get available training schedules
const availableSchedules = await fetch('/api/training-schedules?filters[registrationOpen]=true&populate=course,instructor');

// 3. Get course details (for course selection)
const courses = await fetch('/api/training-courses?filters[isActive]=true');
```

---

### 5. Contact CUTRAC Page

**API:** `/api/contact-cutrac-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - contact form only

---

### 6. Travel for Training Page

**API:** `/api/travel-for-training-page`

**Type:** Single Type

**Collection Types Used:**
- None directly - travel information only

---

## Media Section

### 1. Downloads Page

**API:** `/api/downloads-page`

**Type:** Single Type

**Collection Types Used:**
- `downloads` - Downloadable files

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  helpSection: string,
  // Frontend fetches downloads collection
  // GET /api/downloads?populate=file&filters[isPublic]=true&sort=createdAt:desc
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/downloads-page?populate=deep');

// 2. Get downloads
const downloads = await fetch('/api/downloads?populate=file&filters[isPublic]=true&sort=createdAt:desc');

// 3. Filter by category (example)
const policies = await fetch('/api/downloads?filters[category]=Policies&populate=file');
```

---

### 2. eLetter Subscription Page

**API:** `/api/eletter-subscription-page`

**Type:** Single Type

**Collection Types Used:**
- `newsletter-subscriptions` - Form submissions (CREATE only)

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  benefits: { heading, benefits: [] },
  privacyNotice: string,
  successMessage: { title, message },
  // Form submits to newsletter-subscriptions
  // POST /api/newsletter-subscriptions
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/eletter-subscription-page?populate=deep');

// 2. Submit subscription (on form submit)
await fetch('/api/newsletter-subscriptions', {
  method: 'POST',
  body: JSON.stringify({ data: { email, firstName, lastName } })
});
```

---

### 3. Photo Gallery Page

**API:** `/api/photo-gallery-page`

**Type:** Single Type

**Collection Types Used:**
- `photo-galleries` - Photo albums

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  // Frontend fetches photo-galleries collection
  // GET /api/photo-galleries?populate=coverImage,photos&sort=date:desc
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/photo-gallery-page?populate=deep');

// 2. Get photo galleries
const galleries = await fetch('/api/photo-galleries?populate=coverImage,photos&sort=date:desc');

// 3. Get specific gallery by slug
const gallery = await fetch('/api/photo-galleries?filters[slug]=annual-conference-2024&populate=deep');
```

---

### 4. Video Gallery Page

**API:** `/api/video-gallery-page`

**Type:** Single Type

**Collection Types Used:**
- `video-galleries` - Video content

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  introSection: { ... },
  ctaSection: { ... }, // YouTube channel CTA
  // Frontend fetches video-galleries collection
  // GET /api/video-galleries?populate=thumbnail&sort=createdAt:desc
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/video-gallery-page?populate=deep');

// 2. Get videos
const videos = await fetch('/api/video-galleries?populate=thumbnail&sort=createdAt:desc');

// 3. Filter by category (example)
const trainingVideos = await fetch('/api/video-galleries?filters[category]=Training&populate=thumbnail');
```

---

## Contact Section

### Contact Page

**API:** `/api/contact-page`

**Type:** Single Type

**Collection Types Used:**
- `contact-messages` - Form submissions (CREATE only)

**Relationship Structure:**

```typescript
{
  heroSection: { ... },
  contactInfoSection: {
    title: string,
    description: string
  },
  contactInfoCards: [
    { icon, title, details: [], color }
  ],
  contactFormSection: {
    title: string,
    successMessage: { title, message },
    fields: []
  },
  mapConfiguration: {
    latitude: number,
    longitude: number,
    zoom: number,
    markerTitle: string,
    markerInfoWindow: { ... }
  },
  quickLinksSection: {
    title: string,
    links: [{ label, url, icon }]
  },
  // Form submits to contact-messages
  // POST /api/contact-messages
  seo: { ... }
}
```

**Required API Calls:**

```typescript
// 1. Get page configuration
const page = await fetch('/api/contact-page?populate=deep');

// 2. Submit contact message (on form submit)
await fetch('/api/contact-messages', {
  method: 'POST',
  body: JSON.stringify({
    data: {
      fullName,
      email,
      phone,
      subject,
      message,
      messageType
    }
  })
});
```

---

## Quick Reference Table

### Pages and Their Collection Dependencies

| Page (Single Type) | Collection Types Used | API Endpoints | Relationship Type |
|-------------------|----------------------|---------------|-------------------|
| **Homepage** | hero-slides, news-articles, events | `/api/homepage-setting`<br>`/api/hero-slides`<br>`/api/news-articles`<br>`/api/events` | Display latest content |
| **Who We Are** | None | `/api/who-we-are-page` | Static content only |
| **Management** | management-team | `/api/management-page`<br>`/api/management-teams` | Display team members |
| **Board of Directors** | board-members | `/api/board-of-directors-page`<br>`/api/board-members` | Display board members |
| **Role in Ghana** | None | `/api/role-in-ghana-page` | Static content only |
| **Potential & Size** | None | `/api/potential-and-size-page` | Static content only |
| **Partners** | partners | `/api/partners-page`<br>`/api/partners` | Display partner logos |
| **What We Do** | None | `/api/what-we-do-page` | Static content only |
| **Our Chapters** | chapters | `/api/our-chapters-page`<br>`/api/chapters` | Display chapters on map |
| **CU Overview** | credit-unions (stats) | `/api/credit-unions-overview-page`<br>`/api/credit-unions` | Dynamic statistics |
| **CU in Ghana** | credit-unions | `/api/credit-unions-in-ghana-page`<br>`/api/credit-unions` | Directory & map display |
| **Join CU** | credit-unions (find) | `/api/credit-unions-join-page`<br>`/api/credit-unions` | Find nearby CUs |
| **CU Form** | None | `/api/credit-unions-form-page` | Form configuration |
| **CU Members** | testimonial-members | `/api/credit-unions-members-page`<br>`/api/testimonial-members` | Display testimonials |
| **Success Stories** | success-stories | `/api/credit-unions-success-stories-page`<br>`/api/success-stories` | Display stories |
| **CUTRAC Overview** | training-courses (optional) | `/api/cutrac-overview-page`<br>`/api/training-courses` | Optional course display |
| **Training Calendar** | training-schedules, training-courses | `/api/training-calendar-page`<br>`/api/training-schedules`<br>`/api/training-courses` | Calendar display |
| **Training Prices** | training-courses | `/api/training-prices-page`<br>`/api/training-courses` | Pricing display |
| **Training Registration** | training-schedules, training-courses | `/api/training-registration-page`<br>`/api/training-schedules`<br>`/api/training-courses` | Registration form |
| **Contact CUTRAC** | None | `/api/contact-cutrac-page` | Contact info only |
| **Travel for Training** | None | `/api/travel-for-training-page` | Travel info only |
| **Downloads** | downloads | `/api/downloads-page`<br>`/api/downloads` | File downloads |
| **eLetter** | newsletter-subscriptions | `/api/eletter-subscription-page`<br>`/api/newsletter-subscriptions` | Subscription form |
| **Photo Gallery** | photo-galleries | `/api/photo-gallery-page`<br>`/api/photo-galleries` | Gallery display |
| **Video Gallery** | video-galleries | `/api/video-gallery-page`<br>`/api/video-galleries` | Video display |
| **Contact** | contact-messages | `/api/contact-page`<br>`/api/contact-messages` | Contact form |

---

## Frontend Data Fetching Patterns

### Pattern 1: Page with No Collections (Static Content)

```typescript
// Example: Who We Are Page
async function getWhoWeArePage() {
  const response = await fetch('/api/who-we-are-page?populate=deep');
  return response.json();
}

// Use in component
const pageData = await getWhoWeArePage();
// All content is in pageData - no additional fetches needed
```

---

### Pattern 2: Page with Single Collection

```typescript
// Example: Management Page
async function getManagementPageData() {
  // Fetch page configuration and team members in parallel
  const [page, team] = await Promise.all([
    fetch('/api/management-page?populate=deep'),
    fetch('/api/management-teams?populate=photo&sort=order:asc')
  ]);

  return {
    page: await page.json(),
    team: await team.json()
  };
}
```

---

### Pattern 3: Page with Multiple Collections

```typescript
// Example: Training Calendar Page
async function getTrainingCalendarData() {
  // Fetch page, schedules, and courses in parallel
  const [page, schedules, courses] = await Promise.all([
    fetch('/api/training-calendar-page?populate=deep'),
    fetch('/api/training-schedules?populate=course,instructor&filters[startDate][$gte]=${today}&sort=startDate:asc'),
    fetch('/api/training-courses?fields=title,code,category')
  ]);

  return {
    page: await page.json(),
    schedules: await schedules.json(),
    courses: await courses.json()
  };
}
```

---

### Pattern 4: Page with Filtered Collections

```typescript
// Example: Credit Unions in Ghana (with filters)
async function getCreditUnionsData(filters: {
  region?: string;
  category?: string;
}) {
  const page = await fetch('/api/credit-unions-in-ghana-page?populate=deep');

  // Build filter query
  const filterParams = new URLSearchParams();
  filterParams.append('populate', 'logo,contact');
  filterParams.append('filters[isActive]', 'true');

  if (filters.region) {
    filterParams.append('filters[region]', filters.region);
  }
  if (filters.category) {
    filterParams.append('filters[category]', filters.category);
  }

  const creditUnions = await fetch(`/api/credit-unions?${filterParams}`);

  return {
    page: await page.json(),
    creditUnions: await creditUnions.json()
  };
}
```

---

### Pattern 5: Page with Form Submission

```typescript
// Example: Contact Page
async function getContactPageData() {
  // Only fetch page configuration
  const page = await fetch('/api/contact-page?populate=deep');
  return page.json();
}

async function submitContactMessage(data: ContactFormData) {
  // Submit to collection on form submit
  const response = await fetch('/api/contact-messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data })
  });

  return response.json();
}
```

---

## Data Flow Diagrams

### Example: Photo Gallery Page Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Application                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 1. User visits /media/photos
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│          Fetch Page Configuration (Single Type)              │
│         GET /api/photo-gallery-page?populate=deep            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Returns: { heroSection, introSection, seo }
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│           Fetch Photo Galleries (Collection)                 │
│  GET /api/photo-galleries?populate=coverImage,photos&sort... │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Returns: [ { album1 }, { album2 }, ... ]
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Render Complete Page                       │
│   - Hero (from page config)                                  │
│   - Intro (from page config)                                 │
│   - Gallery Grid (from collection)                           │
│   - SEO Meta (from page config)                              │
└─────────────────────────────────────────────────────────────┘
```

---

### Example: Training Calendar Page Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Application                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 1. User visits /training/calendar
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Parallel API Calls                         │
│  ┌──────────────────┬──────────────────┬──────────────────┐ │
│  │ Page Config      │ Schedules        │ Courses (Filter) │ │
│  │ Single Type      │ Collection       │ Collection       │ │
│  └──────────────────┴──────────────────┴──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Returns all data
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Render Complete Page                       │
│   - Hero (from page config)                                  │
│   - Calendar Grid (from schedules + courses)                 │
│   - Filter Options (from courses)                            │
│   - Course Details (from courses)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 2. User clicks filter
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│            Fetch Filtered Schedules                          │
│  GET /api/training-schedules?filters[course]=XYZ             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Returns filtered results
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Update Calendar Display                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Best Practices

### 1. Always Fetch Page Configuration First

The page configuration (Single Type) tells you what to display and how to display it. Always fetch this first, then use it to determine which collections to fetch.

### 2. Use Parallel Fetching

When you need multiple collections, fetch them in parallel using `Promise.all()` to improve performance.

```typescript
const [page, collection1, collection2] = await Promise.all([
  fetch('/api/page'),
  fetch('/api/collection1'),
  fetch('/api/collection2')
]);
```

### 3. Implement Pagination for Large Collections

For collections like downloads, news articles, or credit unions, implement pagination:

```typescript
const downloads = await fetch(
  '/api/downloads?pagination[page]=1&pagination[pageSize]=25&populate=file'
);
```

### 4. Use Filters to Reduce Data Transfer

Only fetch the data you need using filters:

```typescript
// Only fetch active items
const items = await fetch('/api/items?filters[isActive]=true');

// Only fetch future events
const events = await fetch(`/api/events?filters[startDate][$gte]=${today}`);
```

### 5. Cache Page Configurations

Page configurations (Single Types) rarely change. Consider caching them:

```typescript
// Next.js example with revalidation
export async function getStaticProps() {
  const page = await fetch('/api/contact-page?populate=deep');

  return {
    props: { page },
    revalidate: 3600 // Revalidate every hour
  };
}
```

---

## Summary

This document provides a complete mapping of how Single Type pages (configurations) relate to Collection Types (data) in the CUA Ghana CMS. Use it as a reference when:

- **Planning frontend implementation** - Know what data to fetch for each page
- **Optimizing API calls** - Fetch only what you need
- **Understanding data relationships** - See how pages and collections work together
- **Debugging data issues** - Trace data flow from CMS to frontend

For detailed API documentation, refer to:
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [MEDIA_API_INTEGRATION_GUIDE.md](./MEDIA_API_INTEGRATION_GUIDE.md) - Media pages integration
- [CONTACT_API_INTEGRATION_GUIDE.md](./CONTACT_API_INTEGRATION_GUIDE.md) - Contact page integration

---

**Last Updated:** 2025-10-28
**Version:** 1.0.0
**CMS Version:** Strapi v5.25.0
