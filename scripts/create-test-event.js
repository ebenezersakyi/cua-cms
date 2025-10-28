/**
 * Create a test event directly via Strapi Admin API
 * This bypasses UI issues and ensures proper data format
 */

async function createTestEvent() {
  const STRAPI_URL = 'http://localhost:1337';

  // Replace with your admin credentials
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'your-admin-password';

  try {
    // Step 1: Login to get auth token
    console.log('🔐 Logging in as admin...');
    const loginResponse = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Failed to login. Check your admin credentials.');
    }

    const { data } = await loginResponse.json();
    const token = data.token;
    console.log('✅ Logged in successfully');

    // Step 2: Create event with all required fields
    console.log('📝 Creating test event...');

    const eventData = {
      title: "CUA Ghana Annual Conference 2025",
      slug: "cua-ghana-conference-2025",
      description: "<p>Join us for the premier gathering of credit unions in Ghana. This annual conference brings together leaders, members, and stakeholders to discuss the future of cooperative finance in our nation.</p>",
      shortDescription: "Annual conference for all Ghana credit unions",
      eventDate: "2025-11-15",
      eventTime: "09:00:00",
      location: "Accra, Ghana",
      venue: "Accra International Conference Centre",
      category: "Community",
      isFeatured: true,
      capacity: 500,
      status: "Upcoming",  // Explicitly set status
      registrationLink: "https://example.com/register",
      registrationDeadline: "2025-11-10",
      // Note: featuredImage would need to be uploaded separately
      // For now, we'll create without it and add later
    };

    const createResponse = await fetch(
      `${STRAPI_URL}/content-manager/collection-types/api::event.event`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      }
    );

    if (!createResponse.ok) {
      const error = await createResponse.json();
      throw new Error(`Failed to create event: ${JSON.stringify(error)}`);
    }

    const createdEvent = await createResponse.json();
    console.log('✅ Event created successfully!');
    console.log('Event ID:', createdEvent.documentId);

    // Step 3: Publish the event
    console.log('📢 Publishing event...');

    const publishResponse = await fetch(
      `${STRAPI_URL}/content-manager/collection-types/api::event.event/${createdEvent.documentId}/actions/publish`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.json();
      console.warn('⚠️  Could not publish:', error.error?.message);
      console.log('Event created as draft. You can publish it manually in the admin panel.');
    } else {
      console.log('✅ Event published successfully!');
    }

    console.log('\n🎉 Success! View your event at:');
    console.log(`Admin: ${STRAPI_URL}/admin/content-manager/collection-types/api::event.event/${createdEvent.documentId}`);
    console.log(`API: ${STRAPI_URL}/api/events?populate=*`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure Strapi is running (npm run develop)');
    console.log('2. Update ADMIN_EMAIL and ADMIN_PASSWORD in this script');
    console.log('3. Check that you have admin access');
  }
}

// Run the script
console.log('🚀 Creating test event in Strapi...\n');
console.log('⚠️  IMPORTANT: Update admin credentials in this script first!\n');

// Uncomment to run:
// createTestEvent();