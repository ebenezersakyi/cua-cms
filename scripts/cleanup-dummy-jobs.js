'use strict';

/**
 * Cleanup dummy job vacancies and reset featured jobs
 */

async function cleanupDummyJobs(strapi) {
  console.log('🧹 Cleaning up dummy job data...\n');

  try {
    // List of dummy job titles from the seed script
    const dummyJobTitles = [
      'Senior Financial Analyst',
      'Training Coordinator',
      'IT Support Specialist',
      'Compliance Officer',
      'Marketing & Communications Intern'
    ];

    // Delete dummy jobs
    console.log('🗑️  Removing dummy job vacancies...');

    for (const title of dummyJobTitles) {
      const deleted = await strapi.db.query('api::job-vacancy.job-vacancy').deleteMany({
        where: { title }
      });
      if (deleted.count > 0) {
        console.log(`   ✅ Deleted: ${title}`);
      }
    }

    // Clear featured jobs from careers page
    console.log('\n📄 Clearing featured jobs from careers page...');

    const careersPage = await strapi.db.query('api::careers-page.careers-page').findOne({});

    if (careersPage) {
      await strapi.db.query('api::careers-page.careers-page').update({
        where: { id: careersPage.id },
        data: {
          featuredJobs: []
        }
      });
      console.log('   ✅ Featured jobs cleared');
    }

    // Show remaining jobs
    const remainingJobs = await strapi.db.query('api::job-vacancy.job-vacancy').findMany({});
    console.log(`\n📋 Remaining job vacancies (${remainingJobs.length}):`);
    remainingJobs.forEach(job => {
      console.log(`   - ${job.title} (ID: ${job.id})`);
    });

    console.log('\n✅ Cleanup completed!');

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

  await cleanupDummyJobs(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
