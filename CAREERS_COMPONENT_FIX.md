# Careers Section - JSON to Component Migration

## Problem
The careers section fields (`whyWorkWithUs`, `ctaSection`, and `requirements`) were displaying as code editors (JSON editors) in the Strapi admin panel, which was not user-friendly for content editors.

## Root Cause
These fields were initially defined as `type: "json"` in the schema files, which causes Strapi to render them as raw JSON code editors instead of structured form fields.

## Solution
Converted JSON fields to proper Strapi components with structured form fields.

---

## Changes Made

### 1. Created New Components

#### `src/components/careers/benefit-item.json`
Individual benefit card component with:
- `icon` - Icon name (string)
- `title` - Benefit title (string)
- `description` - Benefit description (text)

#### `src/components/careers/why-work-section.json`
"Why Work With Us" section component with:
- `title` - Section title (string)
- `description` - Section description (text)
- `benefits` - Repeatable benefit-item components

#### `src/components/careers/cta-section.json`
Call-to-action section component with:
- `title` - CTA title (string)
- `description` - CTA description (text)
- `buttonText` - Button label (string)
- `buttonLink` - Button URL (string)
- `note` - Additional note (string, optional)

#### `src/components/careers/job-requirements.json`
Job requirements component with:
- `qualifications` - Rich text editor
- `experience` - Rich text editor
- `skills` - Rich text editor

### 2. Updated Schemas

#### `src/api/careers-page/content-types/careers-page/schema.json`
**Before:**
```json
"whyWorkWithUs": {
  "type": "json",
  "required": true
},
"ctaSection": {
  "type": "json",
  "required": true
}
```

**After:**
```json
"whyWorkWithUs": {
  "type": "component",
  "repeatable": false,
  "component": "careers.why-work-section",
  "required": true
},
"ctaSection": {
  "type": "component",
  "repeatable": false,
  "component": "careers.cta-section",
  "required": true
}
```

#### `src/api/job-vacancy/content-types/job-vacancy/schema.json`
**Before:**
```json
"requirements": {
  "type": "json",
  "required": true
}
```

**After:**
```json
"requirements": {
  "type": "component",
  "repeatable": false,
  "component": "careers.job-requirements",
  "required": true
}
```

### 3. Updated Seed Script

**File:** `scripts/seed-careers.js`

**Changes:**
- Added cleanup step to delete existing data before reseeding
- Converted requirements arrays to HTML lists for rich text fields
- Added helper function `arrayToHtmlList()` to convert arrays to `<ul>` lists
- Maintained the same data structure for `whyWorkWithUs` and `ctaSection` (Strapi handles component conversion automatically)

**Example Requirements Structure:**
```javascript
// Old format (JSON arrays)
requirements: {
  qualifications: [
    'Bachelor\'s degree in Finance',
    'Master\'s degree preferred'
  ]
}

// New format (HTML lists for richtext)
requirements: {
  qualifications: '<ul>\n<li>Bachelor\'s degree in Finance</li>\n<li>Master\'s degree preferred</li>\n</ul>'
}
```

---

## Benefits

### For Content Editors
- **No more code editing**: Fields now appear as user-friendly forms
- **Visual editing**: Rich text editors for requirements with formatting options
- **Repeatable benefits**: Easy to add/remove/reorder benefit cards
- **Form validation**: Strapi validates required fields automatically
- **Better UX**: Clear labels and structured inputs

### For Developers
- **Type safety**: Component structure is strictly defined
- **Consistent API**: API responses maintain the same structure
- **Reusable components**: Benefit cards can be reused elsewhere
- **Better documentation**: Schema files are self-documenting

---

## Admin Panel Views

### Careers Page

**Before (JSON Editor):**
```
whyWorkWithUs: [code editor with raw JSON]
ctaSection: [code editor with raw JSON]
```

**After (Form Fields):**
```
Why Work With Us
  ├─ Title: [text input]
  ├─ Description: [textarea]
  └─ Benefits: [repeatable component]
      ├─ Benefit 1
      │   ├─ Icon: [text input]
      │   ├─ Title: [text input]
      │   └─ Description: [textarea]
      ├─ Benefit 2
      └─ [Add another benefit button]

CTA Section
  ├─ Title: [text input]
  ├─ Description: [textarea]
  ├─ Button Text: [text input]
  ├─ Button Link: [text input]
  └─ Note: [text input]
```

### Job Vacancy

**Before (JSON Editor):**
```
requirements: [code editor with raw JSON]
```

**After (Form Fields):**
```
Requirements
  ├─ Qualifications: [rich text editor]
  ├─ Experience: [rich text editor]
  └─ Skills: [rich text editor]
```

---

## Data Migration

All existing careers data was migrated using the updated seed script:

```bash
npm run seed:careers
```

This script:
1. Deletes all existing careers data
2. Creates 5 sample job vacancies with component-based requirements
3. Creates careers page with component-based sections
4. Links first 3 jobs as featured jobs

---

## API Response Structure

The API response structure **remains the same** - components are serialized to JSON, so frontend code doesn't need any changes.

### Job Vacancy API Response
```json
{
  "data": [
    {
      "id": 1,
      "title": "Senior Financial Analyst",
      "requirements": {
        "qualifications": "<ul>\n<li>Bachelor's degree...</li>\n</ul>",
        "experience": "<ul>\n<li>5-7 years...</li>\n</ul>",
        "skills": "<ul>\n<li>Advanced Excel...</li>\n</ul>"
      }
    }
  ]
}
```

### Careers Page API Response
```json
{
  "data": {
    "id": 1,
    "whyWorkWithUs": {
      "title": "Why Work With Us",
      "description": "Join a mission-driven organization...",
      "benefits": [
        {
          "icon": "Award",
          "title": "Professional Development",
          "description": "Access to training programs..."
        }
      ]
    },
    "ctaSection": {
      "title": "Don't See a Position That Fits?",
      "description": "We're always looking...",
      "buttonText": "Send Your CV",
      "buttonLink": "mailto:careers@cuaghana.com",
      "note": "Email your CV..."
    }
  }
}
```

---

## Testing

### Verify in Admin Panel

1. Go to **Content Manager → Careers Page**
2. Check that `Why Work With Us` shows as structured form
3. Check that `CTA Section` shows as structured form
4. Verify you can add/edit benefit cards

5. Go to **Content Manager → Job Vacancy**
6. Open any job
7. Check that `Requirements` shows as three rich text editors
8. Verify you can format text (bold, lists, etc.)

### Verify API

```bash
# Test careers page
curl "http://localhost:1337/api/careers-page?populate=deep"

# Test job vacancies
curl "http://localhost:1337/api/job-vacancies?populate=*"
```

Both should return properly structured data.

---

## Files Changed

### Created
- `src/components/careers/benefit-item.json`
- `src/components/careers/why-work-section.json`
- `src/components/careers/cta-section.json`
- `src/components/careers/job-requirements.json`

### Modified
- `src/api/careers-page/content-types/careers-page/schema.json`
- `src/api/job-vacancy/content-types/job-vacancy/schema.json`
- `scripts/seed-careers.js`

---

## Conclusion

The careers section now provides a much better editing experience in the Strapi admin panel. Content editors can manage job vacancies and the careers page using structured forms instead of raw JSON code editors, while maintaining the same API response format for frontend integration.

**Status:** ✅ Complete and Tested
**Date:** October 28, 2025
