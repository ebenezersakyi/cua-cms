# Media Pages API Requirements Documentation

## Overview

This document outlines the API requirements for integrating the CUA Ghana website's Media pages with the Strapi CMS backend. The Media section consists of 4 pages that need API integration:

1. **Downloads** - Document library for downloadable files
2. **eLetter Subscription** - Newsletter subscription form
3. **Photo Gallery** - Image gallery with categories and lightbox
4. **Video Gallery** - YouTube video gallery with modal player

---

## Table of Contents

- [1. Downloads Page](#1-downloads-page)
- [2. eLetter Subscription Page](#2-eletter-subscription-page)
- [3. Photo Gallery Page](#3-photo-gallery-page)
- [4. Video Gallery Page](#4-video-gallery-page)
- [5. API Integration Summary](#5-api-integration-summary)
- [6. Frontend Implementation Guide](#6-frontend-implementation-guide)

---

## 1. Downloads Page

### Page Overview
Location: `/media/downloads`
Current file: `app/media/downloads/page.js`

The Downloads page displays downloadable documents (PDFs, forms, guidelines, publications) in a card grid format. Each document card shows:
- File icon and color
- File name
- Description
- File format (PDF, DOC, etc.)
- File size
- Download button

### API Endpoints Needed

#### 1.1 Get Downloads Page Configuration
```
GET /api/downloads-page
```

**Purpose**: Fetch page configuration including hero section and intro text.

**Query Parameters**:
- `populate=deep` - Populate all nested relations

**Response Structure**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Media",
      "title": "Downloads",
      "description": "Access important documents, forms, guidelines, and publications from CUA Ghana.",
      "backgroundImage": {
        "url": "/uploads/hero_bg_123.jpg",
        "alternativeText": "Downloads hero image"
      }
    },
    "introSection": {
      "heading": "Available Downloads",
      "description": "Browse and download essential documents and publications"
    },
    "helpSection": {
      "heading": "Need Help?",
      "description": "If you're having trouble accessing or downloading any documents...",
      "buttons": [
        {
          "text": "Contact Support",
          "link": "/contact",
          "style": "primary"
        },
        {
          "text": "View Photo Gallery",
          "link": "/media/photo-gallery",
          "style": "secondary"
        }
      ]
    }
  }
}
```

#### 1.2 Get Downloadable Files Collection
```
GET /api/downloadable-files
```

**Purpose**: Fetch the collection of downloadable files.

**Query Parameters**:
- `populate=file` - Populate file relation
- `filters[isActive][$eq]=true` - Only active files
- `sort=displayOrder:asc` - Sort by display order
- `pagination[pageSize]=50` - Limit results

**Response Structure**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Revised Criteria For Study Group Operations",
      "description": "Updated guidelines for study group operations and management",
      "format": "PDF",
      "fileSize": "63.45 KB",
      "icon": "FiFolder",
      "color": "bg-blue-500",
      "displayOrder": 1,
      "isActive": true,
      "category": "Guidelines",
      "file": {
        "url": "/uploads/study_group_criteria_2024.pdf",
        "name": "study_group_criteria_2024.pdf",
        "size": 64972,
        "mime": "application/pdf"
      },
      "downloadCount": 1250,
      "publishedAt": "2024-01-15T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Revised Criteria For Credit Union Affiliation",
      "description": "Requirements and criteria for credit union affiliation with CUA Ghana",
      "format": "PDF",
      "fileSize": "168.06 KB",
      "icon": "FiFileText",
      "color": "bg-purple-500",
      "displayOrder": 2,
      "isActive": true,
      "category": "Forms",
      "file": {
        "url": "/uploads/affiliation_criteria_2024.pdf",
        "name": "affiliation_criteria_2024.pdf",
        "size": 172092,
        "mime": "application/pdf"
      },
      "downloadCount": 980,
      "publishedAt": "2024-01-20T00:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

#### 1.3 Track File Download (Optional)
```
POST /api/file-downloads
```

**Purpose**: Track download statistics for analytics.

**Request Body**:
```json
{
  "data": {
    "fileId": 1,
    "downloadDate": "2024-03-15T10:30:00.000Z",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Data Model: DownloadablePage (Single Type)

```typescript
interface DownloadablePage {
  id: number;
  heroSection: {
    badge: string;
    title: string;
    description: string;
    backgroundImage: Media;
  };
  introSection: {
    heading: string;
    description: string;
  };
  helpSection: {
    heading: string;
    description: string;
    buttons: Array<{
      text: string;
      link: string;
      style: 'primary' | 'secondary';
    }>;
  };
  seo?: SEO;
}
```

### Data Model: DownloadableFile (Collection Type)

```typescript
interface DownloadableFile {
  id: number;
  name: string;
  description: string;
  format: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX' | 'ZIP';
  fileSize: string; // e.g., "63.45 KB"
  icon: string; // Icon name (e.g., "FiFolder", "FiFileText")
  color: string; // Tailwind class (e.g., "bg-blue-500")
  displayOrder: number;
  isActive: boolean;
  category: string; // e.g., "Guidelines", "Forms", "Publications"
  file: Media; // Strapi file upload
  downloadCount?: number;
  publishedAt: Date;
}
```

---

## 2. eLetter Subscription Page

### Page Overview
Location: `/media/eletter-subscription`
Current file: `app/media/eletter-subscription/page.js`

The eLetter Subscription page provides a simple newsletter signup form with:
- Hero section
- Benefits of subscribing (3 cards)
- Subscription form (Name + Email)
- Privacy notice
- Success message after submission

### API Endpoints Needed

#### 2.1 Get eLetter Subscription Page Configuration
```
GET /api/eletter-subscription-page
```

**Purpose**: Fetch page configuration including hero section and benefits.

**Query Parameters**:
- `populate=deep` - Populate all nested relations

**Response Structure**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Media",
      "title": "eLetter Subscription",
      "description": "Stay informed with our monthly eNewsletter featuring updates, financial tips, and exclusive content.",
      "backgroundImage": {
        "url": "/uploads/hero_bg_234.jpg",
        "alternativeText": "Newsletter hero"
      }
    },
    "introSection": {
      "heading": "Subscribe to our eNewsletter",
      "description": "Join thousands of credit union members and stakeholders staying informed about CUA Ghana"
    },
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
    ],
    "privacyNotice": {
      "text": "By providing your email address, you consent to receive promotional emails and financial tips from CUA. We do not share your information with third parties.",
      "privacyPolicyLink": "/privacy-policy"
    },
    "successMessage": {
      "heading": "Successfully Subscribed!",
      "message": "Thank you for subscribing to our eNewsletter. You'll start receiving updates at your email address."
    }
  }
}
```

#### 2.2 Submit Newsletter Subscription
```
POST /api/newsletter-subscriptions
```

**Purpose**: Submit newsletter subscription form.

**Request Body**:
```json
{
  "data": {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "source": "Website - eLetter Page",
    "subscribedAt": "2024-03-15T10:30:00.000Z",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "isActive": true
  }
}
```

**Response**:
```json
{
  "data": {
    "id": 123,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "source": "Website - eLetter Page",
    "subscribedAt": "2024-03-15T10:30:00.000Z",
    "isActive": true,
    "confirmedAt": null
  }
}
```

### Data Model: ELetterSubscriptionPage (Single Type)

```typescript
interface ELetterSubscriptionPage {
  id: number;
  heroSection: HeroSection;
  introSection: {
    heading: string;
    description: string;
  };
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  privacyNotice: {
    text: string;
    privacyPolicyLink: string;
  };
  successMessage: {
    heading: string;
    message: string;
  };
  seo?: SEO;
}
```

### Data Model: NewsletterSubscription (Collection Type)

```typescript
interface NewsletterSubscription {
  id: number;
  fullName: string;
  email: string;
  source: string; // Where they subscribed from
  subscribedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  confirmedAt?: Date; // For double opt-in
  unsubscribedAt?: Date;
}
```

---

## 3. Photo Gallery Page

### Page Overview
Location: `/media/photo-gallery`
Current file: `app/media/photo-gallery/page.js`

The Photo Gallery page displays a filterable grid of photos with:
- Hero section
- Category filter buttons
- Photo grid (masonry layout)
- Lightbox modal for viewing full-size images
- Image navigation (prev/next)

### API Endpoints Needed

#### 3.1 Get Photo Gallery Page Configuration
```
GET /api/photo-gallery-page
```

**Purpose**: Fetch page configuration including hero section.

**Query Parameters**:
- `populate=deep` - Populate all nested relations

**Response Structure**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Media",
      "title": "Photo Gallery",
      "description": "Explore moments from our events, training sessions, and community activities across Ghana.",
      "backgroundImage": {
        "url": "/uploads/hero_bg_345.jpg",
        "alternativeText": "Photo gallery hero"
      }
    },
    "introSection": {
      "heading": "Browse by Category",
      "description": null
    }
  }
}
```

#### 3.2 Get Photo Categories
```
GET /api/photo-categories
```

**Purpose**: Fetch photo categories for filtering.

**Query Parameters**:
- `filters[isActive][$eq]=true` - Only active categories
- `sort=displayOrder:asc` - Sort by display order

**Response Structure**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Events & Conferences",
      "slug": "events-conferences",
      "description": "Photos from our events and conferences",
      "displayOrder": 1,
      "isActive": true,
      "photoCount": 6
    },
    {
      "id": 2,
      "name": "Training Sessions",
      "slug": "training-sessions",
      "description": "Photos from training programs",
      "displayOrder": 2,
      "isActive": true,
      "photoCount": 4
    }
  ],
  "meta": {
    "pagination": {
      "total": 5
    }
  }
}
```

#### 3.3 Get Photos Collection
```
GET /api/photos
```

**Purpose**: Fetch the collection of photos.

**Query Parameters**:
- `populate=image,category` - Populate relations
- `filters[isActive][$eq]=true` - Only active photos
- `filters[category][slug][$eq]=events-conferences` - Filter by category
- `sort[0]=displayOrder:asc` - Primary sort
- `sort[1]=publishedAt:desc` - Secondary sort
- `pagination[pageSize]=50` - Limit results

**Response Structure**:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Annual General Meeting 2024",
      "description": "CUA Ghana's Annual General Meeting with members and stakeholders",
      "displayOrder": 1,
      "isActive": true,
      "publishedAt": "2024-02-15T00:00:00.000Z",
      "category": {
        "id": 1,
        "name": "Events & Conferences",
        "slug": "events-conferences"
      },
      "image": {
        "url": "/uploads/agm_2024_main.jpg",
        "alternativeText": "AGM 2024 main hall",
        "width": 1920,
        "height": 1080,
        "formats": {
          "large": {
            "url": "/uploads/large_agm_2024_main.jpg",
            "width": 1000,
            "height": 563
          },
          "medium": {
            "url": "/uploads/medium_agm_2024_main.jpg",
            "width": 750,
            "height": 422
          },
          "small": {
            "url": "/uploads/small_agm_2024_main.jpg",
            "width": 500,
            "height": 281
          },
          "thumbnail": {
            "url": "/uploads/thumbnail_agm_2024_main.jpg",
            "width": 245,
            "height": 138
          }
        }
      },
      "photographer": "CUA Photography Team",
      "captureDate": "2024-02-10T00:00:00.000Z",
      "viewCount": 523
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "pageCount": 1,
      "total": 16
    }
  }
}
```

