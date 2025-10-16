# CUA Ghana CMS - Setup Guide

## Overview
This Strapi CMS powers the Credit Union Association (CUA) Ghana website, providing a comprehensive content management system for all website content including events, news, credit unions directory, training programs, and more.

## Prerequisites

- Node.js (v18 or v20 recommended)
- npm or yarn
- SQLite (for development) or PostgreSQL (for production)

## Installation

### 1. Clone and Install Dependencies

```bash
cd cua-cms
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

**Required for Development:**
- Keep default SQLite settings for local development
- Update `CORS_ORIGIN` if your Next.js frontend runs on a different port

**Required for Production:**
- Generate secure secrets for all `tobemodified` values
- Configure PostgreSQL database settings
- Set up email SMTP credentials
- Configure CORS_ORIGIN with your production domain
- Add analytics IDs if needed

### 3. Generate Secrets

Generate secure secrets for production:

```bash
# Generate APP_KEYS
node -e "console.log(require('crypto').randomBytes(32).toString('base64') + ',' + require('crypto').randomBytes(32).toString('base64'))"

# Generate other secrets
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run this last command 5 times to generate values for:
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- TRANSFER_TOKEN_SALT
- JWT_SECRET
- ENCRYPTION_KEY

### 4. Start Development Server

```bash
npm run develop
```

The Strapi admin panel will be available at: `http://localhost:1337/admin`

### 5. Create Admin User

On first launch, you'll be prompted to create an admin user. Fill in:
- First Name
- Last Name
- Email
- Password (minimum 8 characters)

## Content Types Overview

### Collection Types

1. **Hero Slides** - Homepage carousel content
2. **Events** - Events, programs, and initiatives
3. **News Articles** - News, announcements, and blog posts
4. **Credit Unions** - Directory of credit unions in Ghana
5. **Success Stories** - Member and credit union testimonials
6. **Partners** - Organizational partners
7. **Board Members** - Board of Directors information
8. **Management Team** - Management staff
9. **Training Courses** - CUTRAC training programs
10. **Training Schedule** - Scheduled training sessions
11. **Downloads** - Downloadable resources and documents
12. **Photo Gallery** - Photo collections and albums
13. **Video Gallery** - Video content library
14. **Chapters** - Regional CUA chapters
15. **Newsletter Subscriptions** - Email subscription management
16. **Contact Messages** - Contact form submissions

### Taxonomy Types

1. **News Categories** - Categories for news articles
2. **Tags** - Tags for content organization
3. **Authors** - Article authors

### Single Types

1. **Homepage Settings** - Homepage-specific content
2. **Site Settings** - Global website settings
3. **About Pages Content** - Static about page content
4. **Ticker Content** - Scrolling ticker messages

## API Endpoints

### Public Endpoints (No Authentication)

All public endpoints follow this pattern: `http://localhost:1337/api/{content-type}`

Examples:
```
GET /api/hero-slides
GET /api/events
GET /api/events/:slug
GET /api/news-articles
GET /api/credit-unions
GET /api/success-stories
GET /api/partners
GET /api/board-members
GET /api/management-teams
GET /api/training-courses
GET /api/training-schedules
GET /api/downloads
GET /api/photo-galleries
GET /api/video-galleries
GET /api/chapters
GET /api/homepage-settings
GET /api/site-settings
GET /api/about-pages-content
GET /api/ticker-content

POST /api/newsletter-subscriptions
POST /api/contact-messages
```

### Query Parameters

Strapi supports powerful query parameters:

**Pagination:**
```
?pagination[page]=1&pagination[pageSize]=10
```

**Filtering:**
```
?filters[category][$eq]=Training
?filters[region][$eq]=Greater Accra
?filters[isFeatured][$eq]=true
```

**Sorting:**
```
?sort=publishedAt:desc
?sort=order:asc
```

**Population (include relations):**
```
?populate=*
?populate[author]=*
?populate[category]=*
```

