# Career Page Requirements

## Overview
The Career page serves as a recruitment platform for CUA Ghana, showcasing available job positions and providing information about working at the organization. The page enables potential candidates to view job openings and apply directly through external application links.

---

## Page Information
- **Route:** `/careers`
- **File Location:** `app/careers/page.js`
- **Page Type:** Client-side rendered
- **Navigation:** Accessible via Footer (Quick Links section)

---

## Page Sections

### 1. Hero Section
**Purpose:** Create an engaging introduction to career opportunities at CUA Ghana

**Content Required:**
- **Title:** "Careers at CUA Ghana"
- **Tagline:** "Join Our Team"
- **Description:** Brief statement about building careers while making a difference
- **Background Image:** Hero image with gradient overlay (blue theme)

**Design Specifications:**
- Full-width hero section
- Background image with blue gradient overlay (`from-[#01366b]/90 via-[#01366b]/70 to-[#01366b]/50`)
- White text on dark background
- Centered content with decorative blur elements
- Responsive padding (py-20 lg:py-28)

---

### 2. Why Work With Us Section
**Purpose:** Highlight the benefits and culture of working at CUA Ghana

**Content Required (4 benefit cards):**
1. **Collaborative Culture**
   - Icon: FiUsers
   - Description: Work with a diverse team committed to financial inclusion

2. **Career Growth**
   - Icon: FiTrendingUp
   - Description: Professional development opportunities and training programs

3. **Competitive Benefits**
   - Icon: FiAward
   - Description: Attractive salary packages and comprehensive benefits

4. **Make an Impact**
   - Icon: FiHeart
   - Description: Contribute to empowering communities across Ghana

**Design Specifications:**
- Section title: "Why Work With Us"
- 4-column grid on desktop (responsive to 2 columns on tablet, 1 on mobile)
- Card styling: white/gray gradient background, rounded corners, shadow
- Hover effect: lift animation and enhanced shadow
- Icon: contained in colored circle (blue background)

---

### 3. Job Vacancies Section
**Purpose:** Display current job openings with detailed information

**Required Data Fields per Job:**
- `title` (string) - Job position title
- `department` (string) - Department/division name
- `location` (string) - Physical location (e.g., "Accra, Ghana")
- `type` (string) - Employment type (e.g., "Full-time", "Part-time", "Contract")
- `description` (string) - Detailed job description
- `requirements` (array of strings) - List of qualifications and requirements
- `applyUrl` (string) - External URL for job application

**Functional Requirements:**
- Display all active job vacancies
- Each job card should include:
  - Job title with department badge
  - Location and employment type with icons
  - Job description paragraph
  - Bulleted list of requirements
  - "Apply Now" button
- "Apply Now" button must:
  - Open application URL in new tab
  - Include security attributes: `noopener,noreferrer`
  - Display external link icon (FiExternalLink)

**Empty State:**
- When no vacancies exist, display message:
  - Icon: FiBriefcase
  - Title: "No Open Positions at the Moment"
  - Description: Instructions to check back later or send CV to careers@cua.org.gh
  - Styled in blue info box

**Design Specifications:**
- Cards arranged vertically with spacing
- White background with shadow and border
- Hover effect: enhanced shadow
- Responsive layout (stacked on mobile, side-by-side on desktop)
- Department badge: blue background with rounded corners

---

### 4. Call to Action Section
**Purpose:** Encourage general applications from talented candidates

**Content Required:**
- **Title:** "Don't See the Right Position?"
- **Description:** Message inviting candidates to send CV for future opportunities
- **CTA Button:** "Send Your CV"
- **Action:** Opens email client to careers@cua.org.gh

**Design Specifications:**
- Full-width section with gradient background (`from-[#01366b] to-[#024a8f]`)
- White text on dark background
- Centered content
- Large button with secondary styling

---

## Data Management

