/**
 * Script to publish events using Strapi Admin API
 * Requires admin authentication
 */

const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function publishEvent() {
  try {
    // Step 1: Authenticate as admin (you need to have admin credentials)
    const authResponse = await axios.post(`${STRAPI_URL}/admin/login`, {
      email: 'your-admin-email@example.com',  // Replace with your admin email
      password: 'your-admin-password'          // Replace with your admin password
    });

    const token = authResponse.data.data.token;

    // Step 2: Get the event document ID you want to publish
    // First, fetch unpublished events
    const eventsResponse = await axios.get(
      `${STRAPI_URL}/content-manager/collection-types/api::event.event`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'filters[$and][0][publishedAt][$null]': true,  // Get unpublished events
          'pageSize': 10
        }
      }
    );

    if (eventsResponse.data.results.length === 0) {
      console.log('No unpublished events found');
      return;
    }

    // Step 3: Publish the first unpublished event
    const eventToPublish = eventsResponse.data.results[0];
    console.log(`Publishing event: ${eventToPublish.title}`);

    const publishResponse = await axios.post(
      `${STRAPI_URL}/content-manager/collection-types/api::event.event/${eventToPublish.documentId}/actions/publish`,
      {},  // Empty body for publish action
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Event published successfully!');
    console.log('Published event ID:', publishResponse.data.documentId);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Alternative: Create and publish an event in one go
async function createAndPublishEvent() {
  try {
    // Authenticate first (same as above)
    const authResponse = await axios.post(`${STRAPI_URL}/admin/login`, {
      email: 'your-admin-email@example.com',  // Replace
      password: 'your-admin-password'          // Replace
    });

    const token = authResponse.data.data.token;

    // Create a new event (already published)
    const newEvent = {
      title: 'New Event Title',
      slug: 'new-event-title',
      description: 'Event description here',
      eventDate: '2025-11-01',
      location: 'Accra, Ghana',
      venue: 'Conference Center',
      isFeatured: true,
      status: 'Upcoming',
      category: 'Community',
      publishedAt: new Date().toISOString()  // This publishes immediately
    };

    const createResponse = await axios.post(
      `${STRAPI_URL}/content-manager/collection-types/api::event.event`,
      newEvent,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Event created and published!');
    console.log('New event ID:', createResponse.data.documentId);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Run the script
console.log('🚀 Publishing events via Admin API...\n');
console.log('⚠️  NOTE: You need to update the admin credentials in this script first!\n');

// Uncomment the function you want to use:
// publishEvent();        // To publish existing unpublished events
// createAndPublishEvent(); // To create and publish a new event