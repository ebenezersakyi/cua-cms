import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutPageContentAboutPageContent
  extends Struct.SingleTypeSchema {
  collectionName: 'about_page_contents';
  info: {
    description: 'Content for About Us page';
    displayName: 'About Page Content';
    pluralName: 'about-page-contents';
    singularName: 'about-page-content';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    coreValues: Schema.Attribute.Component<'shared.core-value', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 8;
        },
        number
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaDescription: Schema.Attribute.Text;
    ctaPrimaryLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/credit-unions/join'>;
    ctaPrimaryText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Become a Member'>;
    ctaSecondaryLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/credit-unions'>;
    ctaSecondaryText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Find Credit Unions'>;
    ctaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Join the Movement'>;
    establishedYear: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<1968>;
    heroImage: Schema.Attribute.Media<'images'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Empowering Communities Through Cooperative Finance'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'About CUA Ghana'>;
    historyContent: Schema.Attribute.RichText;
    historyTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our History'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-page-content.about-page-content'
    > &
      Schema.Attribute.Private;
    missionStatement: Schema.Attribute.RichText;
    missionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Mission'>;
    potentialAndSizeContent: Schema.Attribute.RichText;
    potentialAndSizeTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Potential & Size'>;
    publishedAt: Schema.Attribute.DateTime;
    roleInGhanaContent: Schema.Attribute.RichText;
    roleInGhanaTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Role in Ghana'>;
    seoDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    seoTitle: Schema.Attribute.String;
    totalAssets: Schema.Attribute.String;
    totalCreditUnions: Schema.Attribute.Integer;
    totalMembers: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    valuesDescription: Schema.Attribute.Text;
    valuesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Core Values'>;
    visionStatement: Schema.Attribute.RichText;
    visionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Vision'>;
    whoWeAreContent: Schema.Attribute.RichText;
    whoWeAreTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Who We Are'>;
  };
}

