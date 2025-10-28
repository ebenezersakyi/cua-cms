# Contact Page API Requirements

## Overview

This document outlines the API requirements for the Contact page on the CUA Ghana website. The page includes a hero section, contact information cards, a contact form with submission endpoint, map integration, and quick links.

---

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Data Models](#data-models)
3. [Frontend Integration](#frontend-integration)
4. [Helper Functions](#helper-functions)
5. [Testing Checklist](#testing-checklist)
6. [Implementation Priority](#implementation-priority)

---

## 1. API Endpoints

### 1.1 Get Contact Page Configuration

**Endpoint:** `GET /api/contact-page`

**Description:** Retrieves the Contact page configuration including hero section, contact info cards, map settings, and quick links.

**Query Parameters:**
- `populate=deep` - Include all nested relations

**Response Example:**

```json
{
  "data": {
    "id": 1,
    "documentId": "contact-page-001",
    "heroSection": {
      "badge": "Get In Touch",
      "title": "Contact Us",
      "description": "We're here to help. Reach out to us for inquiries, support, or to learn more about CUA Ghana.",
      "backgroundImage": {
        "id": 1,
        "url": "/uploads/contact_hero_bg_abc123.jpg",
        "alternativeText": "Contact Us Background",
        "width": 1920,
        "height": 1080
      }
    },
    "contactInfoSection": {
      "title": "Contact Information",
      "description": "Multiple ways to reach us - choose what works best for you"
    },
    "contactInfoCards": [
      {
        "id": 1,
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
        "id": 2,
        "icon": "FiPhone",
        "title": "Phone",
        "details": ["+233 302 220299"],
        "color": "bg-green-100 text-green-600"
      },
      {
        "id": 3,
        "icon": "FiMail",
        "title": "Email",
        "details": ["info@cua.org.gh"],
        "color": "bg-purple-100 text-purple-600"
      },
      {
        "id": 4,
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
          "id": 1,
          "name": "fullName",
          "label": "Full Name",
          "type": "text",
          "required": true,
          "icon": "FiUser",
          "placeholder": "John Doe"
        },
        {
          "id": 2,
          "name": "email",
          "label": "Email Address",
          "type": "email",
          "required": false,
          "icon": "FiMail",
          "placeholder": "john@example.com"
        },
        {
          "id": 3,
          "name": "phone",
          "label": "Phone Number",
          "type": "tel",
          "required": true,
          "icon": "FiPhone",
          "placeholder": "+233 XXX XXX XXX"
        },
        {
          "id": 4,
          "name": "subject",
          "label": "Subject",
          "type": "text",
          "required": false,
          "placeholder": "What is your inquiry about?"
        },
        {
          "id": 5,
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
          "id": 1,
          "label": "About CUA Ghana",
          "url": "/about-us/who-we-are",
          "icon": "→"
        },
        {
          "id": 2,
          "label": "Register for Training",
          "url": "/training/cutrac-registration",
          "icon": "→"
        },
        {
          "id": 3,
          "label": "Credit Union Information",
          "url": "/credit-unions/overview",
          "icon": "→"
        },
        {
          "id": 4,
          "label": "Downloads & Resources",
          "url": "/media/downloads",
          "icon": "→"
        }
      ]
    },
    "seoMetadata": {
      "metaTitle": "Contact Us - CUA Ghana",
      "metaDescription": "Get in touch with Credit Union Association Ghana. Contact us for inquiries, support, or to learn more about credit unions.",
      "keywords": "contact cua ghana, credit union contact, cua address, cua phone, credit union support"
    },
    "publishedAt": "2024-01-15T10:00:00.000Z",
    "createdAt": "2024-01-15T09:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  "meta": {}
}
```

### 1.2 Submit Contact Message

**Endpoint:** `POST /api/contact-messages`

**Description:** Submits a new contact form message from website visitors.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**

```json
{
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+233 123 456 789",
    "subject": "Inquiry about Credit Union Membership",
    "message": "I would like to know more about joining a credit union in my area.",
    "source": "Contact Page",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

**Response Example (Success):**

```json
{
  "data": {
    "id": 123,
    "documentId": "msg-abc123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+233 123 456 789",
    "subject": "Inquiry about Credit Union Membership",
    "message": "I would like to know more about joining a credit union in my area.",
    "source": "Contact Page",
    "status": "new",
    "isRead": false,
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-15T14:30:00.000Z"
  },
  "meta": {}
}
```

**Response Example (Validation Error):**

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
          "message": "Full name is required",
          "name": "ValidationError"
        },
        {
          "path": ["message"],
          "message": "Message is required",
          "name": "ValidationError"
        }
      ]
    }
  }
}
```

---

## 2. Data Models

### 2.1 Contact Page (Single Type)

**Content Type:** `contact-page` (Single Type)

**TypeScript Interface:**

```typescript
interface ContactPage {
  id: number;
  documentId: string;
  heroSection: HeroSection;
  contactInfoSection: SectionHeader;
  contactInfoCards: ContactInfoCard[];
  contactFormSection: ContactFormConfiguration;
  mapConfiguration: MapConfiguration;
  quickLinksSection: QuickLinksSection;
  seoMetadata: SEOMetadata;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface HeroSection {
  badge: string;
  title: string;
  description: string;
  backgroundImage: StrapiImage | null;
}

interface SectionHeader {
  title: string;
  description: string;
}

interface ContactInfoCard {
  id: number;
  icon: string; // Icon component name (e.g., "FiMapPin", "FiPhone")
  title: string;
  details: string[]; // Array of detail lines
  color: string; // Tailwind classes (e.g., "bg-blue-100 text-blue-600")
}

interface ContactFormConfiguration {
  title: string;
  icon: string;
  successTitle: string;
  successMessage: string;
  fields: FormField[];
}

interface FormField {
  id: number;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  icon?: string;
  placeholder?: string;
  rows?: number; // For textarea
}

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

interface QuickLinksSection {
  title: string;
  backgroundColor: string; // Tailwind class
  borderColor: string; // Tailwind class
  links: QuickLink[];
}

interface QuickLink {
  id: number;
  label: string;
  url: string;
  icon: string; // Usually "→" or icon component name
}

interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}
```

### 2.2 Contact Message (Collection Type)

**Content Type:** `contact-messages` (Collection Type)

**TypeScript Interface:**

```typescript
interface ContactMessage {
  id: number;
  documentId: string;
  fullName: string;
  email?: string;
  phone: string;
  subject?: string;
  message: string;
  source: string; // e.g., "Contact Page", "Training Registration"
  status: 'new' | 'read' | 'in_progress' | 'resolved' | 'archived';
  isRead: boolean;
  ipAddress?: string;
  userAgent?: string;
  adminNotes?: string; // For internal use
  assignedTo?: string; // Staff member handling the message
  createdAt: string;
  updatedAt: string;
}
```

### 2.3 Strapi Content Type Schemas

#### Contact Page (Single Type)

```json
{
  "kind": "singleType",
  "collectionName": "contact_page",
  "info": {
    "singularName": "contact-page",
    "pluralName": "contact-pages",
    "displayName": "Contact Page",
    "description": "Contact page configuration and content"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "heroSection": {
      "type": "component",
      "repeatable": false,
      "component": "sections.hero-section"
    },
    "contactInfoSection": {
      "type": "component",
      "repeatable": false,
      "component": "sections.section-header"
    },
    "contactInfoCards": {
      "type": "component",
      "repeatable": true,
      "component": "contact.info-card"
    },
    "contactFormSection": {
      "type": "component",
      "repeatable": false,
      "component": "contact.form-configuration"
    },
    "mapConfiguration": {
      "type": "component",
      "repeatable": false,
      "component": "contact.map-configuration"
    },
    "quickLinksSection": {
      "type": "component",
      "repeatable": false,
      "component": "sections.quick-links"
    },
    "seoMetadata": {
      "type": "component",
      "repeatable": false,
      "component": "shared.seo"
    }
  }
}
```

#### Contact Info Card Component

```json
{
  "collectionName": "components_contact_info_cards",
  "info": {
    "displayName": "Contact Info Card",
    "description": "Contact information card with icon and details"
  },
  "options": {},
  "attributes": {
    "icon": {
      "type": "string",
      "required": true,
      "default": "FiMapPin"
    },
    "title": {
      "type": "string",
      "required": true
    },
    "details": {
      "type": "json",
      "required": true
    },
    "color": {
      "type": "string",
      "default": "bg-blue-100 text-blue-600"
    }
  }
}
```

#### Contact Form Configuration Component

```json
{
  "collectionName": "components_contact_form_configurations",
  "info": {
    "displayName": "Form Configuration",
    "description": "Contact form configuration"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "icon": {
      "type": "string",
      "default": "FiMessageCircle"
    },
    "successTitle": {
      "type": "string",
      "required": true
    },
    "successMessage": {
      "type": "text",
      "required": true
    },
    "fields": {
      "type": "component",
      "repeatable": true,
      "component": "forms.form-field"
    }
  }
}
```

#### Form Field Component

```json
{
  "collectionName": "components_forms_form_fields",
  "info": {
    "displayName": "Form Field",
    "description": "Dynamic form field configuration"
  },
  "options": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "label": {
      "type": "string",
      "required": true
    },
    "type": {
      "type": "enumeration",
      "enum": ["text", "email", "tel", "textarea", "select", "checkbox"],
      "default": "text",
      "required": true
    },
    "required": {
      "type": "boolean",
      "default": false
    },
    "icon": {
      "type": "string"
    },
    "placeholder": {
      "type": "string"
    },
    "rows": {
      "type": "integer",
      "default": 3
    }
  }
}
```

#### Map Configuration Component

```json
{
  "collectionName": "components_contact_map_configurations",
  "info": {
    "displayName": "Map Configuration",
    "description": "Google Maps configuration"
  },
  "options": {},
  "attributes": {
    "latitude": {
      "type": "decimal",
      "required": true
    },
    "longitude": {
      "type": "decimal",
      "required": true
    },
    "zoom": {
      "type": "integer",
      "default": 15
    },
    "markerTitle": {
      "type": "string",
      "required": true
    },
    "markerInfoWindow": {
      "type": "component",
      "repeatable": false,
      "component": "contact.marker-info"
    }
  }
}
```

#### Marker Info Component

```json
{
  "collectionName": "components_contact_marker_infos",
  "info": {
    "displayName": "Marker Info",
    "description": "Map marker information window"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "addressLine1": {
      "type": "string",
      "required": true
    },
    "addressLine2": {
      "type": "string"
    }
  }
}
```

#### Quick Links Section Component

```json
{
  "collectionName": "components_sections_quick_links",
  "info": {
    "displayName": "Quick Links Section",
    "description": "Quick links section with styling"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "backgroundColor": {
      "type": "string",
      "default": "bg-blue-50"
    },
    "borderColor": {
      "type": "string",
      "default": "border-blue-100"
    },
    "links": {
      "type": "component",
      "repeatable": true,
      "component": "shared.link"
    }
  }
}
```

#### Contact Messages Collection Type

```json
{
  "kind": "collectionType",
  "collectionName": "contact_messages",
  "info": {
    "singularName": "contact-message",
    "pluralName": "contact-messages",
    "displayName": "Contact Message",
    "description": "Contact form submissions"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {},
  "attributes": {
    "fullName": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email"
    },
    "phone": {
      "type": "string",
      "required": true
    },
    "subject": {
      "type": "string"
    },
    "message": {
      "type": "text",
      "required": true
    },
    "source": {
      "type": "string",
      "default": "Contact Page"
    },
    "status": {
      "type": "enumeration",
      "enum": ["new", "read", "in_progress", "resolved", "archived"],
      "default": "new"
    },
    "isRead": {
      "type": "boolean",
      "default": false
    },
    "ipAddress": {
      "type": "string"
    },
    "userAgent": {
      "type": "text"
    },
    "adminNotes": {
      "type": "text"
    },
    "assignedTo": {
      "type": "string"
    }
  }
}
```

---

## 3. Frontend Integration

### 3.1 API Functions (lib/strapi.js)

```javascript
/**
 * Get Contact Page Configuration
 */
export async function getContactPage() {
  const data = await fetchAPI('/api/contact-page', {
    next: { revalidate: 3600 }, // 1 hour cache
  }, {
    'populate': 'deep',
  });
  return data;
}

/**
 * Submit Contact Message
 * Note: This function already exists in lib/strapi.js
 */
export async function submitContactMessage(formData) {
  const data = await fetchAPI('/api/contact-messages', {
    method: 'POST',
    body: JSON.stringify({ data: formData }),
  });
  return data;
}
```

### 3.2 Contact Page Component Integration

```javascript
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getContactPage, submitContactMessage, getStrapiMedia } from "../../lib/strapi";
import { getIcon } from "../../lib/iconMapper";
import CMSDataLoader from "../components/CMSDataLoader";
import GoogleMap from "../components/GoogleMap";

export default function Contact() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getContactPage();
        if (response?.data) {
          setPageData(response.data);
        }
      } catch (err) {
        console.error('Error fetching Contact page:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot !== "") {
      console.log("Spam detected");
      return;
    }

    try {
      setIsSubmitting(true);

      await submitContactMessage({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        source: 'Contact Page'
      });

      setIsSubmitted(true);

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: ""
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare data with fallback
  const heroData = pageData?.heroSection || {
    badge: "Get In Touch",
    title: "Contact Us",
    description: "We're here to help. Reach out to us for inquiries, support, or to learn more about CUA Ghana.",
    backgroundImage: null
  };

  const contactInfoSection = pageData?.contactInfoSection || {
    title: "Contact Information",
    description: "Multiple ways to reach us - choose what works best for you"
  };

  const contactInfo = pageData?.contactInfoCards && pageData.contactInfoCards.length > 0
    ? pageData.contactInfoCards.map(card => ({
        ...card,
        icon: getIcon(card.icon)
      }))
    : staticContactInfo; // Static fallback

  const formConfig = pageData?.contactFormSection || {
    title: "Send us a Message",
    icon: "FiMessageCircle",
    successTitle: "Message Sent Successfully!",
    successMessage: "Thank you for contacting us. We'll get back to you soon."
  };

  const mapConfig = pageData?.mapConfiguration || {
    latitude: 5.5600,
    longitude: -0.2050,
    zoom: 15,
    markerTitle: "CUA Ghana - Head Office",
    markerInfoWindow: {
      title: "CUA Ghana Head Office",
      addressLine1: "44 Jones Nelson Street, Adabraka",
      addressLine2: "Accra - Ghana"
    }
  };

  const quickLinks = pageData?.quickLinksSection || {
    title: "Quick Links",
    backgroundColor: "bg-blue-50",
    borderColor: "border-blue-100",
    links: staticQuickLinks // Static fallback
  };

  return (
    <div className="min-h-screen">
      <CMSDataLoader loading={loading} error={error} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src={getStrapiMedia(heroData.backgroundImage) || "/images/hero/hero1.jpg"}
            alt={heroData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#01366b]/90 via-[#01366b]/70 to-[#01366b]/50"></div>
        </div>

        {/* Hero content using heroData */}
      </section>

      {/* Contact Information Cards using contactInfo */}
      {/* Contact Form using formConfig */}
      {/* Map using mapConfig */}
      {/* Quick Links using quickLinks */}
    </div>
  );
}
```

### 3.3 Dynamic Form Field Rendering

For advanced implementations, you can render form fields dynamically from the API:

```javascript
{pageData?.contactFormSection?.fields?.map((field) => (
  <div key={field.id}>
    <label htmlFor={field.name} className="flex items-center text-sm font-bold text-gray-700 mb-2">
      {field.icon && <span className="mr-2">{getIcon(field.icon)}</span>}
      {field.label} {field.required && '*'}
    </label>

    {field.type === 'textarea' ? (
      <textarea
        id={field.name}
        name={field.name}
        value={formData[field.name] || ''}
        onChange={handleInputChange}
        required={field.required}
        rows={field.rows || 5}
        placeholder={field.placeholder}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#01366b] focus:border-transparent transition-all duration-200"
      />
    ) : (
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        value={formData[field.name] || ''}
        onChange={handleInputChange}
        required={field.required}
        placeholder={field.placeholder}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#01366b] focus:border-transparent transition-all duration-200"
      />
    )}
  </div>
))}
```

---

## 4. Helper Functions

### 4.1 Format Map Info Window HTML

```javascript
/**
 * Format map info window HTML from API data
 */
export function formatMapInfoWindow(markerInfo) {
  return `
    <div style="padding: 8px;">
      <h3 style="font-weight: bold; margin-bottom: 4px;">${markerInfo.title}</h3>
      <p style="margin: 0; font-size: 14px;">${markerInfo.addressLine1}</p>
      ${markerInfo.addressLine2 ? `<p style="margin: 0; font-size: 14px;">${markerInfo.addressLine2}</p>` : ''}
    </div>
  `;
}
```

### 4.2 Form Validation

```javascript
/**
 * Validate contact form data
 */
export function validateContactForm(formData) {
  const errors = [];

  if (!formData.fullName || formData.fullName.trim() === '') {
    errors.push('Full name is required');
  }

  if (!formData.phone || formData.phone.trim() === '') {
    errors.push('Phone number is required');
  }

  if (!formData.message || formData.message.trim() === '') {
    errors.push('Message is required');
  }

  if (formData.email && !isValidEmail(formData.email)) {
    errors.push('Invalid email address');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

## 5. Testing Checklist

### 5.1 API Endpoints Testing

- [ ] **GET /api/contact-page**
  - [ ] Returns complete page configuration
  - [ ] Hero section includes all fields
  - [ ] Contact info cards array is populated
  - [ ] Form configuration is complete
  - [ ] Map configuration has valid coordinates
  - [ ] Quick links array is populated
  - [ ] Images return valid URLs
  - [ ] Response time < 500ms

- [ ] **POST /api/contact-messages**
  - [ ] Successfully creates new contact message
  - [ ] Returns created message with ID
  - [ ] Validates required fields (fullName, phone, message)
  - [ ] Handles optional fields (email, subject)
  - [ ] Returns 400 for missing required fields
  - [ ] Returns 400 for invalid email format
  - [ ] Auto-sets status to "new" and isRead to false
  - [ ] Stores source, ipAddress, userAgent correctly

### 5.2 Data Validation Testing

- [ ] **Contact Page Configuration**
  - [ ] Hero section badge, title, description are strings
  - [ ] Background image URL is valid
  - [ ] Contact info cards have 4 items (Address, Phone, Email, Hours)
  - [ ] Each card has valid icon name
  - [ ] Details arrays contain correct information
  - [ ] Form fields array has 5 fields (fullName, email, phone, subject, message)
  - [ ] Map coordinates are valid (latitude, longitude)
  - [ ] Quick links URLs are internal paths
  - [ ] All color classes are valid Tailwind classes

- [ ] **Contact Message Submission**
  - [ ] Full name accepts alphanumeric and spaces
  - [ ] Email validation works correctly
  - [ ] Phone accepts various formats (+233, 0XXX, etc.)
  - [ ] Subject is optional
  - [ ] Message can be long text (500+ characters)
  - [ ] Honeypot field prevents spam submissions

### 5.3 Frontend Integration Testing

- [ ] **Page Loading**
  - [ ] Loading overlay appears during data fetch
  - [ ] Error message displays if API fails
  - [ ] Falls back to static content if API unavailable
  - [ ] All sections render correctly

- [ ] **Contact Info Cards**
  - [ ] Icons render correctly from API icon names
  - [ ] Details arrays display as multiple lines
  - [ ] Colors apply correctly from API
  - [ ] Hover effects work

- [ ] **Contact Form**
  - [ ] All form fields render dynamically
  - [ ] Required field indicators (*) show correctly
  - [ ] Icons appear on labeled fields
  - [ ] Placeholders display from API
  - [ ] Form validation works client-side
  - [ ] Submit button disables during submission
  - [ ] Success message displays after submission
  - [ ] Form resets after successful submission
  - [ ] Error handling works for failed submissions
  - [ ] Honeypot field is hidden and functional

- [ ] **Google Map**
  - [ ] Map renders at correct coordinates from API
  - [ ] Zoom level applies correctly
  - [ ] Marker appears at office location
  - [ ] Info window displays on marker click
  - [ ] Info window content matches API data

- [ ] **Quick Links**
  - [ ] All links render from API
  - [ ] Background and border colors apply correctly
  - [ ] Links navigate to correct URLs
  - [ ] Hover effects work

### 5.4 Performance Testing

- [ ] Contact page loads in < 2 seconds
- [ ] Form submission completes in < 1 second
- [ ] Map loads without blocking page render
- [ ] Images are optimized and lazy-loaded
- [ ] API responses are cached appropriately

### 5.5 SEO Testing

- [ ] Meta title sets correctly from API
- [ ] Meta description sets correctly from API
- [ ] Keywords are included in meta tags
- [ ] Structured data for Organization/ContactPoint
- [ ] Alt text on images

### 5.6 Accessibility Testing

- [ ] All form fields have labels
- [ ] Required fields marked with aria-required
- [ ] Form validation errors are announced
- [ ] Keyboard navigation works throughout
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible on all interactive elements

---

## 6. Implementation Priority

### Phase 1: Core Functionality (Week 1)
1. ✅ Create Contact Page single type in Strapi
2. ✅ Create Contact Messages collection type
3. ✅ Set up all required components (hero, info cards, form config, map, quick links)
4. ✅ Configure API endpoint: GET /api/contact-page
5. ✅ Configure API endpoint: POST /api/contact-messages
6. ✅ Add sample content for testing

### Phase 2: Frontend Integration (Week 1-2)
1. ✅ Create getContactPage() function in lib/strapi.js
2. ✅ Verify submitContactMessage() function exists
3. ✅ Integrate Contact page component with API
4. ✅ Add loading and error states
5. ✅ Implement form submission with API
6. ✅ Add success/error handling
7. ✅ Test complete user flow

### Phase 3: Enhanced Features (Week 2)
1. ⏳ Dynamic form field rendering from API
2. ⏳ Form field validation from API rules
3. ⏳ Email notifications for new submissions
4. ⏳ Admin dashboard for managing messages
5. ⏳ Status workflow for message handling
6. ⏳ Auto-responder email to submitters

### Phase 4: Optimization (Week 3)
1. ⏳ Performance optimization
2. ⏳ Caching strategy refinement
3. ⏳ SEO optimization
4. ⏳ Analytics tracking for form submissions
5. ⏳ A/B testing for form conversion

---

## 7. Notes and Considerations

### 7.1 Security Considerations

- **Honeypot Field**: The form includes a hidden honeypot field to prevent spam bots
- **Rate Limiting**: Implement rate limiting on POST /api/contact-messages (e.g., 5 submissions per hour per IP)
- **Input Sanitization**: Sanitize all user inputs to prevent XSS attacks
- **CAPTCHA**: Consider adding reCAPTCHA for production
- **IP Logging**: Log IP addresses for abuse tracking
- **Email Validation**: Validate email format server-side
- **Message Length**: Limit message length (e.g., max 2000 characters)

### 7.2 Email Notifications

Configure Strapi to send email notifications when new contact messages are received:

```javascript
// In Strapi: api/contact-message/controllers/contact-message.js
async create(ctx) {
  const response = await super.create(ctx);

  // Send email notification to admin
  await strapi.plugins['email'].services.email.send({
    to: 'info@cua.org.gh',
    from: 'noreply@cua.org.gh',
    subject: `New Contact Message: ${response.data.subject || 'No Subject'}`,
    text: `
      New contact form submission:

      Name: ${response.data.fullName}
      Email: ${response.data.email}
      Phone: ${response.data.phone}
      Subject: ${response.data.subject}
      Message: ${response.data.message}

      Submitted at: ${new Date().toLocaleString()}
    `
  });

  return response;
}
```

### 7.3 Admin Features

Recommended admin features for contact message management:

- **Message Dashboard**: View all messages with status filters
- **Search**: Search messages by name, email, phone, or content
- **Status Management**: Mark as read, in progress, resolved, archived
- **Assignment**: Assign messages to team members
- **Response Templates**: Quick response templates for common inquiries
- **Export**: Export messages to CSV/Excel
- **Analytics**: Track response times, resolution rates

### 7.4 Data Retention

- Keep contact messages for 2 years
- Anonymize or delete messages older than 2 years (GDPR compliance)
- Archive resolved messages after 90 days

### 7.5 Integration with CRM

Consider integrating contact messages with a CRM system:
- Automatically create leads in CRM from form submissions
- Sync message status between Strapi and CRM
- Track conversion from inquiry to member/customer

---

## 8. Example Static Fallback Data

For reference, here's the static data structure currently in the Contact page:

```javascript
const staticContactInfo = [
  {
    icon: FiMapPin,
    title: "Address",
    details: [
      "44 Jones Nelson Street, Adabraka",
      "Accra - Ghana",
      "GA-075-1361"
    ],
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: FiPhone,
    title: "Phone",
    details: ["+233 302 220299"],
    color: "bg-green-100 text-green-600"
  },
  {
    icon: FiMail,
    title: "Email",
    details: ["info@cua.org.gh"],
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: FiClock,
    title: "Office Hours",
    details: [
      "Monday - Friday: 8:00 AM - 5:00 PM",
      "Saturday - Sunday: Closed"
    ],
    color: "bg-orange-100 text-orange-600"
  }
];

const staticQuickLinks = [
  {
    label: "About CUA Ghana",
    url: "/about-us/who-we-are",
    icon: "→"
  },
  {
    label: "Register for Training",
    url: "/training/cutrac-registration",
    icon: "→"
  },
  {
    label: "Credit Union Information",
    url: "/credit-unions/overview",
    icon: "→"
  },
  {
    label: "Downloads & Resources",
    url: "/media/downloads",
    icon: "→"
  }
];
```

---

## Summary

This document provides complete specifications for the Contact page API integration, including:
- 2 API endpoints (GET page config, POST message submission)
- Comprehensive data models with TypeScript interfaces
- Complete Strapi content type schemas
- Frontend integration code examples
- Helper functions for validation and formatting
- 40+ test scenarios
- Security considerations and best practices
- Implementation roadmap

The Contact page features a hero section, 4 contact information cards, a 5-field contact form with spam protection, Google Maps integration, and a quick links section - all manageable through the Strapi CMS.
