# Strapi CMS Requirements for CUA Website

## Project Overview
The Credit Union Association (CUA) Ghana website is a Next.js 15 application that requires a headless CMS solution to manage dynamic content across various sections. This document outlines the content types, relationships, and features needed in Strapi.

---

## 1. Content Types (Collection Types)

### 1.1 Hero Slides
**Purpose:** Manage rotating hero carousel content on the homepage

**Fields:**
- `title` (Text, Required) - Main headline
- `subtext` (Long Text, Required) - Description/subtitle
- `ctaText` (Text, Required) - Call-to-action button text
- `ctaLink` (Text, Required) - Button destination URL
- `backgroundImage` (Media, Single, Required) - Hero background image
- `order` (Number, Required) - Display order in carousel
- `isActive` (Boolean, Default: true) - Enable/disable slide
- `publishedDate` (DateTime)

**Display Location:** Homepage hero carousel

---

### 1.2 Events
**Purpose:** Manage events, programs, and initiatives

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Based on title, Required)
- `description` (Rich Text, Required)
- `shortDescription` (Text, 200 chars) - For preview cards
- `eventDate` (Date, Required)
- `eventTime` (Time)
- `location` (Text)
- `featuredImage` (Media, Single, Required)
- `gallery` (Media, Multiple) - Additional event images
- `category` (Enumeration: Training, Community, Financial Literacy, Agricultural, Women Empowerment, Other)
- `isFeatured` (Boolean, Default: false)
- `registrationLink` (Text)
- `registrationDeadline` (Date)
- `capacity` (Number)
- `status` (Enumeration: Upcoming, Ongoing, Completed, Cancelled)
- `relatedEvents` (Relation: Many-to-Many with Events)
- `publishedAt` (DateTime)

**Display Locations:**
- Homepage events section
- Events listing page
- Individual event pages (`/events/[id]`)

---

### 1.3 News Articles
**Purpose:** Manage news, announcements, and blog posts

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Based on title, Required)
- `excerpt` (Text, 300 chars, Required) - Preview text
- `content` (Rich Text, Required) - Full article content
- `featuredImage` (Media, Single, Required)
- `author` (Relation: Many-to-One with Authors)
- `category` (Relation: Many-to-One with News Categories)
- `tags` (Relation: Many-to-Many with Tags)
- `publishedDate` (DateTime, Required)
- `updatedDate` (DateTime)
- `isFeatured` (Boolean, Default: false)
- `readTime` (Number) - Estimated reading time in minutes
- `seoTitle` (Text)
- `seoDescription` (Text)

**Display Locations:**
- News listing page
- Individual news pages (`/news/[slug]`)
- Related news sections

---

### 1.4 Credit Unions
**Purpose:** Directory of all credit unions in Ghana

**Fields:**
- `name` (Text, Required)
- `slug` (UID, Based on name, Required)
- `description` (Rich Text)
- `logo` (Media, Single)
- `region` (Enumeration: Greater Accra, Ashanti, Western, Eastern, Central, Northern, Upper East, Upper West, Volta, Bono, Bono East, Ahafo, Savannah, North East, Oti)
- `district` (Text)
- `address` (Text, Required)
- `gpsCoordinates` (Component: GPS Location)
  - `latitude` (Decimal)
  - `longitude` (Decimal)
- `phone` (Text, Required)
- `email` (Email)
- `website` (Text)
- `establishedYear` (Number)
- `memberCount` (Number)
- `totalAssets` (Decimal)
- `services` (Component Repeatable: Service List)
  - `serviceName` (Text)
  - `description` (Text)
- `openingHours` (Component: Business Hours)
  - `monday` (Text)
  - `tuesday` (Text)
  - `wednesday` (Text)
  - `thursday` (Text)
  - `friday` (Text)
  - `saturday` (Text)
  - `sunday` (Text)
- `isActive` (Boolean, Default: true)
- `isFeatured` (Boolean, Default: false)
- `chapter` (Relation: Many-to-One with Chapters)

