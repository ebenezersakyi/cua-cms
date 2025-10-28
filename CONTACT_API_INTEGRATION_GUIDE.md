# Contact Page API Integration Guide

Complete guide for integrating CUA Ghana CMS Contact page into your frontend application.

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

The Contact section consists of:
- **Contact Page API** (single type) - Configuration for the contact page including hero, contact info, form settings, map, and quick links
- **Contact Messages API** (collection type) - Storage and management of contact form submissions

### Key Features
- Dynamic contact information cards
- Configurable contact form
- Google Maps integration
- Quick links section
- Contact message submission and tracking
- Status management for inquiries

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
  contactPage: '/contact-page',

  // Contact messages
  contactMessages: '/contact-messages',
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

### 1. Contact Page Configuration

**Endpoint:** `GET /api/contact-page`

**Query Parameters:**
```typescript
{
  populate: 'deep' | 'heroSection,contactInfoSection,seo'
}
```

**Example Request:**
```bash
curl "http://localhost:1337/api/contact-page?populate=deep"
```

**Response Structure:**
```typescript
interface ContactPageResponse {
  data: {
    id: number;
    attributes: {
      heroSection: {
        title: string;
        subtitle: string;
        backgroundImage: MediaData;
      };
      contactInfoSection: {
        title: string;
        description: string;
      };
      contactInfoCards: Array<{
        icon: string; // e.g., "FiMapPin", "FiPhone", "FiMail", "FiClock"
        title: string;
        details: string[]; // Array of detail lines
        color: string; // Tailwind classes
      }>;
      contactFormSection: {
        title: string;
        icon: string;
        successTitle: string;
        successMessage: string;
        fields: Array<{
          name: string;
          label: string;
          type: 'text' | 'email' | 'tel' | 'textarea';
          required: boolean;
          icon?: string;
          placeholder?: string;
          rows?: number;
        }>;
      };
      mapConfiguration: {
        latitude: number;
        longitude: number;
        zoom: number;
        markerTitle: string;
        markerInfoWindow: {
          title: string;
          addressLine1: string;
          addressLine2: string;
        };
      };
      quickLinksSection: {
        title: string;
        backgroundColor: string;
        borderColor: string;
        links: Array<{
          label: string;
          url: string;
          icon: string;
        }>;
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
        "title": "Contact Us",
        "subtitle": "We're here to help. Reach out to us for inquiries, support, or to learn more about CUA Ghana.",
        "backgroundImage": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/contact_hero_bg.jpg",
              "alternativeText": "Contact Us",
              "width": 1920,
              "height": 1080
            }
          }
        }
      },
      "contactInfoSection": {
        "title": "Contact Information",
        "description": "Multiple ways to reach us - choose what works best for you"
      },
      "contactInfoCards": [
        {
          "icon": "FiMapPin",
          "title": "Address",
          "details": [
            "44 Jones Nelson Street, Adabraka",
            "Accra - Ghana",
            "GA-075-1361"
          ],
          "color": "bg-blue-100 text-blue-600"
        },
        {
          "icon": "FiPhone",
          "title": "Phone",
          "details": ["+233 302 220299"],
          "color": "bg-green-100 text-green-600"
        },
        {
          "icon": "FiMail",
          "title": "Email",
          "details": ["info@cua.org.gh"],
          "color": "bg-purple-100 text-purple-600"
        },
        {
          "icon": "FiClock",
          "title": "Office Hours",
          "details": [
            "Monday - Friday: 8:00 AM - 5:00 PM",
            "Saturday - Sunday: Closed"
          ],
          "color": "bg-orange-100 text-orange-600"
        }
      ],
      "contactFormSection": {
        "title": "Send us a Message",
        "icon": "FiMessageCircle",
        "successTitle": "Message Sent Successfully!",
        "successMessage": "Thank you for contacting us. We'll get back to you soon.",
        "fields": [
          {
            "name": "fullName",
            "label": "Full Name",
            "type": "text",
            "required": true,
            "icon": "FiUser",
            "placeholder": "John Doe"
          },
          {
            "name": "email",
            "label": "Email Address",
            "type": "email",
            "required": true,
            "icon": "FiMail",
            "placeholder": "john@example.com"
          },
          {
            "name": "phone",
            "label": "Phone Number",
            "type": "tel",
            "required": false,
            "icon": "FiPhone",
            "placeholder": "+233 XXX XXX XXX"
          },
          {
            "name": "subject",
            "label": "Subject",
            "type": "text",
            "required": true,
            "placeholder": "What is your inquiry about?"
          },
          {
            "name": "message",
            "label": "Message",
            "type": "textarea",
            "required": true,
            "icon": "FiMessageCircle",
            "placeholder": "Tell us how we can help you...",
            "rows": 5
          }
        ]
      },
      "mapConfiguration": {
        "latitude": 5.5600,
        "longitude": -0.2050,
        "zoom": 15,
        "markerTitle": "CUA Ghana - Head Office",
        "markerInfoWindow": {
          "title": "CUA Ghana Head Office",
          "addressLine1": "44 Jones Nelson Street, Adabraka",
          "addressLine2": "Accra - Ghana"
        }
      },
      "quickLinksSection": {
        "title": "Quick Links",
        "backgroundColor": "bg-blue-50",
        "borderColor": "border-blue-100",
        "links": [
          {
            "label": "About CUA Ghana",
            "url": "/about-us/who-we-are",
            "icon": "→"
          },
          {
            "label": "Register for Training",
            "url": "/training/cutrac-registration",
            "icon": "→"
          },
          {
            "label": "Credit Union Information",
            "url": "/credit-unions/overview",
            "icon": "→"
          },
          {
            "label": "Downloads & Resources",
            "url": "/media/downloads",
            "icon": "→"
          }
        ]
      },
      "seo": {
        "metaTitle": "Contact Us - CUA Ghana",
        "metaDescription": "Get in touch with Credit Union Association Ghana. Contact us for inquiries, support, or to learn more about credit unions.",
        "keywords": "contact cua ghana, credit union contact, cua address, cua phone, credit union support"
      }
    }
  }
}
```

