'use strict';

/**
 * Seed careers page and job vacancies with sample data
 * Updated to work with component-based structure
 */

// Helper function to convert array to HTML list
function arrayToHtmlList(items) {
  return '<ul>\n' + items.map(item => `<li>${item}</li>`).join('\n') + '\n</ul>';
}

async function seedCareers(strapi) {
  console.log('🌱 Seeding careers content...\n');

  try {
    // First, delete existing data to avoid conflicts with schema changes
    console.log('🗑️  Cleaning up existing careers data...');

    await strapi.db.query('api::job-vacancy.job-vacancy').deleteMany({});
    await strapi.db.query('api::careers-page.careers-page').deleteMany({});

    console.log('✅ Cleanup complete\n');

    // Sample job vacancies with component-based requirements
    const jobVacancies = [
      {
        title: 'Senior Financial Analyst',
        department: 'Finance',
        location: 'Accra, Ghana',
        employmentType: 'Full-time',
        experienceLevel: 'Senior Level',
        salary: 'Competitive',
        postedDate: new Date('2025-01-15'),
        closingDate: new Date('2025-02-28'),
        isActive: true,
        publishedAt: new Date(),
        description: `<h2>About the Role</h2>
<p>We are seeking an experienced Senior Financial Analyst to join our team at Credit Union Association Ghana. In this role, you will provide critical financial insights and analysis to support our member credit unions and drive strategic decision-making.</p>

<h3>Key Responsibilities</h3>
<ul>
<li>Conduct comprehensive financial analysis and reporting for member credit unions</li>
<li>Develop financial models and forecasts to support strategic planning</li>
<li>Monitor industry trends and provide insights on financial performance</li>
<li>Prepare detailed reports and presentations for executive leadership</li>
<li>Support budget planning and variance analysis</li>
<li>Collaborate with member credit unions to improve financial operations</li>
</ul>

<h3>What We Offer</h3>
<ul>
<li>Competitive salary and comprehensive benefits package</li>
<li>Professional development and training opportunities</li>
<li>Collaborative and mission-driven work environment</li>
<li>Opportunity to make a meaningful impact on Ghana's credit union movement</li>
</ul>`,
        requirements: {
          qualifications: arrayToHtmlList([
            'Bachelor\'s degree in Finance, Accounting, Economics, or related field',
            'Master\'s degree (MBA, MFin) preferred',
            'Professional certification (ACCA, CFA, CPA) is an advantage'
          ]),
          experience: arrayToHtmlList([
            'Minimum 5-7 years of experience in financial analysis',
            'Experience in the financial services or cooperative sector preferred',
            'Strong background in financial modeling and forecasting',
            'Experience with financial software and data analysis tools'
          ]),
          skills: arrayToHtmlList([
            'Advanced Excel and financial modeling skills',
            'Excellent analytical and problem-solving abilities',
            'Strong written and verbal communication skills',
            'Ability to present complex financial data clearly',
            'Attention to detail and accuracy',
            'Team collaboration and stakeholder management'
          ])
        },
        applyUrl: 'https://forms.gle/cuaghana-senior-analyst'
      },
      {
        title: 'Training Coordinator',
        department: 'CUTRAC',
        location: 'Accra, Ghana',
        employmentType: 'Full-time',
        experienceLevel: 'Mid Level',
        salary: 'Negotiable',
        postedDate: new Date('2025-01-20'),
        closingDate: new Date('2025-03-15'),
        isActive: true,
        publishedAt: new Date(),
        description: `<h2>About the Role</h2>
<p>Join our Credit Union Training Centre (CUTRAC) as a Training Coordinator and help build capacity in Ghana's credit union sector. You will coordinate training programs, manage logistics, and support the delivery of high-quality educational experiences.</p>

<h3>Key Responsibilities</h3>
<ul>
<li>Coordinate and schedule training programs and workshops</li>
<li>Manage training logistics including venue, materials, and equipment</li>
<li>Liaise with trainers, participants, and credit union representatives</li>
<li>Maintain training records and prepare reports</li>
<li>Support curriculum development and training material preparation</li>
<li>Assist with participant registration and communication</li>
<li>Monitor training quality and gather feedback</li>
</ul>

<h3>What We Offer</h3>
<ul>
<li>Opportunity to work in education and capacity building</li>
<li>Dynamic and supportive team environment</li>
<li>Professional growth opportunities</li>
<li>Benefits package including health insurance</li>
</ul>`,
        requirements: {
          qualifications: arrayToHtmlList([
            'Bachelor\'s degree in Education, Business Administration, or related field',
            'Training and Development certification is an advantage'
          ]),
          experience: arrayToHtmlList([
            'Minimum 3-5 years in training coordination or events management',
            'Experience in adult education or professional training preferred',
            'Background in financial services is a plus'
          ]),
          skills: arrayToHtmlList([
            'Excellent organizational and project management skills',
            'Strong communication and interpersonal abilities',
            'Proficiency in MS Office (Word, Excel, PowerPoint)',
            'Detail-oriented with strong multitasking abilities',
            'Customer service mindset',
            'Ability to work under pressure and meet deadlines'
          ])
        },
        applyUrl: 'https://forms.gle/cuaghana-training-coordinator'
      },
      {
        title: 'IT Support Specialist',
        department: 'Information Technology',
        location: 'Accra, Ghana',
        employmentType: 'Full-time',
        experienceLevel: 'Entry Level',
        salary: 'GHS 3,000 - 5,000',
        postedDate: new Date('2025-01-22'),
        closingDate: new Date('2025-02-28'),
        isActive: true,
        publishedAt: new Date(),
        description: `<h2>About the Role</h2>
<p>We are looking for an enthusiastic IT Support Specialist to provide technical support to our organization and member credit unions. This is an excellent opportunity for someone starting their IT career to gain experience in a mission-driven organization.</p>

<h3>Key Responsibilities</h3>
<ul>
<li>Provide first-line technical support to staff and member credit unions</li>
<li>Install, configure, and maintain computer systems and software</li>
<li>Troubleshoot hardware and software issues</li>
<li>Maintain IT documentation and inventory</li>
<li>Support network administration and security</li>
<li>Assist with website and database maintenance</li>
<li>Train users on IT systems and applications</li>
</ul>

<h3>What We Offer</h3>
<ul>
<li>Entry into the IT field with hands-on experience</li>
<li>Mentorship and training opportunities</li>
<li>Career progression path</li>
<li>Health insurance and other benefits</li>
</ul>`,
        requirements: {
          qualifications: arrayToHtmlList([
            'Diploma or Bachelor\'s degree in Computer Science, IT, or related field',
            'IT certifications (CompTIA A+, Network+, MCSA) preferred'
          ]),
          experience: arrayToHtmlList([
            'Fresh graduates welcome to apply',
            '1-2 years of IT support experience is an advantage',
            'Internship or practical training in IT support'
          ]),
          skills: arrayToHtmlList([
            'Knowledge of Windows and Microsoft Office applications',
            'Basic networking and troubleshooting skills',
            'Good problem-solving abilities',
            'Excellent customer service skills',
            'Ability to explain technical concepts to non-technical users',
            'Eager to learn and adapt to new technologies'
          ])
        },
        applyUrl: 'https://forms.gle/cuaghana-it-support'
      },
      {
        title: 'Compliance Officer',
        department: 'Compliance & Risk',
        location: 'Accra, Ghana',
        employmentType: 'Full-time',
        experienceLevel: 'Mid Level',
        salary: 'Competitive',
        postedDate: new Date('2025-01-18'),
        closingDate: new Date('2025-03-01'),
        isActive: true,
        publishedAt: new Date(),
        description: `<h2>About the Role</h2>
<p>As a Compliance Officer, you will ensure that CUA Ghana and member credit unions adhere to regulatory requirements and internal policies. You will play a crucial role in maintaining the integrity and reputation of the credit union movement.</p>

<h3>Key Responsibilities</h3>
<ul>
<li>Monitor compliance with regulatory requirements and internal policies</li>
<li>Conduct compliance audits and risk assessments</li>
<li>Develop and implement compliance programs and procedures</li>
<li>Provide compliance training and guidance to member credit unions</li>
<li>Investigate compliance issues and recommend corrective actions</li>
<li>Prepare compliance reports for management and regulators</li>
<li>Stay updated on regulatory changes and industry best practices</li>
</ul>

<h3>What We Offer</h3>
<ul>
<li>Competitive compensation and benefits</li>
<li>Professional development and certification support</li>
<li>Challenging and rewarding work environment</li>
<li>Opportunity to strengthen Ghana\'s credit union sector</li>
</ul>`,
        requirements: {
          qualifications: arrayToHtmlList([
            'Bachelor\'s degree in Law, Finance, Business Administration, or related field',
            'Professional compliance certification (ICA, CRCMP) is highly desirable'
          ]),
          experience: arrayToHtmlList([
            'Minimum 4-6 years in compliance, audit, or risk management',
            'Experience in financial services or cooperative sector',
            'Knowledge of Bank of Ghana regulations and AML/CFT requirements'
          ]),
          skills: arrayToHtmlList([
            'Strong understanding of regulatory frameworks',
            'Excellent analytical and investigative skills',
            'Attention to detail and integrity',
            'Strong written and verbal communication',
            'Ability to work independently and handle sensitive information',
            'Project management and organizational skills'
          ])
        },
        applyUrl: 'https://forms.gle/cuaghana-compliance'
      },
      {
        title: 'Marketing & Communications Intern',
        department: 'Marketing',
        location: 'Accra, Ghana',
        employmentType: 'Internship',
        experienceLevel: 'Entry Level',
        salary: 'Stipend provided',
        postedDate: new Date('2025-01-25'),
        closingDate: new Date('2025-02-15'),
        isActive: true,
        publishedAt: new Date(),
        description: `<h2>About the Role</h2>
<p>We are offering an exciting 6-month internship opportunity for a passionate individual interested in marketing and communications. You will gain hands-on experience in nonprofit marketing, digital content creation, and stakeholder engagement.</p>

<h3>Key Responsibilities</h3>
<ul>
<li>Assist with social media content creation and management</li>
<li>Support the development of marketing materials and publications</li>
<li>Help coordinate events and promotional activities</li>
<li>Conduct market research and competitor analysis</li>
<li>Assist with website content updates</li>
<li>Support email marketing campaigns</li>
<li>Monitor and report on marketing metrics</li>
</ul>

<h3>What We Offer</h3>
<ul>
<li>Practical experience in marketing and communications</li>
<li>Mentorship from experienced professionals</li>
<li>Letter of recommendation upon successful completion</li>
<li>Monthly stipend and transportation allowance</li>
<li>Potential for future employment opportunities</li>
</ul>`,
        requirements: {
          qualifications: arrayToHtmlList([
            'Currently pursuing or recently completed a degree in Marketing, Communications, Journalism, or related field',
            'Strong academic record'
          ]),
          experience: arrayToHtmlList([
            'No prior experience required',
            'Previous internship or volunteer experience is a plus',
            'Portfolio of writing samples or design work welcomed'
          ]),
          skills: arrayToHtmlList([
            'Excellent written and verbal communication in English',
            'Basic graphic design skills (Canva, Adobe Creative Suite)',
            'Social media savvy',
            'Creative thinking and attention to detail',
            'Proficiency in Microsoft Office',
            'Enthusiastic and eager to learn'
          ])
        },
        applyUrl: 'https://forms.gle/cuaghana-marketing-intern'
      }
    ];

    // Create job vacancies
    console.log('📝 Creating job vacancies...');
    const createdJobs = [];

    for (const job of jobVacancies) {
      const created = await strapi.db.query('api::job-vacancy.job-vacancy').create({
        data: job
      });

      console.log(`✅ Created job: ${job.title}`);
      createdJobs.push(created);
    }

    // Create careers page configuration
    console.log('\n📄 Creating careers page configuration...');

    const careersPageData = {
      heroSection: {
        title: 'Join Our Team',
        subtitle: 'Build Your Career with Ghana\'s Leading Credit Union Association',
        description: 'Make a meaningful impact on financial inclusion and cooperative development while advancing your professional career.',
        backgroundImage: null
      },
      whyWorkWithUs: {
        title: 'Why Work With Us',
        description: 'Join a mission-driven organization dedicated to strengthening Ghana\'s credit union movement and promoting financial inclusion.',
        benefits: [
          {
            icon: 'Award',
            title: 'Professional Development',
            description: 'Access to training programs, certifications, and continuous learning opportunities to advance your career.'
          },
          {
            icon: 'Users',
            title: 'Collaborative Environment',
            description: 'Work with a passionate team of professionals dedicated to making a difference in Ghana\'s financial sector.'
          },
          {
            icon: 'Heart',
            title: 'Meaningful Impact',
            description: 'Contribute to financial inclusion and help credit unions serve millions of Ghanaians across the country.'
          },
          {
            icon: 'TrendingUp',
            title: 'Career Growth',
            description: 'Clear career progression paths with opportunities to take on leadership roles and increased responsibilities.'
          },
          {
            icon: 'Shield',
            title: 'Comprehensive Benefits',
            description: 'Competitive compensation packages including health insurance, pension, and other employee benefits.'
          },
          {
            icon: 'Globe',
            title: 'Work-Life Balance',
            description: 'Supportive work environment that values your well-being and promotes healthy work-life balance.'
          }
        ]
      },
      ctaSection: {
        title: 'Don\'t See a Position That Fits?',
        description: 'We\'re always looking for talented individuals to join our team. Send us your CV and we\'ll keep you in mind for future opportunities.',
        buttonText: 'Send Your CV',
        buttonLink: 'mailto:careers@cuaghana.com',
        note: 'Email your CV and cover letter to careers@cuaghana.com'
      },
      featuredJobs: [],
      seo: {
        metaTitle: 'Careers at CUA Ghana | Join Our Team',
        metaDescription: 'Explore career opportunities at Credit Union Association Ghana. Join our mission-driven team and make an impact on financial inclusion in Ghana.',
        keywords: 'CUA Ghana careers, credit union jobs, finance jobs Ghana, CUTRAC jobs, nonprofit careers Ghana',
        canonicalURL: 'https://cuaghana.com/careers'
      }
    };

    await strapi.db.query('api::careers-page.careers-page').create({
      data: careersPageData
    });

    console.log('✅ Careers page created successfully');

    console.log('\n✅ Careers seeding completed!');
    console.log(`   - Created ${createdJobs.length} job vacancies`);
    console.log(`   - Configured careers page with hero, benefits, and CTA sections`);

  } catch (error) {
    console.error('❌ Error seeding careers:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedCareers(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
