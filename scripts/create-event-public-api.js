/**
 * Create and publish events using the PUBLIC API
 * This is simpler and doesn't require admin authentication
 * But you need to enable CREATE permission for public or authenticated users
 */

const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Example: Create an event using the public API
async function createEventViaPublicAPI() {
  try {
    const eventData = {
      data: {
        title: "Ghana Credit Union Annual Conference 2025",
        slug: "ghana-cu-conference-2025",
        description: "Join us for the annual conference bringing together all credit unions in Ghana.",
        shortDescription: "Annual conference for Ghana credit unions",
        eventDate: "2025-11-15",
        eventTime: "09:00",
        location: "Accra, Ghana",
        venue: "Accra International Conference Centre",
        category: "Community",
        isFeatured: true,
        capacity: 500,
        status: "Upcoming",
        registrationLink: "https://example.com/register",
        registrationDeadline: "2025-11-10"
      }
    };

    // Note: This will only work if you've enabled 'create' permission for public users
    // Otherwise you need to use an API token
    const response = await axios.post(
      `${STRAPI_URL}/api/events`,
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
          // If you have an API token, add it here:
          // 'Authorization': 'Bearer YOUR_API_TOKEN'
        }
      }
    );

    console.log('✅ Event created successfully!');
    console.log('Event details:', response.data.data);

  } catch (error) {
    if (error.response?.status === 403) {
      console.error('❌ Permission denied. You need to:');
      console.error('   1. Go to Strapi Admin → Settings → Roles → Public');
      console.error('   2. Enable "create" permission for Event');
      console.error('   OR');
      console.error('   3. Create an API token in Strapi Admin → Settings → API Tokens');
    } else {
      console.error('❌ Error:', error.response?.data || error.message);
    }
  }
}

// Example: Create multiple test events
async function createTestEvents() {
  const testEvents = [
    {
      title: "Financial Literacy Workshop",
      eventDate: "2025-10-30",
      location: "Kumasi",
      isFeatured: true
    },
    {
      title: "Women's Empowerment Summit",
      eventDate: "2025-11-05",
      location: "Takoradi",
      isFeatured: true
    },
    {
      title: "Agricultural Finance Training",
      eventDate: "2025-11-20",
      location: "Tamale",
      isFeatured: false
    }
  ];

  for (const event of testEvents) {
    try {
      const eventData = {
        data: {
          title: event.title,
          slug: event.title.toLowerCase().replace(/\s+/g, '-'),
          description: `Join us for ${event.title}`,
          shortDescription: `${event.title} in ${event.location}`,
          eventDate: event.eventDate,
          eventTime: "10:00",
          location: event.location,
          venue: "Local Credit Union Office",
          category: "Training",
          isFeatured: event.isFeatured,
          capacity: 100,
          status: "Upcoming"
        }
      };

      const response = await axios.post(
        `${STRAPI_URL}/api/events`,
        eventData,
        {
          headers: {
            'Content-Type': 'application/json'
            // Add Authorization header if needed
          }
        }
      );

      console.log(`✅ Created: ${event.title}`);
    } catch (error) {
      console.error(`❌ Failed to create ${event.title}:`, error.response?.data?.error?.message || error.message);
    }
  }
}

// Check current permissions
async function checkPermissions() {
  try {
    // Try to fetch events (should work if find permission is enabled)
    const getResponse = await axios.get(`${STRAPI_URL}/api/events`);
    console.log('✅ READ permission is enabled (can fetch events)');
    console.log(`   Found ${getResponse.data.data.length} events`);

    // Try to create an event (will fail if create permission is not enabled)
    const testCreate = await axios.post(
      `${STRAPI_URL}/api/events`,
      { data: { title: "Test" } },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('✅ CREATE permission is enabled (can create events)');
  } catch (error) {
    if (error.response?.status === 403) {
      console.log('❌ CREATE permission is NOT enabled for public users');
      console.log('   To enable it:');
      console.log('   1. Go to http://localhost:1337/admin');
      console.log('   2. Settings → Roles → Public');
      console.log('   3. Check "create" for Event');
      console.log('   4. Save');
    }
  }
}

// Main execution
console.log('🔍 Checking API permissions...\n');
checkPermissions().then(() => {
  console.log('\n📝 To create events, uncomment one of these lines:\n');
  console.log('// createEventViaPublicAPI();  // Create a single event');
  console.log('// createTestEvents();         // Create multiple test events');
});