**Display Locations:**
- Find Credit Union page (`/find-credit-union`)
- Credit Unions in Ghana page (`/credit-unions/ghana`)
- Chapter pages

---

### 1.5 Success Stories
**Purpose:** Member and credit union success testimonials

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Based on title, Required)
- `story` (Rich Text, Required)
- `personName` (Text, Required)
- `personRole` (Text) - e.g., "Business Owner", "Farmer"
- `creditUnion` (Relation: Many-to-One with Credit Unions)
- `featuredImage` (Media, Single)
- `category` (Enumeration: Business Growth, Agricultural, Personal Finance, Community Impact, Women Empowerment)
- `impact` (Component: Impact Metrics)
  - `metricName` (Text) - e.g., "Income Increase"
  - `metricValue` (Text) - e.g., "300%"
- `isFeatured` (Boolean, Default: false)
- `publishedDate` (DateTime)

**Display Locations:**
- Success Stories page (`/credit-unions/success-stories`)
- Homepage testimonials

---

### 1.6 Partners
**Purpose:** Manage organizational partners and collaborators

**Fields:**
- `name` (Text, Required)
- `slug` (UID, Based on name, Required)
- `logo` (Media, Single, Required)
- `description` (Rich Text)
- `website` (Text)
- `partnershipType` (Enumeration: Strategic, Funding, Technical, Advocacy)
- `startDate` (Date)
- `isActive` (Boolean, Default: true)
- `displayOrder` (Number)

**Display Locations:**
- Homepage partners carousel
- Partners page (`/about-us/partners`)

---

### 1.7 Board Members
**Purpose:** Board of Directors information

**Fields:**
- `fullName` (Text, Required)
- `position` (Text, Required) - e.g., "Chairperson", "Vice Chairperson"
- `bio` (Rich Text, Required)
- `photo` (Media, Single, Required)
- `qualifications` (Rich Text)
- `responsibilities` (Rich Text)
- `linkedIn` (Text)
- `displayOrder` (Number, Required)
- `isActive` (Boolean, Default: true)

**Display Locations:**
- Board of Directors page (`/about-us/board-of-directors`)

---

### 1.8 Management Team
**Purpose:** Management staff information

**Fields:**
- `fullName` (Text, Required)
- `position` (Text, Required)
- `department` (Enumeration: Executive, Finance, Operations, Training, IT, Marketing, HR)
- `bio` (Rich Text, Required)
- `photo` (Media, Single, Required)
- `email` (Email)
- `phone` (Text)
- `qualifications` (Rich Text)
- `linkedIn` (Text)
- `displayOrder` (Number, Required)
- `isActive` (Boolean, Default: true)

**Display Locations:**
- Management page (`/about-us/management`)

---

### 1.9 Training Courses
**Purpose:** CUTRAC training programs and courses

**Fields:**
- `courseName` (Text, Required)
- `slug` (UID, Based on courseName, Required)
- `description` (Rich Text, Required)
- `duration` (Text) - e.g., "3 days", "2 weeks"
- `level` (Enumeration: Beginner, Intermediate, Advanced)
- `category` (Enumeration: Financial Management, Leadership, Compliance, Technology, Operations)
- `price` (Decimal)
- `currency` (Text, Default: "GHS")
- `objectives` (Rich Text)
- `targetAudience` (Rich Text)
- `prerequisites` (Rich Text)
- `syllabus` (Media, Single) - PDF attachment
- `instructor` (Text)
- `maxParticipants` (Number)
- `certificationOffered` (Boolean)
- `isActive` (Boolean, Default: true)

**Display Locations:**
- CUTRAC Overview page (`/training/cutrac-overview`)
- Training Calendar page (`/training/training-calendar`)

---

### 1.10 Training Schedule
**Purpose:** Scheduled training sessions