export interface ApiAuthorAuthor extends Struct.CollectionTypeSchema {
  collectionName: 'authors';
  info: {
    description: 'Authors for news articles';
    displayName: 'Author';
    pluralName: 'authors';
    singularName: 'author';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bio: Schema.Attribute.RichText;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::author.author'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    news_articles: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-article.news-article'
    >;
    photo: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBoardMemberBoardMember extends Struct.CollectionTypeSchema {
  collectionName: 'board_members';
  info: {
    description: 'Board of Directors information';
    displayName: 'Board Member';
    pluralName: 'board-members';
    singularName: 'board-member';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    displayOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    linkedIn: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::board-member.board-member'
    > &
      Schema.Attribute.Private;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    qualifications: Schema.Attribute.RichText;
    responsibilities: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiChapterChapter extends Struct.CollectionTypeSchema {
  collectionName: 'chapters';
  info: {
    description: 'Regional CUA chapters information';
    displayName: 'Chapter';
    pluralName: 'chapters';
    singularName: 'chapter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activities: Schema.Attribute.RichText;
    address: Schema.Attribute.Text;
    chairperson: Schema.Attribute.String;
    chapterName: Schema.Attribute.String & Schema.Attribute.Required;
    coverImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    credit_unions: Schema.Attribute.Relation<
      'oneToMany',
      'api::credit-union.credit-union'
    >;
    creditUnionsCount: Schema.Attribute.Integer;
    description: Schema.Attribute.RichText;
    email: Schema.Attribute.Email;
    establishedYear: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::chapter.chapter'
    > &
      Schema.Attribute.Private;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.String & Schema.Attribute.Required;
    secretary: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'chapterName'> & Schema.Attribute.Required;
    totalMembers: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactMessageContactMessage
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_messages';
  info: {
    description: 'Store contact form submissions';
    displayName: 'Contact Message';
    pluralName: 'contact-messages';
    singularName: 'contact-message';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-message.contact-message'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    messageType: Schema.Attribute.Enumeration<
      ['General Inquiry', 'Support', 'Partnership', 'Training', 'Membership']
    >;
    phone: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    responseNote: Schema.Attribute.Text;
    status: Schema.Attribute.Enumeration<
      ['New', 'In Progress', 'Resolved', 'Archived']
    > &
      Schema.Attribute.DefaultTo<'New'>;
    subject: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCreditUnionCreditUnion extends Struct.CollectionTypeSchema {
  collectionName: 'credit_unions';
  info: {
    description: 'Directory of all credit unions in Ghana';
    displayName: 'Credit Union';
    pluralName: 'credit-unions';
    singularName: 'credit-union';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    chapter: Schema.Attribute.Relation<'manyToOne', 'api::chapter.chapter'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    district: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    establishedYear: Schema.Attribute.Integer;
    gpsCoordinates: Schema.Attribute.Component<'location.gps-location', false>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::credit-union.credit-union'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    memberCount: Schema.Attribute.Integer;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    openingHours: Schema.Attribute.Component<'hours.business-hours', false>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    region: Schema.Attribute.Enumeration<
      [
        'Greater Accra',
        'Ashanti',
        'Western',
        'Eastern',
        'Central',
        'Northern',
        'Upper East',
        'Upper West',
        'Volta',
        'Bono',
        'Bono East',
        'Ahafo',
        'Savannah',
        'North East',
        'Oti',
      ]
    >;
    services: Schema.Attribute.Component<'service.service-item', true>;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    totalAssets: Schema.Attribute.Decimal;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    website: Schema.Attribute.String;
  };
}

export interface ApiCreditUnionsJoinPageCreditUnionsJoinPage
  extends Struct.SingleTypeSchema {
  collectionName: 'credit_unions_join_pages';
  info: {
    description: 'Page content for Join a Credit Union page';
    displayName: 'Credit Unions Join Page';
    pluralName: 'credit-unions-join-pages';
    singularName: 'credit-unions-join-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaSection: Schema.Attribute.Component<'sections.dual-cta', false> &
      Schema.Attribute.Required;
    documentationSection: Schema.Attribute.Component<
      'sections.documentation-requirements',
      false
    > &
      Schema.Attribute.Required;
    eligibilitySection: Schema.Attribute.Component<
      'sections.eligibility-types',
      false
    > &
      Schema.Attribute.Required;
    faqSection: Schema.Attribute.Component<'sections.faq-accordion', false> &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'sections.hero-with-cta', false> &
      Schema.Attribute.Required;
    howToJoinSection: Schema.Attribute.Component<
      'sections.detailed-steps',
      false
    > &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::credit-unions-join-page.credit-unions-join-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whyJoinSection: Schema.Attribute.Component<
      'sections.icon-benefits-grid',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface ApiCreditUnionsMembersPageCreditUnionsMembersPage
  extends Struct.SingleTypeSchema {
  collectionName: 'credit_unions_members_pages';
  info: {
    description: 'Page content for Credit Unions - Members page';
    displayName: 'Credit Unions Members Page';
    pluralName: 'credit-unions-members-pages';
    singularName: 'credit-unions-members-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    benefitsSection: Schema.Attribute.Component<
      'sections.icon-benefits-grid',
      false
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaSection: Schema.Attribute.Component<'sections.dual-cta', false> &
      Schema.Attribute.Required;
    feesSection: Schema.Attribute.Component<
      'sections.fee-structure-table',
      false
    > &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'sections.hero-with-cta', false> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::credit-unions-members-page.credit-unions-members-page'
    > &
      Schema.Attribute.Private;
    membershipTypesSection: Schema.Attribute.Component<
      'sections.membership-types',
      false
    > &
      Schema.Attribute.Required;
    processSection: Schema.Attribute.Component<
      'sections.numbered-steps',
      false
    > &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    requirementsSection: Schema.Attribute.Component<
      'sections.requirements-list',
      false
    > &
      Schema.Attribute.Required;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    testimonialsSection: Schema.Attribute.Component<
      'sections.member-testimonials',
      false
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCreditUnionsSuccessStoriesPageCreditUnionsSuccessStoriesPage
  extends Struct.SingleTypeSchema {
  collectionName: 'credit_unions_success_stories_pages';
  info: {
    description: 'Page content for Credit Unions - Success Stories page';
    displayName: 'Credit Unions Success Stories Page';
    pluralName: 'credit-unions-success-stories-pages';
    singularName: 'credit-unions-success-stories-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    categoriesSection: Schema.Attribute.Component<
      'sections.story-categories',
      false
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaSection: Schema.Attribute.Component<'sections.dual-cta', false> &
      Schema.Attribute.Required;
    heroSection: Schema.Attribute.Component<'sections.hero-simple', false> &
      Schema.Attribute.Required;
    introSection: Schema.Attribute.Component<
      'sections.intro-with-stats',
      false
    > &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::credit-unions-success-stories-page.credit-unions-success-stories-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDownloadDownload extends Struct.CollectionTypeSchema {
  collectionName: 'downloads';
  info: {
    description: 'Downloadable resources, forms, and documents';
    displayName: 'Download';
    pluralName: 'downloads';
    singularName: 'download';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Annual Reports',
        'Forms',
        'Policies',
        'Publications',
        'Guidelines',
        'Templates',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    downloadCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    file: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    fileSize: Schema.Attribute.String;
    fileType: Schema.Attribute.String;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::download.download'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    requiresLogin: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventEvent extends Struct.CollectionTypeSchema {
  collectionName: 'events';
  info: {
    description: 'Manage events, programs, and initiatives';
    displayName: 'Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    capacity: Schema.Attribute.Integer;
    category: Schema.Attribute.Enumeration<
      [
        'Training',
        'Community',
        'Financial Literacy',
        'Agricultural',
        'Women Empowerment',
        'Other',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    eventDate: Schema.Attribute.Date & Schema.Attribute.Required;
    eventTime: Schema.Attribute.Time;
    featuredImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    gallery: Schema.Attribute.Media<'images', true>;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationDeadline: Schema.Attribute.Date;
    registrationLink: Schema.Attribute.String;
    relatedEvents: Schema.Attribute.Relation<'manyToMany', 'api::event.event'>;
    shortDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['Upcoming', 'Ongoing', 'Completed', 'Cancelled']
    > &
      Schema.Attribute.DefaultTo<'Upcoming'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeroSlideHeroSlide extends Struct.CollectionTypeSchema {
  collectionName: 'hero_slides';
  info: {
    description: 'Manage rotating hero carousel content on the homepage';
    displayName: 'Hero Slide';
    pluralName: 'hero-slides';
    singularName: 'hero-slide';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaLink: Schema.Attribute.String & Schema.Attribute.Required;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hero-slide.hero-slide'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    subtext: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomepageSettingHomepageSetting
  extends Struct.SingleTypeSchema {
  collectionName: 'homepage_settings';
  info: {
    description: 'Homepage-specific content and configuration';
    displayName: 'Homepage Settings';
    pluralName: 'homepage-settings';
    singularName: 'homepage-setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    aboutCtaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/about-us'>;
    aboutCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    aboutSectionContent: Schema.Attribute.RichText;
    aboutSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'About CUA Ghana'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    eventsCtaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/events'>;
    eventsCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View All Events'>;
    eventsSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Upcoming Events'>;
    heroSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Empowering Communities Through Cooperative Finance'>;
    heroTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Welcome to CUA Ghana'>;
    impactSectionDescription: Schema.Attribute.Text;
    impactSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Impact'>;
    impactStats: Schema.Attribute.Component<'shared.impact-stat', true>;
    joinBenefits: Schema.Attribute.Component<'shared.benefit-card', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    joinCtaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/credit-unions/join'>;
    joinCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Become a Member'>;
    joinSecondaryCtaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/credit-unions'>;
    joinSecondaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Find Credit Unions'>;
    joinSectionDescription: Schema.Attribute.RichText;
    joinSectionSubtitle: Schema.Attribute.Text;
    joinSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Join the Movement'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::homepage-setting.homepage-setting'
    > &
      Schema.Attribute.Private;
    newsCtaLink: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/news'>;
    newsCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View All News'>;
    newsSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Latest News & Updates'>;
    partnersSectionDescription: Schema.Attribute.Text;
    partnersSectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Partners'>;
    publishedAt: Schema.Attribute.DateTime;
    seoDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    seoTitle: Schema.Attribute.String;
    showPartnersSection: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiManagementTeamManagementTeam
  extends Struct.CollectionTypeSchema {
  collectionName: 'management_teams';
  info: {
    description: 'Management staff information';
    displayName: 'Management Team';
    pluralName: 'management-teams';
    singularName: 'management-team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    department: Schema.Attribute.Enumeration<
      [
        'Executive',
        'Finance',
        'Operations',
        'Training',
        'IT',
        'Marketing',
        'HR',
      ]
    >;
    displayOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    email: Schema.Attribute.Email;
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    linkedIn: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::management-team.management-team'
    > &
      Schema.Attribute.Private;
    phone: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    qualifications: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsArticleNewsArticle extends Struct.CollectionTypeSchema {
  collectionName: 'news_articles';
  info: {
    description: 'Manage news, announcements, and blog posts';
    displayName: 'News Article';
    pluralName: 'news-articles';
    singularName: 'news-article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.Relation<'manyToOne', 'api::author.author'>;
    category: Schema.Attribute.Relation<
      'manyToOne',
      'api::news-category.news-category'
    >;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    excerpt: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    featuredImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-article.news-article'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    readTime: Schema.Attribute.Integer;
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsCategoryNewsCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'news_categories';
  info: {
    description: 'Categories for news articles';
    displayName: 'News Category';
    pluralName: 'news-categories';
    singularName: 'news-category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-category.news-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    news_articles: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-article.news-article'
    >;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsletterSubscriptionNewsletterSubscription
  extends Struct.CollectionTypeSchema {
  collectionName: 'newsletter_subscriptions';
  info: {
    description: 'Email newsletter subscription management';
    displayName: 'Newsletter Subscription';
    pluralName: 'newsletter-subscriptions';
    singularName: 'newsletter-subscription';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    firstName: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    lastName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::newsletter-subscription.newsletter-subscription'
    > &
      Schema.Attribute.Private;
    preferences: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Struct.CollectionTypeSchema {
  collectionName: 'partners';
  info: {
    description: 'Organizational partners and collaborators';
    displayName: 'Partner';
    pluralName: 'partners';
    singularName: 'partner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.RichText;
    displayOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::partner.partner'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    partnershipType: Schema.Attribute.Enumeration<
      ['Strategic', 'Funding', 'Technical', 'Advocacy', 'International']
    >;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    startDate: Schema.Attribute.Date;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    website: Schema.Attribute.String;
  };
}

export interface ApiPhotoGalleryPhotoGallery
  extends Struct.CollectionTypeSchema {
  collectionName: 'photo_galleries';
  info: {
    description: 'Photo collections and albums';
    displayName: 'Photo Gallery';
    pluralName: 'photo-galleries';
    singularName: 'photo-gallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    albumName: Schema.Attribute.String & Schema.Attribute.Required;
    coverImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    event: Schema.Attribute.Relation<'manyToOne', 'api::event.event'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::photo-gallery.photo-gallery'
    > &
      Schema.Attribute.Private;
    photographer: Schema.Attribute.String;
    photos: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'albumName'> & Schema.Attribute.Required;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSiteSettingSiteSetting extends Struct.SingleTypeSchema {
  collectionName: 'site_settings';
  info: {
    description: 'Global site configuration and settings';
    displayName: 'Site Settings';
    pluralName: 'site-settings';
    singularName: 'site-setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Accra'>;
    contactEmail: Schema.Attribute.Email & Schema.Attribute.Required;
    contactPhone: Schema.Attribute.String & Schema.Attribute.Required;
    contactPhoneSecondary: Schema.Attribute.String;
    copyrightText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2025 Credit Union Association Ghana. All rights reserved.'>;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Ghana'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    favicon: Schema.Attribute.Media<'images'>;
    footerAbout: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    footerColumns: Schema.Attribute.Component<'shared.footer-column', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
    gaTrackingId: Schema.Attribute.String & Schema.Attribute.Private;
    gtmId: Schema.Attribute.String & Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::site-setting.site-setting'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaKeywords: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    poBox: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    siteName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'CUA Ghana'>;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
    tagline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Empowering Communities Through Cooperation'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSuccessStorySuccessStory
  extends Struct.CollectionTypeSchema {
  collectionName: 'success_stories';
  info: {
    description: 'Member and credit union success testimonials';
    displayName: 'Success Story';
    pluralName: 'success-stories';
    singularName: 'success-story';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Business Growth',
        'Agricultural',
        'Personal Finance',
        'Community Impact',
        'Women Empowerment',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    creditUnion: Schema.Attribute.Relation<
      'manyToOne',
      'api::credit-union.credit-union'
    >;
    featuredImage: Schema.Attribute.Media<'images'>;
    impact: Schema.Attribute.Component<'impact.impact-metric', true>;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::success-story.success-story'
    > &
      Schema.Attribute.Private;
    personName: Schema.Attribute.String & Schema.Attribute.Required;
    personRole: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    story: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTagTag extends Struct.CollectionTypeSchema {
  collectionName: 'tags';
  info: {
    description: 'Tags for content';
    displayName: 'Tag';
    pluralName: 'tags';
    singularName: 'tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    news_articles: Schema.Attribute.Relation<
      'manyToMany',
      'api::news-article.news-article'
    >;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTickerContentTickerContent extends Struct.SingleTypeSchema {
  collectionName: 'ticker_contents';
  info: {
    description: 'News ticker/announcement bar configuration and messages';
    displayName: 'Ticker Content';
    pluralName: 'ticker-contents';
    singularName: 'ticker-content';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    animationSpeed: Schema.Attribute.Enumeration<['slow', 'medium', 'fast']> &
      Schema.Attribute.DefaultTo<'medium'>;
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#003366'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    iconName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'fa-bullhorn'>;
    isEnabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ticker-content.ticker-content'
    > &
      Schema.Attribute.Private;
    messages: Schema.Attribute.Component<'shared.ticker-message', true>;
    pauseOnHover: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    publishedAt: Schema.Attribute.DateTime;
    showIcon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    textColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#ffffff'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTrainingCourseTrainingCourse
  extends Struct.CollectionTypeSchema {
  collectionName: 'training_courses';
  info: {
    description: 'CUTRAC training programs and courses';
    displayName: 'Training Course';
    pluralName: 'training-courses';
    singularName: 'training-course';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Financial Management',
        'Leadership',
        'Compliance',
        'Technology',
        'Operations',
      ]
    >;
    certificationOffered: Schema.Attribute.Boolean;
    courseName: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'GHS'>;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    duration: Schema.Attribute.String;
    instructor: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    level: Schema.Attribute.Enumeration<
      ['Beginner', 'Intermediate', 'Advanced']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::training-course.training-course'
    > &
      Schema.Attribute.Private;
    maxParticipants: Schema.Attribute.Integer;
    objectives: Schema.Attribute.RichText;
    prerequisites: Schema.Attribute.RichText;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'courseName'> & Schema.Attribute.Required;
    syllabus: Schema.Attribute.Media<'files'>;
    targetAudience: Schema.Attribute.RichText;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTrainingScheduleTrainingSchedule
  extends Struct.CollectionTypeSchema {
  collectionName: 'training_schedules';
  info: {
    description: 'Scheduled training sessions';
    displayName: 'Training Schedule';
    pluralName: 'training-schedules';
    singularName: 'training-schedule';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    availableSeats: Schema.Attribute.Integer;
    course: Schema.Attribute.Relation<
      'manyToOne',
      'api::training-course.training-course'
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    endDate: Schema.Attribute.DateTime & Schema.Attribute.Required;
    instructor: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::training-schedule.training-schedule'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    notes: Schema.Attribute.Text;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    registrationDeadline: Schema.Attribute.Date;
    registrationLink: Schema.Attribute.String;
    startDate: Schema.Attribute.DateTime & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['Open', 'Full', 'Cancelled', 'Completed']
    > &
      Schema.Attribute.DefaultTo<'Open'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    venue: Schema.Attribute.String;
  };
}

export interface ApiVideoGalleryVideoGallery
  extends Struct.CollectionTypeSchema {
  collectionName: 'video_galleries';
  info: {
    description: 'Video content library';
    displayName: 'Video Gallery';
    pluralName: 'video-galleries';
    singularName: 'video-gallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['Events', 'Training', 'Testimonials', 'Documentaries', 'Interviews']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::video-gallery.video-gallery'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
    viewCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about-page-content.about-page-content': ApiAboutPageContentAboutPageContent;
      'api::author.author': ApiAuthorAuthor;
      'api::board-member.board-member': ApiBoardMemberBoardMember;
      'api::chapter.chapter': ApiChapterChapter;
      'api::contact-message.contact-message': ApiContactMessageContactMessage;
      'api::credit-union.credit-union': ApiCreditUnionCreditUnion;
      'api::credit-unions-join-page.credit-unions-join-page': ApiCreditUnionsJoinPageCreditUnionsJoinPage;
      'api::credit-unions-members-page.credit-unions-members-page': ApiCreditUnionsMembersPageCreditUnionsMembersPage;
      'api::credit-unions-success-stories-page.credit-unions-success-stories-page': ApiCreditUnionsSuccessStoriesPageCreditUnionsSuccessStoriesPage;
      'api::download.download': ApiDownloadDownload;
      'api::event.event': ApiEventEvent;
      'api::hero-slide.hero-slide': ApiHeroSlideHeroSlide;
      'api::homepage-setting.homepage-setting': ApiHomepageSettingHomepageSetting;
      'api::management-team.management-team': ApiManagementTeamManagementTeam;
      'api::news-article.news-article': ApiNewsArticleNewsArticle;
      'api::news-category.news-category': ApiNewsCategoryNewsCategory;
      'api::newsletter-subscription.newsletter-subscription': ApiNewsletterSubscriptionNewsletterSubscription;
      'api::partner.partner': ApiPartnerPartner;
      'api::photo-gallery.photo-gallery': ApiPhotoGalleryPhotoGallery;
      'api::site-setting.site-setting': ApiSiteSettingSiteSetting;
      'api::success-story.success-story': ApiSuccessStorySuccessStory;
      'api::tag.tag': ApiTagTag;
      'api::ticker-content.ticker-content': ApiTickerContentTickerContent;
      'api::training-course.training-course': ApiTrainingCourseTrainingCourse;
      'api::training-schedule.training-schedule': ApiTrainingScheduleTrainingSchedule;
      'api::video-gallery.video-gallery': ApiVideoGalleryVideoGallery;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
