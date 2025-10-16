# Quick Start Guide

Get your CUA Ghana CMS up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Setup

The `.env` file is already configured. No changes needed for local development!

## Step 3: Start Development Server

```bash
npm run develop
```

Wait for the server to start. You'll see:

```
 Project information

┌────────────────────────────────────────────────────────────────┐
│ Time               │ Thu Oct 03 2025 10:00:00                  │
│ Launched in        │ 2345 ms                                   │
│                    │                                           │
│ Environment        │ development                               │
│ Process PID        │ 12345                                     │
│                    │                                           │
│ Version            │ 5.25.0                                    │
│ Edition            │ Community                                 │
│                    │                                           │
│ Host               │ http://0.0.0.0:1337                       │
│ Port               │ 1337                                      │
│                    │                                           │
│ Admin Panel        │ http://localhost:1337/admin               │
└────────────────────────────────────────────────────────────────┘
```

## Step 4: Create Admin Account

1. Open your browser and go to: `http://localhost:1337/admin`
2. You'll see the admin registration page
3. Fill in your details:
   - **First Name**: Your first name
   - **Last Name**: Your last name
   - **Email**: Your email (you'll use this to login)
   - **Password**: At least 8 characters (must include uppercase, lowercase, and numbers)
4. Click **Let's start**

## Step 5: Explore the Admin Panel

After logging in, you'll see the dashboard with:

### Content Manager (Left Sidebar)

**Collection Types:**
- Hero Slides
- Events
- News Articles
- Credit Unions
- Success Stories
- Partners
- Board Members
- Management Teams
- Training Courses
- Training Schedules
- Downloads
- Photo Galleries
- Video Galleries
- Chapters
- Newsletter Subscriptions
- Contact Messages
- News Categories
- Tags
- Authors

**Single Types:**
- Homepage Settings
- Site Settings
- About Pages Content
- Ticker Content

## Step 6: Add Sample Content

Let's create your first content!

### Create a Hero Slide

1. Go to **Content Manager** → **Hero Slides**
2. Click **Create new entry**
3. Fill in:
   - **Title**: "Welcome to CUA Ghana"
   - **Subtext**: "Empowering Communities Through Cooperative Finance"
   - **CTA Text**: "Learn More"
   - **CTA Link**: "/about-us"
   - **Order**: 1
   - **Is Active**: Toggle ON
   - **Background Image**: Upload an image
4. Click **Save** then **Publish**

### Create an Event

1. Go to **Content Manager** → **Events**
2. Click **Create new entry**
3. Fill in the required fields:
   - **Title**: "Financial Literacy Workshop"
   - **Description**: Add event details (rich text editor)
   - **Short Description**: Brief summary (200 chars)
   - **Event Date**: Select a date
   - **Featured Image**: Upload an image
   - **Category**: Select a category
   - **Status**: Select "Upcoming"
4. Click **Save** then **Publish**

### Create a News Article

1. Go to **Content Manager** → **News Articles**
2. Click **Create new entry**
3. You'll need to create an Author first:
   - Go to **Authors** → Create a new author
   - Return to News Articles
4. Fill in:
   - **Title**: Your article title
   - **Excerpt**: Article summary (300 chars)
   - **Content**: Full article (rich text)
   - **Featured Image**: Upload image
   - **Author**: Select the author you created
   - Click **Save** then **Publish**

## Step 7: Test the API

Open a new terminal and test the API:

```bash
# Get all hero slides
curl http://localhost:1337/api/hero-slides?populate=*

# Get all events
curl http://localhost:1337/api/events?populate=*

# Get homepage settings
curl http://localhost:1337/api/homepage-settings?populate=deep
```

Or visit these URLs in your browser:
- http://localhost:1337/api/hero-slides?populate=*
- http://localhost:1337/api/events?populate=*
- http://localhost:1337/api/news-articles?populate=*

## Step 8: Configure Site Settings

1. Go to **Content Manager** → **Site Settings** (Single Type)
2. Click **Edit**
3. Fill in:
   - **Site Name**: "CUA Ghana"
   - **Site Description**: Brief description
   - **Contact Email**: "info@cuaghana.org"
   - **Contact Phone**: "+233 XXX XXXX"
   - **Social Media Links**: Add your social links
4. Upload logos if available
5. Click **Save**

## Step 9: Set Up Permissions (Optional)

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public**
3. Expand **Application** section
4. Enable `find` and `findOne` for all content types you want public
5. Enable `create` for:
   - Newsletter Subscriptions
   - Contact Messages
6. Click **Save**

## Step 10: Generate API Token for Next.js

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Fill in:
   - **Name**: "Next.js Frontend"
   - **Description**: "API token for Next.js frontend application"
   - **Token duration**: Unlimited (for development)
   - **Token type**: Read-only (or Full access if needed)
4. Click **Save**
5. **Copy the token** (you won't see it again!)
6. Add to your Next.js `.env.local`:
   ```
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-copied-token-here
   ```

## Next Steps

- Read the [SETUP.md](./SETUP.md) for detailed configuration
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API reference
- Start building your Next.js frontend!

## Common Commands

```bash
# Start development server
npm run develop

# Build admin panel
npm run build

# Start production server
npm start

# Clear cache
npm run strapi cache:clear
```

## Troubleshooting

### Port 1337 already in use?

```bash
# Kill the process using port 1337
lsof -ti:1337 | xargs kill -9

# Or use a different port in .env
PORT=1338
```

### Can't login to admin?

```bash
# Reset admin password
npm run strapi admin:reset-user-password -- --email=your@email.com --password=NewPassword123
```

### Database issues?

```bash
# Delete the database and start fresh (development only!)
rm -rf .tmp/data.db
npm run develop
```

## Need Help?

- Check [SETUP.md](./SETUP.md) for detailed instructions
- Visit [Strapi Documentation](https://docs.strapi.io)
- Check the [Requirements Document](./STRAPI_CMS_REQUIREMENTS.md)

---

Happy Content Management! 🚀
