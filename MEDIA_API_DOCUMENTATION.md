# Media Pages API Documentation

This document provides comprehensive API integration documentation for the **Media** section of the CUA Ghana website.

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Single Type Endpoints](#single-type-endpoints)
5. [Collection Type Endpoints](#collection-type-endpoints)
6. [Query Parameters](#query-parameters)
7. [Response Format](#response-format)
8. [Error Handling](#error-handling)
9. [Frontend Integration Examples](#frontend-integration-examples)
10. [Testing](#testing)

---

## Overview

The Media section provides access to downloadable files, newsletter subscription, photo gallery, and video gallery features.

### Available Pages

**Single Type Pages (4):**
- Downloads Page - Document library configuration
- eLetter Subscription Page - Newsletter subscription form configuration
- Photo Gallery Page - Photo gallery configuration
- Video Gallery Page - Video gallery configuration with YouTube integration

**Collection Types (3):**
- Downloads - Downloadable files collection
- Photo Galleries - Photo albums collection
- Video Galleries - Video content collection

**Additional Collection Types:**
- Newsletter Subscriptions - Newsletter subscriber management

---

## Base URL

```
http://localhost:1337
```

For production, replace with your production domain.

---

## Authentication

All Media page endpoints are **publicly accessible** and do not require authentication.

---

## Single Type Endpoints

### 1. Downloads Page

**Endpoint:** `GET /api/downloads-page`

**Description:** Configuration page for downloads section including hero, intro, and help information.

#### Request

```bash
GET /api/downloads-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "downloads123",
    "heroSection": {
      "id": 1,
      "badge": "CUA Media",
      "title": "Downloads",
      "description": "Access important documents, forms, guidelines, and publications from CUA Ghana.",
      "backgroundImage": {
        "id": 1,
        "url": "/uploads/downloads_hero.jpg",
        "alternativeText": "Downloads hero image",
        "formats": {
          "large": { "url": "/uploads/large_downloads_hero.jpg" },
          "medium": { "url": "/uploads/medium_downloads_hero.jpg" },
          "small": { "url": "/uploads/small_downloads_hero.jpg" }
        }
      }
    },
    "introSection": {
      "id": 1,
      "title": "Available Downloads",
      "content": "<p>Browse and download essential documents and publications...</p>",
      "videoUrl": null
    },
    "helpSection": "<h3>Need Help?</h3><p>If you're having trouble accessing or downloading any documents, please <a href='/contact'>contact our support team</a>.</p><ul><li><a href='/media/photo-gallery'>View Photo Gallery</a></li><li><a href='/media/video-gallery'>Watch Videos</a></li></ul>",
    "seo": {
      "metaTitle": "Downloads | CUA Ghana",
      "metaDescription": "Download important documents, forms, and publications from CUA Ghana",
      "keywords": "downloads, documents, forms, publications, CUA Ghana"
    }
  },
  "meta": {}
}
```

#### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `heroSection` | Component | Hero banner configuration |
| `introSection` | Component | Introduction section with title and content |
| `helpSection` | Rich Text | Help information with links |
| `seo` | Component | SEO metadata |

---

### 2. eLetter Subscription Page

**Endpoint:** `GET /api/eletter-subscription-page`

**Description:** Newsletter subscription page configuration with benefits and success message.

#### Request

```bash
GET /api/eletter-subscription-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "eletter123",
    "heroSection": {
      "id": 1,
      "badge": "CUA Media",
      "title": "eLetter Subscription",
      "description": "Stay informed with our monthly eNewsletter featuring updates, financial tips, and exclusive content.",
      "backgroundImage": {
        "url": "/uploads/newsletter_hero.jpg"
      }
    },
    "introSection": {
      "id": 1,
      "title": "Subscribe to our eNewsletter",
      "content": "<p>Join thousands of credit union members and stakeholders staying informed about CUA Ghana</p>",
      "videoUrl": null
    },
    "benefits": {
      "id": 1,
      "title": "Why Subscribe?",
      "description": "Get the most out of your subscription",
      "benefits": [
        {
          "icon": "FiMail",
          "title": "Monthly Updates",
          "description": "Get the latest news, events, and updates from CUA Ghana delivered to your inbox"
        },
        {
          "icon": "FiShield",
          "title": "Financial Tips",
          "description": "Receive expert financial advice and tips to help you make better financial decisions"
        },
        {
          "icon": "FiCheck",
          "title": "Exclusive Content",
          "description": "Access exclusive content, success stories, and insights from the credit union movement"
        }
      ]
    },
    "privacyNotice": "<p>By providing your email address, you consent to receive promotional emails and financial tips from CUA. We do not share your information with third parties. View our <a href='/privacy-policy'>Privacy Policy</a>.</p>",
    "successMessage": {
      "heading": "Successfully Subscribed!",
      "message": "Thank you for subscribing to our eNewsletter. You'll start receiving updates at your email address.",
      "icon": "FiCheckCircle"
    },
    "seo": {
      "metaTitle": "Newsletter Subscription | CUA Ghana",
      "metaDescription": "Subscribe to CUA Ghana's monthly newsletter for updates and financial tips",
      "keywords": "newsletter, subscription, updates, CUA Ghana"
    }
  },
  "meta": {}
}
```

#### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `heroSection` | Component | Hero banner configuration |
| `introSection` | Component | Introduction section |
| `benefits` | Component | Grid of subscription benefits |
| `privacyNotice` | Rich Text | Privacy policy notice |
| `successMessage` | JSON | Success message configuration |
| `seo` | Component | SEO metadata |

---

### 3. Photo Gallery Page

**Endpoint:** `GET /api/photo-gallery-page`

**Description:** Photo gallery page configuration.

#### Request

```bash
GET /api/photo-gallery-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "photogallery123",
    "heroSection": {
      "id": 1,
      "badge": "CUA Media",
      "title": "Photo Gallery",
      "description": "Explore moments from our events, training sessions, and community activities across Ghana.",
      "backgroundImage": {
        "url": "/uploads/gallery_hero.jpg"
      }
    },
    "introSection": {
      "id": 1,
      "title": "Browse by Category",
      "content": "<p>Select a category to view photos from specific events and activities</p>",
      "videoUrl": null
    },
    "seo": {
      "metaTitle": "Photo Gallery | CUA Ghana",
      "metaDescription": "Browse photos from CUA Ghana events, training sessions, and community activities",
      "keywords": "photo gallery, images, events, CUA Ghana"
    }
  },
  "meta": {}
}
```

---

### 4. Video Gallery Page

**Endpoint:** `GET /api/video-gallery-page`

**Description:** Video gallery page configuration with YouTube channel CTA.

#### Request

```bash
GET /api/video-gallery-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "videogallery123",
    "heroSection": {
      "id": 1,
      "badge": "CUA Media",
      "title": "Video Gallery",
      "description": "Watch our latest videos featuring events, training sessions, success stories, and more from CUA Ghana.",
      "backgroundImage": {
        "url": "/uploads/video_hero.jpg"
      }
    },
    "introSection": {
      "id": 1,
      "title": "Featured Videos",
      "content": "<p>Explore our collection of videos showcasing CUA Ghana's impact and activities</p>",
      "videoUrl": null
    },
    "ctaSection": {
      "id": 1,
      "title": "Subscribe to Our YouTube Channel",
      "description": "Stay updated with our latest videos and never miss important announcements.",
      "primaryCtaText": "Subscribe on YouTube",
      "primaryCtaLink": "https://youtube.com/@cuaghana",
      "secondaryCtaText": "Watch More Videos",
      "secondaryCtaLink": "/media/video-gallery"
    },
    "seo": {
      "metaTitle": "Video Gallery | CUA Ghana",
      "metaDescription": "Watch videos from CUA Ghana featuring events, training, and success stories",
      "keywords": "video gallery, YouTube, videos, CUA Ghana"
    }
  },
  "meta": {}
}
```

---

## Collection Type Endpoints

### 1. Downloads Collection

**Endpoint:** `GET /api/downloads`

**Description:** Collection of downloadable files, forms, and documents.

#### Request Examples

```bash
# Get all downloads with files
GET /api/downloads?populate=file&sort=title:asc

# Filter by category
GET /api/downloads?filters[category][$eq]=Forms&populate=file

# Only public downloads
GET /api/downloads?filters[isPublic][$eq]=true&populate=file

# Search by title
GET /api/downloads?filters[title][$contains]=Annual&populate=file
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "download123",
      "title": "Annual Report 2024",
      "description": "CUA Ghana's comprehensive annual report for 2024",
      "file": {
        "id": 1,
        "name": "annual_report_2024.pdf",
        "url": "/uploads/annual_report_2024.pdf",
        "mime": "application/pdf",
        "size": 2458369,
        "ext": ".pdf"
      },
      "category": "Annual Reports",
      "fileSize": "2.4 MB",
      "fileType": "PDF",
      "downloadCount": 1250,
      "isPublic": true,
      "requiresLogin": false,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z",
      "publishedAt": "2024-01-15T10:00:00.000Z"
    },
    {
      "id": 2,
      "documentId": "download456",
      "title": "Membership Application Form",
      "description": "Official membership application form for credit unions",
      "file": {
        "id": 2,
        "name": "membership_form.pdf",
        "url": "/uploads/membership_form.pdf",
        "mime": "application/pdf",
        "size": 156789,
        "ext": ".pdf"
      },
      "category": "Forms",
      "fileSize": "153 KB",
      "fileType": "PDF",
      "downloadCount": 3456,
      "isPublic": true,
      "requiresLogin": false,
      "createdAt": "2024-02-01T09:00:00.000Z",
      "updatedAt": "2024-02-01T09:00:00.000Z",
      "publishedAt": "2024-02-01T09:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Document title |
| `description` | Text | Document description |
| `file` | Media | Uploaded file (PDF, DOC, etc.) |
| `category` | Enum | Category: Annual Reports, Forms, Policies, Publications, Guidelines, Templates |
| `fileSize` | String | Human-readable file size |
| `fileType` | String | File type abbreviation |
| `downloadCount` | Integer | Number of downloads |
| `isPublic` | Boolean | Whether file is publicly accessible |
| `requiresLogin` | Boolean | Whether login is required to download |

---

### 2. Photo Galleries Collection

**Endpoint:** `GET /api/photo-galleries`

**Description:** Collection of photo albums and galleries.

#### Request Examples

```bash
# Get all galleries with photos
GET /api/photo-galleries?populate=coverImage,photos&sort=date:desc

# Filter by event
GET /api/photo-galleries?filters[event][title][$contains]=AGM&populate=*

# Get recent galleries
GET /api/photo-galleries?filters[date][$gte]=2024-01-01&populate=*&sort=date:desc
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "gallery123",
      "albumName": "Annual General Meeting 2024",
      "slug": "annual-general-meeting-2024",
      "description": "Photos from CUA Ghana's 2024 Annual General Meeting held in Accra",
      "coverImage": {
        "id": 1,
        "url": "/uploads/agm_2024_cover.jpg",
        "alternativeText": "AGM 2024 cover photo",
        "width": 1920,
        "height": 1080,
        "formats": {
          "large": { "url": "/uploads/large_agm_2024_cover.jpg" },
          "medium": { "url": "/uploads/medium_agm_2024_cover.jpg" },
          "small": { "url": "/uploads/small_agm_2024_cover.jpg" },
          "thumbnail": { "url": "/uploads/thumbnail_agm_2024_cover.jpg" }
        }
      },
      "photos": [
        {
          "id": 2,
          "url": "/uploads/agm_photo_1.jpg",
          "alternativeText": "AGM attendees",
          "width": 1920,
          "height": 1080,
          "formats": {
            "large": { "url": "/uploads/large_agm_photo_1.jpg" },
            "medium": { "url": "/uploads/medium_agm_photo_1.jpg" },
            "small": { "url": "/uploads/small_agm_photo_1.jpg" }
          }
        },
        {
          "id": 3,
          "url": "/uploads/agm_photo_2.jpg",
          "alternativeText": "Keynote speaker",
          "width": 1920,
          "height": 1080,
          "formats": {
            "large": { "url": "/uploads/large_agm_photo_2.jpg" },
            "medium": { "url": "/uploads/medium_agm_photo_2.jpg" },
            "small": { "url": "/uploads/small_agm_photo_2.jpg" }
          }
        }
      ],
      "date": "2024-02-15",
      "photographer": "CUA Photography Team",
      "event": {
        "id": 1,
        "title": "Annual General Meeting 2024",
        "slug": "annual-general-meeting-2024"
      },
      "tags": [
        { "id": 1, "name": "AGM" },
        { "id": 2, "name": "Annual Meeting" },
        { "id": 3, "name": "2024" }
      ],
      "createdAt": "2024-02-20T10:00:00.000Z",
      "updatedAt": "2024-02-20T10:00:00.000Z",
      "publishedAt": "2024-02-20T10:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `albumName` | String | Album/gallery name |
| `slug` | UID | URL-friendly identifier |
| `description` | Text | Album description |
| `coverImage` | Media | Cover/featured image |
| `photos` | Media (Multiple) | Array of photos in the album |
| `event` | Relation | Related event (optional) |
| `date` | Date | Album date |
| `photographer` | String | Photographer name |
| `tags` | Relation | Associated tags |

---

### 3. Video Galleries Collection

**Endpoint:** `GET /api/video-galleries`

**Description:** Collection of video content (YouTube videos).

#### Request Examples

```bash
# Get all videos with thumbnails
GET /api/video-galleries?populate=thumbnail&sort=createdAt:desc

# Filter by category
GET /api/video-galleries?filters[category][$eq]=Events&populate=*

# Search by title
GET /api/video-galleries?filters[title][$contains]=Training&populate=*
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "video123",
      "title": "CUA Ghana Annual General Meeting 2024 Highlights",
      "slug": "annual-general-meeting-2024-highlights",
      "description": "Highlights from our 2024 Annual General Meeting with members across Ghana",
      "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "thumbnail": {
        "id": 1,
        "url": "/uploads/agm_video_thumb.jpg",
        "alternativeText": "AGM 2024 video thumbnail",
        "width": 1280,
        "height": 720
      },
      "duration": "15:30",
      "category": "Events",
      "viewCount": 1250,
      "createdAt": "2024-03-01T10:00:00.000Z",
      "updatedAt": "2024-03-01T10:00:00.000Z",
      "publishedAt": "2024-03-01T10:00:00.000Z"
    },
    {
      "id": 2,
      "documentId": "video456",
      "title": "Member Success Story - Ama's Journey",
      "slug": "member-success-story-amas-journey",
      "description": "How credit union membership transformed Ama's business and life",
      "videoUrl": "https://www.youtube.com/watch?v=abc123xyz",
      "thumbnail": null,
      "duration": "8:45",
      "category": "Testimonials",
      "viewCount": 2340,
      "createdAt": "2024-02-15T09:00:00.000Z",
      "updatedAt": "2024-02-15T09:00:00.000Z",
      "publishedAt": "2024-02-15T09:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Video title |
| `slug` | UID | URL-friendly identifier |
| `description` | Text | Video description |
| `videoUrl` | String | Full YouTube video URL |
| `thumbnail` | Media | Custom thumbnail (optional, uses YouTube thumbnail if null) |
| `duration` | String | Video duration (e.g., "15:30") |
| `category` | Enum | Category: Events, Training, Testimonials, Documentaries, Interviews |
| `viewCount` | Integer | View count |

---

### 4. Newsletter Subscriptions Collection

**Endpoint:** `POST /api/newsletter-subscriptions`

**Description:** Submit newsletter subscription.

#### Request

```bash
POST /api/newsletter-subscriptions
Content-Type: application/json
```

```json
{
  "data": {
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "source": "Website - eLetter Page",
    "isActive": true
  }
}
```

#### Response

```json
{
  "data": {
    "id": 123,
    "documentId": "sub123",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "source": "Website - eLetter Page",
    "isActive": true,
    "preferences": null,
    "createdAt": "2024-03-15T10:30:00.000Z",
    "updatedAt": "2024-03-15T10:30:00.000Z"
  },
  "meta": {}
}
```

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `email` | Email | Subscriber email (unique) |
| `firstName` | String | First name (optional) |
| `lastName` | String | Last name (optional) |
| `source` | String | Subscription source |
| `isActive` | Boolean | Active status |
| `preferences` | JSON | Subscriber preferences (optional) |

---

## Query Parameters

### Common Query Parameters

All endpoints support standard Strapi query parameters:

#### 1. Populate

```bash
# Populate all relations
?populate=*

# Deep populate (all nested relations)
?populate=deep

# Populate specific fields
?populate[heroSection][populate]=backgroundImage
?populate=file,thumbnail
```

#### 2. Filters

```bash
# Exact match
?filters[category][$eq]=Forms

# Contains
?filters[title][$contains]=Annual

# Greater than or equal
?filters[downloadCount][$gte]=1000

# Boolean
?filters[isPublic][$eq]=true

# Date range
?filters[date][$gte]=2024-01-01&filters[date][$lte]=2024-12-31
```

#### 3. Sort

```bash
# Ascending
?sort=title:asc

# Descending
?sort=createdAt:desc

# Multiple sort fields
?sort[0]=category:asc&sort[1]=title:asc
```

#### 4. Pagination

```bash
# Page and page size
?pagination[page]=1&pagination[pageSize]=25

# Start and limit
?pagination[start]=0&pagination[limit]=10
```

---

## Response Format

### Successful Response

```json
{
  "data": {
    // Single type: object
    // Collection type: array of objects
  },
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 5
    }
  }
}
```

### Error Response

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found",
    "details": {}
  }
}
```

---

## Error Handling

### Common HTTP Status Codes

| Code | Name | Description |
|------|------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request parameters |
| 404 | Not Found | Resource not found (no content yet) |
| 409 | Conflict | Duplicate entry (e.g., email already subscribed) |
| 500 | Internal Server Error | Server error |

---

## Frontend Integration Examples

### Next.js Integration

#### API Client Setup

```javascript
// lib/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(path, options = {}, urlParamsObject = {}) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  }

  return response.json();
}

export default fetchAPI;
```

#### Media API Functions

```javascript
// lib/media-api.js
import fetchAPI from './strapi';

// Get Downloads Page
export async function getDownloadsPage() {
  return await fetchAPI('/api/downloads-page', {
    next: { revalidate: 3600 },
  }, { 'populate': 'deep' });
}

// Get Downloadable Files
export async function getDownloads(filters = {}) {
  const queryParams = {
    'populate': 'file',
    'sort': 'title:asc',
  };

  if (filters.category) {
    queryParams['filters[category][$eq]'] = filters.category;
  }

  if (filters.search) {
    queryParams['filters[title][$contains]'] = filters.search;
  }

  return await fetchAPI('/api/downloads', {
    next: { revalidate: 3600 },
  }, queryParams);
}

// Get eLetter Subscription Page
export async function getELetterSubscriptionPage() {
  return await fetchAPI('/api/eletter-subscription-page', {
    next: { revalidate: 3600 },
  }, { 'populate': 'deep' });
}

// Submit Newsletter Subscription
export async function submitNewsletterSubscription(data) {
  return await fetchAPI('/api/newsletter-subscriptions', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

// Get Photo Gallery Page
export async function getPhotoGalleryPage() {
  return await fetchAPI('/api/photo-gallery-page', {
    next: { revalidate: 3600 },
  }, { 'populate': 'deep' });
}

// Get Photo Galleries
export async function getPhotoGalleries(filters = {}) {
  const queryParams = {
    'populate': 'coverImage,photos,event,tags',
    'sort': 'date:desc',
  };

  if (filters.eventId) {
    queryParams['filters[event][id][$eq]'] = filters.eventId;
  }

  return await fetchAPI('/api/photo-galleries', {
    next: { revalidate: 3600 },
  }, queryParams);
}

// Get Single Photo Gallery
export async function getPhotoGalleryBySlug(slug) {
  const data = await fetchAPI('/api/photo-galleries', {
    next: { revalidate: 3600 },
  }, {
    'filters[slug][$eq]': slug,
    'populate': 'deep',
  });
  return data.data?.[0] || null;
}

// Get Video Gallery Page
export async function getVideoGalleryPage() {
  return await fetchAPI('/api/video-gallery-page', {
    next: { revalidate: 3600 },
  }, { 'populate': 'deep' });
}

// Get Videos
export async function getVideos(filters = {}) {
  const queryParams = {
    'populate': 'thumbnail',
    'sort': 'createdAt:desc',
  };

  if (filters.category) {
    queryParams['filters[category][$eq]'] = filters.category;
  }

  return await fetchAPI('/api/video-galleries', {
    next: { revalidate: 3600 },
  }, queryParams);
}

// Extract YouTube ID from URL
export function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Get YouTube Thumbnail URL
export function getYouTubeThumbnail(videoUrl, quality = 'maxresdefault') {
  const youtubeId = extractYouTubeId(videoUrl);
  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg` : null;
}
```

#### Component Examples

**Downloads Page:**

```javascript
// app/media/downloads/page.js
import { getDownloadsPage, getDownloads } from '@/lib/media-api';

export default async function DownloadsPage() {
  const [pageData, downloads] = await Promise.all([
    getDownloadsPage(),
    getDownloads({ category: null }),
  ]);

  return (
    <main>
      <HeroSection data={pageData.data.heroSection} />
      <IntroSection data={pageData.data.introSection} />
      <DownloadsList files={downloads.data} />
      <div dangerouslySetInnerHTML={{ __html: pageData.data.helpSection }} />
    </main>
  );
}
```

**Newsletter Subscription Form:**

```javascript
'use client';
import { useState } from 'react';
import { submitNewsletterSubscription } from '@/lib/media-api';

export default function NewsletterForm({ successMessage }) {
  const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitNewsletterSubscription({
        ...formData,
        source: 'Website - eLetter Page',
        isActive: true,
      });
      setSubmitted(true);
      setFormData({ email: '', firstName: '', lastName: '' });
    } catch (err) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h3>{successMessage.heading}</h3>
        <p>{successMessage.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email Address"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}
```

---

## Testing

### Test All Endpoints

```bash
#!/bin/bash
# test-media-apis.sh

BASE_URL="http://localhost:1337"

echo "Testing Media Pages APIs..."
echo ""

# Test single type pages
echo "1. Downloads Page"
curl -s "${BASE_URL}/api/downloads-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "2. eLetter Subscription Page"
curl -s "${BASE_URL}/api/eletter-subscription-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "3. Photo Gallery Page"
curl -s "${BASE_URL}/api/photo-gallery-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "4. Video Gallery Page"
curl -s "${BASE_URL}/api/video-gallery-page?populate=deep" | jq '.data.id, .error'
echo ""

# Test collection types
echo "5. Downloads Collection"
curl -s "${BASE_URL}/api/downloads?populate=file" | jq '.data | length, .meta.pagination'
echo ""

echo "6. Photo Galleries Collection"
curl -s "${BASE_URL}/api/photo-galleries?populate=coverImage,photos" | jq '.data | length, .meta.pagination'
echo ""

echo "7. Video Galleries Collection"
curl -s "${BASE_URL}/api/video-galleries?populate=thumbnail" | jq '.data | length, .meta.pagination'
echo ""

echo "Testing complete!"
```

### Make executable and run:

```bash
chmod +x test-media-apis.sh
./test-media-apis.sh
```

---

## Additional Resources

### Related Documentation
- [Main API Documentation](./API_DOCUMENTATION.md)
- [About Pages API Documentation](./ABOUT_PAGES_API_DOCUMENTATION.md)
- [Our Work Pages API Documentation](./OUR_WORK_API_DOCUMENTATION.md)
- [Credit Unions Pages API Documentation](./CREDIT_UNIONS_API_DOCUMENTATION.md)
- [Training Pages API Documentation](./TRAINING_API_DOCUMENTATION.md)
- [Media Requirements](./MEDIA_API_REQUIREMENTS.md)

### Strapi Documentation
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Filters](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication)
- [Strapi Population](https://docs.strapi.io/dev-docs/api/rest/populate-select)

---

**Last Updated:** 2025-10-27
**API Version:** Strapi v5.25.0
**Status:** Infrastructure complete, ready for content

---

## Quick Reference

### All Media Endpoints

| Page | Endpoint | Type |
|------|----------|------|
| Downloads | `/api/downloads-page` | Single Type |
| eLetter Subscription | `/api/eletter-subscription-page` | Single Type |
| Photo Gallery | `/api/photo-gallery-page` | Single Type |
| Video Gallery | `/api/video-gallery-page` | Single Type |
| Downloads Collection | `/api/downloads` | Collection |
| Photo Galleries | `/api/photo-galleries` | Collection |
| Video Galleries | `/api/video-galleries` | Collection |
| Newsletter Subscriptions | `/api/newsletter-subscriptions` | Collection |

### Common Query Patterns

```bash
# Get page with all data
/api/downloads-page?populate=deep

# Get downloads by category
/api/downloads?filters[category][$eq]=Forms&populate=file

# Get photo galleries with all media
/api/photo-galleries?populate=coverImage,photos,event&sort=date:desc

# Get videos by category
/api/video-galleries?filters[category][$eq]=Events&populate=thumbnail
```

---

## Support

For questions or issues with the Media Pages API:
1. Check this documentation
2. Review [Strapi Documentation](https://docs.strapi.io)
3. Check the main [API Documentation](./API_DOCUMENTATION.md)
4. Report issues to the development team

---
