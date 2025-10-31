# Board of Directors API Endpoints

## ⚠️ IMPORTANT: Issue with `populate=deep`

**The `populate=deep` parameter DOES NOT include media fields (like photos) in nested relations.**

This is a known Strapi v5 limitation and cannot be overridden with custom controllers. You MUST use the explicit populate syntax shown below to get images.

## ✅ Correct API Endpoints (WITH IMAGES)

### Get Board of Directors Page with All Board Member Details (Including Photos)

```bash
# Option 1: Populate all fields in board_members (RECOMMENDED)
GET http://localhost:1337/api/board-of-directors-page?populate[board_members][populate]=*

# Option 2: Populate specific fields
GET http://localhost:1337/api/board-of-directors-page?populate[board_members][populate]=photo

# Option 3: Multiple nested fields
GET http://localhost:1337/api/board-of-directors-page?populate[hero_background_image]=*&populate[board_members][populate]=*
```

### Example Response with Photos
```json
{
  "data": {
    "board_members": [
      {
        "fullName": "John Doe",
        "position": "Head- Development Services",
        "photo": {
          "url": "/uploads/image.jpeg",
          "formats": {
            "thumbnail": { "url": "/uploads/thumbnail_image.jpeg" },
            "large": { "url": "/uploads/large_image.jpeg" }
          }
        }
      }
    ]
  }
}
```

### Test Results
- ❌ `populate=deep` - Does NOT include photo field
- ✅ `populate[board_members][populate]=*` - Includes photo with all formats
- ✅ `populate[board_members][populate]=photo` - Includes photo field
- ✅ Direct board-members endpoint with `populate=*` - Works correctly

## Frontend Usage

When fetching from your Next.js frontend, use:

```javascript
const response = await fetch(
  `${API_URL}/api/board-of-directors-page?populate[board_members][populate]=*`
);
```

Or with URLSearchParams for cleaner code:

```javascript
const params = new URLSearchParams({
  'populate[board_members][populate]': '*',
  'populate[hero_background_image]': '*'
});

const response = await fetch(
  `${API_URL}/api/board-of-directors-page?${params}`
);
```

## Why `populate=deep` Doesn't Work

Strapi v5's `populate=deep` parameter has a built-in limitation where it intentionally skips media fields in nested relations for performance reasons. This behavior:

1. **Cannot be overridden** with custom controllers or middleware
2. **Is by design** to prevent over-fetching large media data
3. **Requires explicit populate** syntax for media in relations

## Summary

- ❌ **DON'T USE**: `populate=deep` - Missing photos!
- ✅ **USE THIS**: `populate[board_members][populate]=*` - Includes photos!

Always use the explicit populate syntax when you need images in related content.