# CUA Ghana CMS

A comprehensive Strapi CMS for the Credit Union Association (CUA) Ghana website, managing all dynamic content including events, news articles, credit unions directory, training programs, and more.

## Features

- **14 Collection Types** for managing various content (Events, News, Credit Unions, etc.)
- **4 Single Types** for global settings and homepage content
- **3 Taxonomy Types** for content organization (Categories, Tags, Authors)
- RESTful API with advanced filtering, sorting, and pagination
- Media management with automatic image optimization
- Role-based access control (RBAC)
- Email integration for contact forms and newsletters
- CORS configuration for Next.js frontend integration

## Quick Start

### Prerequisites

- Node.js v18 or v20
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run develop
```

Access the admin panel at: `http://localhost:1337/admin`

## Documentation

- **[Setup Guide](./SETUP.md)** - Complete setup and configuration instructions
- **[API Documentation](./API_DOCUMENTATION.md)** - Comprehensive API reference
- **[Requirements](./STRAPI_CMS_REQUIREMENTS.md)** - Full project requirements and specifications

## Content Types

### Collection Types

1. **Hero Slides** - Homepage carousel content
2. **Events** - Events, programs, and initiatives
3. **News Articles** - News, announcements, and blog posts
4. **Credit Unions** - Directory of all credit unions in Ghana
5. **Success Stories** - Member and credit union success testimonials
6. **Partners** - Organizational partners and collaborators
7. **Board Members** - Board of Directors information
8. **Management Team** - Management staff information
9. **Training Courses** - CUTRAC training programs and courses
10. **Training Schedule** - Scheduled training sessions
11. **Downloads** - Downloadable resources, forms, and documents
12. **Photo Gallery** - Photo collections and albums
13. **Video Gallery** - Video content library
14. **Chapters** - Regional CUA chapters information

### Single Types

1. **Homepage Settings** - Homepage specific content and statistics
2. **Site Settings** - Global website settings
3. **About Pages Content** - Static content for about pages
4. **Ticker Content** - Scrolling ticker messages

### Taxonomy Types

1. **News Categories** - Categories for news articles
2. **Tags** - Tags for content
3. **Authors** - Article authors

## Available Scripts

### Development

```bash
# Start development server with hot reload
npm run develop

# Start development server
npm run dev
```

### Production

```bash
# Build admin panel
npm run build

# Start production server
npm start
```

### Other Commands

```bash
# Open Strapi console
npm run console

# Deploy to Strapi Cloud
npm run deploy
```

## API Endpoints

Base URL: `http://localhost:1337/api`

### Example Requests

```bash
# Get all events
GET /api/events?populate=*

# Get featured news articles
GET /api/news-articles?filters[isFeatured][$eq]=true&populate=*

# Get credit unions in Greater Accra
GET /api/credit-unions?filters[region][$eq]=Greater Accra&populate=*

# Get homepage settings
GET /api/homepage-settings?populate=deep

# Subscribe to newsletter
POST /api/newsletter-subscriptions
Content-Type: application/json
{
  "data": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## Environment Variables

Key environment variables (see `.env.example` for all options):

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# CORS
CORS_ORIGIN=http://localhost:3000

# Email
SMTP_HOST=localhost
SMTP_PORT=587
EMAIL_DEFAULT_FROM=noreply@cuaghana.org
```

## Integration with Next.js

### Next.js Environment Variables

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

### Example Fetch

```javascript
const response = await fetch(
  `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events?populate=*`,
  {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  }
);
const { data } = await response.json();
```

## Deployment

Recommended platforms:
- Railway
- Heroku
- DigitalOcean App Platform
- AWS/GCP/Azure (with Docker)

For production:
1. Use PostgreSQL instead of SQLite
2. Configure cloud storage (AWS S3, Cloudinary, etc.)
3. Set up proper environment variables
4. Enable HTTPS
5. Configure CORS for your domain

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## Security

- Generate secure secrets for production
- Configure proper CORS origins
- Set up rate limiting
- Use HTTPS in production
- Regular backups
- Keep dependencies updated

## Tech Stack

- **Strapi** v5.25.0 - Headless CMS
- **SQLite** - Development database
- **PostgreSQL** - Production database (recommended)
- **Node.js** v18+ - Runtime

## Project Structure

```
cua-cms/
├── config/              # Configuration files
├── src/
│   ├── api/            # API endpoints and content types
│   │   ├── event/
│   │   ├── news-article/
│   │   └── ...
│   ├── components/     # Reusable components
│   │   ├── homepage/
│   │   ├── location/
│   │   └── ...
│   └── index.js        # Entry point
├── public/             # Static files
├── database/           # Database files (SQLite)
├── .env                # Environment variables (not in git)
├── .env.example        # Environment template
└── package.json        # Dependencies
```

## Support

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Discord](https://discord.strapi.io)
- [CUA Ghana Website Requirements](./STRAPI_CMS_REQUIREMENTS.md)

## Version

- **Version:** 1.0.0
- **Strapi Version:** 5.25.0
- **Node Version:** v18+
- **Last Updated:** 2025-10-03

---

**Developed for:** Credit Union Association (CUA) Ghana
**License:** Proprietary
