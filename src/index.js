'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set public permissions for API endpoints
    try {
      console.log('🔧 Setting up public API permissions...\n');

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

      console.log(`✅ Found public role with ID: ${publicRole.id}`);

      // Get existing permissions for the public role
      const permissions = await strapi.db
        .query('plugin::users-permissions.permission')
        .findMany({
          where: {
            role: publicRole.id,
          },
        });

      console.log(`📊 Found ${permissions.length} total permissions for public role\n`);

      // Define the APIs we want to make public
      const apisToMakePublic = [
        'event',
        'news-article',
        'credit-union',
        'hero-slide',
        'board-member',
        'management-team',
        'partner',
        'success-story',
        'chapter',
        'download',
        'photo-gallery',
        'video-gallery',
        'training-course',
        'training-schedule',
        'news-category',
        'tag',
        'testimonial-member',
        'instructor',
        'job-vacancy',
      ];

      const singleTypes = [
        'site-setting',
        'homepage-setting',
        'news-highlight',
        'about-page-content',
        // New about pages
        'who-we-are-page',
        'management-page',
        'board-of-directors-page',
        'role-in-ghana-page',
        'potential-and-size-page',
        'partners-page',
        // Our Work pages
        'what-we-do-page',
        'our-chapters-page',
        // Credit Unions pages
        'credit-unions-overview-page',
        'credit-unions-in-ghana-page',
        'credit-unions-join-page',
        'credit-unions-form-page',
        'credit-unions-members-page',
        'credit-unions-success-stories-page',
        // Training pages
        'cutrac-overview-page',
        'training-calendar-page',
        'training-prices-page',
        'training-registration-page',
        'contact-cutrac-page',
        'travel-for-training-page',
        // Media pages
        'downloads-page',
        'eletter-subscription-page',
        'photo-gallery-page',
        'video-gallery-page',
        // Contact page
        'contact-page',
        // Careers page
        'careers-page',
        // Other pages
        'statistics',
      ];

      const createTypes = [
        'newsletter-subscription',
        'contact-message',
        'training-registration',
        'job-application',
      ];

      let updatedCount = 0;

      // Update permissions for collection types (find and findOne)
      for (const apiName of apisToMakePublic) {
        const findPermission = permissions.find(
          p => p.action === `api::${apiName}.${apiName}.find`
        );
        const findOnePermission = permissions.find(
          p => p.action === `api::${apiName}.${apiName}.findOne`
        );

        if (findPermission && !findPermission.enabled) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: findPermission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled: ${apiName} - find`);
          updatedCount++;
        }

        if (findOnePermission && !findOnePermission.enabled) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: findOnePermission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled: ${apiName} - findOne`);
          updatedCount++;
        }
      }

      // Update permissions for single types (find only)
      for (const apiName of singleTypes) {
        const findPermission = permissions.find(
          p => p.action === `api::${apiName}.${apiName}.find`
        );

        if (findPermission && !findPermission.enabled) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: findPermission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled: ${apiName} - find`);
          updatedCount++;
        }
      }

      // Update permissions for create endpoints
      for (const apiName of createTypes) {
        const createPermission = permissions.find(
          p => p.action === `api::${apiName}.${apiName}.create`
        );

        if (createPermission && !createPermission.enabled) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: createPermission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled: ${apiName} - create`);
          updatedCount++;
        }
      }

      if (updatedCount > 0) {
        console.log(`\n✅ Successfully enabled ${updatedCount} public API permissions!`);
      } else {
        console.log('\n✅ All public API permissions are already configured.');
      }

      // Initialize single type content if not exists
      await initializeSingleTypes(strapi);

    } catch (error) {
      console.error('❌ Error setting public permissions:', error);
      console.error('Stack trace:', error.stack);
    }
  },
};

// Helper function to initialize single type content
async function initializeSingleTypes(strapi) {
  try {
    console.log('\n📝 Checking single type content...');

    // Check if homepage-setting exists
    const homepageSettings = await strapi.entityService.findMany('api::homepage-setting.homepage-setting');

    if (!homepageSettings) {
      console.log('Creating default homepage settings...');

      await strapi.entityService.create('api::homepage-setting.homepage-setting', {
        data: {
          heroTitle: 'Welcome to CUA Ghana',
          heroSubtitle: 'Empowering Communities Through Cooperative Finance',
          impactSectionTitle: 'Our Impact',
          impactSectionDescription: 'See how credit unions are transforming communities across Ghana',
          aboutSectionTitle: 'About CUA Ghana',
          aboutSectionContent: 'The Credit Union Association of Ghana (CUA) is the apex body for all credit unions in Ghana, providing leadership, advocacy, and support services to strengthen the credit union movement.',
          aboutCtaText: 'Learn More',
          aboutCtaLink: '/about-us',
          joinSectionTitle: 'Join the Movement',
          joinSectionSubtitle: 'Become part of Ghana\'s growing credit union community',
          joinSectionDescription: 'Experience the benefits of member-owned financial services',
          joinCtaText: 'Become a Member',
          joinCtaLink: '/credit-unions/join',
          joinSecondaryCtaText: 'Find Credit Unions',
          joinSecondaryCtaLink: '/credit-unions',
          newsSectionTitle: 'Latest News & Updates',
          newsCtaText: 'View All News',
          newsCtaLink: '/news',
          eventsSectionTitle: 'Upcoming Events',
          eventsCtaText: 'View All Events',
          eventsCtaLink: '/events',
          partnersSectionTitle: 'Our Partners',
          partnersSectionDescription: 'Working together to strengthen financial inclusion in Ghana',
          showPartnersSection: true,
          seoTitle: 'Credit Union Association of Ghana - Empowering Communities',
          seoDescription: 'The official website of the Credit Union Association of Ghana. Join the cooperative finance movement and build a stronger financial future.'
        }
      });

      console.log('✅ Homepage settings created successfully');
    } else {
      console.log('✅ Homepage settings already exist');
    }

    // Check other single types and create if needed
    const singleTypesToCheck = [
      'api::site-setting.site-setting',
      'api::news-highlight.news-highlight',
      'api::about-page-content.about-page-content',
      // Add more single types as needed
    ];

    for (const contentType of singleTypesToCheck) {
      try {
        const content = await strapi.entityService.findMany(contentType);
        if (!content) {
          console.log(`⚠️  No content for ${contentType} - consider creating default content`);
        }
      } catch (err) {
        // Content type might not exist or have issues
        console.log(`⚠️  Could not check ${contentType}: ${err.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Error initializing single types:', error.message);
  }
}