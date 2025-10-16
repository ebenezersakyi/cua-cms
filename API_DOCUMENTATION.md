# CUA Ghana CMS - API Documentation

## Base URL

**Development:** `http://localhost:1337/api`
**Production:** `https://your-domain.com/api`

## Authentication

### Public Endpoints
Most GET endpoints are publicly accessible without authentication.

### Protected Endpoints
For authenticated requests, include the API token in headers:

```
Authorization: Bearer YOUR_API_TOKEN
```

## Response Format

All responses follow this structure:

```json
{
  "data": {
    "id": 1,
    "attributes": {
      // Content fields
    }
  },
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 10
    }
  }
}
```

## Endpoints Reference

### Hero Slides

#### Get All Hero Slides
```
GET /api/hero-slides
```

**Query Parameters:**
- `sort` - Sort by field (e.g., `order:asc`)
- `filters[isActive][$eq]` - Filter by active status
- `populate` - Populate relations (`*` for all)

**Example:**
```
GET /api/hero-slides?filters[isActive][$eq]=true&sort=order:asc&populate=*
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Welcome to CUA Ghana",
        "subtext": "Empowering Communities Through Cooperative Finance",
        "ctaText": "Learn More",
        "ctaLink": "/about-us",
        "order": 1,
        "isActive": true,
        "backgroundImage": {
          "data": {
            "attributes": {
              "url": "/uploads/hero_bg_1.jpg",
              "formats": { ... }
            }
          }
        },
        "createdAt": "2025-10-03T10:00:00.000Z",
        "updatedAt": "2025-10-03T10:00:00.000Z",
        "publishedAt": "2025-10-03T10:00:00.000Z"
      }
    }
  ]
}
```

---

### Events

#### Get All Events
```
GET /api/events
```

#### Get Single Event
```
GET /api/events/:id
GET /api/events?filters[slug][$eq]=financial-literacy-workshop
```

**Query Parameters:**
- `filters[category][$eq]` - Filter by category
- `filters[status][$eq]` - Filter by status (Upcoming, Ongoing, Completed, Cancelled)
- `filters[isFeatured][$eq]` - Filter featured events
- `filters[eventDate][$gte]` - Filter by date (greater than or equal)
- `sort` - Sort by field (e.g., `eventDate:desc`)

**Example:**
```
GET /api/events?filters[isFeatured][$eq]=true&filters[status][$eq]=Upcoming&populate=*&sort=eventDate:asc
```

**Response Fields:**
- title
- slug
- description (rich text)
- shortDescription
- eventDate
- eventTime
- location
- featuredImage
- gallery (multiple images)
- category
- isFeatured
- registrationLink
- registrationDeadline
- capacity
- status
- relatedEvents (relation)

---

### News Articles

#### Get All News Articles
```
GET /api/news-articles
```

#### Get Single Article
```
GET /api/news-articles?filters[slug][$eq]=article-slug
```

**Query Parameters:**
- `filters[isFeatured][$eq]` - Filter featured articles
- `filters[category][slug][$eq]` - Filter by category slug
- `filters[tags][slug][$in]` - Filter by tag slugs
- `populate[author]` - Include author details
- `populate[category]` - Include category
- `populate[tags]` - Include tags

**Example:**
```
GET /api/news-articles?filters[isFeatured][$eq]=true&populate[author]=*&populate[category]=*&populate[tags]=*&populate[featuredImage]=*&sort=publishedAt:desc&pagination[pageSize]=6
```

**Response Fields:**
- title
- slug
- excerpt
- content (rich text)
- featuredImage
- author (relation)
- category (relation)
- tags (relation)
- isFeatured
- readTime
- seoTitle
- seoDescription

---

### Credit Unions

#### Get All Credit Unions
```
GET /api/credit-unions
```

#### Get Single Credit Union
```
GET /api/credit-unions?filters[slug][$eq]=union-slug
```

**Query Parameters:**
- `filters[region][$eq]` - Filter by region
- `filters[isActive][$eq]` - Filter active unions
- `filters[isFeatured][$eq]` - Filter featured unions
- `populate[chapter]` - Include chapter details

**Example:**
```
GET /api/credit-unions?filters[region][$eq]=Greater Accra&filters[isActive][$eq]=true&populate=*
```

**Response Fields:**
- name
- slug
- description (rich text)
- logo
- region
- district
- address
- gpsCoordinates (component)
- phone
- email
- website
- establishedYear
- memberCount
- totalAssets
- services (repeatable component)
- openingHours (component)
- isActive
- isFeatured
- chapter (relation)

---

### Success Stories

#### Get All Success Stories
```
GET /api/success-stories
```

**Query Parameters:**
- `filters[category][$eq]` - Filter by category
- `filters[isFeatured][$eq]` - Filter featured stories
- `populate[creditUnion]` - Include credit union details

**Example:**
```
GET /api/success-stories?filters[isFeatured][$eq]=true&populate[creditUnion]=*&populate[featuredImage]=*&pagination[pageSize]=3
```

