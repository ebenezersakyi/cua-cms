# CUA Ghana CMS - API Documentation

**Version**: 2.1
**Last Updated**: 2025-10-26
**Base URL**: `http://localhost:1337` (Development)
**API Prefix**: `/api`

---

## Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Collection Type APIs](#collection-type-apis)
- [Single Type APIs](#single-type-apis)
- [Custom APIs](#custom-apis)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Implementation Status](#implementation-status)

---

## Getting Started

### Base URL Structure
```
http://localhost:1337/api/{content-type}
```

### Example Request
```javascript
const response = await fetch('http://localhost:1337/api/news-articles?populate=*', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN'
  }
});
const data = await response.json();
```

---

## Authentication

### API Token Setup

1. Navigate to Settings → API Tokens in Strapi Admin
2. Click "Create new API Token"
3. Configure:
   - Name: `Frontend Application`
   - Type: `Read-Only` or `Full Access`
   - Duration: `Unlimited` or set expiration
4. Copy token and add to `.env`:

```env
STRAPI_API_TOKEN=your_token_here
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Public vs Protected Endpoints

- **Public** (GET): Most read operations
- **Protected** (POST/PUT/DELETE): Write operations, requires authentication

---

## Response Format

### Single Item Response
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Welcome to CUA Ghana",
      "createdAt": "2025-10-17T10:00:00.000Z",
      "updatedAt": "2025-10-17T10:00:00.000Z",
      "publishedAt": "2025-10-17T10:00:00.000Z"
    }
  },
  "meta": {}
}
```

### Collection Response
```json
{
  "data": [
    {
      "id": 1,
      "attributes": { /* ... */ }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 4,
      "total": 100
    }
  }
}
```

---

## Collection Type APIs

### 1. Hero Slides

**Endpoint**: `GET /api/hero-slides`  
**Purpose**: Homepage carousel slides

**Common Queries**:
```javascript
// Get active slides sorted by order
GET /api/hero-slides?filters[isActive][$eq]=true&sort=order:asc&populate=*

// Get specific slide
GET /api/hero-slides/{id}?populate=*
```

**Response Fields**:
- `title` (string) - Main headline
- `subtext` (text) - Subtitle/description
- `ctaText` (string) - Button text
- `ctaLink` (string) - Button URL
- `backgroundImage` (media) - Slide background
- `order` (number) - Display order
- `isActive` (boolean) - Visibility status

**Status**: ✅ Implemented

---

### 2. News Articles

**Endpoint**: `GET /api/news-articles`  
**Purpose**: News, announcements, and blog posts

**Common Queries**:
```javascript
// Featured news with relations
GET /api/news-articles?filters[isFeatured][$eq]=true&populate[author]=*&populate[category]=*&populate[featuredImage]=*&sort=publishedAt:desc&pagination[pageSize]=6

// Single article by slug
GET /api/news-articles?filters[slug][$eq]=article-slug&populate=deep

// Filter by category
GET /api/news-articles?filters[category][slug][$eq]=announcements&populate=*
```

**Response Fields**:
- `title` (string)
- `slug` (UID)
- `excerpt` (text) - Short summary
- `content` (richtext) - Full article content
- `featuredImage` (media)
- `author` (relation → author)
- `category` (relation → news-category)
- `tags` (relation → tag, multiple)
- `publishedAt` (datetime)
- `isFeatured` (boolean)
- `readTime` (integer) - Estimated read time in minutes
- `seoTitle` (string)
- `seoDescription` (text)

**Status**: ✅ Implemented

---

### 3. Events

**Endpoint**: `GET /api/events`  
**Purpose**: Training events, conferences, workshops

**Common Queries**:
```javascript
// Upcoming featured events
GET /api/events?filters[isFeatured][$eq]=true&filters[eventDate][$gte]=${new Date().toISOString()}&populate=*&sort=eventDate:asc

// Events by category
GET /api/events?filters[category][$eq]=Training&populate=*

// Past events
GET /api/events?filters[eventDate][$lt]=${new Date().toISOString()}&populate=*&sort=eventDate:desc
```

**Response Fields**:
- `title` (string)
- `slug` (UID)
- `description` (richtext)
- `shortDescription` (text)
- `eventDate` (datetime)
- `eventTime` (string)
- `location` (string)
- `venue` (string)
- `featuredImage` (media)
- `gallery` (media, multiple)
- `category` (string)
- `status` (enum: Upcoming, Ongoing, Completed, Cancelled)
- `isFeatured` (boolean)
- `registrationLink` (string)
- `registrationDeadline` (date)
- `capacity` (integer)

**Status**: ✅ Implemented

---

### 4. Credit Unions

**Endpoint**: `GET /api/credit-unions`  
**Purpose**: Credit union directory and information

**Common Queries**:
```javascript
// Active credit unions with relations
GET /api/credit-unions?filters[isActive][$eq]=true&populate[chapter]=*&populate[logo]=*&sort=name:asc

// By region
GET /api/credit-unions?filters[region][$eq]=Greater Accra&populate=*

// Top 20 by assets
GET /api/credit-unions?filters[isActive][$eq]=true&sort=totalAssets:desc&pagination[pageSize]=20&populate=*

// Find by slug
GET /api/credit-unions?filters[slug][$eq]=union-name&populate=deep
```

**Response Fields**:
- `name` (string)
- `slug` (UID)
- `description` (richtext)
- `logo` (media)
- `region` (string)
- `district` (string)
- `address` (text)
- `gpsCoordinates` (component) - lat, lng
- `phone` (string)
- `email` (email)
- `website` (string)
- `establishedYear` (integer)
- `memberCount` (integer)
- `totalAssets` (decimal)
- `services` (component, repeatable) - service name and description
- `openingHours` (component) - weekdays, weekends
- `isActive` (boolean)
- `isFeatured` (boolean)
- `chapter` (relation → chapter)

**Status**: ✅ Implemented

---

### 5. Success Stories

**Endpoint**: `GET /api/success-stories`  
**Purpose**: Member testimonials and impact stories

**Common Queries**:
```javascript
// Featured stories
GET /api/success-stories?filters[isFeatured][$eq]=true&populate[creditUnion]=*&populate[featuredImage]=*&pagination[pageSize]=3

// By category
GET /api/success-stories?filters[category][$eq]=Financial Freedom&populate=*
```

**Response Fields**:
- `title` (string)
- `slug` (UID)
- `story` (richtext)
- `personName` (string)
- `personRole` (string)
- `creditUnion` (relation → credit-union)
- `featuredImage` (media)
- `category` (string)
- `impact` (component, repeatable) - metric and value
- `isFeatured` (boolean)
- `publishedDate` (date)

**Status**: ✅ Implemented

---

### 6. Board Members

**Endpoint**: `GET /api/board-members`  
**Purpose**: Board of directors information

**Common Queries**:
```javascript
// Active members sorted by display order
GET /api/board-members?filters[isActive][$eq]=true&sort=displayOrder:asc&populate=*
```

**Response Fields**:
- `fullName` (string)
- `position` (string)
- `bio` (richtext)
- `photo` (media)
- `email` (email)
- `phone` (string)
- `displayOrder` (number)
- `isActive` (boolean)

**Status**: ✅ Implemented

---

### 7. Management Team

**Endpoint**: `GET /api/management-teams`  
**Purpose**: Management staff information

**Common Queries**:
```javascript
// Active team members by department
GET /api/management-teams?filters[isActive][$eq]=true&filters[department][$eq]=Operations&sort=displayOrder:asc&populate=*
```

**Response Fields**:
- `fullName` (string)
- `position` (string)
- `department` (string)
- `bio` (richtext)
- `photo` (media)
- `email` (email)
- `phone` (string)
- `displayOrder` (number)
- `isActive` (boolean)

**Status**: ✅ Implemented

---

### 8. Training Courses

**Endpoint**: `GET /api/training-courses`  
**Purpose**: CUTRAC course catalog

**Common Queries**:
```javascript
// Active courses by category
GET /api/training-courses?filters[isActive][$eq]=true&filters[category][$eq]=Leadership&populate=*&sort=name:asc
```

**Response Fields**:
- `name` (string)
- `slug` (UID)
- `description` (richtext)
- `duration` (string) - e.g., "3 days", "2 weeks"
- `level` (enum: Beginner, Intermediate, Advanced)
- `category` (string)
- `objectives` (richtext)
- `targetAudience` (text)
- `prerequisites` (text)
- `price` (decimal)
- `currency` (string) - default: GHS
- `isActive` (boolean)

**Status**: ✅ Implemented

---

### 9. Training Schedules

**Endpoint**: `GET /api/training-schedules`  
**Purpose**: Scheduled training sessions

**Common Queries**:
```javascript
// Upcoming open sessions
GET /api/training-schedules?filters[status][$eq]=Open&filters[startDate][$gte]=${new Date().toISOString()}&populate[course]=*&sort=startDate:asc
```

**Response Fields**:
- `course` (relation → training-course)
- `startDate` (datetime)
- `endDate` (datetime)
- `venue` (string)
- `facilitator` (string)
- `availableSeats` (integer)
- `registrationDeadline` (date)
- `status` (enum: Open, Full, Cancelled, Completed)
- `registrationLink` (string)

**Status**: ✅ Implemented

---

### 10. Partners

**Endpoint**: `GET /api/partners`  
**Purpose**: CUA partners and sponsors

**Common Queries**:
```javascript
// Active partners sorted by display order
GET /api/partners?filters[isActive][$eq]=true&sort=displayOrder:asc&populate=*
```

**Response Fields**:
- `name` (string)
- `logo` (media)
- `description` (text)
- `website` (string)
- `partnershipType` (enum: Sponsor, Strategic Partner, International Partner, Affiliate)
- `displayOrder` (number)
- `isActive` (boolean)

**Status**: ✅ Implemented

---

### 11. Chapters

**Endpoint**: `GET /api/chapters`  
**Purpose**: Regional chapters information

**Common Queries**:
```javascript
// All chapters with credit unions
GET /api/chapters?populate[credit_unions][fields][0]=name&populate[credit_unions][fields][1]=slug&populate[coverImage]=*
```

**Response Fields**:
- `name` (string)
- `slug` (UID)
- `description` (richtext)
- `region` (string)
- `chairpersonName` (string)
- `chairpersonEmail` (email)
- `chairpersonPhone` (string)
- `contactEmail` (email)
- `contactPhone` (string)
- `coverImage` (media)
- `credit_unions` (relation → credit-union, multiple)

**Status**: ✅ Implemented

---

### 12. Photo Galleries

**Endpoint**: `GET /api/photo-galleries`  
**Purpose**: Photo albums and event galleries

**Common Queries**:
```javascript
// Recent galleries
GET /api/photo-galleries?populate=deep&sort=date:desc&pagination[pageSize]=12
```

**Response Fields**:
- `title` (string)
- `slug` (UID)
- `description` (text)
- `images` (media, multiple)
- `date` (date)
- `eventName` (string)

**Status**: ✅ Implemented

---

### 13. Video Galleries

**Endpoint**: `GET /api/video-galleries`  
**Purpose**: Video content library

**Common Queries**:
```javascript
// Videos by category
GET /api/video-galleries?filters[category][$eq]=Training&populate=*&sort=createdAt:desc
```

**Response Fields**:
- `title` (string)
- `slug` (UID)
- `description` (text)
- `videoUrl` (string) - YouTube/Vimeo embed URL
- `thumbnail` (media)
- `category` (string)
- `duration` (string)

**Status**: ✅ Implemented

---

### 14. Downloads

**Endpoint**: `GET /api/downloads`  
**Purpose**: Downloadable documents, reports, forms

**Common Queries**:
```javascript
// Public downloads by category
GET /api/downloads?filters[isPublic][$eq]=true&filters[category][$eq]=Annual Reports&populate=*&sort=uploadDate:desc
```

**Response Fields**:
- `title` (string)
- `description` (text)
- `file` (media)
- `category` (enum: Annual Reports, Forms, Policies, Newsletters, Publications)
- `uploadDate` (date)
- `isPublic` (boolean)

**Status**: ✅ Implemented

---

### 15. Newsletter Subscriptions

**Endpoint**: `POST /api/newsletter-subscriptions`  
**Purpose**: Newsletter signup

**Request**:
```json
{
  "data": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "source": "Homepage Footer"
  }
}
```

**Status**: ✅ Implemented

---

### 16. Contact Messages

**Endpoint**: `POST /api/contact-messages`  
**Purpose**: Contact form submissions

**Request**:
```json
{
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+233123456789",
    "subject": "Partnership Inquiry",
    "message": "Message content...",
    "messageType": "Partnership"
  }
}
```

**Status**: ✅ Implemented

---

## Single Type APIs

> **📖 About Pages - Complete API Documentation**
> For comprehensive API documentation including request/response examples, TypeScript types, integration examples, and testing guides for all About section pages (Who We Are, Potential & Size, Board of Directors, Management Team, and Partners), see:
> **[ABOUT_PAGES_API_DOCUMENTATION.md](./ABOUT_PAGES_API_DOCUMENTATION.md)**

---

### 1. Site Settings

**Endpoint**: `GET /api/site-setting`  
**Purpose**: Global site configuration

**Query**:
```javascript
GET /api/site-setting?populate=deep
```

**Fields**:
- `siteName` (string)
- `tagline` (string)
- `logo` (media)
- `favicon` (media)
- `contactEmail` (email)
- `contactPhone` (string)
- `address` (text)
- `socialLinks` (component, repeatable)
  - platform (string)
  - url (string)
- `footerAbout` (text)
- `footerColumns` (component, repeatable)
  - title (string)
  - links (component, repeatable)
    - label (string)
    - url (string)
- `copyrightText` (string)

**Status**: ✅ Implemented

---

### 2. Homepage Settings

**Endpoint**: `GET /api/homepage-setting`  
**Purpose**: Homepage-specific content

**Query**:
```javascript
GET /api/homepage-setting?populate=deep
```

**Fields**:
- `heroTitle` (string)
- `heroSubtitle` (text)
- `impactTitle` (string)
- `impactDescription` (text)
- `impactStats` (component, repeatable)
  - label (string)
  - value (string)
  - icon (string)
  - description (text)
- `joinTitle` (string)
- `joinDescription` (richtext)
- `joinCtaText` (string)
- `joinCtaLink` (string)
- `joinBenefits` (component, repeatable)
  - title (string)
  - description (text)
  - icon (string)

**Status**: ✅ Implemented

---

### 3. About Page Content

**Endpoint**: `GET /api/about-page-content`  
**Purpose**: About us page content

**Query**:
```javascript
GET /api/about-page-content?populate=deep
```

**Fields**:
- `heroTitle` (string)
- `heroSubtitle` (text)
- `heroImage` (media)
- `whoWeAreTitle` (string)
- `whoWeAreContent` (richtext)
- `missionTitle` (string)
- `missionStatement` (richtext)
- `visionTitle` (string)
- `visionStatement` (richtext)
- `valuesTitle` (string)
- `coreValues` (component, repeatable)
  - title (string)
  - description (text)
  - icon (string)

**Status**: ⚠️ Deprecated (Use new about pages below)

---

### 4. Who We Are Page

**Endpoint**: `GET /api/who-we-are-page`
**Purpose**: Who We Are page content (About section)

**Query**:
```javascript
GET /api/who-we-are-page?populate=deep
```

**Fields**:
- Hero Section: `hero_badge`, `hero_title`, `hero_description`, `hero_background_image`
- Stats: `stat_founded_year`, `stat_years_of_service`, `stat_credit_unions`, `stat_members_served`
- Presidential Quote: `presidential_quote`, `presidential_quote_author`, `presidential_quote_context`, `presidential_quote_image`
- Timeline: `timeline_section_title`, `timeline_section_subtitle`, `timeline_events[]`
- Mission & Vision: `mission_text`, `vision_text`
- Core Values: `core_values[]` (icon, title, color)
- Affiliations: `affiliations[]` (acronym, full_name, color_scheme)

**Status**: ✅ Implemented

---

### 5. Management Page

**Endpoint**: `GET /api/management-page`
**Purpose**: Management Team page content

**Query**:
```javascript
GET /api/management-page?populate=deep
```

**Fields**:
- Hero Section: `hero_badge`, `hero_title`, `hero_description`, `hero_background_image`
- Executive Team: `executive_section_title`, `executive_section_subtitle`, `executive_team[]`
- Department Heads: `department_section_title`, `department_section_subtitle`, `department_heads[]`
- Philosophy: `philosophy_title`, `philosophy_description`
- Stats: `stat_years_experience`, `stat_credit_unions_managed`, `stat_members_served`

**Status**: ✅ Implemented

---

### 6. Board of Directors Page

**Endpoint**: `GET /api/board-of-directors-page`
**Purpose**: Board of Directors page content

**Query**:
```javascript
GET /api/board-of-directors-page?populate=deep
```

**Fields**:
- Hero Section: `hero_badge`, `hero_title`, `hero_description`, `hero_background_image`
- Board Members: `board_section_title`, `board_section_subtitle`, `board_members[]`

**Status**: ✅ Implemented

---

### 7. Role in Ghana Page

**Endpoint**: `GET /api/role-in-ghana-page`
**Purpose**: Role in Ghana page content

**Query**:
```javascript
GET /api/role-in-ghana-page?populate=deep
```

**Fields**:
- Hero Section: `hero_badge`, `hero_title`, `hero_description`, `hero_background_image`
- Core Roles: `core_roles_section_title`, `core_roles_section_subtitle`, `core_roles[]`
- Regulatory: `regulatory_title`, `regulatory_description`, stats
- Services: `services_section_title`, `services_section_subtitle`, `services[]`
- Partnerships: `partnerships_section_title`, `partnerships_section_subtitle`, `partnerships[]`
- Impact: `impact_title`, `impact_description`, highlights

**Status**: ✅ Implemented

---

### 8. Potential and Size Page

**Endpoint**: `GET /api/potential-and-size-page`
**Purpose**: Potential and Size page content

**Query**:
```javascript
GET /api/potential-and-size-page?populate=deep
```

**Fields**:
- Hero Section: `hero_badge`, `hero_title`, `hero_description`, `hero_background_image`
- Capabilities: `capabilities_section_title`, `capabilities_section_subtitle`, `capabilities[]`
- Key Stats: `stats_section_title`, `stats_section_subtitle`, `key_stats[]`
- Financial: `financial_section_title`, `financial_section_subtitle`, `data_source`, `financial_stats[]`
- Milestones: `milestones[]`
- Leadership: `leadership_title`, `leadership_description`, highlights

**Status**: ✅ Implemented

---

### 9. Partners Page

**Endpoint**: `GET /api/partners-page`
**Purpose**: Partners page content

**Query**:
```javascript
GET /api/partners-page?populate=deep
```

**Fields**:
- Hero Section: `hero_badge`, `hero_title`, `hero_description`, `hero_background_image`
- Partners: `partners[]` (name, logo, full_name, description, type, website, etc.)
- Impact: `impact_title`, `impact_description`, stats

**Status**: ✅ Implemented

---

### 10. Ticker Content

**Endpoint**: `GET /api/ticker-content`  
**Purpose**: News ticker/announcement bar

**Query**:
```javascript
GET /api/ticker-content?populate=*
```

**Fields**:
- `isActive` (boolean)
- `messages` (component, repeatable)
  - text (string)
  - link (string)
  - priority (number)
  - startDate (datetime)
  - endDate (datetime)
  - isActive (boolean)
  - openInNewTab (boolean)

**Status**: ✅ Implemented

---

## Custom APIs

### 1. Search API

**Endpoint**: `GET /api/search`  
**Purpose**: Global content search

**Query Parameters**:
```javascript
q - Search query
types - Content types to search (comma-separated)
page - Page number
pageSize - Results per page
```

**Example**:
```
GET /api/search?q=training&types=news-articles,events,training-courses&page=1&pageSize=10
```

**Status**: ⏳ To be created

---

### 2. Statistics API

**Endpoint**: `GET /api/statistics`  
**Purpose**: Aggregated statistics

**Returns**:
```json
{
  "totalCreditUnions": 350,
  "totalMembers": 500000,
  "totalAssets": "2.5B",
  "activeChapters": 10,
  "upcomingEvents": 5,
  "recentNews": 3
}
```

**Status**: ⏳ To be created

---

## Error Handling

### Standard Error Format
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Resource not found",
    "details": {}
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Best Practices

### 1. Populate Strategy
```javascript
// ❌ Bad - Over-fetching
populate: '*'

// ✅ Good - Specific fields
populate: {
  author: { fields: ['name'] },
  featuredImage: { fields: ['url', 'alternativeText'] }
}
```

### 2. Pagination
```javascript
// Always use pagination for collections
pagination: {
  page: 1,
  pageSize: 10
}
```

### 3. Filtering
```javascript
// Use specific filters
filters: {
  publishedAt: { $gte: '2025-01-01' },
  isFeatured: { $eq: true }
}
```

### 4. Sorting
```javascript
// Sort by relevant fields
sort: 'publishedAt:desc'
```

### 5. Caching
```javascript
// Cache single types and rarely-changing data
// Revalidate every 60 seconds
export const revalidate = 60;
```

---

## Implementation Status

### ✅ Collection Types (19/19 Complete)
- Hero Slides
- News Articles
- News Categories
- Events
- Credit Unions
- Success Stories
- Board Members
- Management Team
- Training Courses
- Training Schedules
- Downloads
- Photo Galleries
- Video Galleries
- Chapters
- Partners
- Newsletter Subscriptions
- Contact Messages
- Authors
- Tags

### ✅ Single Types (16/16 Complete)
- ✅ Site Settings
- ✅ Homepage Settings
- ✅ About Page Content (Deprecated - use new about pages)
- ✅ Ticker Content
- ✅ Who We Are Page
- ✅ Management Page
- ✅ Board of Directors Page
- ✅ Role in Ghana Page
- ✅ Potential and Size Page
- ✅ Partners Page
- ✅ Credit Unions Members Page
- ✅ Credit Unions Success Stories Page
- ✅ Credit Unions Join Page
- ✅ Credit Unions Form Page
- ✅ Credit Unions in Ghana Page
- ✅ CUTRAC Overview Page

### ⏳ Custom APIs (0/2 Complete)
- Search API
- Statistics API

---

**Next Steps**:
1. Create Single Type APIs
2. Implement custom endpoints
3. Set up API permissions
4. Configure CORS
5. Add rate limiting
6. Implement caching strategy

---

**Version**: 2.0  
**Last Updated**: 2025-10-17  
**Maintained By**: CUA Ghana Development Team

---

## NEWLY ADDED APIS (2025-10-17)

### New Single Types (6)

#### 1. Credit Unions Members Page
**Endpoint**: `GET /api/credit-unions-members-page?populate=deep`
**Purpose**: Content for Credit Unions Members page
**Status**: ✅ Implemented

#### 2. Credit Unions Success Stories Page
**Endpoint**: `GET /api/credit-unions-success-stories-page?populate=deep`
**Purpose**: Content for Success Stories page
**Status**: ✅ Implemented

#### 3. Credit Unions Join Page
**Endpoint**: `GET /api/credit-unions-join-page?populate=deep`
**Purpose**: Content for Join a Credit Union page
**Status**: ✅ Implemented

#### 4. Credit Unions Form Page
**Endpoint**: `GET /api/credit-unions-form-page?populate=deep`
**Purpose**: Content for Form a Credit Union page
**Status**: ✅ Implemented

#### 5. Credit Unions in Ghana Page
**Endpoint**: `GET /api/credit-unions-in-ghana-page?populate=deep`
**Purpose**: Content for Credit Unions in Ghana overview page
**Status**: ✅ Implemented

#### 6. CUTRAC Overview Page
**Endpoint**: `GET /api/cutrac-overview-page?populate=deep`
**Purpose**: Content for CUTRAC Training Center overview
**Status**: ✅ Implemented

---

### New Collection Types (2)

#### 1. Testimonial Members
**Endpoint**: `GET /api/testimonial-members`
**Purpose**: Member testimonials

**Query Examples**:
```javascript
// Featured testimonials
GET /api/testimonial-members?filters[isFeatured][$eq]=true&populate[photo]=*&populate[creditUnion][fields][0]=name&sort=order:asc

// By credit union
GET /api/testimonial-members?filters[creditUnion][slug][$eq]=union-name&populate=*
```

**Fields**:
- name, role, location
- memberSince, testimonial (richtext)
- rating (1-5), photo
- creditUnion (relation)
- isFeatured, order

**Status**: ✅ Implemented

---

#### 2. Instructors
**Endpoint**: `GET /api/instructors`
**Purpose**: Training instructors/facilitators

**Query Examples**:
```javascript
// Active featured instructors
GET /api/instructors?filters[isActive][$eq]=true&filters[isFeatured][$eq]=true&populate[courses][fields][0]=name&populate[photo]=*&sort=order:asc

// By specialization
GET /api/instructors?filters[specialization][$containsi]=leadership&populate=*
```

**Fields**:
- fullName, slug, title
- bio, qualifications (richtext)
- photo, email, phone
- specialization, yearsOfExperience
- courses (relation to training-courses)
- linkedInUrl
- isActive, isFeatured, order

**Status**: ✅ Implemented

---

### Custom APIs (2)

#### 1. Search API
**Endpoint**: `GET /api/search`
**Purpose**: Global content search across multiple types

**Query Parameters**:
- `query` (required, min 2 chars) - Search term
- `types` (optional) - Content types: all, news-articles, events, credit-unions, success-stories, training-courses
- `page` (optional, default: 1) - Page number
- `pageSize` (optional, default: 10) - Results per page

**Example**:
```
GET /api/search?query=training&types=training-courses,events&page=1&pageSize=10
```

**Response**:
```json
{
  "data": [
    {
      "type": "training-course",
      "id": 1,
      "title": "...",
      "excerpt": "...",
      "slug": "...",
      "url": "/training/courses/...",
      "image": "...",
      "meta": "..."
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 10, "total": 25, "pageCount": 3 },
    "query": "training",
    "types": ["training-courses", "events"]
  }
}
```

**Status**: ✅ Implemented

---

#### 2. Statistics API
**Endpoint**: `GET /api/statistics`
**Purpose**: Aggregated statistics for dashboard/widgets

**Response**:
```json
{
  "data": {
    "creditUnions": {
      "total": 350,
      "totalMembers": 500000,
      "totalAssets": "GHS 2500.00M"
    },
    "content": {
      "newsArticles": 45,
      "upcomingEvents": 5,
      "successStories": 20,
      "trainingCourses": 15
    },
    "organization": {
      "chapters": 10,
      "partners": 8
    },
    "recentActivity": {
      "latestNews": [{"title": "...", "slug": "...", "date": "..."}],
      "upcomingEvents": [{"title": "...", "slug": "...", "date": "..."}]
    }
  },
  "meta": {
    "generatedAt": "2025-10-17T..."
  }
}
```

**Status**: ✅ Implemented

---

## Complete API List

### Single Types (10)
1. ✅ site-setting
2. ✅ homepage-setting
3. ✅ about-page-content
4. ✅ ticker-content
5. ✅ credit-unions-members-page
6. ✅ credit-unions-success-stories-page
7. ✅ credit-unions-join-page
8. ✅ credit-unions-form-page
9. ✅ credit-unions-in-ghana-page
10. ✅ cutrac-overview-page

### Collection Types (21)
1. ✅ hero-slide
2. ✅ news-article
3. ✅ news-category
4. ✅ event
5. ✅ credit-union
6. ✅ success-story
7. ✅ board-member
8. ✅ management-team
9. ✅ training-course
10. ✅ training-schedule
11. ✅ download
12. ✅ photo-gallery
13. ✅ video-gallery
14. ✅ chapter
15. ✅ partner
16. ✅ newsletter-subscription
17. ✅ contact-message
18. ✅ author
19. ✅ tag
20. ✅ testimonial-member
21. ✅ instructor

### Custom APIs (2)
1. ✅ /api/search
2. ✅ /api/statistics

**Total**: 33 APIs

---

## Components Created (60+)

### Section Components (30+)
- hero-with-cta, hero-simple
- icon-benefits-grid, membership-types
- requirements-list, requirements-grid
- numbered-steps, detailed-steps
- fee-structure-table
- member-testimonials, dual-cta
- intro-with-stats, intro-with-video
- story-categories
- eligibility-types, documentation-requirements
- faq-accordion
- timeline-process, history-timeline
- support-services, downloadable-resources
- overview-with-stats, map-config
- cu-categories, impact-grid
- mission-vision-values
- services-grid, training-programs
- stats-highlight, facilities-list
- partners-logos

### Element Components (30+)
- membership-type, requirement-item
- process-step, detailed-step
- fee-item, faq-item
- story-category, eligibility-type
- document-requirement
- requirement-card, timeline-stage
- support-service, resource-item
- timeline-event, cu-category
- impact-item
- service-item, program-item
- facility-item

---

## API Permissions Configuration Guide

### For Public Access (Frontend):

1. Navigate to **Settings → Users & Permissions → Roles → Public**

2. Enable the following permissions:

**Single Types** (find):
- ✅ site-setting
- ✅ homepage-setting
- ✅ about-page-content
- ✅ ticker-content
- ✅ credit-unions-members-page
- ✅ credit-unions-success-stories-page
- ✅ credit-unions-join-page
- ✅ credit-unions-form-page
- ✅ credit-unions-in-ghana-page
- ✅ cutrac-overview-page

**Collection Types** (find, findOne):
- ✅ hero-slide
- ✅ news-article, news-category
- ✅ event
- ✅ credit-union
- ✅ success-story
- ✅ board-member
- ✅ management-team
- ✅ training-course, training-schedule
- ✅ download
- ✅ photo-gallery, video-gallery
- ✅ chapter
- ✅ partner
- ✅ author, tag
- ✅ testimonial-member
- ✅ instructor

**Collection Types** (create only):
- ✅ newsletter-subscription
- ✅ contact-message

**Custom APIs**:
- ✅ search.find
- ✅ statistics.find

3. Click **Save**

### For Authenticated Users:

Enable additional permissions as needed (update, delete) for content managers.

---

**Version**: 2.1
**Last Updated**: 2025-10-17
**Total APIs**: 33 (10 Single Types + 21 Collection Types + 2 Custom)
**Total Components**: 60+
**Status**: ✅ COMPLETE
