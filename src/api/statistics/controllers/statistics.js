'use strict';

/**
 * statistics controller
 */

module.exports = {
  async find(ctx) {
    try {
      // Count credit unions
      const totalCreditUnions = await strapi.entityService.count('api::credit-union.credit-union', {
        filters: { isActive: true },
      });

      // Count news articles
      const totalNews = await strapi.entityService.count('api::news-article.news-article', {
        filters: { publishedAt: { $notNull: true } },
      });

      // Count upcoming events
      const upcomingEvents = await strapi.entityService.count('api::event.event', {
        filters: {
          eventDate: { $gte: new Date().toISOString() },
          publishedAt: { $notNull: true },
        },
      });

      // Count success stories
      const totalSuccessStories = await strapi.entityService.count('api::success-story.success-story', {
        filters: { publishedAt: { $notNull: true } },
      });

      // Count training courses
      const totalTrainingCourses = await strapi.entityService.count('api::training-course.training-course', {
        filters: { isActive: true },
      });

      // Count chapters
      const totalChapters = await strapi.entityService.count('api::chapter.chapter');

      // Count partners
      const totalPartners = await strapi.entityService.count('api::partner.partner', {
        filters: { isActive: true },
      });

      // Get recent news
      const recentNews = await strapi.entityService.findMany('api::news-article.news-article', {
        filters: { publishedAt: { $notNull: true } },
        sort: { publishedAt: 'desc' },
        limit: 3,
        fields: ['title', 'slug', 'publishedAt'],
      });

      // Get upcoming events
      const nextEvents = await strapi.entityService.findMany('api::event.event', {
        filters: {
          eventDate: { $gte: new Date().toISOString() },
          publishedAt: { $notNull: true },
        },
        sort: { eventDate: 'asc' },
        limit: 3,
        fields: ['title', 'slug', 'eventDate'],
      });

      // Aggregate credit union data
      let totalMembers = 0;
      let totalAssets = 0;

      const creditUnions = await strapi.entityService.findMany('api::credit-union.credit-union', {
        filters: { isActive: true },
        fields: ['memberCount', 'totalAssets'],
      });

      creditUnions.forEach(cu => {
        if (cu.memberCount) totalMembers += cu.memberCount;
        if (cu.totalAssets) totalAssets += parseFloat(cu.totalAssets) || 0;
      });

      return {
        data: {
          creditUnions: {
            total: totalCreditUnions,
            totalMembers: totalMembers,
            totalAssets: totalAssets > 0 ? 'GHS ' + (totalAssets / 1000000).toFixed(2) + 'M' : 'N/A',
          },
          content: {
            newsArticles: totalNews,
            upcomingEvents: upcomingEvents,
            successStories: totalSuccessStories,
            trainingCourses: totalTrainingCourses,
          },
          organization: {
            chapters: totalChapters,
            partners: totalPartners,
          },
          recentActivity: {
            latestNews: recentNews.map(n => ({
              title: n.title,
              slug: n.slug,
              date: n.publishedAt,
            })),
            upcomingEvents: nextEvents.map(e => ({
              title: e.title,
              slug: e.slug,
              date: e.eventDate,
            })),
          },
        },
        meta: {
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
