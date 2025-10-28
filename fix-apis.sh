#!/bin/bash

# List of APIs that need controller, service, and router files
apis=(
  "board-member"
  "chapter"
  "contact-message"
  "credit-union"
  "download"
  "event"
  "management-team"
  "news-article"
  "news-category"
  "newsletter-subscription"
  "partner"
  "photo-gallery"
  "success-story"
  "tag"
  "training-course"
  "training-schedule"
  "video-gallery"
)

for api in "${apis[@]}"; do
  echo "Fixing $api..."
  
  # Create directories
  mkdir -p "src/api/$api/controllers"
  mkdir -p "src/api/$api/services"
  mkdir -p "src/api/$api/routes"
  
  # Create controller
  cat > "src/api/$api/controllers/$api.js" << EOF
'use strict';

/**
 * $api controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::$api.$api');
EOF

  # Create service
  cat > "src/api/$api/services/$api.js" << EOF
'use strict';

/**
 * $api service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::$api.$api');
EOF

  # Create router
  cat > "src/api/$api/routes/$api.js" << EOF
'use strict';

/**
 * $api router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::$api.$api');
EOF

done

echo "All APIs fixed!"
