# STRAPI API INTEGRATION GUIDE
## CUA Ghana Website - Frontend Integration

**Version**: 1.0
**Date**: 2025-10-16
**Strapi Version**: 5.25.0
**Frontend**: Next.js 15.5.2

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [API Configuration](#api-configuration)
3. [Environment Setup](#environment-setup)
4. [API Endpoints](#api-endpoints)
5. [Data Fetching Utilities](#data-fetching-utilities)
6. [Component Integration Examples](#component-integration-examples)
7. [Image Handling](#image-handling)
8. [Error Handling](#error-handling)
9. [Caching Strategy](#caching-strategy)
10. [Testing APIs](#testing-apis)

---

## 1. OVERVIEW

This guide provides complete instructions for integrating the Strapi CMS with the CUA Ghana Next.js frontend application.

### What's Been Set Up

✅ **Strapi CMS (v5.25.0)** running at `http://localhost:1337`
✅ **All Content Types** created and configured
✅ **Sample Data** populated (Hero Slides, News, Events, Partners, Credit Unions)
✅ **Public API Permissions** configured for read access
✅ **Media Library** with uploaded images

### Architecture

```
Frontend (Next.js 15)     →     Backend (Strapi 5)     →     Database (SQLite)
Port: 3000                      Port: 1337                   .tmp/data.db
```

---

## 2. API CONFIGURATION

### Base URL

**Development**: `http://localhost:1337`
**Production**: `https://your-strapi-domain.com`

### API Format

Strapi 5 uses the **Document Service API** with the following structure:

```
/api/{collection-name}
```

### Authentication

Public endpoints do not require authentication. The seed script has already configured public read permissions for all content types.

---

## 3. ENVIRONMENT SETUP

### Frontend (.env.local)

Create a `.env.local` file in your Next.js project root:

```env
# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here  # Optional: for server-side requests

# For production
# NEXT_PUBLIC_STRAPI_API_URL=https://cms.cua.org.gh
```

### Next.js Configuration

Update `next.config.mjs` to allow Strapi images:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.cua.org.gh', // Your production domain
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## 4. API ENDPOINTS

### Available Endpoints

| Collection | Endpoint | Description |
|------------|----------|-------------|
| Hero Slides | `/api/hero-slides` | Homepage carousel slides |
| News Articles | `/api/news-articles` | News and announcements |
| Events | `/api/events` | Events and programs |
| Partners | `/api/partners` | Partner organizations |
| Credit Unions | `/api/credit-unions` | Credit union directory |
| Board Members | `/api/board-members` | Board of directors |
| Management Team | `/api/management-teams` | Staff members |
| Chapters | `/api/chapters` | Regional chapters |
| Training Courses | `/api/training-courses` | CUTRAC courses |
| Training Schedule | `/api/training-schedules` | Training calendar |
| Downloads | `/api/downloads` | Downloadable resources |
| Photo Gallery | `/api/photo-galleries` | Photo albums |
| Video Gallery | `/api/video-galleries` | Video content |
| Success Stories | `/api/success-stories` | Member testimonials |
| Contact Messages | `/api/contact-messages` | Contact form submissions |
| Newsletter Subscriptions | `/api/newsletter-subscriptions` | Email subscriptions |

### Query Parameters

#### Populate Relations and Media

```
GET /api/hero-slides?populate=*
GET /api/news-articles?populate[0]=featuredImage&populate[1]=author
GET /api/events?populate[featuredImage]=*&populate[gallery]=*
```

#### Filtering

```
GET /api/news-articles?filters[isTickerItem][$eq]=true
GET /api/credit-unions?filters[isTop20][$eq]=true
GET /api/events?filters[status][$eq]=Upcoming
GET /api/credit-unions?filters[region][$eq]=Greater Accra
```

#### Sorting

```
GET /api/hero-slides?sort=order:asc
GET /api/news-articles?sort=publishedDate:desc
GET /api/credit-unions?sort=ranking:asc
GET /api/partners?sort=displayOrder:asc
```

#### Pagination

```
GET /api/news-articles?pagination[page]=1&pagination[pageSize]=10
GET /api/events?pagination[start]=0&pagination[limit]=3
```

#### Combined Query

```
GET /api/news-articles?filters[isFeatured][$eq]=true&populate=*&sort=publishedDate:desc&pagination[limit]=5
```

---

## 5. DATA FETCHING UTILITIES

### Create API Service Layer

Create `lib/strapi.js` in your Next.js project:

```javascript
// lib/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 * @param {string} endpoint - The API endpoint (e.g., 'hero-slides')
 * @param {object} options - Query options (populate, filters, sort, pagination)
 * @param {object} fetchOptions - Additional fetch options
 * @returns {Promise<object>} The API response data
 */
export async function fetchAPI(endpoint, options = {}, fetchOptions = {}) {
  const { populate, filters, sort, pagination } = options;

  // Build query parameters
  const params = new URLSearchParams();

  // Handle populate
  if (populate) {
    if (populate === '*') {
      params.append('populate', '*');
    } else if (Array.isArray(populate)) {
      populate.forEach((item, index) => {
        params.append(`populate[${index}]`, item);
      });
    } else if (typeof populate === 'object') {
      Object.entries(populate).forEach(([key, value]) => {
        params.append(`populate[${key}]`, value);
      });
    }
  }

  // Handle filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([operator, val]) => {
          params.append(`filters[${key}][${operator}]`, val);
        });
      } else {
        params.append(`filters[${key}]`, value);
      }
    });
  }

  // Handle sorting
  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach((s) => params.append('sort', s));
    } else {
      params.append('sort', sort);
    }
  }

  // Handle pagination
  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      params.append(`pagination[${key}]`, value);
    });
  }

  const queryString = params.toString();
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get full URL for Strapi media files
 * @param {string|object} url - The media URL or media object
 * @returns {string} The full media URL
 */
export function getStrapiMedia(url) {
  if (!url) return null;

  // Handle media object from Strapi 5
  if (typeof url === 'object' && url.url) {
    url = url.url;
  }

  // Return full URL if already absolute
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Return Strapi URL
  return `${STRAPI_URL}${url}`;
}

/**
 * Format Strapi date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Extract data from Strapi response
 * @param {object} response - Strapi API response
 * @returns {array|object} Extracted data
 */
export function extractData(response) {
  if (!response) return null;

  // Handle single item
  if (response.data && !Array.isArray(response.data)) {
    return {
      id: response.data.id,
      ...response.data,
    };
  }

  // Handle array of items
  if (response.data && Array.isArray(response.data)) {
    return response.data.map(item => ({
      id: item.id,
      ...item,
    }));
  }

  return response;
}
```

---

## 6. COMPONENT INTEGRATION EXAMPLES

### Example 1: Hero Slides

```javascript
// app/components/Hero.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchAPI, getStrapiMedia, extractData } from '@/lib/strapi';

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSlides() {
      try {
        const response = await fetchAPI('hero-slides', {
          populate: '*',
          filters: { isActive: { $eq: true } },
          sort: 'order:asc',
        });

        const data = extractData(response);
        setSlides(data);
      } catch (error) {
        console.error('Error loading hero slides:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSlides();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="hero-carousel">
      {slides.map((slide) => (
        <div key={slide.id} className="hero-slide">
          <Image
            src={getStrapiMedia(slide.backgroundImage?.url)}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtext}</p>
            <a href={slide.ctaLink} className="cta-button">
              {slide.ctaText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: News Ticker

```javascript
// app/components/Ticker.js
import { fetchAPI, extractData, formatDate } from '@/lib/strapi';

export default async function Ticker() {
  const response = await fetchAPI('news-articles', {
    filters: { isTickerItem: { $eq: true } },
    sort: 'publishedDate:desc',
    pagination: { limit: 10 },
  });

  const newsItems = extractData(response);

  return (
    <div className="ticker">
      {newsItems.map((item) => (
        <div key={item.id} className="ticker-item">
          <span className="ticker-date">{formatDate(item.publishedDate)}</span>
          <span className="ticker-title">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Events Grid

```javascript
// app/components/Events.js
import { fetchAPI, getStrapiMedia, extractData } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

export default async function Events() {
  const response = await fetchAPI('events', {
    populate: '*',
    filters: { isFeatured: { $eq: true } },
    sort: 'eventDate:asc',
    pagination: { limit: 3 },
  });

  const events = extractData(response);

  return (
    <div className="events-grid">
      {events.map((event, index) => (
        <Link
          key={event.id}
          href={`/events/${event.slug}`}
          className={index === 0 ? 'event-card-large' : 'event-card-small'}
        >
          {event.featuredImage && (
            <Image
              src={getStrapiMedia(event.featuredImage.url)}
              alt={event.title}
              fill
              className="object-cover"
            />
          )}
          <div className="event-content">
            <h3>{event.title}</h3>
            <p>{event.shortDescription}</p>
            <span className="event-date">
              {new Date(event.eventDate).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

### Example 4: Partners Carousel

```javascript
// app/components/Partners.js
import { fetchAPI, getStrapiMedia, extractData } from '@/lib/strapi';
import Image from 'next/image';

export default async function Partners() {
  const response = await fetchAPI('partners', {
    populate: '*',
    filters: { isActive: { $eq: true } },
    sort: 'displayOrder:asc',
  });

  const partners = extractData(response);

  return (
    <div className="partners-carousel">
      {partners.map((partner) => (
        <div key={partner.id} className="partner-logo">
          {partner.logo && (
            <Image
              src={getStrapiMedia(partner.logo.url)}
              alt={partner.name}
              width={150}
              height={80}
              className="grayscale hover:grayscale-0 transition-all"
            />
          )}
        </div>
      ))}
    </div>
  );
}
```

### Example 5: Credit Unions Directory

```javascript
// app/credit-unions/ghana/page.js
'use client';

import { useState, useEffect } from 'react';
import { fetchAPI, extractData } from '@/lib/strapi';

export default function CreditUnionsPage() {
  const [creditUnions, setCreditUnions] = useState([]);
  const [filters, setFilters] = useState({
    region: '',
    category: '',
  });

  useEffect(() => {
    async function loadCreditUnions() {
      const queryFilters = {
        isActive: { $eq: true },
      };

      if (filters.region) {
        queryFilters.region = { $eq: filters.region };
      }

      if (filters.category) {
        queryFilters.category = { $eq: filters.category };
      }

      const response = await fetchAPI('credit-unions', {
        populate: '*',
        filters: queryFilters,
        sort: 'name:asc',
      });

      const data = extractData(response);
      setCreditUnions(data);
    }

    loadCreditUnions();
  }, [filters]);

  return (
    <div>
      {/* Filters */}
      <div className="filters">
        <select
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        >
          <option value="">All Regions</option>
          <option value="Greater Accra">Greater Accra</option>
          <option value="Ashanti">Ashanti</option>
          {/* More regions... */}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </div>

      {/* Credit Unions Grid */}
      <div className="credit-unions-grid">
        {creditUnions.map((cu) => (
          <div key={cu.id} className="cu-card">
            <h3>{cu.name}</h3>
            <p>{cu.region}</p>
            <span className="badge">{cu.category}</span>
            {cu.grade && <span className="grade">{cu.grade}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 6: Top 20 Credit Unions

```javascript
// app/top-20-credit-unions/page.js
import { fetchAPI, extractData } from '@/lib/strapi';

export default async function Top20Page() {
  const response = await fetchAPI('credit-unions', {
    filters: { isTop20: { $eq: true } },
    sort: 'ranking:asc',
    pagination: { limit: 20 },
  });

  const top20 = extractData(response);

  return (
    <div className="top-20-table">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Credit Union</th>
            <th>Region</th>
            <th>Category</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {top20.map((cu) => (
            <tr key={cu.id}>
              <td>{cu.ranking}</td>
              <td>{cu.name}</td>
              <td>{cu.region}</td>
              <td>{cu.category}</td>
              <td>{cu.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 7. IMAGE HANDLING

### Using Next.js Image Component

```javascript
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';

<Image
  src={getStrapiMedia(imageUrl)}
  alt="Description"
  width={800}
  height={600}
  // OR use fill for responsive images
  // fill
  // className="object-cover"
/>
```

### Responsive Images

```javascript
<div className="relative w-full h-96">
  <Image
    src={getStrapiMedia(slide.backgroundImage?.url)}
    alt={slide.title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
    priority // For above-the-fold images
  />
</div>
```

### Image Formats

Strapi automatically generates multiple formats:
- `thumbnail`: 245x156
- `small`: 500x318
- `medium`: 750x477
- `large`: 1000x636

Access formats:
```javascript
const formats = image.formats;
const thumbnailUrl = getStrapiMedia(formats?.thumbnail?.url || image.url);
```

---

## 8. ERROR HANDLING

### Comprehensive Error Handling

```javascript
// lib/strapi.js - Updated fetchAPI function
export async function fetchAPI(endpoint, options = {}, fetchOptions = {}) {
  // ... (previous code)

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
      ...fetchOptions,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Strapi API Error (${response.status}): ${error.error?.message || response.statusText}`
      );
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);

    // Return empty data structure for graceful degradation
    return {
      data: Array.isArray(options.filters) ? [] : null,
      error: {
        message: error.message,
        endpoint,
      },
    };
  }
}
```

### Component Error Boundaries

```javascript
// app/components/ErrorBoundary.js
'use client';

export default function ErrorBoundary({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

## 9. CACHING STRATEGY

### Next.js App Router Caching

#### Static Generation (Default)

```javascript
// Automatically cached at build time
export default async function Page() {
  const data = await fetchAPI('hero-slides', { populate: '*' });
  return <div>...</div>;
}
```

#### Incremental Static Regeneration (ISR)

```javascript
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  const data = await fetchAPI('news-articles', { populate: '*' });
  return <div>...</div>;
}
```

#### Dynamic Rendering

```javascript
export const dynamic = 'force-dynamic'; // Disable caching

export default async function Page() {
  const data = await fetchAPI('events', { populate: '*' });
  return <div>...</div>;
}
```

#### On-Demand Revalidation

```javascript
// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { path } = await request.json();

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
```

---

## 10. TESTING APIS

### Using cURL

```bash
# Get all hero slides
curl "http://localhost:1337/api/hero-slides?populate=*"

# Get featured news articles
curl "http://localhost:1337/api/news-articles?filters[isFeatured][\$eq]=true&populate=*"

# Get top 20 credit unions
curl "http://localhost:1337/api/credit-unions?filters[isTop20][\$eq]=true&sort=ranking:asc"
```

### Using Postman or Insomnia

1. Import Strapi API collection
2. Set base URL: `http://localhost:1337/api`
3. Test all endpoints with different query parameters

### Browser Testing

Visit these URLs in your browser:

- http://localhost:1337/api/hero-slides?populate=*
- http://localhost:1337/api/news-articles?filters[isTickerItem][$eq]=true
- http://localhost:1337/api/events?populate=*&filters[isFeatured][$eq]=true
- http://localhost:1337/api/partners?populate=*&sort=displayOrder:asc
- http://localhost:1337/api/credit-unions?filters[isTop20][$eq]=true&sort=ranking:asc

---

## QUICK START CHECKLIST

- [ ] Start Strapi: `npm run dev` (in cua-cms folder)
- [ ] Verify API: Open http://localhost:1337/api/hero-slides?populate=*
- [ ] Copy `lib/strapi.js` to Next.js project
- [ ] Add environment variables to `.env.local`
- [ ] Update `next.config.mjs` with image domains
- [ ] Replace hardcoded data with API calls
- [ ] Test all pages
- [ ] Implement error handling
- [ ] Set up caching strategy
- [ ] Deploy Strapi backend
- [ ] Update production environment variables

---

## SUPPORT & DOCUMENTATION

- **Strapi Documentation**: https://docs.strapi.io
- **Next.js Documentation**: https://nextjs.org/docs
- **API Reference**: See `/api/documentation` endpoint in Strapi admin

---

**Created**: 2025-10-16
**For**: CUA Ghana Website
**Strapi Version**: 5.25.0