---

### 2. Submit Contact Message

**Endpoint:** `POST /api/contact-messages`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```typescript
interface ContactMessageRequest {
  data: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    messageType?: 'General Inquiry' | 'Support' | 'Partnership' | 'Training' | 'Membership';
  };
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:1337/api/contact-messages" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+233 123 456 789",
      "subject": "Inquiry about Credit Union Membership",
      "message": "I would like to know more about joining a credit union in my area.",
      "messageType": "General Inquiry"
    }
  }'
```

**Response (Success):**
```json
{
  "data": {
    "id": 1,
    "documentId": "msg-abc123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+233 123 456 789",
    "subject": "Inquiry about Credit Union Membership",
    "message": "I would like to know more about joining a credit union in my area.",
    "messageType": "General Inquiry",
    "status": "New",
    "responseNote": null,
    "createdAt": "2025-10-28T14:30:00.000Z",
    "updatedAt": "2025-10-28T14:30:00.000Z",
    "publishedAt": "2025-10-28T14:30:00.000Z"
  },
  "meta": {}
}
```

**Response (Validation Error):**
```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Missing required fields",
    "details": {
      "errors": [
        {
          "path": ["fullName"],
          "message": "fullName is a required field",
          "name": "ValidationError"
        }
      ]
    }
  }
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

// Contact Info Card
interface ContactInfoCard {
  icon: string;
  title: string;
  details: string[];
  color: string;
}

// Form Field Configuration
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  icon?: string;
  placeholder?: string;
  rows?: number;
}

// Map Configuration
interface MapConfiguration {
  latitude: number;
  longitude: number;
  zoom: number;
  markerTitle: string;
  markerInfoWindow: {
    title: string;
    addressLine1: string;
    addressLine2: string;
  };
}

// Quick Link
interface QuickLink {
  label: string;
  url: string;
  icon: string;
}

// Contact Message
interface ContactMessage {
  id: number;
  documentId: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  messageType?: 'General Inquiry' | 'Support' | 'Partnership' | 'Training' | 'Membership';
  status: 'New' | 'In Progress' | 'Resolved' | 'Archived';
  responseNote?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
```

---

## Frontend Integration

### React/Next.js Implementation

#### API Service Layer

```typescript
// services/contact.service.ts
import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/config/api';

export const contactService = {
  // Get page configuration
  async getContactPage() {
    const { data } = await apiClient.get(ENDPOINTS.contactPage, {
      params: { populate: 'deep' }
    });
    return data;
  },

  // Submit contact message
  async submitContactMessage(messageData: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    messageType?: string;
  }) {
    const { data } = await apiClient.post(ENDPOINTS.contactMessages, {
      data: messageData
    });
    return data;
  },
};
```

---

## Code Examples

### Example 1: Contact Page Component

