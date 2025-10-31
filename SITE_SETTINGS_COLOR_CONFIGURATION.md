# Site Settings - Color Configuration Guide

## Overview
A comprehensive color configuration system has been added to the Site Settings, allowing content editors to customize the entire website's color scheme through the Strapi admin panel using visual color pickers.

---

## Color Fields Added

### Brand Colors
- **Primary Color** (`primaryColor`) - Main brand color (Default: #007A3D - CUA Green)
- **Secondary Color** (`secondaryColor`) - Secondary brand color (Default: #FFA500 - Orange)
- **Accent Color** (`accentColor`) - Accent color for highlights (Default: #0066CC - Blue)

### CTA Button Colors - Primary
- **CTA Background Color** (`ctaBackgroundColor`) - Background color for primary CTAs (Default: #007A3D)
- **CTA Text Color** (`ctaTextColor`) - Text color for primary CTAs (Default: #FFFFFF)
- **CTA Hover Background Color** (`ctaHoverBackgroundColor`) - Background on hover (Default: #005A2D)
- **CTA Hover Text Color** (`ctaHoverTextColor`) - Text color on hover (Default: #FFFFFF)
- **CTA Border Color** (`ctaBorderColor`) - Border color for primary CTAs (Default: #007A3D)

### CTA Button Colors - Secondary (Outline/Ghost)
- **Secondary CTA Background Color** (`secondaryCtaBackgroundColor`) - Background for secondary CTAs (Default: #FFFFFF)
- **Secondary CTA Text Color** (`secondaryCtaTextColor`) - Text color for secondary CTAs (Default: #007A3D)
- **Secondary CTA Hover Background Color** (`secondaryCtaHoverBackgroundColor`) - Background on hover (Default: #F5F5F5)
- **Secondary CTA Hover Text Color** (`secondaryCtaHoverTextColor`) - Text color on hover (Default: #005A2D)
- **Secondary CTA Border Color** (`secondaryCtaBorderColor`) - Border color for secondary CTAs (Default: #007A3D)

### Text Colors
- **Heading Text Color** (`headingTextColor`) - Color for all headings (Default: #333333)
- **Body Text Color** (`bodyTextColor`) - Color for body text (Default: #666666)
- **Light Text Color** (`lightTextColor`) - Color for muted/secondary text (Default: #999999)

### Link Colors
- **Link Color** (`linkColor`) - Default link color (Default: #0066CC)
- **Link Hover Color** (`linkHoverColor`) - Link color on hover (Default: #0052A3)

### Status Colors
- **Success Color** (`successColor`) - Success messages and indicators (Default: #28A745)
- **Warning Color** (`warningColor`) - Warning messages and alerts (Default: #FFC107)
- **Error Color** (`errorColor`) - Error messages and validation (Default: #DC3545)
- **Info Color** (`infoColor`) - Informational messages (Default: #17A2B8)

### Background Colors
- **Background Color** (`backgroundColor`) - Main background color (Default: #FFFFFF)
- **Background Secondary Color** (`backgroundSecondaryColor`) - Secondary background (Default: #F8F9FA)
- **Border Color** (`borderColor`) - Default border color (Default: #E0E0E0)

---

## Admin Panel Usage

### Accessing Site Settings

1. Log into Strapi Admin Panel
2. Navigate to **Content Manager**
3. Select **Site Settings** (Single Type)
4. Scroll down to find the color configuration section

### Using the Color Picker

Each color field displays as a visual color picker with:
- **Color Preview** - Shows the current color
- **Hex Input** - Enter hex color codes directly
- **Color Picker** - Click to open visual color selector
- **Eyedropper** - Pick colors from anywhere on screen
- **Opacity Control** - Adjust transparency if needed

### Editing Colors

1. Click on any color field to open the color picker
2. Choose color using:
   - Visual color wheel
   - RGB sliders
   - HSL controls
   - Direct hex input
3. Click outside to close the picker
4. Save changes

---

## API Integration

### Fetching Colors

```javascript
// Fetch site settings with colors
const response = await fetch('http://localhost:1337/api/site-setting');
const { data } = await response.json();

// Access colors
const colors = {
  primary: data.primaryColor,
  secondary: data.secondaryColor,
  accent: data.accentColor,
  ctaBackground: data.ctaBackgroundColor,
  ctaText: data.ctaTextColor,
  // ... etc
};
```

### CSS Variables Implementation

```css
/* Generate CSS variables from API response */
:root {
  /* Brand Colors */
  --primary-color: ${data.primaryColor};
  --secondary-color: ${data.secondaryColor};
  --accent-color: ${data.accentColor};

  /* CTA Colors */
  --cta-bg: ${data.ctaBackgroundColor};
  --cta-text: ${data.ctaTextColor};
  --cta-hover-bg: ${data.ctaHoverBackgroundColor};
  --cta-hover-text: ${data.ctaHoverTextColor};
  --cta-border: ${data.ctaBorderColor};

  /* Secondary CTA */
  --cta-secondary-bg: ${data.secondaryCtaBackgroundColor};
  --cta-secondary-text: ${data.secondaryCtaTextColor};
  --cta-secondary-hover-bg: ${data.secondaryCtaHoverBackgroundColor};
  --cta-secondary-hover-text: ${data.secondaryCtaHoverTextColor};
  --cta-secondary-border: ${data.secondaryCtaBorderColor};

  /* Text Colors */
  --heading-color: ${data.headingTextColor};
  --body-color: ${data.bodyTextColor};
  --light-text: ${data.lightTextColor};

  /* Link Colors */
  --link-color: ${data.linkColor};
  --link-hover: ${data.linkHoverColor};

  /* Status Colors */
  --success: ${data.successColor};
  --warning: ${data.warningColor};
  --error: ${data.errorColor};
  --info: ${data.infoColor};

  /* Background Colors */
  --bg-primary: ${data.backgroundColor};
  --bg-secondary: ${data.backgroundSecondaryColor};
  --border-color: ${data.borderColor};
}
```

### React/Next.js Theme Provider Example

```jsx
// ThemeProvider.jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children, colors }) {
  const theme = {
    colors: {
      primary: colors.primaryColor,
      secondary: colors.secondaryColor,
      accent: colors.accentColor,
      cta: {
        background: colors.ctaBackgroundColor,
        text: colors.ctaTextColor,
        hover: {
          background: colors.ctaHoverBackgroundColor,
          text: colors.ctaHoverTextColor,
        },
        border: colors.ctaBorderColor,
      },
      ctaSecondary: {
        background: colors.secondaryCtaBackgroundColor,
        text: colors.secondaryCtaTextColor,
        hover: {
          background: colors.secondaryCtaHoverBackgroundColor,
          text: colors.secondaryCtaHoverTextColor,
        },
        border: colors.secondaryCtaBorderColor,
      },
      text: {
        heading: colors.headingTextColor,
        body: colors.bodyTextColor,
        light: colors.lightTextColor,
      },
      link: {
        default: colors.linkColor,
        hover: colors.linkHoverColor,
      },
      status: {
        success: colors.successColor,
        warning: colors.warningColor,
        error: colors.errorColor,
        info: colors.infoColor,
      },
      background: {
        primary: colors.backgroundColor,
        secondary: colors.backgroundSecondaryColor,
      },
      border: colors.borderColor,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Component Usage Example

```jsx
// Button.jsx
import { useTheme } from './ThemeProvider';

function Button({ variant = 'primary', children, ...props }) {
  const { colors } = useTheme();

  const styles = variant === 'primary' ? {
    backgroundColor: colors.cta.background,
    color: colors.cta.text,
    border: `2px solid ${colors.cta.border}`,
    ':hover': {
      backgroundColor: colors.cta.hover.background,
      color: colors.cta.hover.text,
    },
  } : {
    backgroundColor: colors.ctaSecondary.background,
    color: colors.ctaSecondary.text,
    border: `2px solid ${colors.ctaSecondary.border}`,
    ':hover': {
      backgroundColor: colors.ctaSecondary.hover.background,
      color: colors.ctaSecondary.hover.text,
    },
  };

  return (
    <button style={styles} {...props}>
      {children}
    </button>
  );
}
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        cta: {
          DEFAULT: 'var(--cta-bg)',
          hover: 'var(--cta-hover-bg)',
          text: 'var(--cta-text)',
          'hover-text': 'var(--cta-hover-text)',
          border: 'var(--cta-border)',
        },
        'cta-secondary': {
          DEFAULT: 'var(--cta-secondary-bg)',
          hover: 'var(--cta-secondary-hover-bg)',
          text: 'var(--cta-secondary-text)',
          'hover-text': 'var(--cta-secondary-hover-text)',
          border: 'var(--cta-secondary-border)',
        },
        heading: 'var(--heading-color)',
        body: 'var(--body-color)',
        light: 'var(--light-text)',
        link: {
          DEFAULT: 'var(--link-color)',
          hover: 'var(--link-hover)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
        background: {
          DEFAULT: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        border: 'var(--border-color)',
      },
    },
  },
};
```

---

## Default Color Palette

### CUA Brand Colors
- **CUA Green**: #007A3D (Primary)
- **Dark Green**: #005A2D (Hover states)
- **Orange**: #FFA500 (Secondary)
- **Blue**: #0066CC (Links/Accent)
- **Dark Blue**: #0052A3 (Link hover)

### Neutral Colors
- **Dark Grey**: #333333 (Headings)
- **Medium Grey**: #666666 (Body text)
- **Light Grey**: #999999 (Muted text)
- **Border Grey**: #E0E0E0 (Borders)
- **Light Background**: #F8F9FA (Secondary background)
- **White**: #FFFFFF (Primary background)

### Status Colors
- **Success Green**: #28A745
- **Warning Amber**: #FFC107
- **Error Red**: #DC3545
- **Info Cyan**: #17A2B8

---

## Seeding Colors

To reset colors to defaults:

```bash
npm run seed:site-settings
```

This will:
1. Create or update site settings
2. Set all colors to their default values
3. Preserve other site settings

---

## Best Practices

### Color Consistency
1. Use the primary color for main brand elements
2. Use secondary color sparingly for accents
3. Maintain sufficient contrast for accessibility

### CTA Buttons
1. Primary CTAs: Use for main actions (Submit, Sign Up, etc.)
2. Secondary CTAs: Use for secondary actions (Cancel, Learn More, etc.)
3. Ensure hover states provide clear feedback

### Accessibility
1. Maintain WCAG AA contrast ratios:
   - Normal text: 4.5:1
   - Large text: 3:1
   - UI components: 3:1
2. Test color combinations with contrast checkers
3. Don't rely on color alone to convey information

### Testing Colors
1. Preview changes in staging environment
2. Test across different screen types
3. Verify hover states work correctly
4. Check dark/light mode compatibility

---

## Files Modified

### Schema
- `src/api/site-setting/content-types/site-setting/schema.json` - Added 26 color picker fields

### Scripts
- `scripts/seed-site-settings.js` - Created seed script with default colors
- `package.json` - Added `seed:site-settings` npm script

---

## API Response Example

```json
{
  "data": {
    "id": 1,
    "siteName": "CUA Ghana",
    "primaryColor": "#007A3D",
    "secondaryColor": "#FFA500",
    "accentColor": "#0066CC",
    "ctaBackgroundColor": "#007A3D",
    "ctaTextColor": "#FFFFFF",
    "ctaHoverBackgroundColor": "#005A2D",
    "ctaHoverTextColor": "#FFFFFF",
    "ctaBorderColor": "#007A3D",
    "secondaryCtaBackgroundColor": "#FFFFFF",
    "secondaryCtaTextColor": "#007A3D",
    "secondaryCtaHoverBackgroundColor": "#F5F5F5",
    "secondaryCtaHoverTextColor": "#005A2D",
    "secondaryCtaBorderColor": "#007A3D",
    "headingTextColor": "#333333",
    "bodyTextColor": "#666666",
    "lightTextColor": "#999999",
    "linkColor": "#0066CC",
    "linkHoverColor": "#0052A3",
    "successColor": "#28A745",
    "warningColor": "#FFC107",
    "errorColor": "#DC3545",
    "infoColor": "#17A2B8",
    "backgroundColor": "#FFFFFF",
    "backgroundSecondaryColor": "#F8F9FA",
    "borderColor": "#E0E0E0"
  }
}
```

---

## Troubleshooting

### Color Picker Not Showing
- Ensure `@strapi/plugin-color-picker` is installed
- Restart Strapi after schema changes
- Clear browser cache

### Colors Not Updating
- Check if changes are saved in admin panel
- Verify API is returning updated values
- Clear frontend cache if using caching

### API Not Returning Colors
- Check public permissions for site-setting
- Ensure site-setting has been created (run seed script)
- Verify field names in API response

---

## Conclusion

The color configuration system provides a flexible, user-friendly way to manage the website's entire color scheme from the Strapi admin panel. Content editors can easily update colors without touching code, while developers can integrate the colors using CSS variables, theme providers, or direct API access.

**Implementation Date:** October 29, 2025
**Strapi Version:** 5.25.0
**Color Picker Plugin:** @strapi/plugin-color-picker@5.29.0
**Status:** ✅ Complete and Tested