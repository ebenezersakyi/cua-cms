'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const cuaData = require('../data/cua-seed-data.json');

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'cuaInitHasRun' });
  await pluginStore.set({ key: 'cuaInitHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // List of existing permissions for the public role
  const existingPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
    where: {
      role: publicRole.id,
    },
  });

  // Create a set of existing permission actions for quick lookup
  const existingActions = new Set(existingPermissions.map(p => p.action));

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];

  Object.keys(newPermissions).forEach((controller) => {
    const actions = newPermissions[controller];
    actions.forEach((action) => {
      const permissionAction = `api::${controller}.${controller}.${action}`;

      // Only create if it doesn't exist
      if (!existingActions.has(permissionAction)) {
        allPermissionsToCreate.push(
          strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: permissionAction,
              role: publicRole.id,
            },
          })
        );
      }
    });
  });

  await Promise.all(allPermissionsToCreate);
  console.log(`✅ Created ${allPermissionsToCreate.length} new public permissions`);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function getFileData(fileName, subFolder = '') {
  const filePath = subFolder
    ? path.join('public', 'images', subFolder, fileName)
    : path.join('public', 'images', fileName);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return null;
  }

  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: name,
          caption: name,
          name,
        },
      },
    });
}

async function checkFileExistsBeforeUpload(fileName, subFolder = '') {
  const fileNameNoExtension = fileName.replace(/\..*$/, '');

  // Check if file already exists in Strapi
  const existingFile = await strapi.query('plugin::upload.file').findOne({
    where: {
      name: fileNameNoExtension,
    },
  });

  if (existingFile) {
    console.log(`📁 File already exists: ${fileNameNoExtension}`);
    return existingFile;
  }

  // File doesn't exist, upload it
  const fileData = getFileData(fileName, subFolder);

  if (!fileData) {
    console.warn(`⚠️  Skipping upload for missing file: ${fileName}`);
    return null;
  }

  try {
    const [uploadedFile] = await uploadFile(fileData, fileNameNoExtension);
    console.log(`✅ Uploaded: ${fileNameNoExtension}`);
    return uploadedFile;
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.message);
    return null;
  }
}

async function createEntry({ model, entry, publish = true }) {
  try {
    const data = publish ? { ...entry, publishedAt: new Date() } : entry;

    await strapi.documents(`api::${model}.${model}`).create({
      data,
    });

    console.log(`✅ Created ${model}: ${entry.title || entry.name || entry.slug}`);
  } catch (error) {
    console.error(`❌ Error creating ${model}:`, error.message);
    console.error('Entry data:', JSON.stringify(entry, null, 2));
  }
}

async function importHeroSlides() {
  console.log('\n📸 Importing Hero Slides...');

  for (const slide of cuaData.heroSlides) {
    const backgroundImage = await checkFileExistsBeforeUpload(
      slide.backgroundImage,
      'hero'
    );

    if (!backgroundImage) {
      console.warn(`⚠️  Skipping hero slide due to missing image: ${slide.title}`);
      continue;
    }

    await createEntry({
      model: 'hero-slide',
      entry: {
        title: slide.title,
        subtext: slide.subtext,
        ctaText: slide.ctaText,
        ctaLink: slide.ctaLink,
        order: slide.order,
        isActive: slide.isActive,
        backgroundImage: backgroundImage.id,
      },
    });
  }
}

async function importNewsArticles() {
  console.log('\n📰 Importing News Articles...');

  for (const article of cuaData.newsArticles) {
    // For now, skip image upload for news articles since they don't exist
    // You can add placeholder images later
    await createEntry({
      model: 'news-article',
      entry: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        publishedDate: article.publishedDate,
        isTickerItem: article.isTickerItem,
        isFeatured: article.isFeatured,
        // featuredImage: will be added when images are available
      },
    });
  }
}

async function importEvents() {
  console.log('\n📅 Importing Events...');

  for (const event of cuaData.events) {
    // Try to use hero images as placeholders for events
    const imageFileName = event.featuredImage.replace('event-', '');
    let featuredImage = null;

    // Try to find a suitable image from hero folder
    if (imageFileName.includes('financial-literacy')) {
      featuredImage = await checkFileExistsBeforeUpload('hero1.jpg', 'hero');
    } else if (imageFileName.includes('agriculture')) {
      featuredImage = await checkFileExistsBeforeUpload('hero2.jpg', 'hero');
    } else if (imageFileName.includes('women-empowerment')) {
      featuredImage = await checkFileExistsBeforeUpload('hero3.jpg', 'hero');
    }

    await createEntry({
      model: 'event',
      entry: {
        title: event.title,
        slug: event.slug,
        shortDescription: event.shortDescription,
        description: event.description,
        eventDate: event.eventDate,
        category: event.category,
        status: event.status,
        isFeatured: event.isFeatured,
        featuredImage: featuredImage?.id || null,
      },
    });
  }
}

async function importPartners() {
  console.log('\n🤝 Importing Partners...');

  for (const partner of cuaData.partners) {
    const logo = await checkFileExistsBeforeUpload(
      partner.logo,
      'partners'
    );

    await createEntry({
      model: 'partner',
      entry: {
        name: partner.name,
        slug: partner.slug,
        description: partner.description,
        logo: logo?.id || null,
        website: partner.website || null,
        partnershipType: partner.partnershipType,
        isActive: partner.isActive,
        displayOrder: partner.displayOrder,
      },
    });
  }
}

async function importCreditUnions() {
  console.log('\n🏦 Importing Credit Unions...');

  for (const cu of cuaData.creditUnions) {
    await createEntry({
      model: 'credit-union',
      entry: {
        name: cu.name,
        slug: cu.slug,
        description: cu.description || null,
        region: cu.region,
        category: cu.category,
        grade: cu.grade || null,
        isTop20: cu.isTop20,
        ranking: cu.ranking || null,
        isActive: cu.isActive,
        isFeatured: cu.isFeatured || false,
      },
    });
  }
}

async function importSeedData() {
  console.log('\n🌱 Starting CUA Ghana data import...\n');

  // Set public permissions for all content types
  await setPublicPermissions({
    'hero-slide': ['find', 'findOne'],
    'news-article': ['find', 'findOne'],
    'event': ['find', 'findOne'],
    'partner': ['find', 'findOne'],
    'credit-union': ['find', 'findOne'],
    'board-member': ['find', 'findOne'],
    'management-team': ['find', 'findOne'],
    'chapter': ['find', 'findOne'],
    'training-course': ['find', 'findOne'],
    'training-schedule': ['find', 'findOne'],
    'download': ['find', 'findOne'],
    'photo-gallery': ['find', 'findOne'],
    'video-gallery': ['find', 'findOne'],
    'success-story': ['find', 'findOne'],
    'newsletter-subscription': ['create'],
    'contact-message': ['create'],
  });

  // Import all data
  await importHeroSlides();
  await importNewsArticles();
  await importEvents();
  await importPartners();
  await importCreditUnions();

  console.log('\n✨ Data import complete!\n');
}

async function seedCUAData() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('🚀 Setting up CUA Ghana CMS data...');
      await importSeedData();
      console.log('✅ Ready to go!');
    } catch (error) {
      console.log('❌ Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      '⚠️  Seed data has already been imported. Clear your database first to reimport.'
    );
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedCUAData();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