**Response Fields:**
- title
- slug
- story (rich text)
- personName
- personRole
- creditUnion (relation)
- featuredImage
- category
- impact (repeatable component)
- isFeatured

---

### Partners

#### Get All Partners
```
GET /api/partners
```

**Query Parameters:**
- `filters[isActive][$eq]` - Filter active partners
- `filters[partnershipType][$eq]` - Filter by type
- `sort` - Sort by displayOrder

**Example:**
```
GET /api/partners?filters[isActive][$eq]=true&sort=displayOrder:asc&populate=*
```

---

### Board Members

#### Get All Board Members
```
GET /api/board-members
```

**Example:**
```
GET /api/board-members?filters[isActive][$eq]=true&sort=displayOrder:asc&populate=*
```

---

### Management Team

#### Get All Management Team Members
```
GET /api/management-teams
```

**Query Parameters:**
- `filters[department][$eq]` - Filter by department
- `filters[isActive][$eq]` - Filter active members

**Example:**
```
GET /api/management-teams?filters[isActive][$eq]=true&sort=displayOrder:asc&populate=*
```

---

### Training Courses

#### Get All Training Courses
```
GET /api/training-courses
```

**Query Parameters:**
- `filters[isActive][$eq]` - Filter active courses
- `filters[level][$eq]` - Filter by level
- `filters[category][$eq]` - Filter by category

**Example:**
```
GET /api/training-courses?filters[isActive][$eq]=true&populate=*
```

---

### Training Schedules

#### Get All Training Schedules
```
GET /api/training-schedules
```

**Query Parameters:**
- `filters[status][$eq]` - Filter by status (Open, Full, Cancelled, Completed)
- `filters[startDate][$gte]` - Filter upcoming sessions
- `populate[course]` - Include course details

**Example:**
```
GET /api/training-schedules?filters[status][$eq]=Open&filters[startDate][$gte]=2025-10-03&populate[course]=*&sort=startDate:asc
```

---

### Downloads

#### Get All Downloads
```
GET /api/downloads
```

**Query Parameters:**
- `filters[category][$eq]` - Filter by category
- `filters[isPublic][$eq]` - Filter public downloads

**Example:**
```
GET /api/downloads?filters[isPublic][$eq]=true&filters[category][$eq]=Annual Reports&populate=*&sort=uploadDate:desc
```

---

### Photo Galleries

#### Get All Photo Galleries
```
GET /api/photo-galleries
```

**Example:**
```
GET /api/photo-galleries?populate=*&sort=date:desc
```

---

### Video Galleries

#### Get All Video Galleries
```
GET /api/video-galleries
```

**Query Parameters:**
- `filters[category][$eq]` - Filter by category

**Example:**
```
GET /api/video-galleries?populate=*&sort=createdAt:desc
```

---

### Chapters

#### Get All Chapters
```
GET /api/chapters
```

**Example:**
```
GET /api/chapters?populate[credit_unions]=*&populate[coverImage]=*
```

---

### Single Types

#### Get Homepage Settings
```
GET /api/homepage-settings?populate=deep
```

#### Get Site Settings
```
GET /api/site-settings?populate=*
```

#### Get About Pages Content
```
GET /api/about-pages-content
```

#### Get Ticker Content
```
GET /api/ticker-content
```

---

### Newsletter Subscriptions

#### Subscribe to Newsletter
```
POST /api/newsletter-subscriptions
```

**Request Body:**
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

---

### Contact Messages

#### Submit Contact Form
```
POST /api/contact-messages
```

**Request Body:**
```json
{
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+233123456789",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a partnership opportunity...",
    "messageType": "Partnership"
  }
}
```

---

## Advanced Query Features

### Deep Population
```
?populate=deep
```

### Selective Population
```
?populate[author][fields][0]=name&populate[author][fields][1]=email
```

### Filtering with Multiple Conditions
```
?filters[$and][0][category][slug][$eq]=training&filters[$and][1][isFeatured][$eq]=true
```

### Date Range Filtering
```
?filters[eventDate][$gte]=2025-10-01&filters[eventDate][$lte]=2025-10-31
```

### Search
```
?filters[$or][0][title][$contains]=workshop&filters[$or][1][description][$contains]=workshop
```

---

## Rate Limiting

Default rate limits:
- Public endpoints: 100 requests per minute per IP
- Authenticated endpoints: 1000 requests per minute per token

---

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Invalid request parameters"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "status": 500,
    "name": "InternalServerError",
    "message": "An error occurred"
  }
}
```

---

## Best Practices

1. **Always use pagination** for large datasets
2. **Populate only what you need** to reduce response size
3. **Cache responses** on the frontend when appropriate
4. **Use filters** to reduce data transfer
5. **Handle errors gracefully** on the frontend
6. **Implement retry logic** for failed requests
7. **Use ISR in Next.js** for frequently accessed content

---

**Version:** 1.0
**Last Updated:** 2025-10-03
