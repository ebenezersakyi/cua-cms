module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local'),
      providerOptions: env('UPLOAD_PROVIDER') === 'aws-s3' ? {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          region: env('AWS_REGION'),
          params: {
            ACL: 'public-read',
            Bucket: env('AWS_BUCKET'),
          },
        },
      } : {},
      sizeLimit: 250 * 1024 * 1024, // 250MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    },
  },
  'color-picker': {
    enabled: true,
  },
  // Email configuration disabled for development
  // Install @strapi/provider-email-nodemailer for production
  // email: {
  //   config: {
  //     provider: 'nodemailer',
  //     providerOptions: {
  //       host: env('SMTP_HOST', 'localhost'),
  //       port: env('SMTP_PORT', 587),
  //       auth: {
  //         user: env('SMTP_USERNAME'),
  //         pass: env('SMTP_PASSWORD'),
  //       },
  //     },
  //     settings: {
  //       defaultFrom: env('EMAIL_DEFAULT_FROM', 'noreply@cuaghana.org'),
  //       defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'info@cuaghana.org'),
  //     },
  //   },
  // },
});
