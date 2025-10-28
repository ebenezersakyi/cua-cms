/**
 * Script to configure public API permissions for Strapi
 * Run this after starting Strapi: node scripts/set-public-permissions.js
 */

const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // Optional: Set if using API tokens

// Define which content types and actions should be publicly accessible
const PUBLIC_PERMISSIONS = {
  // Events
  'api::event.event': ['find', 'findOne'],

  // News Articles
  'api::news-article.news-article': ['find', 'findOne'],

  // Credit Unions
  'api::credit-union.credit-union': ['find', 'findOne'],

  // Hero Slides (already public, but included for completeness)
  'api::hero-slide.hero-slide': ['find', 'findOne'],

  // Board Members
  'api::board-member.board-member': ['find', 'findOne'],

  // Management Team
  'api::management-team.management-team': ['find', 'findOne'],

  // Partners
  'api::partner.partner': ['find', 'findOne'],

  // Success Stories
  'api::success-story.success-story': ['find', 'findOne'],

  // Chapters
  'api::chapter.chapter': ['find', 'findOne'],

  // Downloads
  'api::download.download': ['find', 'findOne'],

  // Photo Gallery
  'api::photo-gallery.photo-gallery': ['find', 'findOne'],

  // Video Gallery
  'api::video-gallery.video-gallery': ['find', 'findOne'],

  // Training Courses
  'api::training-course.training-course': ['find', 'findOne'],

  // Training Schedules
  'api::training-schedule.training-schedule': ['find', 'findOne'],

  // News Categories
  'api::news-category.news-category': ['find', 'findOne'],

  // Tags
  'api::tag.tag': ['find', 'findOne'],

  // Testimonial Members
  'api::testimonial-member.testimonial-member': ['find', 'findOne'],

  // Instructors
  'api::instructor.instructor': ['find', 'findOne'],

  // Site Settings (single type)
  'api::site-setting.site-setting': ['find'],

  // Homepage Settings (single type)
  'api::homepage-setting.homepage-setting': ['find'],

  // Ticker Content (single type)
  'api::ticker-content.ticker-content': ['find'],

  // Page Content Types
  'api::about-page-content.about-page-content': ['find'],
  'api::credit-unions-in-ghana-page.credit-unions-in-ghana-page': ['find'],
  'api::credit-unions-join-page.credit-unions-join-page': ['find'],
  'api::credit-unions-members-page.credit-unions-members-page': ['find'],
  'api::credit-unions-success-stories-page.credit-unions-success-stories-page': ['find'],
  'api::credit-unions-form-page.credit-unions-form-page': ['find'],
  'api::cutrac-overview-page.cutrac-overview-page': ['find'],

  // Search and Statistics
  'api::search.search': ['find'],
  'api::statistics.statistics': ['find'],

  // Newsletter Subscription (only create for public users)
  'api::newsletter-subscription.newsletter-subscription': ['create'],

  // Contact Messages (only create for public users)
  'api::contact-message.contact-message': ['create'],
};

async function setPublicPermissions() {
  try {
    console.log('🔧 Configuring public API permissions...\n');

    // Note: This script needs to be run from within Strapi bootstrap
    // or you need to manually update permissions in the admin panel

    console.log('⚠️  IMPORTANT: This script provides a template for permissions configuration.');
    console.log('To apply these permissions, you have two options:\n');

    console.log('Option 1: Add to your bootstrap function in src/index.js');
    console.log('Option 2: Manually configure in Strapi Admin Panel:\n');

    console.log('📋 Content Types to Configure:');
    console.log('================================');

    for (const [contentType, actions] of Object.entries(PUBLIC_PERMISSIONS)) {
      const displayName = contentType.split('.').pop();
      console.log(`\n✅ ${displayName}:`);
      console.log(`   Actions: ${actions.join(', ')}`);
    }

    console.log('\n================================');
    console.log('\nTo apply these permissions automatically, add the following to src/index.js:\n');

    // Generate bootstrap code
    const bootstrapCode = `
// Add this to your bootstrap function in src/index.js
async bootstrap({ strapi }) {
  // Get the public role
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    console.error('Public role not found');
    return;
  }

  // Get all permissions
  const permissions = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  // Update permissions for public access
  const publicPermissions = ${JSON.stringify(PUBLIC_PERMISSIONS, null, 2)};

  for (const [controller, actions] of Object.entries(publicPermissions)) {
    for (const action of actions) {
      const permission = permissions.find(
        p => p.controller === controller && p.action === action
      );

      if (permission && !permission.enabled) {
        await strapi
          .query('plugin::users-permissions.permission')
          .update({
            where: { id: permission.id },
            data: { enabled: true }
          });
        console.log(\`✅ Enabled: \${controller} - \${action}\`);
      }
    }
  }

  console.log('✅ Public permissions configured successfully');
}`;

    console.log(bootstrapCode);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
setPublicPermissions();