'use strict';

/**
 * Re-seed just the Partners page to add logo field
 */

async function reseedPartnersPage(strapi) {
  console.log('🔄 Re-seeding Partners Page...\n');

  try {
    // 1. Delete existing partners page
    console.log('🗑️  Deleting existing Partners page...');
    const existing = await strapi.documents('api::partners-page.partners-page').findMany();

    if (existing && existing.length > 0) {
      for (const entry of existing) {
        await strapi.documents('api::partners-page.partners-page').delete({
          documentId: entry.documentId
        });
      }
      console.log('✅ Deleted old Partners page\n');
    }

    // 2. Create new partners page with logo field
    console.log('📝 Creating Partners page with logo field...');
    await strapi.documents('api::partners-page.partners-page').create({
      data: {
        hero_badge: 'About CUA Ghana',
        hero_title: 'Our Partners',
        hero_description: 'Building strong partnerships to advance the credit union movement and create lasting impact for communities across Ghana and beyond.',
        partners: [
          {
            name: 'ACCOSCA',
            logo: null,
            full_name: 'African Confederation of Co-operative Savings and Credit Association',
            description: 'Regional confederation promoting cooperative savings and credit associations across Africa, fostering financial inclusion and cooperative development.',
            type: 'Regional Network',
            established: '1968',
            focus_areas: 'Financial inclusion, cooperative development, capacity building',
            website: 'https://www.accosca.org'
          },
          {
            name: 'CCA',
            logo: null,
            full_name: 'Co-operative Credit Association',
            description: 'Strategic partner in advancing cooperative credit principles and supporting member institutions across the region.',
            type: 'Trade Association',
            established: '',
            focus_areas: 'Cooperative principles, member support, advocacy',
            website: 'https://www.cca.coop'
          },
          {
            name: 'GIZ',
            logo: null,
            full_name: 'Deutsche Gesellschaft für Internationale Zusammenarbeit',
            description: 'German development cooperation agency supporting sustainable development and capacity building in the cooperative sector.',
            type: 'Development Partner',
            established: '1975',
            focus_areas: 'Sustainable development, capacity building, institutional strengthening',
            website: 'https://www.giz.de'
          },
          {
            name: 'ILCU',
            logo: null,
            full_name: 'Irish League of Credit Unions',
            description: 'Providing technical expertise and knowledge sharing to strengthen credit union operations and governance.',
            type: 'Technical Partner',
            established: '1960',
            focus_areas: 'Technical expertise, governance, operations',
            website: 'https://www.creditunion.ie'
          },
          {
            name: 'KAD',
            logo: null,
            full_name: 'KAD Associates',
            description: 'Professional services partner providing specialized consulting and capacity building support for credit unions.',
            type: 'Consulting Partner',
            established: '',
            focus_areas: 'Consulting, capacity building, professional services',
            website: 'https://www.kadassociates.com'
          },
          {
            name: 'SEND',
            logo: null,
            full_name: 'Social Enterprise Development Partnerships',
            description: 'Supporting social enterprise development and community-based financial services across Ghana.',
            type: 'Development Partner',
            established: '',
            focus_areas: 'Social enterprise, community development, financial services',
            website: 'https://www.sendwestafrica.org'
          },
          {
            name: 'Sparkassenstiftung',
            logo: null,
            full_name: 'Sparkassenstiftung für internationale Kooperation',
            description: 'German foundation promoting financial sector development and microfinance institutions worldwide.',
            type: 'Foundation',
            established: '1992',
            focus_areas: 'Financial sector development, microfinance, institutional strengthening',
            website: 'https://www.sparkassenstiftung.de'
          },
          {
            name: 'WOCCU',
            logo: null,
            full_name: 'World Council of Credit Unions',
            description: 'Global trade association and development organization for the international credit union movement.',
            type: 'Global Network',
            established: '1970',
            focus_areas: 'Global advocacy, development, technical assistance',
            website: 'https://www.woccu.org'
          }
        ],
        impact_title: 'Partnership Impact',
        impact_description: 'Through our strategic partnerships, we\'ve strengthened the credit union movement, enhanced member services, and created sustainable pathways for financial inclusion across Ghana and Africa.',
        stat_strategic_partners: '8+',
        stat_credit_unions_supported: '500+',
        stat_members_benefited: '2M+',
        stat_countries_reached: '15+'
      }
    });

    console.log('✅ Partners page re-seeded successfully!\n');
    console.log('📝 Next step: Upload partner logos via admin panel\n');

  } catch (error) {
    console.error('❌ Error re-seeding partners page:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await reseedPartnersPage(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
