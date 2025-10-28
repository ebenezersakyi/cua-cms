'use strict';

/**
 * Cleanup script for About Pages
 * This removes all seeded data from the about pages to allow fresh creation
 */

async function cleanupAboutPages(strapi) {
  console.log('🧹 Starting About Pages cleanup...\n');

  try {
    // List of single types to clean
    const singleTypes = [
      'api::who-we-are-page.who-we-are-page',
      'api::potential-and-size-page.potential-and-size-page',
      'api::board-of-directors-page.board-of-directors-page',
      'api::management-page.management-page',
      'api::partners-page.partners-page'
    ];

    for (const contentType of singleTypes) {
      try {
        // For single types, we need to find the entry first
        const entries = await strapi.documents(contentType).findMany();

        if (entries && entries.length > 0) {
          console.log(`🗑️  Deleting ${contentType}...`);

          // Delete each entry
          for (const entry of entries) {
            await strapi.documents(contentType).delete({
              documentId: entry.documentId
            });
          }

          console.log(`✅ Deleted ${entries.length} entry/entries from ${contentType}\n`);
        } else {
          console.log(`ℹ️  No entries found for ${contentType}\n`);
        }
      } catch (error) {
        console.log(`⚠️  Could not delete ${contentType}: ${error.message}\n`);
      }
    }

    console.log('🎉 Cleanup completed!\n');
    console.log('Next steps:');
    console.log('  1. Restart Strapi: npm run develop');
    console.log('  2. Re-run seed script: npm run seed:about');
    console.log('  OR manually create content via admin panel\n');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await cleanupAboutPages(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
