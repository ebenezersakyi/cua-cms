'use strict';

/**
 * Seed site settings with default configuration including color scheme
 */

async function seedSiteSettings(strapi) {
  console.log('🌱 Seeding site settings...\n');

  try {
    const siteSettingsData = {
      // Basic Site Information
      siteName: 'CUA Ghana',
      tagline: 'Empowering Communities Through Cooperation',

      // Contact Information
      contactEmail: 'info@cuaghana.com',
      contactPhone: '+233 302 678 343',
      contactPhoneSecondary: '+233 302 666 331',
      address: '31 Nortei Ababio Loop, Airport Residential Area',
      poBox: 'P.O. Box KN 2982',
      city: 'Accra',
      country: 'Ghana',

      // Footer
      footerAbout: 'Credit Union Association of Ghana (CUA) is the umbrella body for all Credit Unions in Ghana. We promote and strengthen the credit union movement through advocacy, capacity building, and strategic partnerships.',
      copyrightText: '© 2025 Credit Union Association Ghana. All rights reserved.',

      // SEO
      metaTitle: 'CUA Ghana - Credit Union Association of Ghana',
      metaDescription: 'The official umbrella body for all Credit Unions in Ghana. Promoting financial inclusion through cooperative financial services.',
      metaKeywords: 'credit union, Ghana, financial inclusion, cooperative banking, CUA Ghana, savings, loans, financial services',

      // Brand Colors
      primaryColor: '#007A3D',        // CUA Green
      secondaryColor: '#FFA500',      // Orange
      accentColor: '#0066CC',         // Blue

      // CTA Button Colors - Primary
      ctaBackgroundColor: '#007A3D',
      ctaTextColor: '#FFFFFF',
      ctaHoverBackgroundColor: '#005A2D',
      ctaHoverTextColor: '#FFFFFF',
      ctaBorderColor: '#007A3D',

      // CTA Button Colors - Secondary (Outline/Ghost buttons)
      secondaryCtaBackgroundColor: '#FFFFFF',
      secondaryCtaTextColor: '#007A3D',
      secondaryCtaHoverBackgroundColor: '#F5F5F5',
      secondaryCtaHoverTextColor: '#005A2D',
      secondaryCtaBorderColor: '#007A3D',

      // Text Colors
      headingTextColor: '#333333',    // Dark grey for headings
      bodyTextColor: '#666666',       // Medium grey for body text
      lightTextColor: '#999999',      // Light grey for muted text

      // Link Colors
      linkColor: '#0066CC',           // Blue
      linkHoverColor: '#0052A3',      // Darker blue

      // Status Colors
      successColor: '#28A745',        // Green
      warningColor: '#FFC107',        // Amber
      errorColor: '#DC3545',          // Red
      infoColor: '#17A2B8',           // Cyan

      // Background Colors
      backgroundColor: '#FFFFFF',      // White
      backgroundSecondaryColor: '#F8F9FA', // Light grey
      borderColor: '#E0E0E0',         // Border grey
    };

    // Check if site settings already exist
    const existingSettings = await strapi.db.query('api::site-setting.site-setting').findOne();

    if (existingSettings) {
      console.log('⚠️  Site settings already exist, updating with new color configuration...');

      // Update existing settings with color configuration
      await strapi.db.query('api::site-setting.site-setting').update({
        where: { id: existingSettings.id },
        data: siteSettingsData
      });

      console.log('✅ Site settings updated with color configuration');
    } else {
      // Create new site settings
      await strapi.db.query('api::site-setting.site-setting').create({
        data: siteSettingsData
      });

      console.log('✅ Site settings created with color configuration');
    }

    console.log('\n📊 Color Configuration Summary:');
    console.log('   Primary Color: #007A3D (CUA Green)');
    console.log('   Secondary Color: #FFA500 (Orange)');
    console.log('   Accent Color: #0066CC (Blue)');
    console.log('   CTA Colors: Background (#007A3D), Text (#FFFFFF)');
    console.log('   Hover Colors: Background (#005A2D), Text (#FFFFFF)');
    console.log('   Text Colors: Heading (#333333), Body (#666666), Light (#999999)');
    console.log('   Link Colors: Default (#0066CC), Hover (#0052A3)');
    console.log('   Status Colors: Success, Warning, Error, Info');
    console.log('   Background Colors: Primary (#FFFFFF), Secondary (#F8F9FA)');

  } catch (error) {
    console.error('❌ Error seeding site settings:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedSiteSettings(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});