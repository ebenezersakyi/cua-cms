# Careers API Integration Guide

Complete guide for integrating CUA Ghana CMS Careers/Jobs APIs into your frontend application.

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

The Careers section consists of:
- **Careers Page API** (single type) - Configuration for the careers page including hero, benefits, and CTA sections
- **Job Vacancies API** (collection type) - Active job openings and career opportunities

### Key Features
- Dynamic job vacancy listings
- Configurable benefits/perks section
- Featured jobs selection
- Employment type filtering (Full-time, Part-time, Contract, Internship)
- External application links
- Active/inactive job status management

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
  // Page configuration
  careersPage: '/careers-page',

  // Job vacancies
  jobVacancies: '/job-vacancies',
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

### 1. Careers Page Configuration

**Endpoint:** `GET /api/careers-page`

**Query Parameters:**
```typescript
{
  populate: 'deep' | 'heroSection,featuredJobs,seo'
}
```

**Example Request:**
```bash
curl "http://localhost:1337/api/careers-page?populate=deep"
```

**Response Structure:**
```typescript
interface CareersPageResponse {
  data: {
    id: number;
    attributes: {
      heroSection: {
        title: string;
        subtitle: string;
        backgroundImage: MediaData;
      };
      whyWorkWithUs: {
        title: string;
        benefits: Array<{
          icon: string; // e.g., "FiUsers", "FiTrendingUp", "FiAward", "FiHeart"
          title: string;
          description: string;
        }>;
      };
      ctaSection: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string; // e.g., "mailto:careers@cua.org.gh"
      };
      featuredJobs: {
        data: Array<JobVacancy>;
      };
      seo: SEOData;
      createdAt: string;
      updatedAt: string;
    };
  };
  meta: object;
}
```

