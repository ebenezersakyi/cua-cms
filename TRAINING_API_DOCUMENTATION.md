# Training Pages API Documentation

This document provides comprehensive API integration documentation for the **Training** section of the CUA Ghana website.

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Single Type Endpoints](#single-type-endpoints)
5. [Collection Type Endpoints](#collection-type-endpoints)
6. [Query Parameters](#query-parameters)
7. [Response Format](#response-format)
8. [Component Schemas](#component-schemas)
9. [Error Handling](#error-handling)
10. [Frontend Integration Examples](#frontend-integration-examples)
11. [Testing](#testing)

---

## Overview

The Training section provides information about CUTRAC (Credit Union Training and Advisory Centre) services, including training programs, calendar, pricing, registration, and travel information.

### Available Pages

**Single Type Pages (6):**
- CUTRAC Overview Page - Main landing page for training services
- Training Calendar Page - Upcoming training programs and schedule
- Training Prices Page - Pricing for facilities, accommodation, and meals
- Training Registration Page - Registration form configuration
- Contact CUTRAC Page - Contact information and inquiry form
- Travel for Training Page - Travel and accommodation information

**Collection Types (2):**
- Training Courses - Course catalog
- Training Schedules - Scheduled training sessions

---

## Base URL

```
http://localhost:1337
```

For production, replace with your production domain.

---

## Authentication

All Training page endpoints are **publicly accessible** and do not require authentication.

---

## Single Type Endpoints

### 1. CUTRAC Overview Page

**Endpoint:** `GET /api/cutrac-overview-page`

**Description:** Main landing page for CUTRAC training services with overview information, features, programs, and statistics.

#### Request

```bash
GET /api/cutrac-overview-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "cutrac123",
    "heroSection": {
      "id": 1,
      "badge": "CUA Training",
      "title": "CUTRAC - Credit Union Training and Advisory Centre",
      "description": "Building capacity and excellence in Ghana's credit union sector through professional training and advisory services",
      "backgroundImage": {
        "id": 1,
        "url": "/uploads/cutrac_hero_bg.jpg",
        "alternativeText": "CUTRAC Training Centre",
        "formats": {
          "large": { "url": "/uploads/large_cutrac_hero_bg.jpg" },
          "medium": { "url": "/uploads/medium_cutrac_hero_bg.jpg" },
          "small": { "url": "/uploads/small_cutrac_hero_bg.jpg" }
        }
      }
    },
    "introSection": {
      "id": 1,
      "title": "About CUTRAC",
      "content": "<p>The Credit Union Training and Advisory Centre (CUTRAC) is the premier training institution...</p>",
      "videoUrl": "https://youtube.com/watch?v=example",
      "videoThumbnail": {
        "url": "/uploads/video_thumbnail.jpg"
      }
    },
    "missionSection": {
      "id": 1,
      "mission": "To provide world-class training and advisory services...",
      "vision": "To be the leading training institution for credit unions...",
      "values": [
        { "title": "Excellence", "description": "Commitment to quality training..." },
        { "title": "Innovation", "description": "Adopting modern training methodologies..." }
      ]
    },
    "servicesSection": {
      "id": 1,
      "title": "Our Services",
      "services": [
        {
          "icon": "FiBook",
          "title": "Professional Training",
          "description": "Comprehensive training programs for credit union staff..."
        }
      ]
    },
    "programsSection": {
      "id": 1,
      "title": "Training Programs",
      "programs": [
        {
          "title": "Leadership Development",
          "description": "Programs designed for board members and executives",
          "duration": "3-5 days",
          "level": "Advanced"
        }
      ]
    },
    "statsSection": {
      "id": 1,
      "stats": [
        { "label": "Trainees Annually", "value": "1,500+" },
        { "label": "Training Programs", "value": "50+" },
        { "label": "Years of Excellence", "value": "20+" }
      ]
    },
    "facilitiesSection": {
      "id": 1,
      "title": "Our Facilities",
      "facilities": [
        {
          "name": "Training Halls",
          "description": "Modern, air-conditioned training rooms with capacity for 300 participants",
          "icon": "FiHome"
        }
      ]
    },
    "partnersSection": {
      "id": 1,
      "title": "Our Training Partners",
      "partners": [
        {
          "name": "WOCCU",
          "logo": { "url": "/uploads/woccu_logo.png" }
        }
      ]
    },
    "ctaSection": {
      "id": 1,
      "title": "Ready to Enhance Your Skills?",
      "description": "Join hundreds of credit union professionals who have advanced their careers through CUTRAC",
      "primaryCtaText": "Register for Training",
      "primaryCtaLink": "/training/cutrac-registration",
      "secondaryCtaText": "View Training Calendar",
      "secondaryCtaLink": "/training/training-calendar"
    },
    "seo": {
      "metaTitle": "CUTRAC - Credit Union Training Centre | CUA Ghana",
      "metaDescription": "Professional training and advisory services for Ghana's credit union sector",
      "keywords": "credit union training, CUTRAC, professional development, Ghana"
    }
  },
  "meta": {}
}
```

#### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `heroSection` | Component | Hero banner with badge, title, description, and background image |
| `introSection` | Component | Introduction with optional video |
| `missionSection` | Component | Mission, vision, and core values |
| `servicesSection` | Component | Grid of training services offered |
| `programsSection` | Component | List of training programs |
| `statsSection` | Component | Key statistics and achievements |
| `facilitiesSection` | Component | Training facilities information |
| `partnersSection` | Component | Training partners and collaborators |
| `ctaSection` | Component | Call-to-action with dual buttons |
| `seo` | Component | SEO metadata |

---

### 2. Training Calendar Page

**Endpoint:** `GET /api/training-calendar-page`

**Description:** Displays upcoming training programs with dates, locations, and registration information.

#### Request

```bash
GET /api/training-calendar-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "calendar123",
    "heroSection": {
      "id": 1,
      "badge": "Training Calendar",
      "title": "Upcoming Training Programs",
      "description": "View our schedule of training programs and register early to secure your spot",
      "backgroundImage": {
        "url": "/uploads/calendar_hero.jpg"
      }
    },
    "calendarIntro": {
      "id": 1,
      "title": "Plan Your Professional Development",
      "content": "<p>Browse our comprehensive training calendar to find programs that match your development needs...</p>",
      "videoUrl": null
    },
    "downloadCta": {
      "id": 1,
      "title": "Download Training Calendar",
      "description": "Get the complete training calendar in PDF format for easy reference",
      "primaryCtaText": "Download PDF",
      "primaryCtaLink": "/downloads/training-calendar.pdf",
      "secondaryCtaText": "Subscribe to Updates",
      "secondaryCtaLink": "/newsletter"
    },
    "seo": {
      "metaTitle": "Training Calendar | CUTRAC - CUA Ghana",
      "metaDescription": "View upcoming training programs and schedules at CUTRAC",
      "keywords": "training calendar, upcoming programs, CUTRAC schedule"
    }
  },
  "meta": {}
}
```

**Note:** The actual training programs are fetched from the `/api/training-schedules` collection endpoint.

---

### 3. Training Prices Page

**Endpoint:** `GET /api/training-prices-page`

**Description:** Displays pricing information for training facilities, accommodation, and meals.

#### Request

```bash
GET /api/training-prices-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "prices123",
    "heroSection": {
      "id": 1,
      "badge": "Pricing",
      "title": "Training Prices",
      "description": "Transparent pricing for our training facilities, accommodation, and catering services",
      "backgroundImage": {
        "url": "/uploads/prices_hero.jpg"
      }
    },
    "hallFacilities": {
      "id": 1,
      "title": "Hall & Conference Facilities",
      "items": [
        {
          "category": "Training Halls",
          "details": "Hall A (100 capacity)",
          "price": "GHC 800.00 per day",
          "notes": "Includes projector, sound system, and air conditioning"
        },
        {
          "category": "Training Halls",
          "details": "Hall B (300 capacity) with CUTraC Food Service",
          "price": "GHC 1,500.00 per day",
          "notes": "Full catering service included"
        },
        {
          "category": "Conference Rooms",
          "details": "Small Conference Room (20 capacity)",
          "price": "GHC 300.00 per day",
          "notes": "Perfect for executive meetings"
        }
      ]
    },
    "accommodation": {
      "id": 2,
      "title": "Accommodation",
      "items": [
        {
          "category": "Rooms",
          "details": "Single Bed Room",
          "price": "GHC 110.00 per night",
          "notes": "Includes breakfast"
        },
        {
          "category": "Rooms",
          "details": "Double Bed Room",
          "price": "GHC 150.00 per night",
          "notes": "Includes breakfast"
        },
        {
          "category": "Suites",
          "details": "Executive Suite",
          "price": "GHC 250.00 per night",
          "notes": "Includes breakfast and WiFi"
        }
      ]
    },
    "meals": {
      "id": 3,
      "title": "Meals & Catering",
      "items": [
        {
          "category": "Normal Meals",
          "details": "Breakfast",
          "price": "GHC 20.00",
          "notes": "Continental or local"
        },
        {
          "category": "Normal Meals",
          "details": "Lunch",
          "price": "GHC 30.00",
          "notes": "Two-course meal"
        },
        {
          "category": "Normal Meals",
          "details": "Dinner",
          "price": "GHC 35.00",
          "notes": "Two-course meal"
        },
        {
          "category": "Buffet",
          "details": "Breakfast Buffet",
          "price": "GHC 25.00 and above",
          "notes": "Minimum 30 persons"
        },
        {
          "category": "Buffet",
          "details": "Lunch/Dinner Buffet",
          "price": "GHC 40.00 and above",
          "notes": "Minimum 30 persons"
        }
      ]
    },
    "importantNotes": "<h3>Important Notes</h3><ul><li><strong>Payment Terms:</strong> Not less than 50% payment required for all bookings. Balance must be settled before or on the event day.</li><li><strong>Amenities Included:</strong> All training halls include projectors, sound systems, air conditioning, and WiFi access.</li><li><strong>Terms & Conditions:</strong> Cancellations must be made at least 7 days in advance for full refund.</li><li><strong>Group Discounts:</strong> Special rates available for groups of 30+ participants.</li></ul>",
    "ctaSection": {
      "id": 1,
      "title": "Ready to Book?",
      "description": "Contact us today to reserve your training space and accommodation",
      "primaryCtaText": "Contact Us",
      "primaryCtaLink": "/training/contact-cutrac",
      "secondaryCtaText": "View Calendar",
      "secondaryCtaLink": "/training/training-calendar"
    },
    "lastUpdated": "2025-01-15",
    "seo": {
      "metaTitle": "Training Prices | CUTRAC - CUA Ghana",
      "metaDescription": "View pricing for training facilities, accommodation, and catering at CUTRAC",
      "keywords": "training prices, facility rental, accommodation rates, CUTRAC"
    }
  },
  "meta": {}
}
```

#### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `hallFacilities` | Component | Pricing for training halls and conference rooms |
| `accommodation` | Component | Room and suite pricing |
| `meals` | Component | Meal and catering pricing |
| `importantNotes` | Rich Text | Payment terms, amenities, and conditions |
| `lastUpdated` | Date | Date when prices were last updated |

---

### 4. Training Registration Page

**Endpoint:** `GET /api/training-registration-page`

**Description:** Registration form configuration for training programs.

#### Request

```bash
GET /api/training-registration-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "registration123",
    "heroSection": {
      "id": 1,
      "badge": "Register Now",
      "title": "Training Registration",
      "description": "Register for upcoming training programs and advance your professional skills",
      "backgroundImage": {
        "url": "/uploads/registration_hero.jpg"
      }
    },
    "formIntro": {
      "id": 1,
      "title": "How to Register",
      "content": "<p>Complete the registration form below to reserve your spot in our training programs...</p><ul><li>Fill in all required fields</li><li>Select your preferred program</li><li>Choose convenient dates</li><li>Submit payment confirmation</li></ul>",
      "videoUrl": null
    },
    "formConfig": {
      "title": "Registration Form",
      "submitUrl": "/api/training-registrations",
      "successMessage": "Thank you for registering! We will contact you shortly with confirmation details.",
      "fields": [
        {
          "name": "fullName",
          "label": "Full Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter your full name"
        },
        {
          "name": "email",
          "label": "Email Address",
          "type": "email",
          "required": true,
          "placeholder": "your.email@example.com"
        },
        {
          "name": "phone",
          "label": "Phone Number",
          "type": "tel",
          "required": true,
          "placeholder": "+233 XX XXX XXXX"
        },
        {
          "name": "creditUnion",
          "label": "Credit Union Name",
          "type": "text",
          "required": true,
          "placeholder": "Your credit union"
        },
        {
          "name": "position",
          "label": "Position/Role",
          "type": "select",
          "required": true,
          "options": [
            { "value": "board-member", "label": "Board Member" },
            { "value": "ceo", "label": "CEO/General Manager" },
            { "value": "manager", "label": "Manager" },
            { "value": "officer", "label": "Credit/Loan Officer" },
            { "value": "accountant", "label": "Accountant" },
            { "value": "other", "label": "Other" }
          ]
        },
        {
          "name": "trainingProgram",
          "label": "Select Training Program",
          "type": "select",
          "required": true,
          "options": [
            { "value": "governance", "label": "Credit Union Governance & Leadership" },
            { "value": "financial-management", "label": "Financial Management" },
            { "value": "operations", "label": "Credit Union Operations" },
            { "value": "risk-management", "label": "Risk Management" },
            { "value": "customer-service", "label": "Customer Service Excellence" }
          ]
        },
        {
          "name": "preferredDate",
          "label": "Preferred Training Date",
          "type": "date",
          "required": true,
          "placeholder": "Select date"
        },
        {
          "name": "specialRequirements",
          "label": "Special Requirements (Optional)",
          "type": "textarea",
          "required": false,
          "placeholder": "Any dietary restrictions, accessibility needs, etc."
        }
      ]
    },
    "helpResources": "<h3>Need Help?</h3><ul><li><a href='/training/training-calendar'>View Training Calendar</a> - See all upcoming programs</li><li><a href='/training/prices'>Check Prices</a> - Review training costs</li><li><a href='/training/contact-cutrac'>Contact Us</a> - Speak with our training coordinator</li><li><a href='/faq'>FAQs</a> - Common questions answered</li></ul>",
    "seo": {
      "metaTitle": "Training Registration | CUTRAC - CUA Ghana",
      "metaDescription": "Register for professional training programs at CUTRAC",
      "keywords": "training registration, enroll, CUTRAC programs"
    }
  },
  "meta": {}
}
```

#### Form Submission

To submit the registration form:

```bash
POST /api/training-registrations
Content-Type: application/json

{
  "data": {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+233 XX XXX XXXX",
    "creditUnion": "Accra Credit Union",
    "position": "manager",
    "trainingProgram": "governance",
    "preferredDate": "2025-03-15",
    "specialRequirements": "Vegetarian meals preferred"
  }
}
```

**Note:** You'll need to create a `training-registrations` collection type to handle form submissions.

---

### 5. Contact CUTRAC Page

**Endpoint:** `GET /api/contact-cutrac-page`

**Description:** Contact information and inquiry form for the training team.

#### Request

```bash
GET /api/contact-cutrac-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "contact123",
    "heroSection": {
      "id": 1,
      "badge": "Get in Touch",
      "title": "Contact CUTraC",
      "description": "Reach out to our training team for inquiries, bookings, and support",
      "backgroundImage": {
        "url": "/uploads/contact_hero.jpg"
      }
    },
    "contactInfo": {
      "cards": [
        {
          "icon": "FiMapPin",
          "title": "Office Location",
          "details": [
            "CUA Ghana Head Office",
            "Ring Road Central, Accra",
            "P.O. Box 1234, Accra",
            "Ghana"
          ],
          "color": "blue"
        },
        {
          "icon": "FiPhone",
          "title": "Phone Numbers",
          "details": [
            "Main Office: +233 XX XXX XXXX",
            "Training Coordinator: +233 XX XXX XXXX",
            "Direct Line: +233 XX XXX XXXX"
          ],
          "color": "green"
        },
        {
          "icon": "FiMail",
          "title": "Email Addresses",
          "details": [
            "General Inquiries: info@cuaghana.org",
            "Training: training@cuaghana.org",
            "Registration: register@cuaghana.org"
          ],
          "color": "purple"
        },
        {
          "icon": "FiClock",
          "title": "Office Hours",
          "details": [
            "Monday - Friday: 8:00 AM - 5:00 PM",
            "Saturday: 9:00 AM - 1:00 PM",
            "Sunday: Closed",
            "Public Holidays: Closed"
          ],
          "color": "orange"
        }
      ]
    },
    "formConfig": {
      "title": "Send Us a Message",
      "description": "Have a question? Fill out the form below and we'll get back to you shortly.",
      "submitUrl": "/api/contact-messages",
      "successMessage": "Thank you for contacting us! We'll respond within 24-48 hours.",
      "fields": [
        {
          "name": "name",
          "label": "Full Name",
          "type": "text",
          "required": true,
          "placeholder": "Your name"
        },
        {
          "name": "email",
          "label": "Email Address",
          "type": "email",
          "required": true,
          "placeholder": "your.email@example.com"
        },
        {
          "name": "phone",
          "label": "Phone Number",
          "type": "tel",
          "required": false,
          "placeholder": "+233 XX XXX XXXX"
        },
        {
          "name": "subject",
          "label": "Subject",
          "type": "select",
          "required": true,
          "options": [
            { "value": "registration", "label": "Training Registration Inquiry" },
            { "value": "pricing", "label": "Pricing Information" },
            { "value": "facilities", "label": "Facility Booking" },
            { "value": "schedule", "label": "Training Schedule" },
            { "value": "custom", "label": "Custom Training Request" },
            { "value": "other", "label": "Other" }
          ]
        },
        {
          "name": "message",
          "label": "Message",
          "type": "textarea",
          "required": true,
          "placeholder": "Tell us how we can help..."
        }
      ]
    },
    "mapSection": {
      "id": 1,
      "centerLat": 5.6037,
      "centerLng": -0.1870,
      "zoom": 15,
      "markers": [
        {
          "lat": 5.6037,
          "lng": -0.1870,
          "title": "CUA Ghana - CUTRAC Training Centre",
          "infoWindow": "<div style='padding: 10px;'><h3>CUA Ghana Training Centre</h3><p>Ring Road Central, Accra</p><p><strong>Phone:</strong> +233 XX XXX XXXX</p></div>"
        }
      ]
    },
    "quickLinks": "<h3>Quick Links</h3><ul><li><a href='/training/cutrac-registration'>Register for Training</a></li><li><a href='/training/training-calendar'>View Training Calendar</a></li><li><a href='/training/prices'>Check Prices</a></li><li><a href='/training/travel-for-training'>Travel Information</a></li><li><a href='/downloads'>Download Brochures</a></li></ul>",
    "seo": {
      "metaTitle": "Contact CUTRAC | CUA Ghana",
      "metaDescription": "Get in touch with the CUTRAC training team for inquiries and support",
      "keywords": "contact CUTRAC, training inquiries, CUA contact"
    }
  },
  "meta": {}
}
```

---

### 6. Travel for Training Page

**Endpoint:** `GET /api/travel-for-training-page`

**Description:** Travel and accommodation information for training participants.

#### Request

```bash
GET /api/travel-for-training-page?populate=deep
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "travel123",
    "heroSection": {
      "id": 1,
      "badge": "Travel Guide",
      "title": "Travel for Training",
      "description": "Everything you need to know about traveling to our training centres",
      "backgroundImage": {
        "url": "/uploads/travel_hero.jpg"
      }
    },
    "locations": {
      "title": "Training Locations",
      "description": "We offer training programs at convenient locations across Ghana",
      "items": [
        {
          "city": "Accra",
          "address": "CUA Ghana Head Office, Ring Road Central, Accra",
          "accommodation": "Multiple hotels within 5km radius. Recommended: Hotel A, Hotel B, and Hotel C with special rates for trainees.",
          "transport": "15 minutes from Kotoka International Airport. Public transport (trotro, taxi) readily available. Uber and Bolt services operational.",
          "icon": "FiMapPin"
        },
        {
          "city": "Kumasi",
          "address": "CUA Regional Office, Adum, Kumasi",
          "address_details": "Near Prempeh II Jubilee Museum",
          "accommodation": "Partner hotels offering special rates for CUTRAC trainees. Group bookings available with advance notice.",
          "transport": "25 minutes from Kumasi Airport. Airport shuttle service available for groups. Local transport easily accessible.",
          "icon": "FiMapPin"
        },
        {
          "city": "Tamale",
          "address": "Northern Regional Training Centre, Tamale",
          "accommodation": "Limited on-site accommodation available. Partner hotels within 10km radius. Book early for training periods.",
          "transport": "20 minutes from Tamale Airport. We provide complimentary airport pickup for registered trainees (minimum 5 persons).",
          "icon": "FiMapPin"
        }
      ]
    },
    "amenities": {
      "id": 1,
      "title": "Accommodation & Amenities",
      "description": "Comfortable facilities to ensure a productive learning experience",
      "benefits": [
        {
          "icon": "FiHome",
          "title": "Partner Hotels",
          "description": "We have partnerships with quality hotels near our training centres offering special rates for CUTRAC participants. Discounts range from 10-20% off standard rates."
        },
        {
          "icon": "FiCoffee",
          "title": "Meals & Refreshments",
          "description": "All training programs include breakfast, lunch, and refreshments. Special dietary requirements can be accommodated with advance notice."
        },
        {
          "icon": "FiTruck",
          "title": "Transport Assistance",
          "description": "Airport pickup and drop-off services available for groups. We can arrange local transport for excursions or field visits as part of training programs."
        }
      ]
    },
    "travelTips": {
      "id": 1,
      "title": "Travel Tips",
      "steps": [
        {
          "number": 1,
          "title": "Book Early",
          "content": "Reserve your accommodation as soon as you register for training. Hotels fill up quickly during peak training seasons (February-March, August-September)."
        },
        {
          "number": 2,
          "title": "Confirm Transportation",
          "content": "If you need airport pickup, notify us at least 3 days before your arrival. Provide your flight details and estimated arrival time."
        },
        {
          "number": 3,
          "title": "Pack Appropriately",
          "content": "Bring business casual attire for training sessions. Training rooms are air-conditioned, so consider light layers. Don't forget chargers and notebooks."
        },
        {
          "number": 4,
          "title": "Check Visa Requirements",
          "content": "International participants should verify Ghana visa requirements well in advance. We can provide invitation letters for visa applications upon request."
        },
        {
          "number": 5,
          "title": "Stay Connected",
          "content": "WiFi is available at all training centres. Local SIM cards are available at airports and major outlets. Save our emergency contact numbers before traveling."
        }
      ]
    },
    "ctaSection": {
      "id": 1,
      "title": "Need Travel Assistance?",
      "description": "Our training coordination team is here to help you plan your travel and accommodation",
      "primaryCtaText": "Contact Training Coordinator",
      "primaryCtaLink": "/training/contact-cutrac",
      "secondaryCtaText": "View Training Calendar",
      "secondaryCtaLink": "/training/training-calendar"
    },
    "seo": {
      "metaTitle": "Travel for Training | CUTRAC - CUA Ghana",
      "metaDescription": "Travel and accommodation information for CUTRAC training participants",
      "keywords": "training travel, accommodation, CUTRAC locations, Ghana"
    }
  },
  "meta": {}
}
```

---

## Collection Type Endpoints

### 1. Training Courses

**Endpoint:** `GET /api/training-courses`

**Description:** Collection of available training courses in the CUTRAC catalog.

#### Request Examples

```bash
# Get all courses
GET /api/training-courses?populate=*

# Get courses by category
GET /api/training-courses?filters[category][$eq]=leadership&populate=*

# Search courses by title
GET /api/training-courses?filters[title][$contains]=governance&populate=*

# Sort by duration
GET /api/training-courses?sort=duration:asc&populate=*
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "course123",
      "title": "Credit Union Governance & Leadership",
      "slug": "credit-union-governance-leadership",
      "description": "<p>Comprehensive training program covering board governance, strategic planning, policy development, and leadership excellence...</p>",
      "category": "leadership",
      "duration": "5 Days",
      "level": "Advanced",
      "targetAudience": "Board Members, CEOs, Senior Managers",
      "objectives": [
        "Understand roles and responsibilities of board members",
        "Develop strategic planning skills",
        "Master policy development and implementation",
        "Enhance leadership and decision-making abilities"
      ],
      "modules": [
        "Introduction to Credit Union Governance",
        "Board Roles and Responsibilities",
        "Strategic Planning and Execution",
        "Financial Oversight and Risk Management",
        "Leadership and Team Building"
      ],
      "prerequisites": "Minimum 2 years experience in credit union sector",
      "certification": "Certificate of Completion from CUA Ghana",
      "price": "GHC 2,500.00",
      "thumbnail": {
        "url": "/uploads/course_governance.jpg",
        "alternativeText": "Governance Training"
      },
      "createdAt": "2025-01-10T10:00:00.000Z",
      "updatedAt": "2025-01-15T14:30:00.000Z",
      "publishedAt": "2025-01-10T10:00:00.000Z"
    },
    {
      "id": 2,
      "documentId": "course456",
      "title": "Financial Management for Credit Unions",
      "slug": "financial-management-credit-unions",
      "description": "<p>Master the fundamentals of credit union financial management including accounting, financial reporting, budgeting, and analysis...</p>",
      "category": "financial",
      "duration": "4 Days",
      "level": "Intermediate",
      "targetAudience": "Finance Officers, Accountants, Managers",
      "objectives": [
        "Understand credit union financial statements",
        "Master budgeting and forecasting techniques",
        "Develop financial analysis skills",
        "Learn regulatory compliance requirements"
      ],
      "modules": [
        "Credit Union Accounting Principles",
        "Financial Statement Preparation",
        "Budgeting and Forecasting",
        "Financial Ratio Analysis",
        "Regulatory Compliance"
      ],
      "prerequisites": "Basic accounting knowledge",
      "certification": "Certificate in Financial Management",
      "price": "GHC 2,000.00",
      "thumbnail": {
        "url": "/uploads/course_financial.jpg"
      },
      "createdAt": "2025-01-11T09:00:00.000Z",
      "updatedAt": "2025-01-11T09:00:00.000Z",
      "publishedAt": "2025-01-11T09:00:00.000Z"
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

#### Filters

| Filter | Example | Description |
|--------|---------|-------------|
| Category | `filters[category][$eq]=leadership` | Filter by category |
| Level | `filters[level][$eq]=Advanced` | Filter by difficulty level |
| Duration | `filters[duration][$contains]=5 Days` | Filter by duration |
| Title search | `filters[title][$contains]=Governance` | Search in title |

---

### 2. Training Schedules

**Endpoint:** `GET /api/training-schedules`

**Description:** Scheduled training sessions with dates, locations, and registration status.

#### Request Examples

```bash
# Get all upcoming training schedules
GET /api/training-schedules?filters[startDate][$gte]=${today}&sort=startDate:asc&populate=*

# Get schedules by status
GET /api/training-schedules?filters[status][$eq]=open&populate=*

# Get schedules by location
GET /api/training-schedules?filters[location][$contains]=Accra&populate=*

# Get schedules for specific course
GET /api/training-schedules?filters[course][title][$eq]=Governance&populate=deep
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "schedule123",
      "title": "Credit Union Governance & Leadership - Accra Session",
      "slug": "governance-leadership-accra-march-2025",
      "startDate": "2025-03-15",
      "endDate": "2025-03-19",
      "duration": "5 Days",
      "location": "CUTRAC Training Centre, Accra",
      "venue": "Main Training Hall A",
      "facilitators": [
        {
          "name": "Dr. Kwame Mensah",
          "title": "Senior Training Consultant",
          "bio": "20+ years experience in credit union sector"
        },
        {
          "name": "Ms. Ama Osei",
          "title": "Governance Specialist",
          "bio": "Expert in cooperative governance"
        }
      ],
      "targetParticipants": "Board Members, CEOs, Senior Managers",
      "maxParticipants": 30,
      "registeredParticipants": 18,
      "status": "open",
      "registrationDeadline": "2025-03-08",
      "price": "GHC 2,500.00",
      "priceIncludes": [
        "Training materials",
        "Certificate of completion",
        "Daily lunch and refreshments",
        "Access to online resources"
      ],
      "course": {
        "id": 1,
        "title": "Credit Union Governance & Leadership",
        "slug": "credit-union-governance-leadership",
        "description": "<p>Comprehensive governance training...</p>"
      },
      "schedule": [
        {
          "day": "Day 1",
          "date": "2025-03-15",
          "topics": [
            "9:00 AM - Registration and Welcome",
            "10:00 AM - Introduction to Credit Union Governance",
            "12:00 PM - Lunch Break",
            "1:00 PM - Board Roles and Responsibilities",
            "3:00 PM - Group Discussion",
            "5:00 PM - Day 1 Wrap-up"
          ]
        }
      ],
      "contactPerson": {
        "name": "Ms. Akosua Addo",
        "email": "training@cuaghana.org",
        "phone": "+233 XX XXX XXXX"
      },
      "thumbnail": {
        "url": "/uploads/schedule_governance_march.jpg"
      },
      "createdAt": "2025-01-20T10:00:00.000Z",
      "updatedAt": "2025-02-15T09:30:00.000Z",
      "publishedAt": "2025-01-20T10:00:00.000Z"
    },
    {
      "id": 2,
      "documentId": "schedule456",
      "title": "Financial Management - Kumasi Session",
      "slug": "financial-management-kumasi-april-2025",
      "startDate": "2025-04-10",
      "endDate": "2025-04-13",
      "duration": "4 Days",
      "location": "CUTRAC Regional Centre, Kumasi",
      "venue": "Conference Room B",
      "facilitators": [
        {
          "name": "Mr. Kofi Amoako",
          "title": "Financial Management Expert"
        }
      ],
      "targetParticipants": "Finance Officers, Accountants, Managers",
      "maxParticipants": 25,
      "registeredParticipants": 23,
      "status": "closing-soon",
      "registrationDeadline": "2025-04-03",
      "price": "GHC 2,000.00",
      "priceIncludes": [
        "Training materials",
        "Certificate",
        "Meals"
      ],
      "course": {
        "id": 2,
        "title": "Financial Management for Credit Unions"
      },
      "thumbnail": {
        "url": "/uploads/schedule_financial_april.jpg"
      },
      "createdAt": "2025-01-25T11:00:00.000Z",
      "updatedAt": "2025-02-20T16:45:00.000Z",
      "publishedAt": "2025-01-25T11:00:00.000Z"
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

#### Filters

| Filter | Example | Description |
|--------|---------|-------------|
| Status | `filters[status][$eq]=open` | Filter by registration status |
| Date range | `filters[startDate][$gte]=2025-03-01&filters[startDate][$lte]=2025-03-31` | Filter by date range |
| Location | `filters[location][$contains]=Accra` | Filter by location |
| Upcoming only | `filters[startDate][$gte]=${todayDate}` | Get only future schedules |

#### Status Values

- `open` - Open for registration
- `closing-soon` - Limited spots remaining
- `full` - Fully booked
- `completed` - Training completed
- `cancelled` - Training cancelled

---

## Query Parameters

### Common Query Parameters

All endpoints support the following query parameters:

#### 1. Populate

Get related data:

```bash
# Populate all relations
?populate=*

# Deep populate (all nested relations)
?populate=deep

# Populate specific fields
?populate[heroSection][populate]=backgroundImage
?populate[seo]=*
```

#### 2. Fields

Select specific fields:

```bash
# Get only specific fields
?fields[0]=title&fields[1]=description

# Exclude fields
?fields[0]=title&fields[1]=description&fields[2]!=createdAt
```

#### 3. Filters

Filter results:

```bash
# Exact match
?filters[status][$eq]=open

# Contains
?filters[title][$contains]=Governance

# Greater than or equal
?filters[startDate][$gte]=2025-03-01

# Less than or equal
?filters[price][$lte]=2000

# Multiple filters (AND)
?filters[status][$eq]=open&filters[location][$contains]=Accra

# OR filters
?filters[$or][0][status][$eq]=open&filters[$or][1][status][$eq]=closing-soon
```

#### 4. Sort

Sort results:

```bash
# Ascending
?sort=startDate:asc

# Descending
?sort=price:desc

# Multiple sort fields
?sort[0]=startDate:asc&sort[1]=title:asc
```

#### 5. Pagination

Paginate results:

```bash
# Page and page size
?pagination[page]=1&pagination[pageSize]=25

# Start and limit
?pagination[start]=0&pagination[limit]=10

# Get all (not recommended for large datasets)
?pagination[pageSize]=-1
```

### Example: Complex Query

```bash
GET /api/training-schedules?\
  populate=deep&\
  filters[startDate][$gte]=2025-03-01&\
  filters[startDate][$lte]=2025-06-30&\
  filters[status][$eq]=open&\
  filters[location][$contains]=Accra&\
  sort=startDate:asc&\
  pagination[page]=1&\
  pagination[pageSize]=10
```

This query:
- Populates all nested relations
- Filters for schedules between March-June 2025
- Only shows open registrations
- Only shows Accra location
- Sorts by start date (ascending)
- Returns first 10 results

---

## Response Format

### Successful Response

All successful responses follow this format:

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

Error responses follow this format:

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

## Component Schemas

### Shared Components

#### 1. Hero Simple (`sections.hero-simple`)

```json
{
  "id": 1,
  "badge": "CUA Training",
  "title": "CUTRAC Overview",
  "description": "Building capacity and excellence...",
  "backgroundImage": {
    "id": 1,
    "url": "/uploads/hero_bg.jpg",
    "alternativeText": "Training Centre",
    "formats": {
      "large": { "url": "/uploads/large_hero_bg.jpg" },
      "medium": { "url": "/uploads/medium_hero_bg.jpg" },
      "small": { "url": "/uploads/small_hero_bg.jpg" }
    }
  }
}
```

#### 2. Intro with Video (`sections.intro-with-video`)

```json
{
  "id": 1,
  "title": "About CUTRAC",
  "content": "<p>Rich text content...</p>",
  "videoUrl": "https://youtube.com/watch?v=example",
  "videoThumbnail": {
    "url": "/uploads/video_thumb.jpg"
  }
}
```

#### 3. Dual CTA (`sections.dual-cta`)

```json
{
  "id": 1,
  "title": "Ready to Start?",
  "description": "Join us today",
  "primaryCtaText": "Register Now",
  "primaryCtaLink": "/training/cutrac-registration",
  "secondaryCtaText": "Learn More",
  "secondaryCtaLink": "/training/cutrac-overview",
  "backgroundImage": {
    "url": "/uploads/cta_bg.jpg"
  }
}
```

#### 4. Fee Structure Table (`sections.fee-structure-table`)

```json
{
  "id": 1,
  "title": "Pricing Table",
  "items": [
    {
      "category": "Training Halls",
      "details": "Hall A (100 capacity)",
      "price": "GHC 800.00",
      "notes": "Includes equipment"
    }
  ]
}
```

#### 5. Icon Benefits Grid (`sections.icon-benefits-grid`)

```json
{
  "id": 1,
  "title": "Our Benefits",
  "description": "What we offer",
  "benefits": [
    {
      "icon": "FiHome",
      "title": "Modern Facilities",
      "description": "State-of-the-art training rooms",
      "color": "#3B82F6"
    }
  ]
}
```

#### 6. Numbered Steps (`sections.numbered-steps`)

```json
{
  "id": 1,
  "title": "How It Works",
  "steps": [
    {
      "number": 1,
      "title": "Register",
      "description": "Complete the registration form"
    },
    {
      "number": 2,
      "title": "Pay",
      "description": "Make payment to secure your spot"
    }
  ]
}
```

#### 7. Map Config (`sections.map-config`)

```json
{
  "id": 1,
  "centerLat": 5.6037,
  "centerLng": -0.1870,
  "zoom": 15,
  "markers": [
    {
      "lat": 5.6037,
      "lng": -0.1870,
      "title": "CUTRAC Training Centre",
      "infoWindow": "<div><h3>CUTRAC</h3><p>Ring Road Central</p></div>"
    }
  ]
}
```

#### 8. SEO Metadata (`shared.seo`)

```json
{
  "id": 1,
  "metaTitle": "Page Title",
  "metaDescription": "Page description for SEO",
  "keywords": "keyword1, keyword2, keyword3",
  "metaImage": {
    "url": "/uploads/og_image.jpg"
  },
  "metaSocial": [
    {
      "socialNetwork": "Facebook",
      "title": "FB Title",
      "description": "FB Description",
      "image": {
        "url": "/uploads/fb_image.jpg"
      }
    }
  ]
}
```

---

## Error Handling

### Common HTTP Status Codes

| Code | Name | Description |
|------|------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found (no content yet) |
| 500 | Internal Server Error | Server error |

### Error Response Examples

#### 404 Not Found (No Content)

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

**Cause:** Single type page has no content yet.
**Solution:** Add content via Strapi admin panel.

#### 400 Bad Request

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid filters",
    "details": {
      "errors": [
        {
          "path": ["filters", "status"],
          "message": "Invalid filter value"
        }
      ]
    }
  }
}
```

**Cause:** Invalid query parameters or filters.
**Solution:** Check query parameter syntax.

#### 500 Internal Server Error

```json
{
  "data": null,
  "error": {
    "status": 500,
    "name": "InternalServerError",
    "message": "An error occurred",
    "details": {}
  }
}
```

**Cause:** Server-side error.
**Solution:** Check Strapi logs, verify database connection.

---

## Frontend Integration Examples

### Next.js Integration

#### 1. API Client Setup

```javascript
// lib/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(path, options = {}, urlParamsObject = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}${path}${
    queryString ? `?${queryString}` : ''
  }`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error('Error response:', response.statusText);
    throw new Error(`An error occurred: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export default fetchAPI;
```

#### 2. Training Pages API Functions

```javascript
// lib/training-api.js
import fetchAPI from './strapi';

// Get CUTRAC Overview Page
export async function getCutracOverviewPage() {
  const data = await fetchAPI('/api/cutrac-overview-page', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Training Calendar Page
export async function getTrainingCalendarPage() {
  const data = await fetchAPI('/api/training-calendar-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Training Prices Page
export async function getTrainingPricesPage() {
  const data = await fetchAPI('/api/training-prices-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Training Registration Page
export async function getTrainingRegistrationPage() {
  const data = await fetchAPI('/api/training-registration-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Contact CUTRAC Page
export async function getContactCutracPage() {
  const data = await fetchAPI('/api/contact-cutrac-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Travel for Training Page
export async function getTravelForTrainingPage() {
  const data = await fetchAPI('/api/travel-for-training-page', {
    next: { revalidate: 3600 },
  }, {
    'populate': 'deep',
  });
  return data;
}

// Get Training Courses
export async function getTrainingCourses(filters = {}) {
  const queryParams = {
    'populate': '*',
    'sort': 'title:asc',
  };

  // Filter by category
  if (filters.category) {
    queryParams['filters[category][$eq]'] = filters.category;
  }

  // Filter by level
  if (filters.level) {
    queryParams['filters[level][$eq]'] = filters.level;
  }

  const data = await fetchAPI('/api/training-courses', {
    next: { revalidate: 3600 },
  }, queryParams);
  return data;
}

// Get Training Schedules
export async function getTrainingSchedules(filters = {}) {
  const queryParams = {
    'populate': 'deep',
    'sort': 'startDate:asc',
  };

  // Filter by status
  if (filters.status) {
    queryParams['filters[status][$eq]'] = filters.status;
  }

  // Filter upcoming only
  if (filters.upcomingOnly) {
    const today = new Date().toISOString().split('T')[0];
    queryParams['filters[startDate][$gte]'] = today;
  }

  // Filter by location
  if (filters.location) {
    queryParams['filters[location][$contains]'] = filters.location;
  }

  // Filter by date range
  if (filters.startDate) {
    queryParams['filters[startDate][$gte]'] = filters.startDate;
  }
  if (filters.endDate) {
    queryParams['filters[startDate][$lte]'] = filters.endDate;
  }

  const data = await fetchAPI('/api/training-schedules', {
    next: { revalidate: 3600 },
  }, queryParams);
  return data;
}

// Get single training schedule
export async function getTrainingScheduleBySlug(slug) {
  const data = await fetchAPI('/api/training-schedules', {
    next: { revalidate: 3600 },
  }, {
    'filters[slug][$eq]': slug,
    'populate': 'deep',
  });
  return data.data?.[0] || null;
}

// Submit Training Registration
export async function submitTrainingRegistration(formData) {
  const data = await fetchAPI('/api/training-registrations', {
    method: 'POST',
    body: JSON.stringify({ data: formData }),
  });
  return data;
}

// Submit Contact Message
export async function submitCutracContact(formData) {
  const data = await fetchAPI('/api/contact-messages', {
    method: 'POST',
    body: JSON.stringify({ data: formData }),
  });
  return data;
}
```

#### 3. Page Component Examples

**CUTRAC Overview Page:**

```javascript
// app/training/cutrac-overview/page.js
import { getCutracOverviewPage } from '@/lib/training-api';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';

export default async function CutracOverviewPage() {
  const { data } = await getCutracOverviewPage();

  if (!data) {
    return <div>Page content not available</div>;
  }

  return (
    <main>
      <HeroSection data={data.heroSection} />
      <IntroSection data={data.introSection} />
      {/* Render other sections */}
    </main>
  );
}

export async function generateMetadata() {
  const { data } = await getCutracOverviewPage();

  return {
    title: data?.seo?.metaTitle || 'CUTRAC Overview',
    description: data?.seo?.metaDescription || 'Credit Union Training Centre',
  };
}
```

**Training Calendar Page:**

```javascript
// app/training/training-calendar/page.js
import { getTrainingCalendarPage, getTrainingSchedules } from '@/lib/training-api';
import TrainingScheduleList from '@/components/TrainingScheduleList';

export default async function TrainingCalendarPage() {
  const [pageData, schedulesData] = await Promise.all([
    getTrainingCalendarPage(),
    getTrainingSchedules({ upcomingOnly: true, status: 'open' }),
  ]);

  return (
    <main>
      <HeroSection data={pageData.data.heroSection} />
      <IntroSection data={pageData.data.calendarIntro} />
      <TrainingScheduleList schedules={schedulesData.data} />
      <CtaSection data={pageData.data.downloadCta} />
    </main>
  );
}
```

**Training Prices Page:**

```javascript
// app/training/prices/page.js
import { getTrainingPricesPage } from '@/lib/training-api';
import PricingTable from '@/components/PricingTable';

export default async function TrainingPricesPage() {
  const { data } = await getTrainingPricesPage();

  if (!data) {
    return <div>Pricing information not available</div>;
  }

  return (
    <main>
      <HeroSection data={data.heroSection} />

      {/* Hall Facilities Pricing */}
      <PricingTable
        title={data.hallFacilities.title}
        items={data.hallFacilities.items}
      />

      {/* Accommodation Pricing */}
      <PricingTable
        title={data.accommodation.title}
        items={data.accommodation.items}
      />

      {/* Meals Pricing */}
      <PricingTable
        title={data.meals.title}
        items={data.meals.items}
      />

      {/* Important Notes */}
      <div dangerouslySetInnerHTML={{ __html: data.importantNotes }} />

      <CtaSection data={data.ctaSection} />
    </main>
  );
}
```

**Training Registration Page with Form:**

```javascript
// app/training/cutrac-registration/page.js
'use client';

import { useState } from 'react';
import { submitTrainingRegistration } from '@/lib/training-api';

export default function TrainingRegistrationPage({ pageData }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitTrainingRegistration(formData);
      setSubmitStatus({ type: 'success', message: pageData.formConfig.successMessage });
      setFormData({});
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <HeroSection data={pageData.heroSection} />
      <IntroSection data={pageData.formIntro} />

      <form onSubmit={handleSubmit}>
        {pageData.formConfig.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>
              {field.label} {field.required && '*'}
            </label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              >
                <option value="">Select...</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              />
            )}
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>

      {submitStatus && (
        <div className={`alert alert-${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: pageData.helpResources }} />
    </main>
  );
}
```

#### 4. React Hook Example

```javascript
// hooks/useTrainingSchedules.js
import { useState, useEffect } from 'react';
import { getTrainingSchedules } from '@/lib/training-api';

export function useTrainingSchedules(filters = {}) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        setLoading(true);
        const data = await getTrainingSchedules(filters);
        setSchedules(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedules();
  }, [JSON.stringify(filters)]);

  return { schedules, loading, error };
}

// Usage in component:
// const { schedules, loading, error } = useTrainingSchedules({
//   upcomingOnly: true,
//   status: 'open'
// });
```

---

## Testing

### Test All Endpoints

```bash
#!/bin/bash
# test-training-apis.sh

BASE_URL="http://localhost:1337"

echo "Testing Training Pages APIs..."
echo ""

# Test single type pages
echo "1. CUTRAC Overview Page"
curl -s "${BASE_URL}/api/cutrac-overview-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "2. Training Calendar Page"
curl -s "${BASE_URL}/api/training-calendar-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "3. Training Prices Page"
curl -s "${BASE_URL}/api/training-prices-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "4. Training Registration Page"
curl -s "${BASE_URL}/api/training-registration-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "5. Contact CUTRAC Page"
curl -s "${BASE_URL}/api/contact-cutrac-page?populate=deep" | jq '.data.id, .error'
echo ""

echo "6. Travel for Training Page"
curl -s "${BASE_URL}/api/travel-for-training-page?populate=deep" | jq '.data.id, .error'
echo ""

# Test collection types
echo "7. Training Courses"
curl -s "${BASE_URL}/api/training-courses?populate=*" | jq '.data | length, .meta.pagination'
echo ""

echo "8. Training Schedules"
curl -s "${BASE_URL}/api/training-schedules?populate=deep&sort=startDate:asc" | jq '.data | length, .meta.pagination'
echo ""

echo "9. Upcoming Training Schedules (Open Registration)"
TODAY=$(date +%Y-%m-%d)
curl -s "${BASE_URL}/api/training-schedules?filters[startDate][\$gte]=${TODAY}&filters[status][\$eq]=open&populate=deep" | jq '.data | length'
echo ""

echo "Testing complete!"
```

### Make executable and run:

```bash
chmod +x test-training-apis.sh
./test-training-apis.sh
```

### Individual Endpoint Tests

```bash
# Test with curl and pretty-print with jq
curl -s "http://localhost:1337/api/cutrac-overview-page?populate=deep" | jq '.'

# Test with Python
python3 -c "
import requests
response = requests.get('http://localhost:1337/api/training-calendar-page?populate=deep')
print(response.status_code)
print(response.json())
"

# Test form submission
curl -X POST "http://localhost:1337/api/training-registrations" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "fullName": "Test User",
      "email": "test@example.com",
      "phone": "+233 XX XXX XXXX",
      "creditUnion": "Test Credit Union",
      "position": "manager",
      "trainingProgram": "governance",
      "preferredDate": "2025-04-15",
      "specialRequirements": "None"
    }
  }' | jq '.'
```

---

## Additional Resources

### Strapi Documentation
- [Strapi REST API Documentation](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Filters](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication)
- [Strapi Population](https://docs.strapi.io/dev-docs/api/rest/populate-select)

### Related Documentation
- [CUA Ghana General API Documentation](./API_DOCUMENTATION.md)
- [About Pages API Documentation](./ABOUT_PAGES_API_DOCUMENTATION.md)
- [Our Work Pages API Documentation](./OUR_WORK_API_DOCUMENTATION.md)
- [Credit Unions Pages API Documentation](./CREDIT_UNIONS_API_DOCUMENTATION.md)

---

**Last Updated:** 2025-10-27
**API Version:** Strapi v5.25.0
**Status:** Infrastructure complete, ready for content

---

## Quick Reference

### All Training Endpoints

| Page | Endpoint | Type |
|------|----------|------|
| CUTRAC Overview | `/api/cutrac-overview-page` | Single Type |
| Training Calendar | `/api/training-calendar-page` | Single Type |
| Training Prices | `/api/training-prices-page` | Single Type |
| Training Registration | `/api/training-registration-page` | Single Type |
| Contact CUTRAC | `/api/contact-cutrac-page` | Single Type |
| Travel for Training | `/api/travel-for-training-page` | Single Type |
| Training Courses | `/api/training-courses` | Collection |
| Training Schedules | `/api/training-schedules` | Collection |

### Common Query Patterns

```bash
# Get page with all data
/api/cutrac-overview-page?populate=deep

# Get upcoming open schedules
/api/training-schedules?filters[startDate][$gte]=${today}&filters[status][$eq]=open&sort=startDate:asc

# Get courses by category
/api/training-courses?filters[category][$eq]=leadership&populate=*

# Search courses
/api/training-courses?filters[title][$contains]=Governance&populate=*
```

---

## Support

For questions or issues with the Training Pages API:
1. Check this documentation
2. Review [Strapi Documentation](https://docs.strapi.io)
3. Check the main [API Documentation](./API_DOCUMENTATION.md)
4. Report issues to the development team

---