### Data Model: PhotoGalleryPage (Single Type)

```typescript
interface PhotoGalleryPage {
  id: number;
  heroSection: HeroSection;
  introSection: {
    heading: string;
    description?: string;
  };
  seo?: SEO;
}
```

### Data Model: PhotoCategory (Collection Type)

```typescript
interface PhotoCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  photoCount?: number; // Computed field
}
```

### Data Model: Photo (Collection Type)

```typescript
interface Photo {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  publishedAt: Date;
  category: PhotoCategory;
  image: Media; // High-resolution image with formats
  photographer?: string;
  captureDate?: Date;
  viewCount?: number;
  tags?: string[];
}
```

---

## 4. Video Gallery Page

### Page Overview
Location: `/media/video-gallery`
Current file: `app/media/video-gallery/page.js`

The Video Gallery page displays YouTube videos with:
- Hero section
- Video grid with thumbnails
- Video modal player
- YouTube channel CTA section

### API Endpoints Needed

#### 4.1 Get Video Gallery Page Configuration
```
GET /api/video-gallery-page
```

**Purpose**: Fetch page configuration including hero section and CTA.

**Query Parameters**:
- `populate=deep` - Populate all nested relations

**Response Structure**:
```json
{
  "data": {
    "id": 1,
    "heroSection": {
      "badge": "CUA Media",
      "title": "Video Gallery",
      "description": "Watch our latest videos featuring events, training sessions, success stories, and more from CUA Ghana.",
      "backgroundImage": {
        "url": "/uploads/hero_bg_456.jpg",
        "alternativeText": "Video gallery hero"
      }
    },
    "introSection": {
      "heading": "Featured Videos",
      "description": "Explore our collection of videos showcasing CUA Ghana's impact and activities"
    },
    "ctaSection": {
      "heading": "Subscribe to Our YouTube Channel",
      "description": "Stay updated with our latest videos and never miss important announcements.",
      "buttonText": "Subscribe on YouTube",
      "buttonLink": "https://youtube.com/@cuaghana",
      "icon": "FiYoutube"
    }
  }
}
```