**Example Response:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "heroSection": {
        "title": "Careers at CUA Ghana",
        "subtitle": "Join Our Team",
        "backgroundImage": {
          "data": {
            "attributes": {
              "url": "/uploads/careers_hero.jpg",
              "alternativeText": "Careers at CUA Ghana"
            }
          }
        }
      },
      "whyWorkWithUs": {
        "title": "Why Work With Us",
        "benefits": [
          {
            "icon": "FiUsers",
            "title": "Collaborative Culture",
            "description": "Work with a diverse team committed to financial inclusion"
          },
          {
            "icon": "FiTrendingUp",
            "title": "Career Growth",
            "description": "Professional development opportunities and training programs"
          },
          {
            "icon": "FiAward",
            "title": "Competitive Benefits",
            "description": "Attractive salary packages and comprehensive benefits"
          },
          {
            "icon": "FiHeart",
            "title": "Make an Impact",
            "description": "Contribute to empowering communities across Ghana"
          }
        ]
      },
      "ctaSection": {
        "title": "Don't See the Right Position?",
        "description": "We're always looking for talented individuals. Send us your CV for future opportunities.",
        "buttonText": "Send Your CV",
        "buttonLink": "mailto:careers@cua.org.gh"
      },
      "seo": {
        "metaTitle": "Careers - CUA Ghana | Join Our Team",
        "metaDescription": "Explore career opportunities at Ghana Co-operative Credit Unions Association."
      }
    }
  }
}
```

---

### 2. Job Vacancies Collection

**Endpoint:** `GET /api/job-vacancies`

**Query Parameters:**
```typescript
{
  populate?: string;
  filters?: {
    isActive?: boolean;
    employmentType?: string;
    department?: string;
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
# Get all active job vacancies
curl "http://localhost:1337/api/job-vacancies?filters[isActive][$eq]=true&sort=postedDate:desc"

# Get full-time positions only
curl "http://localhost:1337/api/job-vacancies?filters[isActive][$eq]=true&filters[employmentType][$eq]=Full-time"

# Get jobs by department
curl "http://localhost:1337/api/job-vacancies?filters[isActive][$eq]=true&filters[department][$contains]=Finance"

# Get with pagination
curl "http://localhost:1337/api/job-vacancies?filters[isActive][$eq]=true&pagination[page]=1&pagination[pageSize]=10"
```

**Response Structure:**
```typescript
interface JobVacanciesResponse {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      department: string;
      location: string;
      employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
      description: string; // Rich text
      requirements: Array<string>; // JSON array
      applyUrl: string;
      isActive: boolean;
      postedDate: string;
      closingDate?: string;
      salary?: string;
      experienceLevel?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
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

**Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Senior Accountant",
        "department": "Finance",
        "location": "Accra, Ghana",
        "employmentType": "Full-time",
        "description": "We are seeking an experienced Senior Accountant to join our Finance team...",
        "requirements": [
          "Bachelor's degree in Accounting or Finance",
          "Professional certification (ACCA, CPA, or equivalent)",
          "5+ years of experience in accounting",
          "Strong knowledge of financial regulations",
          "Proficiency in accounting software"
        ],
        "applyUrl": "https://forms.gle/example-application-form",
        "isActive": true,
        "postedDate": "2025-10-15",
        "closingDate": "2025-11-15",
        "salary": "Competitive",
        "experienceLevel": "Senior Level",
        "createdAt": "2025-10-15T09:00:00.000Z",
        "updatedAt": "2025-10-15T09:00:00.000Z",
        "publishedAt": "2025-10-15T09:00:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "title": "Training Coordinator",
        "department": "CUTRAC",
        "location": "Accra, Ghana",
        "employmentType": "Full-time",
        "description": "Join our CUTRAC team as a Training Coordinator...",
        "requirements": [
          "Bachelor's degree in Education, Business Administration or related field",
          "3+ years experience in training coordination",
          "Excellent organizational and communication skills",
          "Experience with Learning Management Systems"
        ],
        "applyUrl": "https://forms.gle/another-application-form",
        "isActive": true,
        "postedDate": "2025-10-20",
        "closingDate": "2025-11-20",
        "salary": "GHS 5,000 - 8,000",
        "experienceLevel": "Mid Level",
        "createdAt": "2025-10-20T09:00:00.000Z",
        "updatedAt": "2025-10-20T09:00:00.000Z",
        "publishedAt": "2025-10-20T09:00:00.000Z"
      }
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

---

### 3. Get Single Job Vacancy

**Endpoint:** `GET /api/job-vacancies/{id}`

**Example Request:**
```bash
curl "http://localhost:1337/api/job-vacancies/1"
```

**Response Structure:**
```typescript
interface SingleJobVacancyResponse {
  data: {
    id: number;
    attributes: JobVacancyAttributes;
  };
  meta: object;
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

// Job Vacancy
interface JobVacancy {
  id: number;
  attributes: {
    title: string;
    department: string;
    location: string;
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    description: string;
    requirements: string[];
    applyUrl: string;
    isActive: boolean;
    postedDate: string;
    closingDate?: string;
    salary?: string;
    experienceLevel?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive';
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Pagination
interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
```

---

## Frontend Integration

### React/Next.js Implementation

#### API Service Layer

```typescript
// services/careers.service.ts
import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/config/api';

export const careersService = {
  // Get page configuration
  async getCareersPage() {
    const { data } = await apiClient.get(ENDPOINTS.careersPage, {
      params: { populate: 'deep' }
    });
    return data;
  },

  // Get all active job vacancies
  async getActiveJobVacancies(params?: {
    employmentType?: string;
    department?: string;
    page?: number;
    pageSize?: number;
  }) {
    const filters: any = { isActive: { $eq: true } };

    if (params?.employmentType) {
      filters.employmentType = { $eq: params.employmentType };
    }

    if (params?.department) {
      filters.department = { $contains: params.department };
    }

    const { data } = await apiClient.get(ENDPOINTS.jobVacancies, {
      params: {
        filters,
        sort: 'postedDate:desc',
        pagination: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 25,
        },
      }
    });
    return data;
  },

  // Get single job vacancy
  async getJobVacancyById(id: number) {
    const { data } = await apiClient.get(`${ENDPOINTS.jobVacancies}/${id}`);
    return data;
  },
};
```

---

## Code Examples

### Example 1: Complete Careers Page Component

```typescript
// app/careers/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { careersService } from '@/services/careers.service';
import { API_CONFIG } from '@/config/api';
import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiExternalLink,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiHeart
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const iconMap = {
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiHeart,
};

interface JobVacancy {
  id: number;
  attributes: {
    title: string;
    department: string;
    location: string;
    employmentType: string;
    description: string;
    requirements: string[];
    applyUrl: string;
  };
}

export default function CareersPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [page, jobs] = await Promise.all([
        careersService.getCareersPage(),
        careersService.getActiveJobVacancies()
      ]);

      setPageData(page.data);
      setJobVacancies(jobs.data);
    } catch (error) {
      console.error('Error loading careers data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon size={24} /> : null;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const heroData = pageData?.attributes.heroSection || {};
  const benefits = pageData?.attributes.whyWorkWithUs?.benefits || [];
  const ctaData = pageData?.attributes.ctaSection || {};

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="hero relative py-20 lg:py-28">
        <div className="absolute inset-0">
          {heroData.backgroundImage?.data && (
            <img
              src={`${API_CONFIG.baseURL}${heroData.backgroundImage.data.attributes.url}`}
              alt={heroData.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/50"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-600/20 rounded-full text-blue-100 text-sm font-medium mb-4">
              {heroData.subtitle || 'Join Our Team'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {heroData.title || 'Careers at CUA Ghana'}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Build your career while making a difference in communities across Ghana
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {pageData?.attributes.whyWorkWithUs?.title || 'Why Work With Us'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-3 bg-blue-600 text-white rounded-full mb-4">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Vacancies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Current Openings</h2>

          {jobVacancies.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <FiBriefcase className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Open Positions at the Moment
              </h3>
              <p className="text-gray-600 mb-4">
                We don't have any active job openings right now, but we're always interested in meeting talented people.
              </p>
              <p className="text-gray-600">
                Please send your CV to{' '}
                <a href="mailto:careers@cua.org.gh" className="text-blue-600 underline">
                  careers@cua.org.gh
                </a>
                {' '}for future opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobVacancies.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {job.attributes.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {job.attributes.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-600">
                        <span className="flex items-center gap-1">
                          <FiMapPin size={16} />
                          {job.attributes.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock size={16} />
                          {job.attributes.employmentType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="prose max-w-none text-gray-600 mb-4"
                    dangerouslySetInnerHTML={{ __html: job.attributes.description }}
                  />

                  {job.attributes.requirements && job.attributes.requirements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {job.attributes.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => handleApply(job.attributes.applyUrl)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Apply Now
                    <FiExternalLink size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {ctaData.title || "Don't See the Right Position?"}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {ctaData.description || "We're always looking for talented individuals. Send us your CV for future opportunities."}
          </p>
          <a
            href={ctaData.buttonLink || 'mailto:careers@cua.org.gh'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {ctaData.buttonText || 'Send Your CV'}
          </a>
        </div>
      </section>
    </div>
  );
}
```

---

### Example 2: Job Vacancy Card Component

```typescript
// components/JobVacancyCard.tsx
import { FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi';

interface JobVacancyCardProps {
  job: {
    id: number;
    attributes: {
      title: string;
      department: string;
      location: string;
      employmentType: string;
      description: string;
      requirements: string[];
      applyUrl: string;
      salary?: string;
      experienceLevel?: string;
    };
  };
  onApply: (url: string) => void;
}

export default function JobVacancyCard({ job, onApply }: JobVacancyCardProps) {
  const { attributes } = job;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {attributes.title}
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {attributes.department}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <FiMapPin size={16} />
              {attributes.location}
            </span>
            <span className="flex items-center gap-1">
              <FiClock size={16} />
              {attributes.employmentType}
            </span>
            {attributes.experienceLevel && (
              <span className="px-2 py-1 bg-gray-100 rounded">
                {attributes.experienceLevel}
              </span>
            )}
            {attributes.salary && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                {attributes.salary}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className="prose max-w-none text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: attributes.description }}
      />

      {attributes.requirements && attributes.requirements.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-800 mb-2">Requirements:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {attributes.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => onApply(attributes.applyUrl)}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Apply Now
        <FiExternalLink size={16} />
      </button>
    </div>
  );
}
```

---

### Example 3: Job Filtering Component

```typescript
// components/JobFilters.tsx
import { useState } from 'react';

interface JobFiltersProps {
  onFilterChange: (filters: {
    employmentType?: string;
    department?: string;
  }) => void;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [employmentType, setEmploymentType] = useState('');
  const [department, setDepartment] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      employmentType: employmentType || undefined,
      department: department || undefined,
    });
  };

  const handleReset = () => {
    setEmploymentType('');
    setDepartment('');
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Filter Jobs</h3>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment Type
          </label>
          <select
            value={employmentType}
            onChange={(e) => {
              setEmploymentType(e.target.value);
              handleFilterChange();
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
            onBlur={handleFilterChange}
            placeholder="e.g., Finance, IT"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Best Practices

### 1. Always Filter Active Jobs

Only display jobs where `isActive = true`:

```typescript
const jobs = await careersService.getActiveJobVacancies();
// Automatically filters by isActive: true
```

### 2. Handle Empty States

Show a helpful message when no jobs are available:

```typescript
{jobVacancies.length === 0 && (
  <EmptyJobsMessage />
)}
```

### 3. Sort by Posted Date

Display newest jobs first:

```typescript
sort: 'postedDate:desc'
```

### 4. Implement Pagination

For large numbers of jobs, use pagination:

```typescript
const [page, setPage] = useState(1);
const pageSize = 10;

const loadJobs = async () => {
  const jobs = await careersService.getActiveJobVacancies({
    page,
    pageSize
  });
  setJobVacancies(jobs.data);
};
```

### 5. External Link Security

Always open application links securely:

```typescript
const handleApply = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
```

### 6. Rich Text Sanitization

Sanitize HTML content before rendering:

```typescript
import DOMPurify from 'dompurify';

const sanitizedDescription = DOMPurify.sanitize(job.attributes.description);

<div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
```

---

## Testing

### Manual Testing Script

```bash
#!/bin/bash

BASE_URL="http://localhost:1337/api"

echo "Testing Careers Page API..."
echo ""

# Test page configuration
echo "1. Testing Careers Page Configuration..."
curl -s "$BASE_URL/careers-page?populate=deep" | jq '.data.attributes | keys'
echo ""

# Test job vacancies
echo "2. Testing Job Vacancies Collection..."
curl -s "$BASE_URL/job-vacancies?filters[isActive][\$eq]=true" | jq '.data | length'
echo ""

# Test filtering by employment type
echo "3. Testing Filter by Employment Type..."
curl -s "$BASE_URL/job-vacancies?filters[employmentType][\$eq]=Full-time" | jq '.data | length'
echo ""

# Test sorting
echo "4. Testing Sort by Posted Date..."
curl -s "$BASE_URL/job-vacancies?sort=postedDate:desc&pagination[limit]=1" | jq '.data[0].attributes.title'
echo ""

echo "All tests completed!"
```

### Automated Testing (Jest)

```typescript
// __tests__/careers.service.test.ts
import { careersService } from '@/services/careers.service';

describe('Careers Service', () => {
  describe('Careers Page', () => {
    it('should fetch careers page configuration', async () => {
      const page = await careersService.getCareersPage();
      expect(page.data).toBeDefined();
      expect(page.data.attributes).toHaveProperty('heroSection');
      expect(page.data.attributes).toHaveProperty('whyWorkWithUs');
      expect(page.data.attributes).toHaveProperty('ctaSection');
    });
  });

  describe('Job Vacancies', () => {
    it('should fetch active job vacancies', async () => {
      const jobs = await careersService.getActiveJobVacancies();
      expect(jobs.data).toBeInstanceOf(Array);
      jobs.data.forEach((job: any) => {
        expect(job.attributes.isActive).toBe(true);
      });
    });

    it('should filter by employment type', async () => {
      const jobs = await careersService.getActiveJobVacancies({
        employmentType: 'Full-time'
      });
      jobs.data.forEach((job: any) => {
        expect(job.attributes.employmentType).toBe('Full-time');
      });
    });

    it('should filter by department', async () => {
      const jobs = await careersService.getActiveJobVacancies({
        department: 'Finance'
      });
      jobs.data.forEach((job: any) => {
        expect(job.attributes.department).toContain('Finance');
      });
    });

    it('should handle pagination', async () => {
      const page1 = await careersService.getActiveJobVacancies({
        page: 1,
        pageSize: 5
      });
      expect(page1.data.length).toBeLessThanOrEqual(5);
      expect(page1.meta.pagination).toBeDefined();
    });
  });
});
```

---

## Troubleshooting

### Common Issues

**1. 404 on GET /api/careers-page**

The page configuration hasn't been created yet. Create content in the Strapi admin panel.

**2. Empty Job Vacancies Array**

No jobs have been added yet, or all jobs have `isActive: false`. Add jobs through the admin panel.

**3. CORS Errors**

Add to `config/middlewares.js`:
```javascript
'strapi::cors': {
  enabled: true,
  config: {
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
  },
},
```

**4. Apply URL Not Opening**

Ensure the URL in `applyUrl` field is valid and includes protocol (https://).

---

## JSON Structure Examples

### Example whyWorkWithUs JSON

```json
{
  "title": "Why Work With Us",
  "benefits": [
    {
      "icon": "FiUsers",
      "title": "Collaborative Culture",
      "description": "Work with a diverse team committed to financial inclusion"
    },
    {
      "icon": "FiTrendingUp",
      "title": "Career Growth",
      "description": "Professional development opportunities and training programs"
    },
    {
      "icon": "FiAward",
      "title": "Competitive Benefits",
      "description": "Attractive salary packages and comprehensive benefits"
    },
    {
      "icon": "FiHeart",
      "title": "Make an Impact",
      "description": "Contribute to empowering communities across Ghana"
    }
  ]
}
```

### Example ctaSection JSON

```json
{
  "title": "Don't See the Right Position?",
  "description": "We're always looking for talented individuals. Send us your CV for future opportunities.",
  "buttonText": "Send Your CV",
  "buttonLink": "mailto:careers@cua.org.gh"
}
```

### Example Requirements JSON Array

```json
[
  "Bachelor's degree in relevant field",
  "5+ years of professional experience",
  "Strong communication and interpersonal skills",
  "Proficiency in MS Office Suite",
  "Ability to work independently and in teams"
]
```

---

## Support

For issues or questions:
- Check [Strapi Documentation](https://docs.strapi.io)
- Review [CAREER_PAGE_REQUIREMENTS.md](./CAREER_PAGE_REQUIREMENTS.md)
- Contact: CUA Ghana Development Team

---

**Last Updated:** 2025-10-28
**Version:** 1.0.0
**CMS Version:** Strapi v5.25.0
