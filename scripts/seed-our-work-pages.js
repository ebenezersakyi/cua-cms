'use strict';

/**
 * Seed Our Work pages with initial data
 */

async function seedOurWorkPages(strapi) {
  console.log('🌱 Starting Our Work pages seeding...\n');

  try {
    // 1. Seed What We Do Page
    console.log('📝 Seeding What We Do Page...');
    await strapi.documents('api::what-we-do-page.what-we-do-page').create({
      data: {
        hero_badge: 'Our Work',
        hero_title: 'What We Do',
        hero_description: 'Supporting Credit Unions across Ghana through comprehensive services, training, and strategic initiatives that strengthen the cooperative finance movement and promote financial inclusion for all.',
        services: [
          {
            icon: 'FiBookOpen',
            title: 'Training And Education',
            category: 'Capacity Building',
            description: 'Comprehensive training programs for credit union staff, board members, and volunteers.',
            detailed_description: 'We run training programs designed to enhance the skills and knowledge of credit union personnel. Our courses cover financial management, governance, customer service, and operational excellence to ensure credit unions deliver quality services to their members.',
            key_features: 'Financial management training\nLeadership development workshops\nCustomer service skills\nGovernance and compliance training',
            color_scheme: '#3B82F6',
            stat_1_label: 'programs',
            stat_1_value: '50+',
            stat_2_label: 'participants',
            stat_2_value: '2,000+'
          },
          {
            icon: 'FiShield',
            title: 'Auditing',
            category: 'Financial Oversight',
            description: 'Professional auditing services to ensure financial integrity and regulatory compliance.',
            detailed_description: 'Our auditing department provides comprehensive internal and external audit services for credit unions. We help identify risks, improve controls, and ensure compliance with regulatory requirements while maintaining the highest standards of financial accountability.',
            key_features: 'Internal audit services\nExternal audit coordination\nRisk assessment\nCompliance reviews',
            color_scheme: '#10B981',
            stat_1_label: 'audits',
            stat_1_value: '120+',
            stat_2_label: 'CUs audited',
            stat_2_value: '85%'
          }
        ],
        cta_section_title: 'Ready to Learn More About Our Services?',
        cta_section_description: 'Contact us to discover how we can support your credit union with our comprehensive range of services and programs.'
      }
    });
    console.log('✅ What We Do Page seeded successfully\n');

    // 2. Seed Our Chapters Page
    console.log('📝 Seeding Our Chapters Page...');
    await strapi.documents('api::our-chapters-page.our-chapters-page').create({
      data: {
        hero_badge: 'Our Work',
        hero_title: 'Our Chapters',
        hero_description: 'Eleven regional chapters working together to strengthen credit unions across Ghana, serving communities from Accra to the Upper Regions with dedication and excellence.',
        overview_stat_1_value: '11',
        overview_stat_1_label: 'Regional Chapters',
        overview_stat_2_value: '500+',
        overview_stat_2_label: 'Credit Unions',
        overview_stat_3_value: '400K+',
        overview_stat_3_label: 'Total Members',
        overview_stat_4_value: '₵2B+',
        overview_stat_4_label: 'Combined Assets'
      }
    });
    console.log('✅ Our Chapters Page seeded successfully\n');

    console.log('✅ All Our Work pages seeded successfully!\n');

  } catch (error) {
    console.error('❌ Error seeding Our Work pages:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedOurWorkPages(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
