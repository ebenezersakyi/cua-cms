# Media Pages API Integration Guide

Complete guide for integrating CUA Ghana CMS Media pages into your frontend application.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [API Endpoints](#api-endpoints)
4. [Data Models](#data-models)
5. [Frontend Integration](#frontend-integration)
6. [Code Examples](#code-examples)
7. [Best Practices](#best-practices)
8. [Testing](#testing)

---

## Overview

The Media section consists of 4 page configuration APIs (single types) and 4 collection APIs for managing media content:

### Page Configuration APIs (Single Types)
- **Downloads Page** - Configuration for the downloads section
- **eLetter Subscription Page** - Newsletter subscription page configuration
- **Photo Gallery Page** - Photo gallery configuration
- **Video Gallery Page** - Video gallery configuration

### Content Collection APIs
- **Downloads** - Downloadable files (PDFs, docs, etc.)
- **Photo Galleries** - Photo albums and images
- **Video Galleries** - Video content (YouTube integration)
- **Newsletter Subscriptions** - Email subscription management

---

## Quick Start

### Base Configuration

```typescript
// config/api.ts
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  apiPath: '/api',
  timeout: 10000,
};

export const ENDPOINTS = {
  // Page configurations
  downloadsPage: '/downloads-page',
  eletterPage: '/eletter-subscription-page',
  photoGalleryPage: '/photo-gallery-page',
  videoGalleryPage: '/video-gallery-page',

  // Collections
  downloads: '/downloads',
  photoGalleries: '/photo-galleries',
  videoGalleries: '/video-galleries',
  newsletterSubscriptions: '/newsletter-subscriptions',
};
```

### API Client Setup

```typescript
// lib/api-client.ts
import axios from 'axios';
import { API_CONFIG } from '@/config/api';

const apiClient = axios.create({
  baseURL: `${API_CONFIG.baseURL}${API_CONFIG.apiPath}`,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## API Endpoints

### 1. Downloads Page Configuration

**Endpoint:** `GET /api/downloads-page`

**Query Parameters:**
```typescript
{
  populate: 'deep' | 'heroSection,introSection,seo'
}
```

**Example Request:**
```bash
curl "http://localhost:1337/api/downloads-page?populate=deep"
```

**Response Structure:**
```typescript
interface DownloadsPageResponse {
  data: {
    id: number;
    attributes: {
      heroSection: {
        title: string;
        subtitle: string;
        backgroundImage: MediaData;
      };
      introSection: {
        heading: string;
        description: string;
        videoUrl?: string;
      };
      helpSection: string; // Rich text
      seo: SEOData;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: object;
}
```

---

### 2. Downloads Collection

**Endpoint:** `GET /api/downloads`

**Query Parameters:**
```typescript
{
  populate?: string;
  filters?: {
    category?: string;
    isPublic?: boolean;
    title?: { $contains: string };
  };
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}
```

**Example Requests:**

```bash
# Get all public downloads with file data
curl "http://localhost:1337/api/downloads?populate=file&filters[isPublic][$eq]=true"

# Get downloads by category
curl "http://localhost:1337/api/downloads?populate=file&filters[category][$eq]=Annual%20Reports"

# Search downloads
curl "http://localhost:1337/api/downloads?populate=file&filters[title][\$contains]=policy"

# Paginated downloads
curl "http://localhost:1337/api/downloads?populate=file&pagination[page]=1&pagination[pageSize]=10"
```

**Response Structure:**
```typescript
interface DownloadsResponse {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      description: string;
      file: {
        data: {
          id: number;
          attributes: {
            name: string;
            url: string;
            ext: string;
            size: number; // KB
            mime: string;
          };
        };
      };
      category: 'Annual Reports' | 'Forms' | 'Policies' | 'Publications' | 'Guidelines' | 'Templates';
      fileSize: string;
      fileType: string;
      downloadCount: number;
      isPublic: boolean;
      requiresLogin: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }>;
  meta: {
    pagination: PaginationMeta;
  };
}
```

---

### 3. eLetter Subscription Page Configuration

**Endpoint:** `GET /api/eletter-subscription-page`

**Query Parameters:**
```typescript
{
  populate: 'deep' | 'heroSection,introSection,benefits,seo'
}
```

**Example Request:**
```bash
curl "http://localhost:1337/api/eletter-subscription-page?populate=deep"
```

**Response Structure:**
```typescript
interface ELetterPageResponse {
  data: {
    id: number;
    attributes: {
      heroSection: HeroSection;
      introSection: IntroSection;
      benefits: {
        heading: string;
        benefits: Array<{
          icon: string;
          title: string;
          description: string;
        }>;
      };
      privacyNotice: string; // Rich text
      successMessage: {
        title: string;
        message: string;
        icon?: string;
      };
      seo: SEOData;
    };
  };
}
```

---

### 4. Newsletter Subscription

**Endpoint:** `POST /api/newsletter-subscriptions`

**Request Body:**
```typescript
interface NewsletterSubscriptionRequest {
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
    preferences?: {
      frequency?: 'daily' | 'weekly' | 'monthly';
      categories?: string[];
    };
    source?: string; // e.g., 'website', 'footer', 'modal'
  };
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:1337/api/newsletter-subscriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "preferences": {
        "frequency": "monthly",
        "categories": ["news", "events"]
      },
      "source": "eletter-page"
    }
  }'
```

**Response Structure:**
```typescript
interface NewsletterSubscriptionResponse {
  data: {
    id: number;
    attributes: {
      email: string;
      firstName: string;
      lastName: string;
      isActive: boolean;
      preferences: object;
      source: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
```

**Error Response:**
```typescript
interface ErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
    details?: object;
  };
}
```

---

### 5. Photo Gallery Page Configuration

**Endpoint:** `GET /api/photo-gallery-page`

**Query Parameters:**
```typescript
{
  populate: 'deep' | 'heroSection,introSection,seo'
}
```

**Example Request:**
```bash
curl "http://localhost:1337/api/photo-gallery-page?populate=deep"
```

---

### 6. Photo Galleries Collection

**Endpoint:** `GET /api/photo-galleries`

**Query Parameters:**
```typescript
{
  populate?: 'deep' | 'coverImage,photos,tags';
  filters?: {
    albumName?: { $contains: string };
    tags?: { slug: string };
  };
  sort?: string[];
  pagination?: PaginationParams;
}
```

**Example Requests:**

```bash
# Get all photo galleries with images
curl "http://localhost:1337/api/photo-galleries?populate=deep"

# Get specific album by slug
curl "http://localhost:1337/api/photo-galleries?filters[slug][\$eq]=annual-conference-2024&populate=deep"

# Get galleries by tag
curl "http://localhost:1337/api/photo-galleries?filters[tags][slug][\$eq]=conferences&populate=deep"

# Latest galleries
curl "http://localhost:1337/api/photo-galleries?sort=date:desc&pagination[limit]=6&populate=coverImage,photos"
```

**Response Structure:**
```typescript
interface PhotoGalleriesResponse {
  data: Array<{
    id: number;
    attributes: {
      albumName: string;
      slug: string;
      description: string;
      coverImage: {
        data: MediaData;
      };
      photos: {
        data: MediaData[];
      };
      event?: {
        data: EventData;
      };
      date: string;
      photographer?: string;
      tags?: {
        data: TagData[];
      };
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }>;
  meta: {
    pagination: PaginationMeta;
  };
}
```

---

### 7. Video Gallery Page Configuration

**Endpoint:** `GET /api/video-gallery-page`

**Query Parameters:**
```typescript
{
  populate: 'deep' | 'heroSection,introSection,ctaSection,seo'
}
```

**Example Request:**
```bash
curl "http://localhost:1337/api/video-gallery-page?populate=deep"
```

**Response Structure:**
```typescript
interface VideoGalleryPageResponse {
  data: {
    id: number;
    attributes: {
      heroSection: HeroSection;
      introSection: IntroSection;
      ctaSection: {
        primaryCTA: {
          label: string;
          url: string;
          variant: string;
        };
        secondaryCTA: {
          label: string;
          url: string;
          variant: string;
        };
        heading?: string;
        description?: string;
      };
      seo: SEOData;
    };
  };
}
```

---

### 8. Video Galleries Collection

**Endpoint:** `GET /api/video-galleries`

**Query Parameters:**
```typescript
{
  populate?: 'thumbnail';
  filters?: {
    category?: string;
    title?: { $contains: string };
  };
  sort?: string[];
  pagination?: PaginationParams;
}
```

**Example Requests:**

```bash
# Get all videos
curl "http://localhost:1337/api/video-galleries?populate=thumbnail"

# Get videos by category
curl "http://localhost:1337/api/video-galleries?filters[category][\$eq]=Training&populate=thumbnail"

# Search videos
curl "http://localhost:1337/api/video-galleries?filters[title][\$contains]=credit%20union&populate=thumbnail"

# Get recent videos
curl "http://localhost:1337/api/video-galleries?sort=createdAt:desc&pagination[limit]=12&populate=thumbnail"
```

**Response Structure:**
```typescript
interface VideoGalleriesResponse {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      slug: string;
      description: string;
      videoUrl: string; // YouTube URL
      thumbnail: {
        data: MediaData;
      };
      duration?: string; // e.g., "15:30"
      category: 'Events' | 'Training' | 'Testimonials' | 'Documentaries' | 'Interviews';
      viewCount: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }>;
  meta: {
    pagination: PaginationMeta;
  };
}
```

---

## Data Models

### Common Type Definitions

```typescript
// Media Data
interface MediaData {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// SEO Data
interface SEOData {
  metaTitle: string;
  metaDescription: string;
  metaImage?: {
    data: MediaData;
  };
  keywords?: string;
  canonicalURL?: string;
  metaRobots?: string;
  structuredData?: object;
}

// Hero Section
interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: {
    data: MediaData;
  };
}

// Intro Section
interface IntroSection {
  heading: string;
  description: string;
  videoUrl?: string;
}

// Pagination
interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}
```

---

## Frontend Integration

### React/Next.js Implementation

#### 1. API Service Layer

```typescript
// services/media.service.ts
import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/config/api';

export const mediaService = {
  // Page configurations
  async getDownloadsPage() {
    const { data } = await apiClient.get(ENDPOINTS.downloadsPage, {
      params: { populate: 'deep' }
    });
    return data;
  },

  async getELetterPage() {
    const { data } = await apiClient.get(ENDPOINTS.eletterPage, {
      params: { populate: 'deep' }
    });
    return data;
  },

  async getPhotoGalleryPage() {
    const { data } = await apiClient.get(ENDPOINTS.photoGalleryPage, {
      params: { populate: 'deep' }
    });
    return data;
  },

  async getVideoGalleryPage() {
    const { data } = await apiClient.get(ENDPOINTS.videoGalleryPage, {
      params: { populate: 'deep' }
    });
    return data;
  },

  // Downloads
  async getDownloads(params?: {
    category?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }) {
    const filters: any = { isPublic: { $eq: true } };

    if (params?.category) {
      filters.category = { $eq: params.category };
    }

    if (params?.search) {
      filters.title = { $contains: params.search };
    }

    const { data } = await apiClient.get(ENDPOINTS.downloads, {
      params: {
        populate: 'file',
        filters,
        pagination: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 25,
        },
        sort: 'createdAt:desc',
      }
    });
    return data;
  },

  async getDownloadById(id: number) {
    const { data } = await apiClient.get(`${ENDPOINTS.downloads}/${id}`, {
      params: { populate: 'file' }
    });
    return data;
  },

  async incrementDownloadCount(id: number) {
    const download = await this.getDownloadById(id);
    const currentCount = download.data.attributes.downloadCount || 0;

    const { data } = await apiClient.put(`${ENDPOINTS.downloads}/${id}`, {
      data: { downloadCount: currentCount + 1 }
    });
    return data;
  },

  // Newsletter
  async subscribeToNewsletter(subscriptionData: {
    email: string;
    firstName?: string;
    lastName?: string;
    preferences?: object;
    source?: string;
  }) {
    const { data } = await apiClient.post(ENDPOINTS.newsletterSubscriptions, {
      data: subscriptionData
    });
    return data;
  },

  // Photo galleries
  async getPhotoGalleries(params?: {
    tag?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }) {
    const filters: any = {};

    if (params?.tag) {
      filters.tags = { slug: { $eq: params.tag } };
    }

    if (params?.search) {
      filters.albumName = { $contains: params.search };
    }

    const { data } = await apiClient.get(ENDPOINTS.photoGalleries, {
      params: {
        populate: 'deep',
        filters,
        pagination: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 12,
        },
        sort: 'date:desc',
      }
    });
    return data;
  },

  async getPhotoGalleryBySlug(slug: string) {
    const { data } = await apiClient.get(ENDPOINTS.photoGalleries, {
      params: {
        populate: 'deep',
        filters: { slug: { $eq: slug } }
      }
    });
    return data.data[0];
  },

  // Video galleries
  async getVideoGalleries(params?: {
    category?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }) {
    const filters: any = {};

    if (params?.category) {
      filters.category = { $eq: params.category };
    }

    if (params?.search) {
      filters.title = { $contains: params.search };
    }

    const { data } = await apiClient.get(ENDPOINTS.videoGalleries, {
      params: {
        populate: 'thumbnail',
        filters,
        pagination: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 12,
        },
        sort: 'createdAt:desc',
      }
    });
    return data;
  },

  async getVideoGalleryBySlug(slug: string) {
    const { data } = await apiClient.get(ENDPOINTS.videoGalleries, {
      params: {
        populate: 'thumbnail',
        filters: { slug: { $eq: slug } }
      }
    });
    return data.data[0];
  },

  async incrementVideoViewCount(id: number) {
    const video = await apiClient.get(`${ENDPOINTS.videoGalleries}/${id}`);
    const currentCount = video.data.data.attributes.viewCount || 0;

    const { data } = await apiClient.put(`${ENDPOINTS.videoGalleries}/${id}`, {
      data: { viewCount: currentCount + 1 }
    });
    return data;
  },
};
```

---

## Code Examples

### Example 1: Downloads Page Component

```typescript
// app/media/downloads/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { mediaService } from '@/services/media.service';
import { API_CONFIG } from '@/config/api';

interface Download {
  id: number;
  attributes: {
    title: string;
    description: string;
    file: { data: any };
    category: string;
    fileSize: string;
    fileType: string;
    downloadCount: number;
  };
}

export default function DownloadsPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [page, downloadsList] = await Promise.all([
        mediaService.getDownloadsPage(),
        mediaService.getDownloads({ category: selectedCategory || undefined })
      ]);

      setPageData(page.data);
      setDownloads(downloadsList.data);
    } catch (error) {
      console.error('Error loading downloads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (download: Download) => {
    try {
      // Increment download count
      await mediaService.incrementDownloadCount(download.id);

      // Open file in new tab
      const fileUrl = `${API_CONFIG.baseURL}${download.attributes.file.data.attributes.url}`;
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  const categories = ['Annual Reports', 'Forms', 'Policies', 'Publications', 'Guidelines', 'Templates'];

  return (
    <div className="downloads-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>{pageData?.attributes.heroSection.title}</h1>
        <p>{pageData?.attributes.heroSection.subtitle}</p>
      </section>

      {/* Intro Section */}
      <section className="intro">
        <h2>{pageData?.attributes.introSection.heading}</h2>
        <div dangerouslySetInnerHTML={{ __html: pageData?.attributes.introSection.description }} />
      </section>

      {/* Category Filter */}
      <div className="filters">
        <button
          onClick={() => setSelectedCategory('')}
          className={!selectedCategory ? 'active' : ''}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Downloads List */}
      <div className="downloads-grid">
        {downloads.map(download => (
          <div key={download.id} className="download-card">
            <div className="download-icon">
              <span>{download.attributes.fileType}</span>
            </div>
            <h3>{download.attributes.title}</h3>
            <p>{download.attributes.description}</p>
            <div className="download-meta">
              <span>{download.attributes.category}</span>
              <span>{download.attributes.fileSize}</span>
              <span>{download.attributes.downloadCount} downloads</span>
            </div>
            <button onClick={() => handleDownload(download)}>
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <section className="help">
        <div dangerouslySetInnerHTML={{ __html: pageData?.attributes.helpSection }} />
      </section>
    </div>
  );
}
```

---

### Example 2: Newsletter Subscription Form

```typescript
// components/NewsletterForm.tsx
'use client';

import { useState } from 'react';
import { mediaService } from '@/services/media.service';

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await mediaService.subscribeToNewsletter({
        ...formData,
        source: 'website-form',
        preferences: {
          frequency: 'monthly',
          categories: ['news', 'events', 'training']
        }
      });

      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      setFormData({ email: '', firstName: '', lastName: '' });
    } catch (error: any) {
      setStatus('error');
      if (error.response?.status === 400) {
        setMessage('This email is already subscribed.');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <h3>Subscribe to Our Newsletter</h3>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email address *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          disabled={status === 'loading'}
        />
        <input
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>

      {status === 'success' && (
        <div className="alert alert-success">{message}</div>
      )}

      {status === 'error' && (
        <div className="alert alert-error">{message}</div>
      )}
    </form>
  );
}
```

---

### Example 3: Photo Gallery Grid

```typescript
// app/media/photos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { mediaService } from '@/services/media.service';
import { API_CONFIG } from '@/config/api';
import Image from 'next/image';

interface PhotoGallery {
  id: number;
  attributes: {
    albumName: string;
    slug: string;
    description: string;
    coverImage: { data: any };
    photos: { data: any[] };
    date: string;
  };
}

export default function PhotoGalleryPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [galleries, setGalleries] = useState<PhotoGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [page, galleriesList] = await Promise.all([
        mediaService.getPhotoGalleryPage(),
        mediaService.getPhotoGalleries({ pageSize: 12 })
      ]);

      setPageData(page.data);
      setGalleries(galleriesList.data);
    } catch (error) {
      console.error('Error loading photo galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageData: any, format: string = 'medium') => {
    const formats = imageData?.attributes?.formats;
    if (formats?.[format]) {
      return `${API_CONFIG.baseURL}${formats[format].url}`;
    }
    return `${API_CONFIG.baseURL}${imageData?.attributes?.url}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="photo-gallery-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>{pageData?.attributes.heroSection.title}</h1>
        <p>{pageData?.attributes.heroSection.subtitle}</p>
      </section>

      {/* Intro Section */}
      <section className="intro">
        <h2>{pageData?.attributes.introSection.heading}</h2>
        <p>{pageData?.attributes.introSection.description}</p>
      </section>

      {/* Galleries Grid */}
      <div className="galleries-grid">
        {galleries.map(gallery => (
          <a
            key={gallery.id}
            href={`/media/photos/${gallery.attributes.slug}`}
            className="gallery-card"
          >
            <div className="gallery-cover">
              <Image
                src={getImageUrl(gallery.attributes.coverImage.data, 'medium')}
                alt={gallery.attributes.albumName}
                width={400}
                height={300}
                objectFit="cover"
              />
              <div className="gallery-overlay">
                <span className="photo-count">
                  {gallery.attributes.photos.data.length} photos
                </span>
              </div>
            </div>
            <div className="gallery-info">
              <h3>{gallery.attributes.albumName}</h3>
              <p>{gallery.attributes.description}</p>
              <time>{new Date(gallery.attributes.date).toLocaleDateString()}</time>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
```

---

### Example 4: Video Gallery with YouTube Embed

```typescript
// app/media/videos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { mediaService } from '@/services/media.service';

interface Video {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    videoUrl: string;
    thumbnail: { data: any };
    duration: string;
    category: string;
    viewCount: number;
  };
}

// Helper function to extract YouTube video ID
const getYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper to get YouTube thumbnail
const getYouTubeThumbnail = (url: string, quality: string = 'maxresdefault'): string => {
  const videoId = getYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : '';
};

export default function VideoGalleryPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [page, videosList] = await Promise.all([
        mediaService.getVideoGalleryPage(),
        mediaService.getVideoGalleries({
          category: selectedCategory || undefined,
          pageSize: 12
        })
      ]);

      setPageData(page.data);
      setVideos(videosList.data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = async (video: Video) => {
    setSelectedVideo(video);
    // Increment view count
    try {
      await mediaService.incrementVideoViewCount(video.id);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const getEmbedUrl = (videoUrl: string): string => {
    const videoId = getYouTubeId(videoUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  if (loading) return <div>Loading...</div>;

  const categories = ['Events', 'Training', 'Testimonials', 'Documentaries', 'Interviews'];

  return (
    <div className="video-gallery-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>{pageData?.attributes.heroSection.title}</h1>
        <p>{pageData?.attributes.heroSection.subtitle}</p>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedVideo(null)}>×</button>
            <div className="video-wrapper">
              <iframe
                src={getEmbedUrl(selectedVideo.attributes.videoUrl)}
                title={selectedVideo.attributes.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-info">
              <h2>{selectedVideo.attributes.title}</h2>
              <p>{selectedVideo.attributes.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="filters">
        <button
          onClick={() => setSelectedCategory('')}
          className={!selectedCategory ? 'active' : ''}
        >
          All Videos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="videos-grid">
        {videos.map(video => (
          <div
            key={video.id}
            className="video-card"
            onClick={() => handleVideoClick(video)}
          >
            <div className="video-thumbnail">
              <img
                src={getYouTubeThumbnail(video.attributes.videoUrl)}
                alt={video.attributes.title}
              />
              <div className="play-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {video.attributes.duration && (
                <span className="duration">{video.attributes.duration}</span>
              )}
            </div>
            <div className="video-info">
              <h3>{video.attributes.title}</h3>
              <p>{video.attributes.description}</p>
              <div className="video-meta">
                <span>{video.attributes.category}</span>
                <span>{video.attributes.viewCount} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      {pageData?.attributes.ctaSection && (
        <section className="cta">
          <h2>{pageData.attributes.ctaSection.heading}</h2>
          <p>{pageData.attributes.ctaSection.description}</p>
          <div className="cta-buttons">
            <a
              href={pageData.attributes.ctaSection.primaryCTA.url}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {pageData.attributes.ctaSection.primaryCTA.label}
            </a>
            {pageData.attributes.ctaSection.secondaryCTA && (
              <a
                href={pageData.attributes.ctaSection.secondaryCTA.url}
                className="btn btn-secondary"
              >
                {pageData.attributes.ctaSection.secondaryCTA.label}
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
```

---

## Best Practices

### 1. Error Handling

Always implement proper error handling for API calls:

```typescript
async function fetchData() {
  try {
    const data = await mediaService.getDownloads();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      if (error.response?.status === 404) {
        console.error('Resource not found');
      } else if (error.response?.status === 500) {
        console.error('Server error');
      }
    }
    throw error;
  }
}
```

### 2. Image Optimization

Use responsive images and proper formats:

```typescript
const getResponsiveImage = (imageData: any) => {
  const formats = imageData?.attributes?.formats;
  return {
    thumbnail: formats?.thumbnail?.url,
    small: formats?.small?.url,
    medium: formats?.medium?.url,
    large: formats?.large?.url,
    original: imageData?.attributes?.url,
  };
};

// Use in srcSet
<img
  srcSet={`
    ${getResponsiveImage(image).small} 500w,
    ${getResponsiveImage(image).medium} 1000w,
    ${getResponsiveImage(image).large} 1500w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  src={getResponsiveImage(image).medium}
  alt="..."
/>
```

### 3. Pagination

Implement infinite scroll or load more functionality:

```typescript
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  const result = await mediaService.getDownloads({ page: page + 1 });

  if (result.data.length === 0) {
    setHasMore(false);
  } else {
    setDownloads([...downloads, ...result.data]);
    setPage(page + 1);
  }
};
```

### 4. Caching

Implement caching for better performance:

```typescript
// Using SWR
import useSWR from 'swr';

function useDownloads(category?: string) {
  const { data, error, mutate } = useSWR(
    ['downloads', category],
    () => mediaService.getDownloads({ category }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    downloads: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
```

### 5. SEO Optimization

Use SEO data from CMS:

```typescript
import Head from 'next/head';

function SEOHead({ seoData }: { seoData: any }) {
  return (
    <Head>
      <title>{seoData?.metaTitle}</title>
      <meta name="description" content={seoData?.metaDescription} />
      {seoData?.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}
      {seoData?.canonicalURL && (
        <link rel="canonical" href={seoData.canonicalURL} />
      )}
      {seoData?.metaRobots && (
        <meta name="robots" content={seoData.metaRobots} />
      )}
      {seoData?.metaImage?.data && (
        <meta property="og:image" content={seoData.metaImage.data.attributes.url} />
      )}
    </Head>
  );
}
```

### 6. Loading States

Implement proper loading states:

```typescript
function DownloadsSkeleton() {
  return (
    <div className="downloads-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="download-card skeleton">
          <div className="skeleton-icon" />
          <div className="skeleton-title" />
          <div className="skeleton-text" />
          <div className="skeleton-button" />
        </div>
      ))}
    </div>
  );
}
```

---

## Testing

### Manual Testing Script

```bash
#!/bin/bash

BASE_URL="http://localhost:1337/api"

echo "Testing Media Pages API..."
echo ""

# Test page configurations
echo "1. Testing Downloads Page..."
curl -s "$BASE_URL/downloads-page?populate=deep" | jq '.data.attributes | keys'
echo ""

echo "2. Testing eLetter Subscription Page..."
curl -s "$BASE_URL/eletter-subscription-page?populate=deep" | jq '.data.attributes | keys'
echo ""

echo "3. Testing Photo Gallery Page..."
curl -s "$BASE_URL/photo-gallery-page?populate=deep" | jq '.data.attributes | keys'
echo ""

echo "4. Testing Video Gallery Page..."
curl -s "$BASE_URL/video-gallery-page?populate=deep" | jq '.data.attributes | keys'
echo ""

# Test collections
echo "5. Testing Downloads Collection..."
curl -s "$BASE_URL/downloads?populate=file&pagination[limit]=5" | jq '.data | length'
echo ""

echo "6. Testing Photo Galleries Collection..."
curl -s "$BASE_URL/photo-galleries?populate=coverImage&pagination[limit]=5" | jq '.data | length'
echo ""

echo "7. Testing Video Galleries Collection..."
curl -s "$BASE_URL/video-galleries?populate=thumbnail&pagination[limit]=5" | jq '.data | length'
echo ""

# Test newsletter subscription
echo "8. Testing Newsletter Subscription..."
curl -s -X POST "$BASE_URL/newsletter-subscriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User"
    }
  }' | jq '.data.id'
echo ""

echo "All tests completed!"
```

### Automated Testing (Jest)

```typescript
// __tests__/media.service.test.ts
import { mediaService } from '@/services/media.service';

describe('Media Service', () => {
  describe('Downloads', () => {
    it('should fetch downloads page', async () => {
      const page = await mediaService.getDownloadsPage();
      expect(page.data).toBeDefined();
      expect(page.data.attributes).toHaveProperty('heroSection');
    });

    it('should fetch downloads with filters', async () => {
      const downloads = await mediaService.getDownloads({
        category: 'Annual Reports',
        page: 1,
        pageSize: 10
      });
      expect(downloads.data).toBeInstanceOf(Array);
      expect(downloads.meta.pagination).toBeDefined();
    });
  });

  describe('Newsletter', () => {
    it('should subscribe to newsletter', async () => {
      const subscription = await mediaService.subscribeToNewsletter({
        email: 'test@example.com',
        firstName: 'Test',
        source: 'test'
      });
      expect(subscription.data).toBeDefined();
      expect(subscription.data.attributes.email).toBe('test@example.com');
    });

    it('should reject duplicate email', async () => {
      await expect(
        mediaService.subscribeToNewsletter({
          email: 'existing@example.com',
        })
      ).rejects.toThrow();
    });
  });

  describe('Photo Galleries', () => {
    it('should fetch photo galleries', async () => {
      const galleries = await mediaService.getPhotoGalleries();
      expect(galleries.data).toBeInstanceOf(Array);
    });

    it('should fetch gallery by slug', async () => {
      const gallery = await mediaService.getPhotoGalleryBySlug('test-album');
      expect(gallery).toBeDefined();
      expect(gallery.attributes.slug).toBe('test-album');
    });
  });

  describe('Video Galleries', () => {
    it('should fetch video galleries', async () => {
      const videos = await mediaService.getVideoGalleries();
      expect(videos.data).toBeInstanceOf(Array);
    });

    it('should increment view count', async () => {
      const initialVideo = await mediaService.getVideoGalleryBySlug('test-video');
      const initialCount = initialVideo.attributes.viewCount;

      await mediaService.incrementVideoViewCount(initialVideo.id);

      const updatedVideo = await mediaService.getVideoGalleryBySlug('test-video');
      expect(updatedVideo.attributes.viewCount).toBe(initialCount + 1);
    });
  });
});
```

---

## Troubleshooting

### Common Issues

**1. CORS Errors**

Add to `config/middlewares.js`:
```javascript
'strapi::cors': {
  enabled: true,
  config: {
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
  },
},
```

**2. 403 Forbidden Errors**

Ensure public permissions are set:
```bash
npm run permissions:create
```

**3. Empty Responses**

Content may not be published or doesn't exist yet. Check Strapi admin panel.

**4. Image URLs Not Working**

Ensure `url` in `config/server.js`:
```javascript
module.exports = {
  url: process.env.PUBLIC_URL || 'http://localhost:1337',
};
```

---

## Support

For issues or questions:
- Check [Strapi Documentation](https://docs.strapi.io)
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Contact: CUA Ghana Development Team

---

**Last Updated:** 2025-01-27
**Version:** 1.0.0
**CMS Version:** Strapi v5.25.0