```typescript
// app/contact/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { contactService } from '@/services/contact.service';
import { API_CONFIG } from '@/config/api';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { FiMapPin, FiPhone, FiMail, FiClock, FiUser, FiMessageCircle } from 'react-icons/fi';

const iconMap = {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiUser,
  FiMessageCircle,
};

export default function ContactPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const page = await contactService.getContactPage();
      setPageData(page.data);
    } catch (error) {
      console.error('Error loading contact page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      await contactService.submitContactMessage({
        ...formData,
        messageType: 'General Inquiry',
      });

      setFormStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error: any) {
      setFormStatus('error');
      setErrorMessage(
        error.response?.data?.error?.message ||
        'Failed to send message. Please try again.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon size={24} /> : null;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const heroData = pageData?.attributes.heroSection || {};
  const contactInfo = pageData?.attributes.contactInfoCards || [];
  const formConfig = pageData?.attributes.contactFormSection || {};
  const mapConfig = pageData?.attributes.mapConfiguration || {};
  const quickLinks = pageData?.attributes.quickLinksSection || {};

  return (
    <div className="contact-page">
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {heroData.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {heroData.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {pageData?.attributes.contactInfoSection?.title}
            </h2>
            <p className="text-gray-600">
              {pageData?.attributes.contactInfoSection?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((card: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg ${card.color} mb-4`}>
                  {getIcon(card.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                {card.details.map((detail: string, idx: number) => (
                  <p key={idx} className="text-gray-600 mb-1">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              {formConfig.icon && getIcon(formConfig.icon)}
              <h2 className="text-2xl font-bold ml-3">{formConfig.title}</h2>
            </div>

            {formStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-1">{formConfig.successTitle}</h3>
                <p>{formConfig.successMessage}</p>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+233 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is your inquiry about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
            <GoogleMap
              center={{
                lat: mapConfig.latitude || 5.5600,
                lng: mapConfig.longitude || -0.2050,
              }}
              zoom={mapConfig.zoom || 15}
              mapContainerStyle={{ width: '100%', height: '100%' }}
            >
              <Marker
                position={{
                  lat: mapConfig.latitude || 5.5600,
                  lng: mapConfig.longitude || -0.2050,
                }}
                title={mapConfig.markerTitle}
              />
            </GoogleMap>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className={`py-16 ${quickLinks.backgroundColor || 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {quickLinks.title || 'Quick Links'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(quickLinks.links || []).map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                className={`bg-white p-4 rounded-lg border ${quickLinks.borderColor || 'border-blue-100'} hover:shadow-md transition-shadow flex items-center justify-between`}
              >
                <span className="font-medium">{link.label}</span>
                <span className="text-blue-600">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Best Practices

### 1. Form Validation

Always implement client-side validation before submission:

```typescript
const validateForm = (data: any) => {
  const errors: any = {};

  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'Full name is required';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.subject || data.subject.trim() === '') {
    errors.subject = 'Subject is required';
  }

  if (!data.message || data.message.trim() === '') {
    errors.message = 'Message is required';
  }

  if (data.message && data.message.length > 2000) {
    errors.message = 'Message must be less than 2000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
```

### 2. Spam Protection

Implement honeypot field for spam protection:

```typescript
// Add hidden honeypot field
<input
  type="text"
  name="website"
  value={formData.website}
  onChange={handleChange}
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Check honeypot on submit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Honeypot check - if filled, it's likely spam
  if (formData.website !== '') {
    console.log('Spam detected');
    return;
  }

  // Continue with submission...
};
```

### 3. Rate Limiting

Implement client-side rate limiting:

```typescript
const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
const SUBMIT_COOLDOWN = 60000; // 1 minute

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const now = Date.now();
  if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
    setErrorMessage('Please wait before submitting another message');
    return;
  }

  setLastSubmitTime(now);
  // Continue with submission...
};
```

### 4. Error Handling

Comprehensive error handling:

```typescript
try {
  await contactService.submitContactMessage(formData);
  setFormStatus('success');
} catch (error: any) {
  setFormStatus('error');

  if (error.response?.status === 400) {
    setErrorMessage('Please check your form data');
  } else if (error.response?.status === 429) {
    setErrorMessage('Too many requests. Please try again later');
  } else if (error.response?.status === 500) {
    setErrorMessage('Server error. Please try again later');
  } else {
    setErrorMessage('Failed to send message. Please try again');
  }
}
```

### 5. Accessibility

Ensure form is accessible:

```typescript
<form onSubmit={handleSubmit} aria-label="Contact form">
  <div>
    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
      Full Name *
    </label>
    <input
      id="fullName"
      name="fullName"
      type="text"
      value={formData.fullName}
      onChange={handleChange}
      required
      aria-required="true"
      aria-invalid={!!errors.fullName}
      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
    />
    {errors.fullName && (
      <p id="fullName-error" className="text-red-600 text-sm mt-1" role="alert">
        {errors.fullName}
      </p>
    )}
  </div>
</form>
```

### 6. Loading States

Show proper loading states:

```typescript
{formStatus === 'submitting' && (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2">Sending message...</span>
  </div>
)}
```

---

## Testing

### Manual Testing Script

```bash
#!/bin/bash

BASE_URL="http://localhost:1337/api"

echo "Testing Contact Page API..."
echo ""

# Test page configuration
echo "1. Testing Contact Page Configuration..."
curl -s "$BASE_URL/contact-page?populate=deep" | jq '.data.attributes | keys'
echo ""

# Test contact message submission
echo "2. Testing Contact Message Submission..."
curl -s -X POST "$BASE_URL/contact-messages" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "fullName": "Test User",
      "email": "test@example.com",
      "phone": "+233 123 456 789",
      "subject": "Test Inquiry",
      "message": "This is a test message.",
      "messageType": "General Inquiry"
    }
  }' | jq '.data.id'
echo ""

# Test validation errors
echo "3. Testing Validation (Missing Required Fields)..."
curl -s -X POST "$BASE_URL/contact-messages" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "phone": "+233 123 456 789"
    }
  }' | jq '.error.message'
echo ""

echo "All tests completed!"
```

### Automated Testing (Jest)

```typescript
// __tests__/contact.service.test.ts
import { contactService } from '@/services/contact.service';

describe('Contact Service', () => {
  describe('Contact Page', () => {
    it('should fetch contact page configuration', async () => {
      const page = await contactService.getContactPage();
      expect(page.data).toBeDefined();
      expect(page.data.attributes).toHaveProperty('heroSection');
      expect(page.data.attributes).toHaveProperty('contactInfoCards');
      expect(page.data.attributes).toHaveProperty('contactFormSection');
      expect(page.data.attributes).toHaveProperty('mapConfiguration');
    });
  });

  describe('Contact Messages', () => {
    it('should submit contact message successfully', async () => {
      const message = await contactService.submitContactMessage({
        fullName: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message content',
      });

      expect(message.data).toBeDefined();
      expect(message.data.id).toBeDefined();
      expect(message.data.fullName).toBe('Test User');
      expect(message.data.status).toBe('New');
    });

    it('should reject invalid email', async () => {
      await expect(
        contactService.submitContactMessage({
          fullName: 'Test User',
          email: 'invalid-email',
          subject: 'Test',
          message: 'Test message',
        })
      ).rejects.toThrow();
    });

    it('should require fullName field', async () => {
      await expect(
        contactService.submitContactMessage({
          fullName: '',
          email: 'test@example.com',
          subject: 'Test',
          message: 'Test message',
        })
      ).rejects.toThrow();
    });
  });
});
```

---

## Troubleshooting

### Common Issues

**1. 403 Forbidden on GET /api/contact-messages**

This is expected behavior - public users can only CREATE messages, not read them (for privacy).

**2. 404 Not Found on GET /api/contact-page**

The page configuration hasn't been created yet in the Strapi admin panel. Create content for the contact page first.

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

**4. Map Not Loading**

Ensure you have a valid Google Maps API key:
```javascript
// In your component
import { LoadScript } from '@react-google-maps/api';

<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
  {/* Your GoogleMap component */}
</LoadScript>
```

**5. Form Submission Fails with 400**

Check that all required fields are included:
- fullName (required)
- email (required)
- subject (required)
- message (required)

---

## JSON Structure Examples

### Example Contact Info Cards JSON

```json
[
  {
    "icon": "FiMapPin",
    "title": "Address",
    "details": [
      "44 Jones Nelson Street, Adabraka",
      "Accra - Ghana",
      "GA-075-1361"
    ],
    "color": "bg-blue-100 text-blue-600"
  },
  {
    "icon": "FiPhone",
    "title": "Phone",
    "details": ["+233 302 220299"],
    "color": "bg-green-100 text-green-600"
  }
]
```

### Example Map Configuration JSON

```json
{
  "latitude": 5.5600,
  "longitude": -0.2050,
  "zoom": 15,
  "markerTitle": "CUA Ghana - Head Office",
  "markerInfoWindow": {
    "title": "CUA Ghana Head Office",
    "addressLine1": "44 Jones Nelson Street, Adabraka",
    "addressLine2": "Accra - Ghana"
  }
}
```

### Example Quick Links JSON

```json
{
  "title": "Quick Links",
  "backgroundColor": "bg-blue-50",
  "borderColor": "border-blue-100",
  "links": [
    {
      "label": "About CUA Ghana",
      "url": "/about-us/who-we-are",
      "icon": "→"
    },
    {
      "label": "Register for Training",
      "url": "/training/cutrac-registration",
      "icon": "→"
    }
  ]
}
```

---

## Support

For issues or questions:
- Check [Strapi Documentation](https://docs.strapi.io)
- Review [CONTACT_API_REQUIREMENTS.md](./CONTACT_API_REQUIREMENTS.md)
- Contact: CUA Ghana Development Team

---

**Last Updated:** 2025-10-28
**Version:** 1.0.0
**CMS Version:** Strapi v5.25.0