**Fields:**
- `course` (Relation: Many-to-One with Training Courses, Required)
- `startDate` (DateTime, Required)
- `endDate` (DateTime, Required)
- `location` (Text, Required)
- `venue` (Text)
- `instructor` (Text)
- `availableSeats` (Number)
- `registrationDeadline` (Date)
- `registrationLink` (Text)
- `price` (Decimal) - Can override course price
- `status` (Enumeration: Open, Full, Cancelled, Completed)
- `notes` (Text)

**Display Locations:**
- Training Calendar page (`/training/training-calendar`)

---

### 1.11 Downloads
**Purpose:** Downloadable resources, forms, and documents

**Fields:**
- `title` (Text, Required)
- `description` (Text)
- `file` (Media, Single, Required)
- `category` (Enumeration: Annual Reports, Forms, Policies, Publications, Guidelines, Templates)
- `fileSize` (Text) - e.g., "2.5 MB"
- `fileType` (Text) - e.g., "PDF", "DOCX"
- `uploadDate` (Date, Required)
- `downloadCount` (Number, Default: 0)
- `isPublic` (Boolean, Default: true)
- `requiresLogin` (Boolean, Default: false)

**Display Locations:**
- Downloads page (`/media/downloads`)
- Annual Reports (header icon link)

---

### 1.12 Photo Gallery
**Purpose:** Photo collections and albums

**Fields:**
- `albumName` (Text, Required)
- `slug` (UID, Based on albumName, Required)
- `description` (Text)
- `coverImage` (Media, Single, Required)
- `photos` (Media, Multiple, Required)
- `event` (Relation: Many-to-One with Events)
- `date` (Date)
- `photographer` (Text)
- `tags` (Relation: Many-to-Many with Tags)

**Display Locations:**
- Photo Gallery page (`/media/photo-gallery`)

---

### 1.13 Video Gallery
**Purpose:** Video content library

**Fields:**
- `title` (Text, Required)
- `slug` (UID, Based on title, Required)
- `description` (Text)
- `videoUrl` (Text, Required) - YouTube/Vimeo URL
- `thumbnail` (Media, Single)
- `duration` (Text)
- `category` (Enumeration: Events, Training, Testimonials, Documentaries, Interviews)
- `uploadDate` (Date)
- `viewCount` (Number, Default: 0)

**Display Locations:**
- Video Gallery page (`/media/video-gallery`)

---

### 1.14 Chapters
**Purpose:** Regional CUA chapters information

**Fields:**
- `chapterName` (Text, Required)
- `slug` (UID, Based on chapterName, Required)
- `region` (Text, Required)
- `description` (Rich Text)
- `address` (Text)
- `phone` (Text)
- `email` (Email)
- `chairperson` (Text)
- `secretary` (Text)
- `creditUnionsCount` (Number)
- `totalMembers` (Number)
- `establishedYear` (Number)
- `coverImage` (Media, Single)
- `activities` (Rich Text)

**Display Locations:**
- Our Chapters page (`/our-work/our-chapters`)
- Individual chapter pages (e.g., `/our-work/our-chapters/accra`)

---

### 1.15 Newsletter Subscriptions
**Purpose:** Email newsletter subscription management

**Fields:**
- `email` (Email, Required, Unique)
- `firstName` (Text)
- `lastName` (Text)
- `subscriptionDate` (DateTime)
- `isActive` (Boolean, Default: true)
- `preferences` (JSON) - For managing subscription preferences
- `source` (Text) - Where they subscribed from

**Display Locations:**
- eLetter Subscription page (`/media/eletter-subscription`)
- Footer subscription form

---

### 1.16 Contact Messages
**Purpose:** Store contact form submissions

**Fields:**
- `fullName` (Text, Required)
- `email` (Email, Required)
- `phone` (Text)
- `subject` (Text, Required)
- `message` (Long Text, Required)
- `messageType` (Enumeration: General Inquiry, Support, Partnership, Training, Membership)
- `submissionDate` (DateTime, Required)
- `status` (Enumeration: New, In Progress, Resolved, Archived)
- `responseNote` (Long Text)
- `assignedTo` (Relation: Many-to-One with Admin Users)

