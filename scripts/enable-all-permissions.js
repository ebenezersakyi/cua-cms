'use strict';

/**
 * Force enable ALL public permissions
 */

async function enableAllPermissions(strapi) {
  console.log('🔧 Force enabling all public API permissions...\n');

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

    console.log(`✅ Found public role with ID: ${publicRole.id}`);

    // Get ALL permissions for the public role
    const permissions = await strapi.db
      .query('plugin::users-permissions.permission')
      .findMany({
        where: {
          role: publicRole.id,
        },
      });

    console.log(`📊 Found ${permissions.length} total permissions for public role\n`);

    // List all permissions to see what we have
    console.log('Current permissions:');
    permissions.forEach(p => {
      console.log(`  - ${p.action} (enabled: ${p.enabled})`);
    });
    console.log('');

    // Enable ALL permissions except sensitive ones
    const sensitiveActions = ['delete', 'update'];
    let updatedCount = 0;

    for (const permission of permissions) {
      // Allow create for contact/newsletter
      const isContactCreate = permission.action.includes('contact-message.create') ||
                              permission.action.includes('newsletter-subscription.create');

      // Skip delete and update actions (but allow create)
      const isSensitive = sensitiveActions.some(action => permission.action.includes(`.${action}`));

      if (isSensitive) {
        console.log(`⏭️  Skipping sensitive: ${permission.action}`);
        continue;
      }

      if (!permission.enabled) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .update({
            where: { id: permission.id },
            data: { enabled: true },
          });
        console.log(`✅ Enabled: ${permission.action}`);
        updatedCount++;
      } else {
        console.log(`✓ Already enabled: ${permission.action}`);
      }
    }

    console.log(`\n✅ Successfully enabled ${updatedCount} new permissions!`);

  } catch (error) {
    console.error('❌ Error enabling permissions:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await enableAllPermissions(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
