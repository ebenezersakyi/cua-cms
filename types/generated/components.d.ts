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

export interface ElementsDetailedStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_detailed_steps';
  info: {
    description: 'Individual detailed step with sub-items';
    displayName: 'Detailed Step';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'fa-arrow-right'>;
    image: Schema.Attribute.Media<'images'>;
    stepNumber: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsDocumentRequirement extends Struct.ComponentSchema {
  collectionName: 'components_elements_document_requirements';
  info: {
    description: 'Individual document requirement';
    displayName: 'Document Requirement';
    icon: 'file';
  };
  attributes: {
    applicableTo: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-file'>;
    isRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsEligibilityType extends Struct.ComponentSchema {
  collectionName: 'components_elements_eligibility_types';
  info: {
    description: 'Individual eligibility type';
    displayName: 'Eligibility Type';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    examples: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-user'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_items';
  info: {
    description: 'Individual FAQ question and answer';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFeeItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_fee_items';
  info: {
    description: 'Individual fee item';
    displayName: 'Fee Item';
    icon: 'dollar';
  };
  attributes: {
    amount: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    frequency: Schema.Attribute.Enumeration<
      ['One-time', 'Monthly', 'Quarterly', 'Annually']
    > &
      Schema.Attribute.DefaultTo<'One-time'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMembershipType extends Struct.ComponentSchema {
  collectionName: 'components_elements_membership_types';
  info: {
    description: 'Individual membership type option';
    displayName: 'Membership Type';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    features: Schema.Attribute.RichText;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-user'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_process_steps';
  info: {
    description: 'Individual process step';
    displayName: 'Process Step';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'fa-arrow-right'>;
    stepNumber: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsRequirementItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_requirement_items';
  info: {
    description: 'Individual requirement item';
    displayName: 'Requirement Item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'fa-check-circle'>;
    isRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsStoryCategory extends Struct.ComponentSchema {
  collectionName: 'components_elements_story_categories';
  info: {
    description: 'Individual story category item';
    displayName: 'Story Category';
    icon: 'folder';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#003366'>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-folder'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SectionsDetailedSteps extends Struct.ComponentSchema {
  collectionName: 'components_sections_detailed_steps';
  info: {
    description: 'Steps section with detailed lists';
    displayName: 'Detailed Steps';
    icon: 'listOl';
  };
  attributes: {
    steps: Schema.Attribute.Component<'elements.detailed-step', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDocumentationRequirements
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_documentation_requirements';
  info: {
    description: 'Required documentation section';
    displayName: 'Documentation Requirements';
    icon: 'file';
  };
  attributes: {
    description: Schema.Attribute.Text;
    documents: Schema.Attribute.Component<
      'elements.document-requirement',
      true
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Required Documents'>;
  };
}

export interface SectionsDualCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_dual_ctas';
  info: {
    description: 'Section with two call-to-action buttons';
    displayName: 'Dual CTA';
    icon: 'cursor';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    primaryCtaLink: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCtaText: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryCtaLink: Schema.Attribute.String;
    secondaryCtaText: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsEligibilityTypes extends Struct.ComponentSchema {
  collectionName: 'components_sections_eligibility_types';
  info: {
    description: 'Different eligibility types for joining';
    displayName: 'Eligibility Types';
    icon: 'users';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Who Can Join?'>;
    types: Schema.Attribute.Component<'elements.eligibility-type', true>;
  };
}

export interface SectionsFaqAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_accordions';
  info: {
    description: 'FAQ section with accordion items';
    displayName: 'FAQ Accordion';
    icon: 'question';
  };
  attributes: {
    description: Schema.Attribute.Text;
    faqs: Schema.Attribute.Component<'elements.faq-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Frequently Asked Questions'>;
  };
}

export interface SectionsFeeStructureTable extends Struct.ComponentSchema {
  collectionName: 'components_sections_fee_structure_tables';
  info: {
    description: 'Table showing fee structure';
    displayName: 'Fee Structure Table';
    icon: 'dollar';
  };
  attributes: {
    description: Schema.Attribute.Text;
    feeItems: Schema.Attribute.Component<'elements.fee-item', true>;
    note: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Fee Structure'>;
  };
}

export interface SectionsHeroSimple extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_simples';
  info: {
    description: 'Simple hero section with title and subtitle';
    displayName: 'Hero Simple';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHeroWithCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_with_ctas';
  info: {
    description: 'Hero section with title, subtitle, description, background image, and CTA button';
    displayName: 'Hero with CTA';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    secondaryCtaLink: Schema.Attribute.String;
    secondaryCtaText: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsIconBenefitsGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_icon_benefits_grids';
  info: {
    description: 'Grid of benefits with icons';
    displayName: 'Icon Benefits Grid';
    icon: 'grid';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'shared.benefit-card', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsIntroWithStats extends Struct.ComponentSchema {
  collectionName: 'components_sections_intro_with_stats';
  info: {
    description: 'Introduction text with statistics';
    displayName: 'Intro with Stats';
    icon: 'chartLine';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'shared.impact-stat', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsMemberTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_member_testimonials';
  info: {
    description: 'Member testimonials section configuration';
    displayName: 'Member Testimonials';
    icon: 'quote';
  };
  attributes: {
    description: Schema.Attribute.Text;
    displayLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    showFeaturedOnly: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'What Our Members Say'>;
  };
}

export interface SectionsMembershipTypes extends Struct.ComponentSchema {
  collectionName: 'components_sections_membership_types';
  info: {
    description: 'Different types of membership offered';
    displayName: 'Membership Types';
    icon: 'users';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Membership Types'>;
    types: Schema.Attribute.Component<'elements.membership-type', true>;
  };
}

export interface SectionsNumberedSteps extends Struct.ComponentSchema {
  collectionName: 'components_sections_numbered_steps';
  info: {
    description: 'Process steps with numbers';
    displayName: 'Numbered Steps';
    icon: 'listOl';
  };
  attributes: {
    description: Schema.Attribute.Text;
    steps: Schema.Attribute.Component<'elements.process-step', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'How It Works'>;
  };
}

export interface SectionsRequirementsList extends Struct.ComponentSchema {
  collectionName: 'components_sections_requirements_lists';
  info: {
    description: 'List of requirements with icons';
    displayName: 'Requirements List';
    icon: 'listCheck';
  };
  attributes: {
    description: Schema.Attribute.Text;
    requirements: Schema.Attribute.Component<'elements.requirement-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Requirements'>;
  };
}

export interface SectionsStoryCategories extends Struct.ComponentSchema {
  collectionName: 'components_sections_story_categories';
  info: {
    description: 'Success story categories section';
    displayName: 'Story Categories';
    icon: 'grid';
  };
  attributes: {
    categories: Schema.Attribute.Component<'elements.story-category', true>;
    description: Schema.Attribute.Text;
    showAllStoriesLink: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Stories by Category'>;
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

export interface SharedBenefitCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_benefit_cards';
  info: {
    description: 'Benefits/Features card for join section';
    displayName: 'Benefit Card';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'fa-check-circle'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCoreValue extends Struct.ComponentSchema {
  collectionName: 'components_shared_core_values';
  info: {
    description: 'Organization core value item';
    displayName: 'Core Value';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-star'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    description: 'Footer navigation column with links';
    displayName: 'Footer Column';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.footer-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    description: 'Individual footer navigation link';
    displayName: 'Footer Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedImpactStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_impact_stats';
  info: {
    description: 'Statistical data for impact section';
    displayName: 'Impact Statistic';
    icon: 'chartLine';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-chart-line'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    prefix: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media link configuration';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'fa-link'>;
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'WhatsApp']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTickerMessage extends Struct.ComponentSchema {
  collectionName: 'components_shared_ticker_messages';
  info: {
    description: 'Individual ticker message for news ticker';
    displayName: 'Ticker Message';
    icon: 'bullhorn';
  };
  attributes: {
    endDate: Schema.Attribute.DateTime;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    link: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    priority: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    startDate: Schema.Attribute.DateTime;
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
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
      'elements.detailed-step': ElementsDetailedStep;
      'elements.document-requirement': ElementsDocumentRequirement;
      'elements.eligibility-type': ElementsEligibilityType;
      'elements.faq-item': ElementsFaqItem;
      'elements.fee-item': ElementsFeeItem;
      'elements.membership-type': ElementsMembershipType;
      'elements.process-step': ElementsProcessStep;
      'elements.requirement-item': ElementsRequirementItem;
      'elements.story-category': ElementsStoryCategory;
      'homepage.about-section': HomepageAboutSection;
      'homepage.join-us-section': HomepageJoinUsSection;
      'homepage.statistic': HomepageStatistic;
      'hours.business-hours': HoursBusinessHours;
      'impact.impact-metric': ImpactImpactMetric;
      'location.gps-location': LocationGpsLocation;
      'sections.detailed-steps': SectionsDetailedSteps;
      'sections.documentation-requirements': SectionsDocumentationRequirements;
      'sections.dual-cta': SectionsDualCta;
      'sections.eligibility-types': SectionsEligibilityTypes;
      'sections.faq-accordion': SectionsFaqAccordion;
      'sections.fee-structure-table': SectionsFeeStructureTable;
      'sections.hero-simple': SectionsHeroSimple;
      'sections.hero-with-cta': SectionsHeroWithCta;
      'sections.icon-benefits-grid': SectionsIconBenefitsGrid;
      'sections.intro-with-stats': SectionsIntroWithStats;
      'sections.member-testimonials': SectionsMemberTestimonials;
      'sections.membership-types': SectionsMembershipTypes;
      'sections.numbered-steps': SectionsNumberedSteps;
      'sections.requirements-list': SectionsRequirementsList;
      'sections.story-categories': SectionsStoryCategories;
      'service.service-item': ServiceServiceItem;
      'shared.benefit-card': SharedBenefitCard;
      'shared.core-value': SharedCoreValue;
      'shared.footer-column': SharedFooterColumn;
      'shared.footer-link': SharedFooterLink;
      'shared.impact-stat': SharedImpactStat;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social-link': SharedSocialLink;
      'shared.ticker-message': SharedTickerMessage;
      'site-settings.social-media': SiteSettingsSocialMedia;
      'ticker.ticker-message': TickerTickerMessage;
    }
  }
}
