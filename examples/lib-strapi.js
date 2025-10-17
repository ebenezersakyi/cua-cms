// lib/strapi.js
// Copy this file to your Next.js project's lib/ directory

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 * @param {string} endpoint - The API endpoint (e.g., 'hero-slides')
 * @param {object} options - Query options (populate, filters, sort, pagination)
 * @param {object} fetchOptions - Additional fetch options
 * @returns {Promise<object>} The API response data
 */
export async function fetchAPI(endpoint, options = {}, fetchOptions = {}) {
  const { populate, filters, sort, pagination } = options;

  // Build query parameters
  const params = new URLSearchParams();

  // Handle populate
  if (populate) {
    if (populate === '*') {
      params.append('populate', '*');
    } else if (Array.isArray(populate)) {
      populate.forEach((item, index) => {
        params.append(`populate[${index}]`, item);
      });
    } else if (typeof populate === 'object') {
      Object.entries(populate).forEach(([key, value]) => {
        params.append(`populate[${key}]`, value);
      });
    }
  }

  // Handle filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([operator, val]) => {
          params.append(`filters[${key}][${operator}]`, val);
        });
      } else {
        params.append(`filters[${key}]`, value);
      }
    });
  }

  // Handle sorting
  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach((s) => params.append('sort', s));
    } else {
      params.append('sort', sort);
    }
  }

  // Handle pagination
  if (pagination) {
    Object.entries(pagination).forEach(([key, value]) => {
      params.append(`pagination[${key}]`, value);
    });
  }

  const queryString = params.toString();
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
      ...fetchOptions,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Strapi API Error (${response.status}): ${error.error?.message || response.statusText}`
      );
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);

    // Return empty data structure for graceful degradation
    return {
      data: Array.isArray(options.filters) ? [] : null,
      error: {
        message: error.message,
        endpoint,
      },
    };
  }
}

/**
 * Get full URL for Strapi media files
 * @param {string|object} url - The media URL or media object
 * @returns {string} The full media URL
 */
export function getStrapiMedia(url) {
  if (!url) return null;

  // Handle media object from Strapi 5
  if (typeof url === 'object' && url.url) {
    url = url.url;
  }

  // Return full URL if already absolute
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Return Strapi URL
  return `${STRAPI_URL}${url}`;
}

/**
 * Format Strapi date to readable format
 * @param {string} dateString - ISO date string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
}

/**
 * Extract data from Strapi response
 * @param {object} response - Strapi API response
 * @returns {array|object} Extracted data
 */
export function extractData(response) {
  if (!response) return null;

  // Handle error in response
  if (response.error) {
    console.error('Strapi API Error:', response.error);
    return null;
  }

  // Handle single item
  if (response.data && !Array.isArray(response.data)) {
    return {
      id: response.data.id,
      ...response.data,
    };
  }

  // Handle array of items
  if (response.data && Array.isArray(response.data)) {
    return response.data.map(item => ({
      id: item.id,
      ...item,
    }));
  }

  return response;
}

/**
 * Post data to Strapi API (for forms)
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The data to post
 * @returns {Promise<object>} The API response
 */
export async function postAPI(endpoint, data) {
  const url = `${STRAPI_URL}/api/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Strapi API Error (${response.status}): ${error.error?.message || response.statusText}`
      );
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
}

// ===== SPECIFIC FETCHERS FOR COMMON USE CASES =====

/**
 * Get all hero slides for homepage carousel
 */
export async function getHeroSlides() {
  const response = await fetchAPI('hero-slides', {
    populate: '*',
    filters: { isActive: { $eq: true } },
    sort: 'order:asc',
  });

  return extractData(response);
}

/**
 * Get news articles for ticker
 */
export async function getTickerNews(limit = 10) {
  const response = await fetchAPI('news-articles', {
    filters: { isTickerItem: { $eq: true } },
    sort: 'publishedDate:desc',
    pagination: { limit },
  });

  return extractData(response);
}

/**
 * Get featured news articles
 */
export async function getFeaturedNews(limit = 5) {
  const response = await fetchAPI('news-articles', {
    populate: '*',
    filters: { isFeatured: { $eq: true } },
    sort: 'publishedDate:desc',
    pagination: { limit },
  });

  return extractData(response);
}

/**
 * Get single news article by slug
 */
export async function getNewsArticle(slug) {
  const response = await fetchAPI('news-articles', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  });

  const data = extractData(response);
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit = 3) {
  const response = await fetchAPI('events', {
    populate: '*',
    filters: { isFeatured: { $eq: true }, status: { $eq: 'Upcoming' } },
    sort: 'eventDate:asc',
    pagination: { limit },
  });

  return extractData(response);
}

/**
 * Get single event by slug
 */
export async function getEvent(slug) {
  const response = await fetchAPI('events', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  });

  const data = extractData(response);
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Get all partners
 */
export async function getPartners() {
  const response = await fetchAPI('partners', {
    populate: '*',
    filters: { isActive: { $eq: true } },
    sort: 'displayOrder:asc',
  });

  return extractData(response);
}

/**
 * Get top 20 credit unions
 */
export async function getTop20CreditUnions() {
  const response = await fetchAPI('credit-unions', {
    populate: '*',
    filters: { isTop20: { $eq: true } },
    sort: 'ranking:asc',
    pagination: { limit: 20 },
  });

  return extractData(response);
}

/**
 * Get all credit unions with optional filters
 */
export async function getCreditUnions(filters = {}) {
  const queryFilters = {
    isActive: { $eq: true },
    ...filters,
  };

  const response = await fetchAPI('credit-unions', {
    populate: '*',
    filters: queryFilters,
    sort: 'name:asc',
  });

  return extractData(response);
}

/**
 * Get credit union by slug
 */
export async function getCreditUnion(slug) {
  const response = await fetchAPI('credit-unions', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  });

  const data = extractData(response);
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Get board members
 */
export async function getBoardMembers() {
  const response = await fetchAPI('board-members', {
    populate: '*',
    filters: { isActive: { $eq: true } },
    sort: 'displayOrder:asc',
  });

  return extractData(response);
}

/**
 * Get management team
 */
export async function getManagementTeam() {
  const response = await fetchAPI('management-teams', {
    populate: '*',
    filters: { isActive: { $eq: true } },
    sort: ['department:asc', 'displayOrder:asc'],
  });

  return extractData(response);
}

/**
 * Get chapters
 */
export async function getChapters() {
  const response = await fetchAPI('chapters', {
    populate: '*',
    filters: { isActive: { $eq: true } },
    sort: 'chapterName:asc',
  });

  return extractData(response);
}

/**
 * Get chapter by slug
 */
export async function getChapter(slug) {
  const response = await fetchAPI('chapters', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  });

  const data = extractData(response);
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(email, firstName = '', lastName = '') {
  return await postAPI('newsletter-subscriptions', {
    email,
    firstName,
    lastName,
    source: 'Website',
  });
}

/**
 * Submit contact form
 */
export async function submitContactForm(formData) {
  return await postAPI('contact-messages', {
    ...formData,
    status: 'New',
  });
}

/**
 * Get training courses
 */
export async function getTrainingCourses(filters = {}) {
  const queryFilters = {
    isActive: { $eq: true },
    ...filters,
  };

  const response = await fetchAPI('training-courses', {
    populate: '*',
    filters: queryFilters,
    sort: 'courseName:asc',
  });

  return extractData(response);
}

/**
 * Get training schedule
 */
export async function getTrainingSchedule(filters = {}) {
  const response = await fetchAPI('training-schedules', {
    populate: '*',
    filters,
    sort: 'startDate:asc',
  });

  return extractData(response);
}

/**
 * Get success stories
 */
export async function getSuccessStories(limit = 10) {
  const response = await fetchAPI('success-stories', {
    populate: '*',
    sort: 'publishedDate:desc',
    pagination: { limit },
  });

  return extractData(response);
}

/**
 * Get downloads by category
 */
export async function getDownloads(category = null) {
  const filters = { isPublic: { $eq: true } };

  if (category) {
    filters.category = { $eq: category };
  }

  const response = await fetchAPI('downloads', {
    populate: '*',
    filters,
    sort: 'uploadDate:desc',
  });

  return extractData(response);
}
