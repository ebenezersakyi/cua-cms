# CUA GHANA CMS - QUICK START GUIDE

**5-Minute Guide to Get Started**

---

## 🚀 START THE CMS

```bash
cd cua-cms
npm run dev
```

**Admin Panel**: http://localhost:1337/admin
**API Endpoint**: http://localhost:1337/api

---

## 🔑 FIRST TIME SETUP

### 1. Create Admin User

When you first visit the admin panel, you'll be prompted to create an admin account.

**Recommended for Development**:
- Email: `admin@cua.org.gh`
- Password: [Choose a strong password]
- Username: `admin`

### 2. Verify Data

Check that the seed data was imported by visiting:

**In Browser**:
- Hero Slides: http://localhost:1337/api/hero-slides?populate=*
- News: http://localhost:1337/api/news-articles
- Events: http://localhost:1337/api/events?populate=*
- Partners: http://localhost:1337/api/partners?populate=*
- Credit Unions: http://localhost:1337/api/credit-unions

**Expected Results**: You should see JSON data with 3 hero slides, 5 news articles, 3 events, 8 partners, and 20 credit unions.

---

## 📝 ADD CONTENT

### Via Admin Panel

1. Go to http://localhost:1337/admin
2. Login with your credentials
3. Click **Content Manager** in left sidebar
4. Select a content type (e.g., "Board Member")
5. Click **"+ Create new entry"**
6. Fill in the fields
7. Upload images if needed
8. Click **Save**
9. Click **Publish** to make it available via API

### Via API (Programmatically)

See `STRAPI_API_INTEGRATION_GUIDE.md` for POST examples.

---

## 🔌 INTEGRATE WITH NEXT.JS

### Step 1: Copy API Utility

```bash
# From cua-cms directory
cp examples/lib-strapi.js ../cua-website/lib/strapi.js
```

### Step 2: Add Environment Variables

Create `cua-website/.env.local`:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Step 3: Update next.config.mjs

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
    ],
  },
};