#### 4.2 Get Videos Collection
```
GET /api/videos
```

**Purpose**: Fetch the collection of videos.

**Query Parameters**:
- `populate=thumbnail,category` - Populate relations
- `filters[isActive][$eq]=true` - Only active videos
- `filters[category][slug][$eq]=success-stories` - Filter by category (optional)
- `sort[0]=displayOrder:asc` - Primary sort
- `sort[1]=publishedAt:desc` - Secondary sort
- `pagination[pageSize]=50` - Limit results

**Response Structure**:
```json
{
  "data": [
    {
      "id": 1,
      "title": "CUA Ghana Annual General Meeting 2024",
      "description": "Highlights from our 2024 Annual General Meeting with members across Ghana",
      "youtubeId": "dQw4w9WgXcQ",
      "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "duration": "PT15M30S", // ISO 8601 duration format (15 minutes 30 seconds)
      "displayOrder": 1,
      "isActive": true,
      "publishedAt": "2024-03-01T00:00:00.000Z",
      "category": {
        "id": 1,
        "name": "Events & Conferences",
        "slug": "events-conferences"
      },
      "thumbnail": {
        "url": "/uploads/agm_2024_thumb.jpg",
        "alternativeText": "AGM 2024 thumbnail"
      },
      "viewCount": 1250,
      "likes": 89,
      "tags": ["AGM", "Annual Meeting", "2024"]
    },
    {
      "id": 2,
      "title": "Member Success Story - Ama's Journey",
      "description": "How credit union membership transformed Ama's business and life",
      "youtubeId": "abc123xyz",
      "videoUrl": "https://www.youtube.com/watch?v=abc123xyz",
      "duration": "PT8M45S",
      "displayOrder": 2,
      "isActive": true,
      "publishedAt": "2024-02-15T00:00:00.000Z",
      "category": {
        "id": 3,
        "name": "Success Stories",
        "slug": "success-stories"
      },
      "thumbnail": null, // Will use YouTube auto-generated thumbnail
      "viewCount": 2340,
      "likes": 156,
      "tags": ["Success Story", "Member", "Testimonial"]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "pageCount": 1,
      "total": 12
    }
  }
}
```

