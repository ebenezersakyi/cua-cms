'use strict';

/**
 * newsletter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const emailService = require('../../../services/email');

module.exports = createCoreController('api::newsletter.newsletter', ({ strapi }) => ({
  /**
   * Send newsletter to all active subscribers
   * POST /api/newsletters/:id/send
   */
  async send(ctx) {
    const { id } = ctx.params;

    try {
      // Get the newsletter
      const newsletter = await strapi.entityService.findOne('api::newsletter.newsletter', id);

      if (!newsletter) {
        return ctx.notFound('Newsletter not found');
      }

      if (newsletter.status === 'sent') {
        return ctx.badRequest('Newsletter has already been sent');
      }

      // Update status to indicate sending is in progress
      await strapi.entityService.update('api::newsletter.newsletter', id, {
        data: { status: 'scheduled' },
      });

      // Send the newsletter
      const results = await emailService.sendNewsletterBroadcast({
        subject: newsletter.subject,
        preheader: newsletter.preheader,
        content: newsletter.content,
        ctaText: newsletter.ctaText,
        ctaUrl: newsletter.ctaUrl,
      });

      // Update newsletter with results
      const finalStatus = results.failed === 0 ? 'sent' : (results.sent === 0 ? 'failed' : 'sent');

      await strapi.entityService.update('api::newsletter.newsletter', id, {
        data: {
          status: finalStatus,
          sentAt: new Date(),
          recipientCount: results.total,
          successCount: results.sent,
          failureCount: results.failed,
        },
      });

      return {
        data: {
          message: 'Newsletter sent successfully',
          results: {
            total: results.total,
            sent: results.sent,
            failed: results.failed,
          },
        },
      };
    } catch (error) {
      strapi.log.error('Error sending newsletter:', error);

      // Update newsletter status to failed
      await strapi.entityService.update('api::newsletter.newsletter', id, {
        data: { status: 'failed' },
      });

      return ctx.internalServerError('Failed to send newsletter');
    }
  },

  /**
   * Send test newsletter to a specific email
   * POST /api/newsletters/:id/test
   */
  async sendTest(ctx) {
    const { id } = ctx.params;
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email address is required');
    }

    try {
      // Get the newsletter
      const newsletter = await strapi.entityService.findOne('api::newsletter.newsletter', id);

      if (!newsletter) {
        return ctx.notFound('Newsletter not found');
      }

      // Send test email
      const success = await emailService.sendTemplateEmail('newsletterBroadcast', {
        subject: `[TEST] ${newsletter.subject}`,
        preheader: newsletter.preheader,
        content: newsletter.content,
        ctaText: newsletter.ctaText,
        ctaUrl: newsletter.ctaUrl,
      }, email);

      if (success) {
        return {
          data: {
            message: `Test newsletter sent to ${email}`,
          },
        };
      } else {
        return ctx.internalServerError('Failed to send test newsletter');
      }
    } catch (error) {
      strapi.log.error('Error sending test newsletter:', error);
      return ctx.internalServerError('Failed to send test newsletter');
    }
  },

  /**
   * Get subscriber count
   * GET /api/newsletters/subscriber-count
   */
  async subscriberCount(ctx) {
    try {
      const count = await strapi.db.query('api::newsletter-subscription.newsletter-subscription').count({
        where: { isActive: true },
      });

      return {
        data: {
          count,
        },
      };
    } catch (error) {
      strapi.log.error('Error getting subscriber count:', error);
      return ctx.internalServerError('Failed to get subscriber count');
    }
  },
}));