**Display Locations:**
- Contact page (`/contact`)

---

## 2. Single Types

### 2.1 Homepage Settings
**Purpose:** Homepage specific content and statistics

**Fields:**
- `aboutSection` (Component)
  - `title` (Text)
  - `description` (Rich Text)
  - `ctaText` (Text)
  - `ctaLink` (Text)
  - `image` (Media, Single)
- `statistics` (Component Repeatable)
  - `label` (Text) - e.g., "Members Served"
  - `value` (Text) - e.g., "2.5M+"
  - `icon` (Text) - Icon name/code
- `joinUsSection` (Component)
  - `title` (Text)
  - `description` (Text)
  - `backgroundImage` (Media, Single)

---

### 2.2 Site Settings
**Purpose:** Global website settings

**Fields:**
- `siteName` (Text)
- `siteDescription` (Text)
- `contactEmail` (Email)
- `contactPhone` (Text)
- `address` (Rich Text)
- `gpsAddress` (Text)
- `openingHours` (Text)
- `socialMedia` (Component)
  - `facebook` (Text)
  - `twitter` (Text)
  - `youtube` (Text)
  - `instagram` (Text)
  - `linkedin` (Text)
- `logo` (Media, Single)
- `logoWhite` (Media, Single)
- `favicon` (Media, Single)
- `googleAnalyticsId` (Text)
- `facebookPixelId` (Text)

---

### 2.3 About Pages Content
**Purpose:** Static content for about pages

**Fields:**
- `whoWeAre` (Rich Text)
- `roleInGhana` (Rich Text)
- `potentialAndSize` (Rich Text)
- `whatWeDo` (Rich Text)
- `vision` (Text)
- `mission` (Text)
- `coreValues` (Component Repeatable)
  - `title` (Text)
  - `description` (Text)

---

### 2.4 Ticker Content
**Purpose:** Manage scrolling ticker messages

**Fields:**
- `messages` (Component Repeatable)
  - `text` (Text, Required)
  - `icon` (Text)
  - `isActive` (Boolean)

---

## 3. Taxonomy/Supporting Types

### 3.1 News Categories
**Fields:**
- `name` (Text, Required)
- `slug` (UID, Based on name)
- `description` (Text)

---

### 3.2 Tags
**Fields:**
- `name` (Text, Required)
- `slug` (UID, Based on name)

---

### 3.3 Authors
**Fields:**
- `name` (Text, Required)
- `slug` (UID, Based on name)
- `bio` (Rich Text)
- `photo` (Media, Single)
- `email` (Email)

---

## 4. Required Strapi Plugins

### Core Plugins
1. **Media Library** - Image and file management
2. **Content Manager** - Content creation and editing
3. **Internationalization (i18n)** - For future multi-language support
4. **SEO Plugin** - Meta tags and SEO optimization
5. **Slugify** - Automatic slug generation
6. **Email Plugin** - For contact form and newsletter notifications

### Recommended Third-Party Plugins
1. **strapi-plugin-seo** - Enhanced SEO management
2. **strapi-plugin-sitemap** - Automatic sitemap generation
3. **strapi-plugin-menus** - Menu management
4. **strapi-plugin-upload-aws-s3** - AWS S3 integration for media (optional)
5. **strapi-plugin-rest-cache** - API response caching

---

## 5. API Endpoints Requirements