#### 4.3 Get Video Categories (Optional)
```
GET /api/video-categories
```

**Purpose**: Fetch video categories for filtering (if implementing category filter).

**Response Structure**: Similar to Photo Categories

### Data Model: VideoGalleryPage (Single Type)

```typescript
interface VideoGalleryPage {
  id: number;
  heroSection: HeroSection;
  introSection: {
    heading: string;
    description: string;
  };
  ctaSection: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    icon: string;
  };
  seo?: SEO;
}
```

### Data Model: VideoCategory (Collection Type)

```typescript
interface VideoCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  videoCount?: number;
}
```

### Data Model: Video (Collection Type)

```typescript
interface Video {
  id: number;
  title: string;
  description: string;
  youtubeId: string; // e.g., "dQw4w9WgXcQ"
  videoUrl: string; // Full YouTube URL
  duration?: string; // ISO 8601 duration format
  displayOrder: number;
  isActive: boolean;
  publishedAt: Date;
  category?: VideoCategory;
  thumbnail?: Media; // Custom thumbnail (optional)
  viewCount?: number;
  likes?: number;
  tags?: string[];
}
```

---

## 5. API Integration Summary

### Complete List of API Endpoints

| Endpoint | Method | Purpose | Page |
|----------|--------|---------|------|
| `/api/downloads-page` | GET | Page configuration | Downloads |
| `/api/downloadable-files` | GET | Downloadable files collection | Downloads |
| `/api/file-downloads` | POST | Track download (optional) | Downloads |
| `/api/eletter-subscription-page` | GET | Page configuration | eLetter |
| `/api/newsletter-subscriptions` | POST | Submit subscription | eLetter |
| `/api/photo-gallery-page` | GET | Page configuration | Photo Gallery |
| `/api/photo-categories` | GET | Photo categories | Photo Gallery |
| `/api/photos` | GET | Photos collection | Photo Gallery |
| `/api/video-gallery-page` | GET | Page configuration | Video Gallery |
| `/api/videos` | GET | Videos collection | Video Gallery |
| `/api/video-categories` | GET | Video categories (optional) | Video Gallery |

### Common Data Structures

