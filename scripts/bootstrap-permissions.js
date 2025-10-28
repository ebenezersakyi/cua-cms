/**
 * Bootstrap function to set public permissions
 * Copy this into your src/index.js bootstrap function
 */

async function setPublicPermissions(strapi) {
  try {
    // Get the public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      console.error('❌ Public role not found');
      return;
    }

    // Define public permissions for your API endpoints
    const publicEndpoints = [
      'api::event.event',
      'api::news-article.news-article',
      'api::credit-union.credit-union',
      'api::hero-slide.hero-slide',
      'api::board-member.board-member',
      'api::management-team.management-team',
      'api::partner.partner',
      'api::success-story.success-story',
      'api::chapter.chapter',
      'api::download.download',
      'api::photo-gallery.photo-gallery',
      'api::video-gallery.video-gallery',
      'api::training-course.training-course',
      'api::training-schedule.training-schedule',
      'api::news-category.news-category',
      'api::tag.tag',
      'api::testimonial-member.testimonial-member',
      'api::instructor.instructor',
    ];

    // Actions to enable for collection types
    const readActions = ['find', 'findOne'];

    // Get all permissions for the public role
    const permissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: publicRole.id } });

    // Enable permissions for each endpoint
    for (const endpoint of publicEndpoints) {
      for (const action of readActions) {
        const permission = permissions.find(
          p => p.controller === endpoint && p.action === action
        );

        if (permission && !permission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: true }
            });
          console.log(`✅ Enabled public access: ${endpoint} - ${action}`);
        }
      }
    }

    // Handle single types (only 'find' action)
    const singleTypes = [
      'api::site-setting.site-setting',
      'api::homepage-setting.homepage-setting',
      'api::ticker-content.ticker-content',
      'api::about-page-content.about-page-content',
      // New about pages
      'api::who-we-are-page.who-we-are-page',
      'api::management-page.management-page',
      'api::board-of-directors-page.board-of-directors-page',
      'api::role-in-ghana-page.role-in-ghana-page',
      'api::potential-and-size-page.potential-and-size-page',
      'api::partners-page.partners-page',
      // Other pages
      'api::credit-unions-in-ghana-page.credit-unions-in-ghana-page',
      'api::credit-unions-join-page.credit-unions-join-page',
      'api::credit-unions-members-page.credit-unions-members-page',
      'api::credit-unions-success-stories-page.credit-unions-success-stories-page',
      'api::credit-unions-form-page.credit-unions-form-page',
      'api::cutrac-overview-page.cutrac-overview-page',
      'api::statistics.statistics',
    ];

    for (const endpoint of singleTypes) {
      const permission = permissions.find(
        p => p.controller === endpoint && p.action === 'find'
      );

      if (permission && !permission.enabled) {
        await strapi
          .query('plugin::users-permissions.permission')
          .update({
            where: { id: permission.id },
            data: { enabled: true }
          });
        console.log(`✅ Enabled public access: ${endpoint} - find`);
      }
    }

    // Handle create permissions for contact forms
    const createEndpoints = [
      'api::newsletter-subscription.newsletter-subscription',
      'api::contact-message.contact-message',
    ];

    for (const endpoint of createEndpoints) {
      const permission = permissions.find(
        p => p.controller === endpoint && p.action === 'create'
      );

      if (permission && !permission.enabled) {
        await strapi
          .query('plugin::users-permissions.permission')
          .update({
            where: { id: permission.id },
            data: { enabled: true }
          });
        console.log(`✅ Enabled public access: ${endpoint} - create`);
      }
    }

    console.log('\n✅ All public permissions configured successfully!');

  } catch (error) {
    console.error('❌ Error setting public permissions:', error);
  }
}

module.exports = { setPublicPermissions };