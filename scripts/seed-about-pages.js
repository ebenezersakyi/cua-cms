'use strict';

async function seedAboutPages(strapi) {
  console.log('🌱 Starting About Pages seeding...\n');

  try {
    // 1. Seed Who We Are Page
    console.log('📝 Seeding Who We Are Page...');
    await strapi.documents('api::who-we-are-page.who-we-are-page').create({
      data: {
        // Hero Section
        hero_badge: 'About CUA Ghana',
        hero_title: 'Who We Are',
        hero_description: 'Pioneering Africa\'s cooperative financial movement since 1955, empowering communities through sustainable credit union services.',

        // Stats
        stat_founded_year: '1955',
        stat_years_of_service: '68+',
        stat_credit_unions: '500+',
        stat_members_served: '2M+',

        // Presidential Quote
        presidential_quote: 'You are doing a good service to Ghana and I encourage you to continue.',
        presidential_quote_author: 'President Dr. Francis Kwame Nkrumah',
        presidential_quote_context: 'To our Founding Father',

        // Timeline Section
        timeline_section_title: 'A Legacy of Service',
        timeline_section_subtitle: 'From humble beginnings to becoming Africa\'s pioneering credit union movement',
        timeline_events: [
          {
            year: '1955',
            title: 'The Beginning',
            description: 'First credit union in Africa formed at Jirapa in the North-West (now Upper West Region) by Rev. Father John McNulty, an Irish Canadian.',
            event_type: 'foundation'
          },
          {
            year: '1960',
            title: 'Episcopal Expansion',
            description: 'Bishop Dery encouraged formation of Credit Unions in all Parishes including Nandom, Kaleo, Ko, Daffiama, Wa, Lawra and Tumu.',
            event_type: 'milestone'
          },
          {
            year: '1960',
            title: 'Presidential Endorsement',
            description: 'President Dr. Francis Kwame Nkrumah endorsed the movement saying \'You are doing a good service to Ghana and I encourage you to continue.\'',
            event_type: 'presidential'
          },
          {
            year: '1967',
            title: 'Regional Unity',
            description: 'Credit Unions in the North united in a chapter, while southern Credit Unions joined for training programs and experience exchange.',
            event_type: 'milestone'
          },
          {
            year: '1968',
            title: 'National Association',
            description: 'Following a CUMA International meeting in Lesotho, the Ghana National Union and Thrift Association was born - forerunner of CUA Limited.',
            event_type: 'foundation'
          }
        ],

        // Mission & Vision
        mission_text: 'The Ghana Co-operative Credit Unions Association (CUA) Limited exists to promote and empower Credit Unions by offering high quality specialized financial and non-financial services to members.',
        vision_text: 'To be a Self-sustainable Model Apex Co-operative Financial Institution in Africa.',

        // Core Values
        core_values: [
          { icon: 'fa-users', title: 'Team-work', color: '#3b82f6' },
          { icon: 'fa-check-circle', title: 'Efficiency', color: '#10b981' },
          { icon: 'fa-bullseye', title: 'Member Focus', color: '#f59e0b' },
          { icon: 'fa-award', title: 'Professionalism', color: '#8b5cf6' },
          { icon: 'fa-shield-alt', title: 'Integrity', color: '#ef4444' },
          { icon: 'fa-lightbulb', title: 'Innovation', color: '#6366f1' }
        ],

        // Affiliations
        affiliations: [
          {
            acronym: 'ACCOSCA',
            full_name: 'African Confederation of Co-operative Savings and Credit Association',
            color_scheme: '#3b82f6'
          },
          {
            acronym: 'WOCCU',
            full_name: 'World Council of Credit Unions',
            color_scheme: '#10b981'
          }
        ]
      }
    });
    console.log('✅ Who We Are Page seeded successfully\n');

    // 2. Seed Potential and Size Page
    console.log('📝 Seeding Potential and Size Page...');
    await strapi.documents('api::potential-and-size-page.potential-and-size-page').create({
      data: {
        // Hero
        hero_badge: 'About CUA Ghana',
        hero_title: 'Potential & Size',
        hero_description: 'Discover the impressive scale and capabilities of Ghana\'s leading Credit Union umbrella organization, serving nearly one million members nationwide.',

        // Capabilities
        capabilities_section_title: 'Organizational Strength',
        capabilities_section_subtitle: 'CUA\'s comprehensive capabilities enable effective leadership and support for Ghana\'s entire Credit Union sector',
        capabilities: [
          {
            icon: 'fa-users',
            title: 'Unifying Force',
            description: 'CUA serves as the unifying force of all credit unions in the country, able to meet with any organized body on issues affecting primary societies.',
            color_scheme: '#3b82f6'
          },
          {
            icon: 'fa-shield-alt',
            title: 'Regulatory Authority',
            description: 'As a mother body, CUA regulates and supervises credit union activities, with authority to sanction non-conforming institutions.',
            color_scheme: '#10b981'
          },
          {
            icon: 'fa-balance-scale',
            title: 'Competitive Rates',
            description: 'CUA offers the lowest interest rates in the financial market on loans contracted by its members, ensuring affordability.',
            color_scheme: '#f59e0b'
          },
          {
            icon: 'fa-cogs',
            title: 'Comprehensive Departments',
            description: 'Various specialized departments operate to sustain all credit unions while promoting their image and efficient resource management.',
            color_scheme: '#8b5cf6'
          }
        ],

        // Key Stats
        stats_section_title: 'Our Scale & Reach',
        stats_section_subtitle: 'Impressive statistics that demonstrate CUA\'s significant impact across Ghana\'s financial landscape',
        key_stats: [
          {
            icon: 'fa-users',
            number: '984,034',
            label: 'Total Membership',
            description: 'Active members across all Credit Unions',
            color: '#3b82f6'
          },
          {
            icon: 'fa-building',
            number: '490',
            label: 'Number of CUs',
            description: 'Credit Unions nationwide',
            color: '#10b981'
          },
          {
            icon: 'fa-home',
            number: '11',
            label: 'Regional Offices',
            description: 'Plus Head Office in Accra',
            color: '#f59e0b'
          },
          {
            icon: 'fa-clipboard-list',
            number: '4,250',
            label: 'No. of Employees',
            description: 'Across all Credit Union operations',
            color: '#8b5cf6'
          }
        ],

        // Financial Stats
        financial_section_title: 'Financial Performance',
        financial_section_subtitle: 'Robust financial indicators demonstrating the collective strength of Ghana\'s Credit Union movement',
        data_source: '22nd CUA Educational & Biennial Conference Report, June 2022',
        financial_stats: [
          {
            icon: 'fa-piggy-bank',
            amount: '2198364372',
            label: 'Member Deposits',
            sublabel: '(Shares and Savings)',
            color_scheme: '#3b82f6'
          },
          {
            icon: 'fa-hand-holding-usd',
            amount: '1216757103',
            label: 'Loans Outstanding',
            sublabel: 'Active lending portfolio',
            color_scheme: '#10b981'
          },
          {
            icon: 'fa-chart-pie',
            amount: '2698135823',
            label: 'Total Assets',
            sublabel: 'Combined asset base',
            color_scheme: '#f59e0b'
          },
          {
            icon: 'fa-wallet',
            amount: '957100000',
            label: 'Liquidity Levels',
            sublabel: 'Available liquid funds',
            color_scheme: '#8b5cf6'
          }
        ],

        // Milestones
        milestones: [
          {
            year: '1955',
            title: 'First Credit Union Founded',
            description: 'The beginning of Ghana\'s credit union movement'
          },
          {
            year: '1968',
            title: 'CUA Foundation',
            description: 'Establishment of the umbrella organization'
          },
          {
            year: '2022',
            title: '22nd Educational Conference',
            description: 'Latest comprehensive report and data'
          }
        ],

        // Market Leadership
        leadership_title: 'Market Leadership',
        leadership_description: 'CUA Ghana offers the lowest interest rates in the financial market on loans contracted by its members, while maintaining comprehensive departments that promote the image of all credit unions and educate primary societies on good customer care and efficient resource management.',
        leadership_highlight_1_title: 'Lowest Rates',
        leadership_highlight_1_subtitle: 'In Financial Market',
        leadership_highlight_2_title: '116',
        leadership_highlight_2_subtitle: 'CUA Employees',
        leadership_highlight_3_title: 'Nationwide',
        leadership_highlight_3_subtitle: 'Coverage'
      }
    });
    console.log('✅ Potential and Size Page seeded successfully\n');

    // 3. Seed Board of Directors Page
    console.log('📝 Seeding Board of Directors Page...');
    await strapi.documents('api::board-of-directors-page.board-of-directors-page').create({
      data: {
        hero_badge: 'Leadership',
        hero_title: 'Board of Directors',
        hero_description: 'Meet the distinguished leaders guiding CUA Ghana\'s strategic vision and ensuring excellence in cooperative financial services across the nation.',
        board_section_title: 'Experienced Leadership',
        board_section_subtitle: 'Our Board of Directors brings together decades of experience in cooperative finance, business leadership, and community development to guide CUA Ghana\'s strategic direction.'
      }
    });
    console.log('✅ Board of Directors Page seeded successfully\n');
    console.log('ℹ️  Note: Add board members via Content Manager → Board Members collection\n');

    // 4. Seed Management Page
    console.log('📝 Seeding Management Page...');
    await strapi.documents('api::management-page.management-page').create({
      data: {
        hero_badge: 'Leadership',
        hero_title: 'Management Team',
        hero_description: 'Meet the experienced professionals leading CUA Ghana\'s operations and driving our mission to empower communities through cooperative financial services.',
        executive_section_title: 'Executive Leadership',
        executive_section_subtitle: 'Our executive team brings together decades of experience in cooperative finance, strategic leadership, and organizational excellence to guide CUA Ghana\'s vision.',
        department_section_title: 'Heads of Departments',
        department_section_subtitle: 'Department leaders ensuring operational excellence across all areas of our organization.',
        philosophy_title: 'Leadership Excellence',
        philosophy_description: 'Our management team is committed to fostering innovation, maintaining operational excellence, and ensuring that CUA Ghana remains at the forefront of cooperative financial services in Africa.',
        stat_years_experience: '25+',
        stat_credit_unions_managed: '500+',
        stat_members_served: '2M+'
      }
    });
    console.log('✅ Management Page seeded successfully\n');
    console.log('ℹ️  Note: Add management team members via Content Manager → Management Team collection\n');

    // 5. Seed Partners Page
    console.log('📝 Seeding Partners Page...');
    await strapi.documents('api::partners-page.partners-page').create({
      data: {
        hero_badge: 'About CUA Ghana',
        hero_title: 'Our Partners',
        hero_description: 'Building strong partnerships to advance the credit union movement and create lasting impact for communities across Ghana and beyond.',
        partners: [
          {
            name: 'ACCOSCA',
            full_name: 'African Confederation of Co-operative Savings and Credit Association',
            description: 'Regional confederation promoting cooperative savings and credit associations across Africa, fostering financial inclusion and cooperative development.',
            type: 'Regional Network',
            established: '1968',
            focus_areas: 'Financial inclusion, cooperative development, capacity building',
            website: 'https://www.accosca.org'
          },
          {
            name: 'CCA',
            full_name: 'Co-operative Credit Association',
            description: 'Strategic partner in advancing cooperative credit principles and supporting member institutions across the region.',
            type: 'Trade Association',
            established: '',
            focus_areas: 'Cooperative principles, member support, advocacy',
            website: 'https://www.cca.coop'
          },
          {
            name: 'GIZ',
            full_name: 'Deutsche Gesellschaft für Internationale Zusammenarbeit',
            description: 'German development cooperation agency supporting sustainable development and capacity building in the cooperative sector.',
            type: 'Development Partner',
            established: '1975',
            focus_areas: 'Sustainable development, capacity building, institutional strengthening',
            website: 'https://www.giz.de'
          },
          {
            name: 'ILCU',
            full_name: 'Irish League of Credit Unions',
            description: 'Providing technical expertise and knowledge sharing to strengthen credit union operations and governance.',
            type: 'Technical Partner',
            established: '1960',
            focus_areas: 'Technical expertise, governance, operations',
            website: 'https://www.creditunion.ie'
          },
          {
            name: 'KAD',
            full_name: 'KAD Associates',
            description: 'Professional services partner providing specialized consulting and capacity building support for credit unions.',
            type: 'Consulting Partner',
            established: '',
            focus_areas: 'Consulting, capacity building, professional services',
            website: 'https://www.kadassociates.com'
          },
          {
            name: 'SEND',
            full_name: 'Social Enterprise Development Partnerships',
            description: 'Supporting social enterprise development and community-based financial services across Ghana.',
            type: 'Development Partner',
            established: '',
            focus_areas: 'Social enterprise, community development, financial services',
            website: 'https://www.sendwestafrica.org'
          },
          {
            name: 'Sparkassenstiftung',
            full_name: 'Sparkassenstiftung für internationale Kooperation',
            description: 'German foundation promoting financial sector development and microfinance institutions worldwide.',
            type: 'Foundation',
            established: '1992',
            focus_areas: 'Financial sector development, microfinance, institutional strengthening',
            website: 'https://www.sparkassenstiftung.de'
          },
          {
            name: 'WOCCU',
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
    console.log('✅ Partners Page seeded successfully\n');

    console.log('🎉 About Pages seeding completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('  1. Upload hero images for each page via Content Manager');
    console.log('  2. Add board members via Board Members collection');
    console.log('  3. Add management team members via Management Team collection');
    console.log('  4. Upload partner logos for Partners page');
    console.log('  5. Upload presidential quote image for Who We Are page\n');

  } catch (error) {
    console.error('❌ Error seeding about pages:', error);
    console.error(error.stack);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedAboutPages(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