#### HeroSection
```typescript
interface HeroSection {
  badge: string;
  title: string;
  description: string;
  backgroundImage: Media;
}
```

#### Media (Strapi Media Object)
```typescript
interface Media {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  size?: number; // in KB
  mime?: string;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    thumbnail?: MediaFormat;
  };
}

interface MediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}
```

#### SEO
```typescript
interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaImage?: Media;
  keywords?: string;
  canonicalURL?: string;
}
```

---

## 6. Frontend Implementation Guide

### 6.1 lib/strapi.js Functions to Add

```javascript
// ===========================
// MEDIA PAGES
// ===========================

/**
 * Get Downloads Page
 */
export async function getDownloadsPage() {
  const data = await fetchAPI('/api/downloads-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

/**
 * Get Downloadable Files
 */
export async function getDownloadableFiles(filters = {}) {
  const queryParams = {
    'populate': 'file',
    'filters[isActive][$eq]': true,
    'sort': 'displayOrder:asc',
  };

  // Filter by category
  if (filters.category) {
    queryParams['filters[category][$eq]'] = filters.category;
  }

  // Add pagination
  if (filters.pageSize) {
    queryParams['pagination[pageSize]'] = filters.pageSize;
  }

  const data = await fetchAPI('/api/downloadable-files', {
    next: { revalidate: 3600 },
  }, queryParams);
  return data;
}

/**
 * Track File Download (Optional)
 */
export async function trackFileDownload(fileId) {
  const data = await fetchAPI('/api/file-downloads', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        fileId,
        downloadDate: new Date().toISOString()
      }
    }),
  });
  return data;
}

/**
 * Get eLetter Subscription Page
 */
export async function getELetterSubscriptionPage() {
  const data = await fetchAPI('/api/eletter-subscription-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

/**
 * Submit Newsletter Subscription
 * Note: This function already exists in strapi.js as subscribeToNewsletter()
 * May need to rename or adjust to match new endpoint
 */
export async function submitNewsletterSubscription(email, fullName, source = 'Website - eLetter Page') {
  const data = await fetchAPI('/api/newsletter-subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        email,
        fullName,
        source,
        subscribedAt: new Date().toISOString(),
        isActive: true
      }
    }),
  });
  return data;
}

/**
 * Get Photo Gallery Page
 */
export async function getPhotoGalleryPage() {
  const data = await fetchAPI('/api/photo-gallery-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

/**
 * Get Photo Categories
 */
export async function getPhotoCategories() {
  const data = await fetchAPI('/api/photo-categories', {
    next: { revalidate: 3600 },
  }, {
    'filters[isActive][$eq]': true,
    'sort': 'displayOrder:asc',
  });
  return data;
}

/**
 * Get Photos
 */
export async function getPhotos(filters = {}) {
  const queryParams = {
    'populate': 'image,category',
    'filters[isActive][$eq]': true,
    'sort[0]': 'displayOrder:asc',
    'sort[1]': 'publishedAt:desc',
  };

  // Filter by category
  if (filters.category) {
    queryParams['filters[category][slug][$eq]'] = filters.category;
  }

  // Add pagination
  if (filters.pageSize) {
    queryParams['pagination[pageSize]'] = filters.pageSize;
  }

  const data = await fetchAPI('/api/photos', {
    next: { revalidate: 3600 },
  }, queryParams);
  return data;
}

/**
 * Get Video Gallery Page
 */
export async function getVideoGalleryPage() {
  const data = await fetchAPI('/api/video-gallery-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

/**
 * Get Video Categories
 */
export async function getVideoCategories() {
  const data = await fetchAPI('/api/video-categories', {
    next: { revalidate: 3600 },
  }, {
    'filters[isActive][$eq]': true,
    'sort': 'displayOrder:asc',
  });
  return data;
}

/**
 * Get Videos
 */
export async function getVideos(filters = {}) {
  const queryParams = {
    'populate': 'thumbnail,category',
    'filters[isActive][$eq]': true,
    'sort[0]': 'displayOrder:asc',
    'sort[1]': 'publishedAt:desc',
  };

  // Filter by category
  if (filters.category) {
    queryParams['filters[category][slug][$eq]'] = filters.category;
  }

  // Add pagination
  if (filters.pageSize) {
    queryParams['pagination[pageSize]'] = filters.pageSize;
  }

  const data = await fetchAPI('/api/videos', {
    next: { revalidate: 3600 },
  }, queryParams);
  return data;
}
```

### 6.2 Integration Pattern

All media pages should follow the established integration pattern:

