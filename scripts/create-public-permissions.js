'use strict';

/**
 * Create and enable all public API permissions for content types
 */

async function createPublicPermissions(strapi) {
  console.log('🔧 Creating public API permissions...\n');

  try {
    // Get the public role
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({
        where: { type: 'public' },
      });

    if (!publicRole) {
      console.error('❌ Public role not found');
      return;
    }

    console.log(`✅ Found public role with ID: ${publicRole.id}\n`);

    // Define all content types that need public access
    const contentTypes = [
      // Collection types - need find and findOne
      { api: 'event', actions: ['find', 'findOne'] },
      { api: 'news-article', actions: ['find', 'findOne'] },
      { api: 'credit-union', actions: ['find', 'findOne'] },
      { api: 'hero-slide', actions: ['find', 'findOne'] },
      { api: 'board-member', actions: ['find', 'findOne'] },
      { api: 'management-team', actions: ['find', 'findOne'] },
      { api: 'partner', actions: ['find', 'findOne'] },
      { api: 'success-story', actions: ['find', 'findOne'] },
      { api: 'chapter', actions: ['find', 'findOne'] },
      { api: 'download', actions: ['find', 'findOne'] },
      { api: 'photo-gallery', actions: ['find', 'findOne'] },
      { api: 'video-gallery', actions: ['find', 'findOne'] },
      { api: 'training-course', actions: ['find', 'findOne'] },
      { api: 'training-schedule', actions: ['find', 'findOne'] },
      { api: 'news-category', actions: ['find', 'findOne'] },
      { api: 'tag', actions: ['find', 'findOne'] },
      { api: 'testimonial-member', actions: ['find', 'findOne'] },
      { api: 'instructor', actions: ['find', 'findOne'] },

      // Single types - only need find
      { api: 'site-setting', actions: ['find'] },
      { api: 'homepage-setting', actions: ['find'] },
      { api: 'ticker-content', actions: ['find'] },
      { api: 'about-page-content', actions: ['find'] },
      { api: 'what-we-do-page', actions: ['find'] },
      { api: 'our-chapters-page', actions: ['find'] },
      { api: 'who-we-are-page', actions: ['find'] },
      { api: 'management-page', actions: ['find'] },
      { api: 'board-of-directors-page', actions: ['find'] },
      { api: 'role-in-ghana-page', actions: ['find'] },
      { api: 'potential-and-size-page', actions: ['find'] },
      { api: 'partners-page', actions: ['find'] },
      { api: 'credit-unions-overview-page', actions: ['find'] },
      { api: 'credit-unions-in-ghana-page', actions: ['find'] },
      { api: 'credit-unions-join-page', actions: ['find'] },
      { api: 'credit-unions-form-page', actions: ['find'] },
      { api: 'credit-unions-members-page', actions: ['find'] },
      { api: 'credit-unions-success-stories-page', actions: ['find'] },
      { api: 'cutrac-overview-page', actions: ['find'] },
      { api: 'training-calendar-page', actions: ['find'] },
      { api: 'training-prices-page', actions: ['find'] },
      { api: 'training-registration-page', actions: ['find'] },
      { api: 'contact-cutrac-page', actions: ['find'] },
      { api: 'travel-for-training-page', actions: ['find'] },
      { api: 'downloads-page', actions: ['find'] },
      { api: 'eletter-subscription-page', actions: ['find'] },
      { api: 'photo-gallery-page', actions: ['find'] },
      { api: 'video-gallery-page', actions: ['find'] },
      { api: 'contact-page', actions: ['find'] },
      { api: 'statistics', actions: ['find'] },

      // Create permissions for forms
      { api: 'newsletter-subscription', actions: ['create'] },
      { api: 'contact-message', actions: ['create'] },
    ];

    let createdCount = 0;
    let skippedCount = 0;

    for (const contentType of contentTypes) {
      for (const action of contentType.actions) {
        const actionName = `api::${contentType.api}.${contentType.api}.${action}`;

        // Check if permission already exists
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({
            where: { action: actionName },
          });

        if (existing) {
          // Check if it's linked to public role
          const roleLink = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({
              where: { id: existing.id },
              populate: ['role'],
            });

          if (roleLink && roleLink.role && roleLink.role.id === publicRole.id) {
            console.log(`✓ Already exists: ${actionName}`);
            skippedCount++;
            continue;
          }
        }

        // Create the permission
        try {
          const permission = await strapi.db
            .query('plugin::users-permissions.permission')
            .create({
              data: {
                action: actionName,
                role: publicRole.id,
              },
            });

          console.log(`✅ Created: ${actionName}`);
          createdCount++;
        } catch (error) {
          console.error(`❌ Failed to create ${actionName}:`, error.message);
        }
      }
    }

    console.log(`\n✅ Successfully created ${createdCount} new permissions!`);
    console.log(`✓ Skipped ${skippedCount} existing permissions`);

  } catch (error) {
    console.error('❌ Error creating permissions:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await createPublicPermissions(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