### Current Implementation
Jobs are stored as a static array within the component:
```javascript
const jobVacancies = [
  {
    title: "Senior Accountant",
    department: "Finance",
    location: "Accra, Ghana",
    type: "Full-time",
    description: "Job description...",
    requirements: ["Requirement 1", "Requirement 2"],
    applyUrl: "https://example.com/apply"
  }
]
```

### Future CMS Integration Requirements

**Strapi Collection: `job-vacancies`**

**Required Fields:**
1. **title** (Text, Required)
   - Job position title
   - Example: "Senior Accountant"

2. **department** (Text, Required)
   - Department or division
   - Example: "Finance", "CUTRAC", "IT"

3. **location** (Text, Required)
   - Job location
   - Default: "Accra, Ghana"

4. **employmentType** (Enumeration, Required)
   - Options: "Full-time", "Part-time", "Contract", "Internship"
   - Default: "Full-time"

5. **description** (Rich Text, Required)
   - Detailed job description
   - Supports markdown formatting

6. **requirements** (JSON/Component Repeater, Required)
   - Array of requirement strings
   - Each requirement as a separate entry

7. **applyUrl** (Text/URL, Required)
   - External application URL
   - Must be valid URL format
   - Opens in new tab when clicked

8. **isActive** (Boolean, Required)
   - Controls vacancy visibility
   - Default: true
   - Only active vacancies displayed on website

9. **postedDate** (Date)
   - Date when job was posted
   - Used for sorting (newest first)

10. **closingDate** (Date, Optional)
    - Application deadline
    - Display if within next 30 days

11. **salary** (Text, Optional)
    - Salary range or description
    - Example: "Competitive" or "GHS 5,000 - 8,000"

12. **experienceLevel** (Enumeration, Optional)
    - Options: "Entry Level", "Mid Level", "Senior Level", "Executive"

**API Endpoint:**
```
GET /api/job-vacancies
```

**Query Parameters:**
- `filters[isActive][$eq]=true` - Only active vacancies
- `sort=postedDate:desc` - Newest first
- `populate=*` - Include all relations

**Example API Implementation:**
```javascript
// lib/strapi.js
export async function getJobVacancies() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/job-vacancies?filters[isActive][$eq]=true&sort=postedDate:desc&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching job vacancies:', error);
    return { data: [] };
  }
}
```

---

## Technical Requirements

### Dependencies
- **next** - Next.js framework
- **react** - React library
- **framer-motion** - Animation library
- **react-icons** - Icon library (Feather icons)
- **next/image** - Optimized image component

### Icons Used
- `FiMapPin` - Location indicator
- `FiBriefcase` - Job/career icon
- `FiClock` - Employment type
- `FiExternalLink` - External link indicator
- `FiUsers` - Team/collaboration
- `FiTrendingUp` - Growth/progress
- `FiAward` - Benefits/achievement
- `FiHeart` - Impact/purpose

### Animations
All sections use Framer Motion with:
- **containerVariants:** Stagger children animations
- **itemVariants:** Fade in from bottom with scale
- **Viewport triggers:** `once: true` to prevent re-animation on scroll
- **Timing:** Smooth easing with custom bezier curves

### Responsive Breakpoints
- **Mobile:** Default (< 768px)
- **Tablet:** md: (768px - 1023px)
- **Desktop:** lg: (1024px+)

---

## User Interactions

### Apply Now Button
**Behavior:**
- Opens application URL in new browser tab
- Security: Includes `noopener` and `noreferrer` attributes
- Visual feedback: Button scales on hover/click
- Icon: External link icon on right side

**Implementation:**
```javascript
const handleApply = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
```

### Send Your CV Button
**Behavior:**
- Opens default email client
- Pre-fills recipient: careers@cua.org.gh
- Opens in new window/tab

**Implementation:**
```javascript
onClick={() => window.open('mailto:careers@cua.org.gh', '_blank')}
```

---

## SEO Requirements

