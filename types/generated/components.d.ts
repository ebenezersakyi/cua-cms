import type { Schema, Struct } from '@strapi/strapi';

export interface AboutCoreValue extends Struct.ComponentSchema {
  collectionName: 'components_about_core_values';
  info: {
    description: 'Core value item';
    displayName: 'Core Value';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomepageAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_about_sections';
  info: {
    description: 'Homepage about section';
    displayName: 'About Section';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface HomepageJoinUsSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_join_us_sections';
  info: {
    description: 'Homepage join us section';
    displayName: 'Join Us Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomepageStatistic extends Struct.ComponentSchema {
  collectionName: 'components_homepage_statistics';
  info: {
    description: 'Homepage statistic';
    displayName: 'Statistic';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface HoursBusinessHours extends Struct.ComponentSchema {
  collectionName: 'components_hours_business_hours';
  info: {
    description: 'Weekly business hours';
    displayName: 'Business Hours';
  };
  attributes: {
    friday: Schema.Attribute.String;
    monday: Schema.Attribute.String;
    saturday: Schema.Attribute.String;
    sunday: Schema.Attribute.String;
    thursday: Schema.Attribute.String;
    tuesday: Schema.Attribute.String;
    wednesday: Schema.Attribute.String;
  };
}

export interface ImpactImpactMetric extends Struct.ComponentSchema {
  collectionName: 'components_impact_impact_metrics';
  info: {
    description: 'Impact measurement';
    displayName: 'Impact Metric';
  };
  attributes: {
    metricName: Schema.Attribute.String;
    metricValue: Schema.Attribute.String;
  };
}

export interface LocationGpsLocation extends Struct.ComponentSchema {
  collectionName: 'components_location_gps_locations';
  info: {
    description: 'GPS coordinates';
    displayName: 'GPS Location';
  };
  attributes: {
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
  };
}

export interface ServiceServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_service_service_items';
  info: {
    description: 'Service offered';
    displayName: 'Service Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    serviceName: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SiteSettingsSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_site_settings_social_medias';
  info: {
    description: 'Social media links';
    displayName: 'Social Media';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface TickerTickerMessage extends Struct.ComponentSchema {
  collectionName: 'components_ticker_ticker_messages';
  info: {
    description: 'Scrolling ticker message';
    displayName: 'Ticker Message';
  };
  attributes: {
    icon: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.core-value': AboutCoreValue;
      'homepage.about-section': HomepageAboutSection;
      'homepage.join-us-section': HomepageJoinUsSection;
      'homepage.statistic': HomepageStatistic;
      'hours.business-hours': HoursBusinessHours;
      'impact.impact-metric': ImpactImpactMetric;
      'location.gps-location': LocationGpsLocation;
      'service.service-item': ServiceServiceItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'site-settings.social-media': SiteSettingsSocialMedia;
      'ticker.ticker-message': TickerTickerMessage;
    }
  }
}