**Example Combined:**
```
GET /api/events?filters[isFeatured][$eq]=true&populate=*&sort=eventDate:desc&pagination[pageSize]=3
```

## User Roles and Permissions

### Recommended Role Structure

1. **Super Admin** - Full access (default authenticated role)
2. **Content Manager** - Create, edit, and publish all content
3. **Editor** - Review and publish content
4. **Author** - Create and edit own content
5. **Viewer** - Read-only access

### Setting Up Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. For **Public** role:
   - Enable `find` and `findOne` for all public content types
   - Enable `create` for newsletter-subscriptions and contact-messages
3. For **Authenticated** role:
   - Configure based on your team's needs
   - Generally grant full access to content managers

## Integration with Next.js

### Environment Variables for Next.js

Add to your Next.js `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

### Generate API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: "Next.js Frontend"
4. Token duration: Unlimited (for development)
5. Token type: Read-only or Full access (based on needs)
6. Copy the token and add to Next.js environment

### Example Fetch in Next.js

```javascript
const fetchFromStrapi = async (endpoint, options = {}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      ...options,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  return response.json();
};

// Usage
const { data } = await fetchFromStrapi('events?populate=*&sort=eventDate:desc');
```

## Media Upload and Management

### Image Optimization

Strapi automatically creates multiple image sizes:
- xlarge: 1920px
- large: 1000px
- medium: 750px
- small: 500px
- thumbnail: 245px

### Accessing Media URLs

```javascript
const image = data.attributes.featuredImage.data.attributes;
const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`;
const thumbnailUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.formats.thumbnail.url}`;
```

## Development Workflow

### 1. Content Entry
1. Log into admin panel
2. Navigate to Content Manager
3. Create/edit content
4. Save as draft or publish

### 2. Testing API
- Use Postman or curl to test API endpoints
- Check response structure matches frontend expectations

### 3. Frontend Development
- Fetch data from Strapi API
- Use ISR (Incremental Static Regeneration) for dynamic content
- Implement error handling and loading states

## Production Deployment

### Database Migration

**From SQLite to PostgreSQL:**

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE cua_cms;
CREATE USER strapi WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE cua_cms TO strapi;
```

3. Update `.env`:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cua_cms
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=secure_password
DATABASE_SSL=false
```

4. Run Strapi to create tables:
```bash
npm run build
npm start
```

### Cloud Deployment Options

**Recommended Platforms:**
1. **Railway** - Easy deployment with PostgreSQL
2. **Heroku** - Classic PaaS platform
3. **DigitalOcean App Platform** - Simple container deployment
4. **AWS/GCP/Azure** - Full control with Docker

### Media Storage

For production, use cloud storage:

**AWS S3:**
```bash
npm install @strapi/provider-upload-aws-s3
```

Update `config/plugins.js`:
```javascript
upload: {
  config: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
    },
  },
},
```

## Backup and Recovery

### Database Backup

**SQLite:**
```bash
cp .tmp/data.db .tmp/data.db.backup
```

**PostgreSQL:**
```bash
pg_dump cua_cms > backup.sql
```

### Media Backup

Back up the `public/uploads` folder regularly.

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 1337
lsof -ti:1337 | xargs kill -9
```

### Clear Cache
```bash
npm run strapi cache:clear
```

### Rebuild Admin
```bash
npm run build
```

### Reset Admin Password
```bash
npm run strapi admin:reset-user-password -- --email=admin@example.com --password=newPassword123
```

## Support

For Strapi documentation: https://docs.strapi.io
For CUA Ghana specific issues: Contact the development team

## Security Checklist

- [ ] Change all default secrets in production
- [ ] Enable HTTPS
- [ ] Configure rate limiting
- [ ] Set up regular backups
- [ ] Use environment variables for sensitive data
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and logging
- [ ] Keep Strapi and dependencies updated
- [ ] Use strong admin passwords
- [ ] Configure appropriate user roles and permissions

---

**Version:** 1.0
**Last Updated:** 2025-10-03
**Strapi Version:** 5.25.0
