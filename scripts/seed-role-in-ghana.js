'use strict';

/**
 * Seed the Role in Ghana page
 */

async function seedRoleInGhanaPage(strapi) {
  console.log('🌱 Seeding Role in Ghana Page...\n');

  try {
    await strapi.documents('api::role-in-ghana-page.role-in-ghana-page').create({
      data: {
        hero_badge: 'About CUA Ghana',
        hero_title: 'Our Role in Ghana',
        hero_description: 'CUA Ghana serves as the apex body for credit unions nationwide, providing leadership, advocacy, and support services that strengthen the credit union movement and advance financial inclusion across Ghana.',

        core_roles_section_title: 'Core Responsibilities',
        core_roles_section_subtitle: 'As the apex body for credit unions in Ghana, we fulfill critical roles that strengthen the movement and support our members.',
        core_roles: [
          {
            icon: 'fa-bullseye',
            title: 'Advocacy & Representation',
            description: 'Representing credit unions at national and international forums, advocating for favorable policies and regulations that support the cooperative finance sector.',
            color_scheme: '#3b82f6'
          },
          {
            icon: 'fa-users',
            title: 'Capacity Building',
            description: 'Providing comprehensive training, education, and technical assistance to strengthen credit union operations, governance, and service delivery.',
            color_scheme: '#10b981'
          },
          {
            icon: 'fa-balance-scale',
            title: 'Standards & Compliance',
            description: 'Establishing industry standards and best practices to ensure sound, sustainable, and compliant credit union operations across Ghana.',
            color_scheme: '#f59e0b'
          },
          {
            icon: 'fa-handshake',
            title: 'Partnership Development',
            description: 'Building strategic partnerships with national and international organizations to support credit union growth and member services.',
            color_scheme: '#8b5cf6'
          }
        ],

        regulatory_title: 'Regulatory Authority',
        regulatory_description: 'CUA Ghana works closely with the Bank of Ghana and other regulatory bodies to ensure credit unions operate within established legal frameworks, maintaining financial stability and protecting member interests.',

        stat_credit_unions_supervised: '250+',
        stat_members_protected: '1.5M+',
        stat_years_of_oversight: '30+',

        services_section_title: 'Essential Services',
        services_section_subtitle: 'We provide comprehensive support services that enable credit unions to thrive and serve their members effectively.',
        services: [
          {
            icon: 'fa-graduation-cap',
            title: 'Training & Education',
            description: 'Comprehensive training programs for board members, management, and staff.'
          },
          {
            icon: 'fa-clipboard-check',
            title: 'Technical Assistance',
            description: 'Expert guidance on operations, governance, risk management, and compliance.'
          },
          {
            icon: 'fa-chart-bar',
            title: 'Performance Monitoring',
            description: 'Regular assessment and benchmarking to support continuous improvement.'
          },
          {
            icon: 'fa-tools',
            title: 'Innovation Support',
            description: 'Helping credit unions adopt new technologies and service delivery models.'
          }
        ],

        partnerships_section_title: 'Strategic Partnerships',
        partnerships_section_subtitle: 'We collaborate with leading organizations to strengthen the credit union movement and expand access to financial services.',
        partnerships: [
          {
            name: 'Global Credit Union Organizations',
            acronym: 'WOCCU/ACCOSCA',
            description: 'Partnerships with WOCCU, ACCOSCA, and other global credit union organizations.',
            icon: 'fa-globe'
          },
          {
            name: 'Government Agencies',
            acronym: 'BoG/MoF',
            description: 'Working with Bank of Ghana, Ministry of Finance, and other government agencies.',
            icon: 'fa-building'
          },
          {
            name: 'Development Organizations',
            acronym: 'GIZ/USAID',
            description: 'Collaborating with GIZ, USAID, and other development organizations.',
            icon: 'fa-hands-helping'
          }
        ],

        impact_title: 'Our Commitment to Ghana',
        impact_description: 'Through our leadership and support, we are committed to building a strong, sustainable credit union movement that serves all Ghanaians and contributes to national economic development.',

        impact_highlight_1_title: 'Financial Inclusion',
        impact_highlight_1_subtitle: 'Reaching the Underserved',
        impact_highlight_2_title: 'Economic Empowerment',
        impact_highlight_2_subtitle: 'Building Prosperity',
        impact_highlight_3_title: 'Sustainable Growth',
        impact_highlight_3_subtitle: 'Long-term Impact'
      }
    });

    console.log('✅ Role in Ghana Page seeded successfully!\n');

  } catch (error) {
    console.error('❌ Error seeding role in ghana page:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedRoleInGhanaPage(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