### Meta Tags (to be added)
```javascript
export const metadata = {
  title: 'Careers - CUA Ghana | Join Our Team',
  description: 'Explore career opportunities at Ghana Co-operative Credit Unions Association. Join our team and make a difference in communities across Ghana.',
  keywords: 'CUA Ghana careers, credit union jobs, banking jobs Ghana, cooperative jobs, Accra jobs',
  openGraph: {
    title: 'Careers at CUA Ghana',
    description: 'Build your career while making a difference. Explore job opportunities at CUA Ghana.',
    images: ['/images/hero/hero1.jpg'],
  },
}
```

---

## Accessibility Requirements

1. **Semantic HTML:**
   - Proper heading hierarchy (h1 > h2 > h3)
   - Section landmarks
   - List structure for requirements

2. **ARIA Labels:**
   - Button aria-labels for screen readers
   - Icon descriptions
   - External link indicators

3. **Keyboard Navigation:**
   - All interactive elements keyboard accessible
   - Focus states visible
   - Logical tab order

4. **Color Contrast:**
   - WCAG AA compliant contrast ratios
   - Text readable on all backgrounds
   - Focus indicators clearly visible

---

## Performance Considerations

1. **Image Optimization:**
   - Use Next.js Image component
   - Priority loading for hero image
   - Lazy loading for below-fold content

2. **Animation Performance:**
   - Hardware-accelerated animations
   - Viewport-based triggers to reduce unnecessary renders
   - `once: true` to prevent repeated animations

3. **Data Fetching:**
   - Implement caching strategy (revalidate: 3600)
   - Handle loading states
   - Graceful error handling

---

## Integration with Footer

### Footer Link
- **Section:** Quick Links
- **Link Text:** "Careers"
- **Link URL:** `/careers`
- **Position:** Between "Our Partners" and "Disclaimer"

**Implementation in Footer.js:**
```javascript
{
  title: "Quick Links",
  links: [
    // ... other links
    { text: "Careers", href: "/careers" },
    // ... other links
  ]
}
```

---

## Future Enhancements

### Phase 2 - Advanced Features
1. **Application Form:**
   - Integrated application form on website
   - File upload for CV and cover letter
   - Form validation and submission to CMS

2. **Job Filtering:**
   - Filter by department
   - Filter by location
   - Filter by employment type
   - Search functionality

3. **Email Notifications:**
   - Alert when new jobs posted
   - Application confirmation emails
   - Status update notifications

4. **Application Tracking:**
   - Candidate portal
   - Application status tracking
   - Interview scheduling

### Phase 3 - Analytics
1. **Track Metrics:**
   - Page views per job
   - Application conversion rate
   - Time on page
   - Apply button clicks

2. **Insights Dashboard:**
   - Most viewed positions
   - Application sources
   - Candidate demographics

---

## Testing Checklist

### Functional Testing
- [ ] All job vacancies display correctly
- [ ] Apply Now buttons open correct URLs in new tabs
- [ ] Send CV button opens email client
- [ ] Empty state displays when no vacancies
- [ ] Footer link navigates to careers page
- [ ] Responsive layout works on all devices

### Content Testing
- [ ] All text is readable and properly formatted
- [ ] Requirements lists display correctly
- [ ] Department badges show appropriate styling
- [ ] Icons display correctly
- [ ] Images load and scale properly

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG standards
- [ ] Alt text for images

### Performance Testing
- [ ] Page loads in < 3 seconds
- [ ] Animations smooth (60fps)
- [ ] No layout shifts (CLS)
- [ ] Images optimized

---

## Maintenance

### Regular Updates Required
1. **Job Vacancies:**
   - Update when new positions open
   - Remove filled/closed positions
   - Update job descriptions as needed

2. **Application URLs:**
   - Verify external links are active
   - Update if application process changes

3. **Content Review:**
   - Quarterly review of benefits section
   - Update contact email if changed
   - Refresh images periodically

### Content Owner
- **Department:** Human Resources
- **Contact:** hr@cua.org.gh
- **Update Frequency:** As needed (when vacancies change)

---

## Support Contact

For technical issues or questions regarding the careers page:
- **Technical Team:** development@cua.org.gh
- **HR Department:** careers@cua.org.gh
- **General Inquiries:** info@cua.org.gh