export default nextConfig;
```

### Step 4: Use in Components

**Example - Fetch Hero Slides**:

```javascript
// app/components/Hero.js
import { getHeroSlides, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

export default async function Hero() {
  const slides = await getHeroSlides();

  return (
    <div className="hero-carousel">
      {slides?.map((slide) => (
        <div key={slide.id}>
          <Image
            src={getStrapiMedia(slide.backgroundImage?.url)}
            alt={slide.title}
            fill
          />
          <h1>{slide.title}</h1>
          <p>{slide.subtext}</p>
          <a href={slide.ctaLink}>{slide.ctaText}</a>
        </div>
      ))}
    </div>
  );
}
```

**Example - Fetch Top 20 Credit Unions**:

```javascript
// app/top-20-credit-unions/page.js
import { getTop20CreditUnions } from '@/lib/strapi';

export default async function Top20Page() {
  const creditUnions = await getTop20CreditUnions();

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Region</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {creditUnions?.map((cu) => (
          <tr key={cu.id}>
            <td>{cu.ranking}</td>
            <td>{cu.name}</td>
            <td>{cu.region}</td>
            <td>{cu.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## 🛠️ COMMON COMMANDS

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Seed Data
```bash
npm run seed:cua
```

### Clear Cache
```bash
rm -rf .cache build
npm run build
```

---

## 📚 AVAILABLE API ENDPOINTS

All endpoints support these query parameters:
- `populate=*` - Include related data and images
- `filters[field][$eq]=value` - Filter results
- `sort=field:asc` or `sort=field:desc` - Sort results
- `pagination[limit]=10` - Limit results

### Content Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/hero-slides` | Homepage carousel slides |
| `/api/news-articles` | News and announcements |
| `/api/events` | Events and programs |
| `/api/partners` | Partner organizations |
| `/api/credit-unions` | Credit union directory |
| `/api/board-members` | Board of directors |
| `/api/management-teams` | Management staff |
| `/api/chapters` | Regional chapters |
| `/api/training-courses` | Training programs |
| `/api/training-schedules` | Training calendar |
| `/api/downloads` | Downloadable files |
| `/api/photo-galleries` | Photo albums |
| `/api/video-galleries` | Video content |
| `/api/success-stories` | Member testimonials |

### Form Endpoints (POST only)

| Endpoint | Description |
|----------|-------------|
| `/api/contact-messages` | Contact form submissions |
| `/api/newsletter-subscriptions` | Newsletter signups |

---

## 📖 HELPER FUNCTIONS

All these functions are available in `lib/strapi.js`:

### Data Fetching
- `getHeroSlides()` - Get homepage carousel slides
- `getTickerNews()` - Get news for ticker
- `getFeaturedNews()` - Get featured news
- `getNewsArticle(slug)` - Get single news article
- `getFeaturedEvents()` - Get upcoming featured events
- `getEvent(slug)` - Get single event
- `getPartners()` - Get all partners
- `getTop20CreditUnions()` - Get top 20 ranking
- `getCreditUnions(filters)` - Get all credit unions
- `getCreditUnion(slug)` - Get single credit union
- `getBoardMembers()` - Get board members
- `getManagementTeam()` - Get management team
- `getChapters()` - Get all chapters
- `getChapter(slug)` - Get single chapter

### Form Submissions
- `subscribeToNewsletter(email, firstName, lastName)`
- `submitContactForm(formData)`

### Utilities
- `getStrapiMedia(url)` - Get full image URL
- `formatDate(dateString)` - Format dates
- `extractData(response)` - Extract data from API response

---

## ✅ QUICK CHECKLIST

**Before You Start Frontend Integration**:

- [ ] Strapi is running (`npm run dev` in cua-cms)
- [ ] Admin user created
- [ ] Sample data visible in API endpoints
- [ ] `lib/strapi.js` copied to Next.js project
- [ ] Environment variables added to `.env.local`
- [ ] `next.config.mjs` updated with image domains
- [ ] Test API fetch in one component
- [ ] Verify images load correctly

**Content to Add Later**:

- [ ] Board member profiles and photos
- [ ] Management team profiles
- [ ] Chapter information
- [ ] Training course catalog
- [ ] Training schedule
- [ ] Downloadable documents
- [ ] Photo galleries
- [ ] Video content
- [ ] Success stories

---

## 🆘 TROUBLESHOOTING

**Problem**: Strapi won't start
```bash
# Solution: Clear cache and rebuild
rm -rf .cache build
npm run build
npm run dev
```

**Problem**: API returns empty data
- Check if content is **Published** (not just saved as draft)
- Verify public permissions in Settings → Roles → Public
- Make sure to include `?populate=*` for images and relations

**Problem**: Images not showing in Next.js
- Verify `next.config.mjs` has correct image domains
- Check that `getStrapiMedia()` is used for image URLs
- Ensure images are uploaded in Strapi Media Library

**Problem**: API returns 403 Forbidden
- Go to Settings → Roles → Public in Strapi admin
- Enable `find` and `findOne` for the content type

---

## 📁 KEY FILES

| File | Purpose |
|------|---------|
| `examples/lib-strapi.js` | ✅ Copy to Next.js `lib/` folder |
| `STRAPI_API_INTEGRATION_GUIDE.md` | Full API documentation |
| `CMS_IMPLEMENTATION_COMPLETE.md` | Implementation summary |
| `COMPREHENSIVE_STRAPI_CMS_GUIDE.md` | Original requirements |
| `data/cua-seed-data.json` | Seed data |
| `scripts/seed-cua.js` | Seed script |

---

## 🎯 NEXT STEPS

1. **Start Strapi**: `npm run dev`
2. **Create admin user** at http://localhost:1337/admin
3. **Test API endpoints** in browser
4. **Copy `lib/strapi.js`** to Next.js project
5. **Update one component** to use Strapi data
6. **Test and iterate**
7. **Add more content** via admin panel
8. **Deploy when ready**

---

## 📞 GET HELP

- **Full API Guide**: See `STRAPI_API_INTEGRATION_GUIDE.md`
- **Implementation Details**: See `CMS_IMPLEMENTATION_COMPLETE.md`
- **Strapi Docs**: https://docs.strapi.io
- **Strapi Community**: https://discord.strapi.io

---

**🎉 You're ready to go! Start building! 🎉**

---

**Last Updated**: October 16, 2025
**Strapi Version**: 5.25.0