### 5.1 Public Endpoints (No Authentication Required)
- `GET /api/hero-slides` - Get all active hero slides
- `GET /api/events` - Get all events with filtering and pagination
- `GET /api/events/:slug` - Get single event by slug
- `GET /api/news-articles` - Get all news with filtering
- `GET /api/news-articles/:slug` - Get single article
- `GET /api/credit-unions` - Get all credit unions with filtering by region
- `GET /api/credit-unions/:slug` - Get single credit union
- `GET /api/success-stories` - Get all success stories
- `GET /api/partners` - Get all active partners
- `GET /api/board-members` - Get all active board members
- `GET /api/management-team` - Get all active management
- `GET /api/training-courses` - Get all active courses
- `GET /api/training-schedules` - Get upcoming training sessions
- `GET /api/downloads` - Get public downloads
- `GET /api/photo-galleries` - Get all photo albums
- `GET /api/video-galleries` - Get all videos
- `GET /api/chapters` - Get all chapters
- `GET /api/homepage-settings` - Get homepage content
- `GET /api/site-settings` - Get global site settings
- `POST /api/newsletter-subscriptions` - Subscribe to newsletter
- `POST /api/contact-messages` - Submit contact form

### 5.2 Protected Endpoints (Authentication Required)
- Admin CRUD operations for all content types
- Download statistics tracking
- Newsletter management

---

## 6. Integration Points with Next.js

### 6.1 Data Fetching Strategy
- **Static Generation (SSG)**: Homepage, About pages, Training pages
- **Incremental Static Regeneration (ISR)**: News, Events, Credit Unions directory
- **Client-Side Fetching**: Search functionality, dynamic filters

### 6.2 Environment Variables Needed
```
STRAPI_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## 7. Content Workflow

### 7.1 User Roles
1. **Super Admin** - Full access to all content and settings
2. **Content Manager** - Create, edit, publish content
3. **Editor** - Review and publish content
4. **Author** - Create and edit own content
5. **Viewer** - Read-only access

### 7.2 Publication Workflow
- **Draft** → **In Review** → **Published**
- Schedule publishing for future dates
- Versioning for content rollback

---

## 8. Performance & Optimization

### 8.1 Image Optimization
- Automatic image resizing and optimization
- Multiple image formats (WebP, JPEG)
- Responsive image variants
- CDN integration for media delivery

### 8.2 Caching Strategy
- API response caching with configurable TTL
- Cache invalidation on content updates
- Browser caching headers

### 8.3 Search & Filtering
- Full-text search across content types
- Advanced filtering by date, category, region
- Pagination with customizable page size

---

## 9. Security Requirements

### 9.1 API Security
- JWT authentication for admin access
- API rate limiting
- CORS configuration
- Input validation and sanitization

### 9.2 Data Protection
- Secure password policies
- Role-based access control (RBAC)
- Audit logs for content changes
- Regular backups

---

## 10. Migration & Data Import

### 10.1 Initial Data
- Import existing partner logos
- Seed initial credit union data
- Import board members and management team
- Historical events and news articles

### 10.2 Migration Scripts Needed
- CSV import for credit unions database
- Image bulk upload
- User account creation

---

## 11. Monitoring & Analytics

### 11.1 Content Analytics
- Download counts tracking
- Video view counts
- Popular content reports
- User engagement metrics

### 11.2 System Monitoring
- API performance monitoring
- Error logging and tracking
- Uptime monitoring
- Database performance

---

## 12. Additional Features

### 12.1 Search Functionality
- Global site search
- Credit union finder (by location, region)
- Advanced filtering

### 12.2 Forms
- Contact form with email notifications
- Newsletter subscription with confirmation
- Training registration
- Credit union formation inquiry

### 12.3 Maps Integration
- Google Maps for credit union locations
- Interactive chapter map
- Location finder

---

## Next Steps

1. **Phase 1**: Set up Strapi instance and configure basic content types
2. **Phase 2**: Create API endpoints and test with Next.js
3. **Phase 3**: Implement authentication and user roles
4. **Phase 4**: Data migration and content population
5. **Phase 5**: Testing, optimization, and deployment

---

**Document Version**: 1.0
**Last Updated**: 2025-10-03
**Prepared for**: CUA Ghana Website - Strapi CMS Implementation
