'use strict';

/**
 * search controller
 */

module.exports = {
  async find(ctx) {
    try {
      const { query } = ctx.request.query;
      const { types = 'all', page = 1, pageSize = 10 } = ctx.request.query;

      if (!query || query.trim().length < 2) {
        return ctx.badRequest('Search query must be at least 2 characters');
      }

      const searchTypes = types === 'all' 
        ? ['news-articles', 'events', 'credit-unions', 'success-stories', 'training-courses']
        : types.split(',');

      const results = [];
      const searchQuery = query.trim();

      // Search in news articles
      if (searchTypes.includes('news-articles')) {
        const articles = await strapi.entityService.findMany('api::news-article.news-article', {
          filters: {
            $or: [
              { title: { $containsi: searchQuery } },
              { excerpt: { $containsi: searchQuery } },
              { content: { $containsi: searchQuery } },
            ],
          },
          populate: ['featuredImage', 'category', 'author'],
          limit: 5,
        });

        articles.forEach(article => {
          results.push({
            type: 'news-article',
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            slug: article.slug,
            url: `/news/${article.slug}`,
            image: article.featuredImage?.url,
            date: article.publishedAt,
          });
        });
      }

      // Search in events
      if (searchTypes.includes('events')) {
        const events = await strapi.entityService.findMany('api::event.event', {
          filters: {
            $or: [
              { title: { $containsi: searchQuery } },
              { description: { $containsi: searchQuery } },
            ],
          },
          populate: ['image'],
          limit: 5,
        });

        events.forEach(event => {
          results.push({
            type: 'event',
            id: event.id,
            title: event.title,
            excerpt: event.shortDescription,
            slug: event.slug,
            url: `/events/${event.slug}`,
            image: event.image?.url,
            date: event.eventDate,
          });
        });
      }

      // Search in credit unions
      if (searchTypes.includes('credit-unions')) {
        const creditUnions = await strapi.entityService.findMany('api::credit-union.credit-union', {
          filters: {
            $or: [
              { name: { $containsi: searchQuery } },
              { description: { $containsi: searchQuery } },
              { region: { $containsi: searchQuery } },
            ],
          },
          populate: ['logo'],
          limit: 5,
        });

        creditUnions.forEach(cu => {
          results.push({
            type: 'credit-union',
            id: cu.id,
            title: cu.name,
            excerpt: cu.description?.substring(0, 150),
            slug: cu.slug,
            url: `/credit-unions/${cu.slug}`,
            image: cu.logo?.url,
            meta: cu.region,
          });
        });
      }

      // Search in success stories
      if (searchTypes.includes('success-stories')) {
        const stories = await strapi.entityService.findMany('api::success-story.success-story', {
          filters: {
            $or: [
              { title: { $containsi: searchQuery } },
              { story: { $containsi: searchQuery } },
            ],
          },
          populate: ['featuredImage'],
          limit: 5,
        });

        stories.forEach(story => {
          results.push({
            type: 'success-story',
            id: story.id,
            title: story.title,
            excerpt: story.story?.substring(0, 150),
            slug: story.slug,
            url: `/credit-unions/success-stories/${story.slug}`,
            image: story.featuredImage?.url,
          });
        });
      }

      // Search in training courses
      if (searchTypes.includes('training-courses')) {
        const courses = await strapi.entityService.findMany('api::training-course.training-course', {
          filters: {
            $or: [
              { name: { $containsi: searchQuery } },
              { description: { $containsi: searchQuery } },
            ],
          },
          limit: 5,
        });

        courses.forEach(course => {
          results.push({
            type: 'training-course',
            id: course.id,
            title: course.name,
            excerpt: course.description?.substring(0, 150),
            slug: course.slug,
            url: `/training/courses/${course.slug}`,
            meta: course.level,
          });
        });
      }

      // Paginate results
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + parseInt(pageSize);
      const paginatedResults = results.slice(startIndex, endIndex);

      return {
        data: paginatedResults,
        meta: {
          pagination: {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            total: results.length,
            pageCount: Math.ceil(results.length / pageSize),
          },
          query: searchQuery,
          types: searchTypes,
        },
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
