'use strict';

async function addMissingPartners() {
  const partners = [
    {
      name: "ACCOSCA",
      slug: "accosca",
      description: "<p>African Confederation of Co-operative Savings and Credit Association - The apex organization for credit union movements in Africa.</p>",
      website: "https://www.accosca.org",
      partnershipType: "International",
      isActive: true,
      displayOrder: 1
    },
    {
      name: "WOCCU",
      slug: "woccu",
      description: "<p>World Council of Credit Unions - Global trade association and development agency for credit unions.</p>",
      website: "https://www.woccu.org",
      partnershipType: "International",
      isActive: true,
      displayOrder: 8
    }
  ];

  // Find the logo files
  const accocsaLogo = await strapi.query('plugin::upload.file').findOne({
    where: { name: 'accosca' }
  });

  const woccuLogo = await strapi.query('plugin::upload.file').findOne({
    where: { name: 'woccu' }
  });

  // Create ACCOSCA
  if (accocsaLogo) {
    try {
      await strapi.documents('api::partner.partner').create({
        data: {
          ...partners[0],
          logo: accocsaLogo.id,
          publishedAt: new Date()
        }
      });
      console.log('✅ Created ACCOSCA partner');
    } catch (error) {
      console.log('ℹ️  ACCOSCA may already exist:', error.message);
    }
  }

  // Create WOCCU
  if (woccuLogo) {
    try {
      await strapi.documents('api::partner.partner').create({
        data: {
          ...partners[1],
          logo: woccuLogo.id,
          publishedAt: new Date()
        }
      });
      console.log('✅ Created WOCCU partner');
    } catch (error) {
      console.log('ℹ️  WOCCU may already exist:', error.message);
    }
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await addMissingPartners();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