```javascript
"use client";

import { useState, useEffect } from "react";
import { get[PageName]Page, get[Collection] } from "../../../lib/strapi";
import CMSDataLoader from "../../components/CMSDataLoader";

export default function PageName() {
  const [pageData, setPageData] = useState(null);
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [pageResponse, collectionResponse] = await Promise.all([
          get[PageName]Page(),
          get[Collection]()
        ]);

        if (pageResponse?.data) setPageData(pageResponse.data);
        if (collectionResponse?.data) setCollectionData(collectionResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Prepare data with fallback
  const heroData = pageData?.heroSection || { /* static fallback */ };

  return (
    <div>
      <CMSDataLoader loading={loading} error={error} />
      {/* Page content */}
    </div>
  );
}
```

### 6.3 Helper Functions

#### Get YouTube Thumbnail URL
```javascript
export function getYouTubeThumbnail(youtubeId, quality = 'maxresdefault') {
  // quality options: default, mqdefault, hqdefault, sddefault, maxresdefault
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}
```

#### Format File Size
```javascript
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
```

#### Extract YouTube ID from URL
```javascript
export function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
```

### 6.4 File Download Implementation

```javascript
const handleDownload = async (file) => {
  try {
    // Optional: Track download
    if (file.id) {
      await trackFileDownload(file.id);
    }

    // Trigger download
    const link = document.createElement('a');
    link.href = getStrapiMedia(file.file);
    link.download = file.name || file.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
  }
};
```

---

## 7. Testing Checklist

### Downloads Page
- [ ] Page loads with hero section from API
- [ ] All downloadable files display correctly
- [ ] File icons and colors render properly
- [ ] File sizes display correctly
- [ ] Download button triggers file download
- [ ] Download tracking works (if implemented)
- [ ] Loading states display correctly
- [ ] Error states handled gracefully
- [ ] Stats section updates dynamically
- [ ] Help section links work

### eLetter Subscription Page
- [ ] Page loads with hero section from API
- [ ] Benefits cards display from API data
- [ ] Form validation works
- [ ] Form submits to API successfully
- [ ] Success message displays after submission
- [ ] Error handling works
- [ ] Privacy notice displays correctly
- [ ] Privacy policy link works
- [ ] Email validation works
- [ ] Duplicate email handling

### Photo Gallery Page
- [ ] Page loads with hero section from API
- [ ] Categories load and display correctly
- [ ] Category filtering works
- [ ] Photo grid displays all photos
- [ ] Photo count matches category count
- [ ] Lightbox opens on photo click
- [ ] Image navigation (prev/next) works
- [ ] High-resolution images load in lightbox
- [ ] Image formats optimization works
- [ ] Empty state displays when no photos
- [ ] Loading states work correctly

### Video Gallery Page
- [ ] Page loads with hero section from API
- [ ] All videos display in grid
- [ ] YouTube thumbnails load correctly
- [ ] Video modal opens on click
- [ ] YouTube embed plays automatically
- [ ] Video information displays correctly
- [ ] CTA section renders properly
- [ ] YouTube channel link works
- [ ] Custom thumbnails override YouTube thumbnails (if provided)
- [ ] Video duration displays correctly (if shown)

---

## 8. Implementation Priority

Recommended order of implementation:

1. **eLetter Subscription** - Simplest page with form submission
2. **Downloads** - Moderate complexity with file handling
3. **Video Gallery** - Moderate complexity with YouTube integration
4. **Photo Gallery** - Most complex with image optimization and lightbox

---

## 9. Notes and Considerations

### Performance Optimization
- Use Next.js Image component for photo gallery
- Implement lazy loading for images
- Use appropriate image formats (WebP with fallback)
- Cache API responses (1 hour recommended)

### File Management
- Store files in Strapi media library
- Support multiple file formats (PDF, DOC, XLS, etc.)
- Implement file size limits
- Consider CDN for file delivery

### YouTube Integration
- Store YouTube video ID separately for flexibility
- Support custom thumbnails that override YouTube defaults
- Handle YouTube API rate limits
- Consider video privacy settings

### Photo Gallery
- Implement image optimization with multiple formats
- Use responsive images with srcset
- Consider implementing albums/collections
- Add image metadata (photographer, date, etc.)

### Security
- Validate file uploads in Strapi
- Sanitize form inputs
- Implement CAPTCHA for newsletter form (optional)
- Rate limit API endpoints

### Analytics
- Track download counts
- Track video views
- Track photo views
- Track newsletter subscription rates

---

## End of Documentation
