'use strict';

/**
 * Seed Credit Unions pages with sample data
 */

async function seedCreditUnionsPages(strapi) {
  console.log('🌱 Starting Credit Unions pages seeding...\n');

  try {
    // 1. Seed Credit Unions Overview Page
    console.log('📝 Seeding Credit Unions Overview Page...');
    await strapi.documents('api::credit-unions-overview-page.credit-unions-overview-page').create({
      data: {
        heroSection: {
          badge: 'Credit Unions',
          title: 'Join a Credit Union Today',
          subtitle: 'Experience Member-Owned Financial Services',
          description: 'Discover how credit unions empower communities through cooperative finance. Join over 400,000 Ghanaians who are building a stronger financial future through member-owned institutions.',
          primaryCta: {
            text: 'Find a Credit Union',
            url: '/credit-unions/in-ghana',
            variant: 'primary'
          },
          secondaryCta: {
            text: 'Learn How to Join',
            url: '/credit-unions/join',
            variant: 'secondary'
          }
        },
        keyBenefitsSection: {
          title: 'Why Choose a Credit Union?',
          description: 'Credit unions offer unique advantages that put members first, not profits.',
          benefits: [
            {
              icon: 'FiUsers',
              title: 'Member Ownership',
              description: "You're not just a customer—you're an owner with voting rights and a say in how your credit union operates.",
              color: '#3B82F6'
            },
            {
              icon: 'FiTrendingDown',
              title: 'Lower Fees & Better Rates',
              description: 'Enjoy lower interest rates on loans and higher returns on savings compared to traditional banks.',
              color: '#10B981'
            },
            {
              icon: 'FiHeart',
              title: 'Community Focused',
              description: 'Your deposits stay local, supporting community development and helping neighbors achieve their financial goals.',
              color: '#EC4899'
            },
            {
              icon: 'FiShield',
              title: 'Safe & Secure',
              description: 'Your savings are protected and insured, giving you peace of mind for your financial future.',
              color: '#8B5CF6'
            },
            {
              icon: 'FiAward',
              title: 'Personalized Service',
              description: 'Get to know the people managing your finances. We treat you like family, not a number.',
              color: '#F59E0B'
            },
            {
              icon: 'FiPieChart',
              title: 'Profit Sharing',
              description: 'As an owner, you share in the profits through higher dividends on savings and lower loan rates.',
              color: '#06B6D4'
            }
          ]
        },
        aboutSection: {
          title: 'What is a Credit Union?',
          content: 'A credit union is a member-owned financial cooperative that provides banking services. Unlike traditional banks that maximize profits for shareholders, credit unions return earnings to members through better rates, lower fees, and improved services. When you join a credit union, you become both a member and an owner, with voting rights on important decisions.',
          stats: [
            {
              label: 'Active Members',
              value: '400K+'
            },
            {
              label: 'Credit Unions',
              value: '500+'
            },
            {
              label: 'Combined Assets',
              value: '₵2B+'
            },
            {
              label: 'Regions Served',
              value: '16'
            }
          ]
        },
        howItWorksSection: {
          title: 'How to Get Started',
          description: 'Joining a credit union is simple and straightforward. Follow these steps to become a member.',
          steps: [
            {
              number: 1,
              title: 'Find a Credit Union',
              description: 'Browse our directory of over 500 credit unions across Ghana to find one that serves your community or employer group.'
            },
            {
              number: 2,
              title: 'Check Eligibility',
              description: 'Verify you meet the membership requirements. Most credit unions serve specific communities, employers, or associations.'
            },
            {
              number: 3,
              title: 'Gather Documents',
              description: 'Prepare your Ghana Card, proof of address, and passport photos. Some credit unions may require additional documents.'
            },
            {
              number: 4,
              title: 'Submit Application',
              description: 'Visit a branch or apply online. Pay the membership fee and make your initial share deposit to become an owner.'
            }
          ]
        },
        toolsSection: {
          title: 'Helpful Tools & Resources',
          services: [
            {
              icon: 'FiCalculator',
              title: 'Loan Calculator',
              description: 'Calculate your monthly payments and see how much you can borrow',
              link: '/tools/loan-calculator'
            },
            {
              icon: 'FiPieChart',
              title: 'Savings Planner',
              description: 'Set savings goals and track your progress toward financial freedom',
              link: '/tools/savings-planner'
            },
            {
              icon: 'FiMapPin',
              title: 'Branch Locator',
              description: 'Find credit union branches and ATMs near you',
              link: '/credit-unions/in-ghana'
            },
            {
              icon: 'FiFileText',
              title: 'Application Forms',
              description: 'Download membership and loan application forms',
              link: '/credit-unions/members'
            }
          ]
        },
        loanCalculatorSection: {
          title: 'Calculate Your Loan Payments',
          description: 'Use our loan calculator to estimate monthly payments and see how affordable credit union loans can be.',
          stats: [
            {
              label: 'Average Loan Rate',
              value: '12-18%'
            },
            {
              label: 'Max Loan Term',
              value: '5 Years'
            }
          ]
        },
        ctaSection: {
          title: 'Ready to Join?',
          description: 'Find a credit union near you and start your journey to better financial services today.',
          primaryCta: {
            text: 'Find Credit Unions',
            url: '/credit-unions/in-ghana'
          },
          secondaryCta: {
            text: 'Contact Us',
            url: '/contact'
          }
        }
      }
    });
    console.log('✅ Credit Unions Overview Page seeded successfully\n');

    // 2. Seed Credit Unions in Ghana Page
    console.log('📝 Seeding Credit Unions in Ghana Page...');
    await strapi.documents('api::credit-unions-in-ghana-page.credit-unions-in-ghana-page').create({
      data: {
        heroSection: {
          badge: 'Find Credit Unions',
          title: 'Credit Unions in Ghana',
          description: 'Browse over 500 credit unions across all 16 regions of Ghana. Find one that serves your community, employer, or association.'
        },
        searchSection: {
          title: 'Find Your Credit Union',
          description: 'Search by name, region, or location to discover credit unions near you.',
          stats: [
            {
              label: 'Credit Unions',
              value: '500+'
            },
            {
              label: 'Regions Covered',
              value: '16'
            },
            {
              label: 'Communities Served',
              value: '1,000+'
            },
            {
              label: 'Total Members',
              value: '400K+'
            }
          ]
        },
        categoriesSection: {
          title: 'Browse by Region',
          categories: [
            {
              name: 'Greater Accra',
              count: 125,
              icon: 'FiMapPin',
              slug: 'greater-accra',
              description: 'Credit unions serving Accra and surrounding areas'
            },
            {
              name: 'Ashanti Region',
              count: 98,
              icon: 'FiMapPin',
              slug: 'ashanti',
              description: 'Credit unions in Kumasi and Ashanti Region'
            },
            {
              name: 'Eastern Region',
              count: 65,
              icon: 'FiMapPin',
              slug: 'eastern',
              description: 'Credit unions serving Eastern Region'
            },
            {
              name: 'Western Region',
              count: 52,
              icon: 'FiMapPin',
              slug: 'western',
              description: 'Credit unions in Western Region'
            },
            {
              name: 'Central Region',
              count: 48,
              icon: 'FiMapPin',
              slug: 'central',
              description: 'Credit unions serving Central Region'
            },
            {
              name: 'Northern Region',
              count: 42,
              icon: 'FiMapPin',
              slug: 'northern',
              description: 'Credit unions in Northern Region'
            },
            {
              name: 'Volta Region',
              count: 38,
              icon: 'FiMapPin',
              slug: 'volta',
              description: 'Credit unions serving Volta Region'
            },
            {
              name: 'Other Regions',
              count: 32,
              icon: 'FiMapPin',
              slug: 'other',
              description: 'Credit unions in other regions'
            }
          ]
        },
        mapSection: {
          title: 'Map View',
          defaultCenter: {
            lat: 7.9465,
            lng: -1.0232
          },
          defaultZoom: 7,
          showClusters: true,
          showSearch: true
        },
        ctaSection: {
          title: "Can't Find What You're Looking For?",
          description: 'Contact us for assistance in finding the right credit union for you.',
          primaryCta: {
            text: 'Contact Us',
            url: '/contact'
          },
          secondaryCta: {
            text: 'View All Services',
            url: '/our-work/what-we-do'
          }
        }
      }
    });
    console.log('✅ Credit Unions in Ghana Page seeded successfully\n');

    // 3. Seed Join a Credit Union Page
    console.log('📝 Seeding Join a Credit Union Page...');
    await strapi.documents('api::credit-unions-join-page.credit-unions-join-page').create({
      data: {
        heroSection: {
          badge: 'Membership',
          title: 'Join a Credit Union',
          subtitle: 'Become Part of the Cooperative Finance Movement',
          description: 'Joining a credit union is your first step towards financial empowerment. Experience the benefits of member-owned banking.',
          primaryCta: {
            text: 'Find Credit Unions',
            url: '/credit-unions/in-ghana'
          },
          secondaryCta: {
            text: 'Apply Online',
            url: '/credit-unions/form'
          }
        },
        whyJoinSection: {
          title: 'Benefits of Membership',
          description: 'Discover what credit union membership offers you and your family.',
          benefits: [
            {
              icon: 'FiDollarSign',
              title: 'Better Rates',
              description: 'Lower loan rates (12-18% vs 24-30% at banks) and higher savings dividends',
              color: '#10B981'
            },
            {
              icon: 'FiShield',
              title: 'Protected Savings',
              description: 'Your savings are insured and protected by regulatory oversight',
              color: '#3B82F6'
            },
            {
              icon: 'FiUsers',
              title: 'Democratic Control',
              description: 'One member, one vote—regardless of account balance',
              color: '#8B5CF6'
            },
            {
              icon: 'FiTrendingUp',
              title: 'Financial Education',
              description: 'Free training on budgeting, saving, and building wealth',
              color: '#F59E0B'
            },
            {
              icon: 'FiHeart',
              title: 'Community Impact',
              description: 'Your deposits help neighbors and strengthen local economy',
              color: '#EC4899'
            },
            {
              icon: 'FiAward',
              title: 'Member Perks',
              description: 'Special rates, loyalty rewards, and dividend distributions',
              color: '#06B6D4'
            }
          ]
        },
        howToJoinSection: {
          title: 'How to Join',
          description: 'Follow these simple steps to become a credit union member.',
          steps: [
            {
              number: 1,
              title: 'Choose a Credit Union',
              description: 'Find a credit union that serves your community or employer group',
              details: '<p>Browse our directory of over 500 credit unions. Look for one that serves:</p><ul><li>Your residential area (community-based)</li><li>Your workplace (employer-based)</li><li>Your trade or association (association-based)</li></ul><p>Each credit union has a specific field of membership.</p>',
              icon: 'FiSearch',
              estimatedTime: '10 minutes'
            },
            {
              number: 2,
              title: 'Check Eligibility',
              description: 'Verify you meet the membership requirements',
              details: '<p>Common eligibility criteria include:</p><ul><li>Living or working in the designated area</li><li>Employment by a qualifying organization</li><li>Membership in a specific association</li><li>Being 18 years or older</li></ul><p>Some credit unions also accept family members of existing members.</p>',
              icon: 'FiCheckSquare',
              estimatedTime: '5 minutes'
            },
            {
              number: 3,
              title: 'Gather Documents',
              description: 'Prepare required identification and documentation',
              details: '<p>You will typically need:</p><ul><li>Valid Ghana Card or passport</li><li>Proof of address (utility bill or bank statement within 3 months)</li><li>2 passport-sized photos</li><li>Employment letter (for employer-based CUs)</li><li>Association membership card (for association-based CUs)</li></ul>',
              icon: 'FiFileText',
              estimatedTime: '15 minutes'
            },
            {
              number: 4,
              title: 'Submit Application',
              description: 'Complete and submit your membership application',
              details: '<p>You can apply by:</p><ul><li>Visiting the credit union branch in person</li><li>Applying online through our portal</li><li>Submitting through your employer (for employer-based CUs)</li></ul><p>Pay the membership fee (typically ₵50-₵200) and make your initial share deposit.</p>',
              icon: 'FiSend',
              estimatedTime: '20 minutes'
            },
            {
              number: 5,
              title: 'Start Banking',
              description: 'Begin using your credit union services',
              details: '<p>Once approved, you can:</p><ul><li>Open savings accounts</li><li>Apply for loans</li><li>Participate in member meetings</li><li>Vote on important decisions</li><li>Access member-only benefits</li></ul><p>Your membership is lifelong as long as you maintain your account.</p>',
              icon: 'FiCheckCircle',
              estimatedTime: '1-2 weeks processing'
            }
          ]
        },
        eligibilitySection: {
          title: 'Membership Eligibility',
          description: 'Different credit unions have different membership criteria. Find the type that matches you.',
          types: [
            {
              title: 'Community-Based',
              description: 'Open to residents of specific communities or regions',
              icon: 'FiMapPin',
              requirements: [
                'Must live or work in the designated area',
                'Proof of residence required',
                'Minimum initial deposit: ₵50-₵100',
                'One-time registration fee: ₵20-₵50'
              ],
              examples: 'Accra Community Credit Union, Kumasi Metropolitan Credit Union'
            },
            {
              title: 'Employment-Based',
              description: 'For employees of specific organizations or industries',
              icon: 'FiBriefcase',
              requirements: [
                'Must be employed by qualifying organization',
                'Employment verification letter required',
                'Minimum initial deposit: ₵100-₵200',
                'Payroll deduction available'
              ],
              examples: 'Teachers Credit Union, Health Workers Credit Union, Police Credit Union'
            },
            {
              title: 'Association-Based',
              description: 'Members of trade associations or professional groups',
              icon: 'FiUsers',
              requirements: [
                'Valid membership in parent association',
                'Association ID card required',
                'Minimum initial deposit: ₵75-₵150',
                'Annual association dues may apply'
              ],
              examples: 'Traders Credit Union, Farmers Credit Union, Artisans Credit Union'
            },
            {
              title: 'Family Membership',
              description: 'Available to family members of existing members',
              icon: 'FiHome',
              requirements: [
                'Must be immediate family of current member',
                'Proof of relationship required',
                'Same minimum deposits as primary member',
                'Sponsored by existing member'
              ],
              examples: 'Available at most credit unions as extended membership'
            }
          ]
        },
        documentationSection: {
          title: 'Required Documents',
          description: 'Prepare these documents before starting your application.',
          requirements: [
            {
              category: 'Identification',
              required: true,
              documents: [
                {
                  name: 'Ghana Card',
                  description: 'National identification card (preferred)',
                  alternatives: ['Valid Passport', "Driver's License", 'Voter ID Card']
                }
              ]
            },
            {
              category: 'Proof of Address',
              required: true,
              documents: [
                {
                  name: 'Utility Bill',
                  description: 'Recent water, electricity, or internet bill (within 3 months)',
                  alternatives: ['Bank Statement', 'Tenancy Agreement', 'Property Tax Receipt']
                }
              ]
            },
            {
              category: 'Passport Photos',
              required: true,
              documents: [
                {
                  name: 'Recent Photos',
                  description: '2 passport-sized photographs (taken within 6 months)',
                  alternatives: []
                }
              ]
            },
            {
              category: 'Employment Verification',
              required: false,
              documents: [
                {
                  name: 'Employment Letter',
                  description: 'Letter from employer confirming employment (for employer-based CUs)',
                  alternatives: ['Recent Pay Slip', 'Staff ID Card', 'Appointment Letter']
                }
              ]
            },
            {
              category: 'Association Membership',
              required: false,
              documents: [
                {
                  name: 'Association ID',
                  description: 'Valid membership card from parent association (for association-based CUs)',
                  alternatives: ['Association Certificate', 'Membership Receipt']
                }
              ]
            }
          ]
        },
        faqSection: {
          title: 'Frequently Asked Questions',
          items: [
            {
              question: 'How much does it cost to join a credit union?',
              answer: 'Membership fees vary by credit union, typically ranging from ₵50 to ₵200. This usually includes a one-time registration fee (₵20-₵50) and initial share purchase (₵50-₵150). The shares represent your ownership stake in the credit union and can be withdrawn when you close your membership.'
            },
            {
              question: 'Can I join more than one credit union?',
              answer: 'Yes, you can be a member of multiple credit unions as long as you meet each one\'s eligibility requirements. Many people join both a community-based credit union and an employer-based one to maximize their benefits and loan access.'
            },
            {
              question: 'How long does the application process take?',
              answer: 'Most applications are processed within 1-2 weeks. Some credit unions offer same-day approval for walk-in applications if all documents are in order. Once approved, you can immediately start using services like savings accounts. Loans typically require an additional application process.'
            },
            {
              question: 'What\'s the difference between shares and savings?',
              answer: 'Shares represent your ownership stake in the credit union and typically have a minimum balance requirement that must be maintained as long as you\'re a member. Savings are additional funds you deposit that earn dividends. Both earn returns, but shares demonstrate your commitment as an owner-member.'
            },
            {
              question: 'Are my savings safe in a credit union?',
              answer: 'Yes, credit unions are regulated by the Bank of Ghana and CUA Ghana provides oversight. Many credit unions also participate in deposit insurance schemes. Additionally, credit unions follow strict financial management practices and undergo regular audits.'
            },
            {
              question: 'What services can I access as a member?',
              answer: 'Members can access various services including: savings accounts, fixed deposit accounts, personal loans, business loans, emergency loans, micro-insurance, financial education, and member voting rights. Specific services vary by credit union.'
            },
            {
              question: 'Can I withdraw my shares?',
              answer: 'You can withdraw your shares when you close your membership, subject to any loan balances being paid off. Some credit unions allow partial share withdrawals above the minimum requirement, but policies vary.'
            },
            {
              question: 'Do I need to attend meetings?',
              answer: 'While not mandatory, members are encouraged to attend the Annual General Meeting (AGM) where important decisions are made and dividends are declared. This is where you exercise your voting rights and stay informed about your credit union\'s performance.'
            }
          ]
        },
        ctaSection: {
          title: 'Ready to Join?',
          description: 'Start your membership application today and experience the credit union difference.',
          primaryCta: {
            text: 'Apply Online',
            url: '/credit-unions/form'
          },
          secondaryCta: {
            text: 'Find Credit Unions',
            url: '/credit-unions/in-ghana'
          }
        }
      }
    });
    console.log('✅ Join a Credit Union Page seeded successfully\n');

    // 4. Seed Credit Union Application Form Page
    console.log('📝 Seeding Credit Union Application Form Page...');
    await strapi.documents('api::credit-unions-form-page.credit-unions-form-page').create({
      data: {
        heroSection: {
          badge: 'Apply Now',
          title: 'Credit Union Membership Application',
          description: 'Complete your application online in minutes. We\'ll review and contact you within 1-2 weeks.'
        },
        formIntroSection: {
          title: 'Apply for Membership',
          description: 'Fill out the form below to start your membership application. Make sure all information is accurate.',
          stats: [
            {
              label: 'Processing Time',
              value: '1-2 Weeks'
            },
            {
              label: 'Application Fee',
              value: '₵50-₵200'
            },
            {
              label: 'Success Rate',
              value: '95%'
            }
          ]
        },
        applicationForm: {
          title: 'Membership Application Form',
          description: 'Please provide accurate information. Fields marked with * are required.',
          submitUrl: '/api/membership-applications',
          successMessage: 'Thank you! Your application has been received. We will contact you within 1-2 weeks.',
          fieldGroups: [
            {
              title: 'Personal Information',
              fields: [
                {
                  name: 'firstName',
                  label: 'First Name',
                  type: 'text',
                  required: true,
                  placeholder: 'Enter your first name'
                },
                {
                  name: 'middleName',
                  label: 'Middle Name',
                  type: 'text',
                  required: false,
                  placeholder: 'Enter your middle name'
                },
                {
                  name: 'lastName',
                  label: 'Last Name',
                  type: 'text',
                  required: true,
                  placeholder: 'Enter your last name'
                },
                {
                  name: 'dateOfBirth',
                  label: 'Date of Birth',
                  type: 'date',
                  required: true
                },
                {
                  name: 'gender',
                  label: 'Gender',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                  ]
                },
                {
                  name: 'ghanaCard',
                  label: 'Ghana Card Number',
                  type: 'text',
                  required: true,
                  pattern: 'GHA-[0-9]{9}-[0-9]',
                  placeholder: 'GHA-XXXXXXXXX-X'
                }
              ]
            },
            {
              title: 'Contact Information',
              fields: [
                {
                  name: 'email',
                  label: 'Email Address',
                  type: 'email',
                  required: true,
                  placeholder: 'your.email@example.com'
                },
                {
                  name: 'phone',
                  label: 'Primary Phone Number',
                  type: 'tel',
                  required: true,
                  placeholder: '+233 XX XXX XXXX'
                },
                {
                  name: 'alternatePhone',
                  label: 'Alternate Phone Number',
                  type: 'tel',
                  required: false,
                  placeholder: '+233 XX XXX XXXX'
                },
                {
                  name: 'address',
                  label: 'Residential Address',
                  type: 'textarea',
                  required: true,
                  placeholder: 'Enter your full residential address'
                },
                {
                  name: 'city',
                  label: 'City/Town',
                  type: 'text',
                  required: true
                },
                {
                  name: 'region',
                  label: 'Region',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'greater-accra', label: 'Greater Accra' },
                    { value: 'ashanti', label: 'Ashanti' },
                    { value: 'eastern', label: 'Eastern' },
                    { value: 'western', label: 'Western' },
                    { value: 'central', label: 'Central' },
                    { value: 'northern', label: 'Northern' },
                    { value: 'volta', label: 'Volta' },
                    { value: 'brong-ahafo', label: 'Brong Ahafo' },
                    { value: 'upper-east', label: 'Upper East' },
                    { value: 'upper-west', label: 'Upper West' }
                  ]
                }
              ]
            },
            {
              title: 'Employment Information',
              fields: [
                {
                  name: 'employmentStatus',
                  label: 'Employment Status',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'employed', label: 'Employed' },
                    { value: 'self-employed', label: 'Self-Employed' },
                    { value: 'unemployed', label: 'Unemployed' },
                    { value: 'retired', label: 'Retired' },
                    { value: 'student', label: 'Student' }
                  ]
                },
                {
                  name: 'employer',
                  label: 'Employer Name',
                  type: 'text',
                  required: false,
                  placeholder: 'Enter employer name'
                },
                {
                  name: 'occupation',
                  label: 'Occupation/Position',
                  type: 'text',
                  required: false,
                  placeholder: 'Your job title or occupation'
                },
                {
                  name: 'monthlyIncome',
                  label: 'Monthly Income Range',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'below-1000', label: 'Below ₵1,000' },
                    { value: '1000-2000', label: '₵1,000 - ₵2,000' },
                    { value: '2000-5000', label: '₵2,000 - ₵5,000' },
                    { value: '5000-10000', label: '₵5,000 - ₵10,000' },
                    { value: 'above-10000', label: 'Above ₵10,000' }
                  ]
                }
              ]
            },
            {
              title: 'Credit Union Selection',
              fields: [
                {
                  name: 'creditUnion',
                  label: 'Preferred Credit Union',
                  type: 'select',
                  required: true,
                  options: '/api/credit-unions?fields[0]=name&fields[1]=id&sort=name:asc',
                  placeholder: 'Select a credit union'
                },
                {
                  name: 'membershipType',
                  label: 'Membership Type',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'individual', label: 'Individual' },
                    { value: 'joint', label: 'Joint (with spouse)' },
                    { value: 'corporate', label: 'Corporate/Business' }
                  ]
                },
                {
                  name: 'eligibilityBasis',
                  label: 'Eligibility Basis',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'community', label: 'Community/Residence' },
                    { value: 'employer', label: 'Employer' },
                    { value: 'association', label: 'Association Membership' },
                    { value: 'family', label: 'Family of Member' }
                  ]
                },
                {
                  name: 'referralMember',
                  label: 'Referring Member (if applicable)',
                  type: 'text',
                  required: false,
                  placeholder: 'Member name or ID'
                }
              ]
            },
            {
              title: 'Next of Kin',
              fields: [
                {
                  name: 'kinName',
                  label: 'Next of Kin Full Name',
                  type: 'text',
                  required: true,
                  placeholder: 'Full name of next of kin'
                },
                {
                  name: 'kinRelationship',
                  label: 'Relationship',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'spouse', label: 'Spouse' },
                    { value: 'parent', label: 'Parent' },
                    { value: 'child', label: 'Child' },
                    { value: 'sibling', label: 'Sibling' },
                    { value: 'other', label: 'Other' }
                  ]
                },
                {
                  name: 'kinPhone',
                  label: 'Next of Kin Phone',
                  type: 'tel',
                  required: true,
                  placeholder: '+233 XX XXX XXXX'
                },
                {
                  name: 'kinAddress',
                  label: 'Next of Kin Address',
                  type: 'textarea',
                  required: false,
                  placeholder: 'Address of next of kin'
                }
              ]
            }
          ],
          termsAndConditions: {
            required: true,
            text: 'I declare that the information provided is accurate and complete. I agree to abide by the bylaws and regulations of the credit union.',
            linkText: 'Read full terms and conditions',
            linkUrl: '/terms'
          }
        },
        supportSection: {
          title: 'Need Help?',
          description: 'Our team is here to assist you with your application.',
          services: [
            {
              icon: 'FiPhone',
              title: 'Call Us',
              description: '+233 30 123 4567',
              link: 'tel:+233301234567'
            },
            {
              icon: 'FiMail',
              title: 'Email Us',
              description: 'membership@cuaghana.org',
              link: 'mailto:membership@cuaghana.org'
            },
            {
              icon: 'FiMessageCircle',
              title: 'Live Chat',
              description: 'Chat with support (Mon-Fri, 9am-5pm)',
              link: '#chat'
            }
          ]
        }
      }
    });
    console.log('✅ Credit Union Application Form Page seeded successfully\n');

    // 5. Seed For Members Page
    console.log('📝 Seeding For Members Page...');
    await strapi.documents('api::credit-unions-members-page.credit-unions-members-page').create({
      data: {
        heroSection: {
          badge: 'For Members',
          title: 'Member Resources',
          description: 'Access tools, resources, and support designed exclusively for credit union members.'
        },
        resourcesSection: {
          title: 'Downloadable Resources',
          description: 'Access forms, guides, and important documents to help manage your membership.',
          resources: [
            {
              title: 'Member Handbook 2025',
              description: 'Complete guide to credit union membership, benefits, and responsibilities',
              fileType: 'PDF',
              fileSize: '2.5 MB',
              icon: 'FiBook',
              downloadUrl: '/uploads/member_handbook_2025.pdf',
              category: 'Guides'
            },
            {
              title: 'Loan Application Form',
              description: 'Standard loan application form for all credit unions',
              fileType: 'PDF',
              fileSize: '450 KB',
              icon: 'FiFileText',
              downloadUrl: '/uploads/loan_application_form.pdf',
              category: 'Forms'
            },
            {
              title: 'Share Withdrawal Form',
              description: 'Request withdrawal of shares above minimum requirement',
              fileType: 'PDF',
              fileSize: '320 KB',
              icon: 'FiFileText',
              downloadUrl: '/uploads/share_withdrawal_form.pdf',
              category: 'Forms'
            },
            {
              title: 'Financial Planning Guide',
              description: 'Step-by-step guide to creating a personal financial plan',
              fileType: 'PDF',
              fileSize: '1.8 MB',
              icon: 'FiBook',
              downloadUrl: '/uploads/financial_planning_guide.pdf',
              category: 'Guides'
            },
            {
              title: 'Savings Tips Booklet',
              description: 'Practical tips for building your savings and achieving goals',
              fileType: 'PDF',
              fileSize: '980 KB',
              icon: 'FiBook',
              downloadUrl: '/uploads/savings_tips_booklet.pdf',
              category: 'Guides'
            },
            {
              title: 'Complaint Form',
              description: 'Submit feedback or complaints about credit union services',
              fileType: 'PDF',
              fileSize: '280 KB',
              icon: 'FiFileText',
              downloadUrl: '/uploads/complaint_form.pdf',
              category: 'Forms'
            }
          ]
        },
        servicesSection: {
          title: 'Member Services',
          description: 'Services available to all credit union members.',
          services: [
            {
              icon: 'FiDollarSign',
              title: 'Savings Accounts',
              description: 'Multiple savings options with competitive dividends',
              features: [
                'No minimum balance requirement',
                'Quarterly dividend payments',
                'Mobile and online access',
                'Automatic transfers available'
              ]
            },
            {
              icon: 'FiCreditCard',
              title: 'Personal Loans',
              description: 'Affordable loans for your personal needs',
              features: [
                'Rates from 12-18% per annum',
                'Up to 5 years repayment term',
                'Quick approval (1-2 weeks)',
                'Flexible repayment options'
              ]
            },
            {
              icon: 'FiBriefcase',
              title: 'Business Loans',
              description: 'Financing to grow your business',
              features: [
                'Working capital loans',
                'Equipment financing',
                'Business expansion loans',
                'Competitive rates'
              ]
            },
            {
              icon: 'FiHome',
              title: 'Emergency Loans',
              description: 'Quick access to funds in times of need',
              features: [
                'Same-day approval for members',
                'Up to 3x your savings balance',
                'Short-term repayment (3-12 months)',
                'Minimal documentation'
              ]
            },
            {
              icon: 'FiPieChart',
              title: 'Fixed Deposits',
              description: 'Lock in higher returns on your savings',
              features: [
                'Higher dividend rates',
                'Terms from 3-36 months',
                'Auto-renewal options',
                'Can be used as loan collateral'
              ]
            },
            {
              icon: 'FiShield',
              title: 'Micro-Insurance',
              description: 'Affordable insurance products for members',
              features: [
                'Life insurance coverage',
                'Loan protection insurance',
                'Savings protection',
                'Low premiums'
              ]
            }
          ]
        },
        toolsSection: {
          title: 'Member Tools',
          services: [
            {
              icon: 'FiCalculator',
              title: 'Loan Calculator',
              description: 'Calculate your monthly loan payments and total interest',
              link: '/tools/loan-calculator'
            },
            {
              icon: 'FiPieChart',
              title: 'Savings Planner',
              description: 'Set and track your savings goals with our interactive planner',
              link: '/tools/savings-planner'
            },
            {
              icon: 'FiTrendingUp',
              title: 'Investment Tracker',
              description: 'Monitor your shares, dividends, and overall portfolio',
              link: '/tools/investment-tracker'
            },
            {
              icon: 'FiFileText',
              title: 'Budget Template',
              description: 'Download our Excel budget template to manage your finances',
              link: '/tools/budget-template'
            }
          ]
        },
        trainingSection: {
          title: 'Training & Education',
          description: 'Enhance your financial literacy with our free training programs.',
          programs: [
            {
              title: 'Financial Literacy Workshop',
              description: 'Learn the basics of personal finance, budgeting, and saving',
              duration: '2 days',
              level: 'Beginner',
              schedule: 'Monthly',
              registrationLink: '/training/register/financial-literacy'
            },
            {
              title: 'Business Management Training',
              description: 'Essential skills for small business owners and entrepreneurs',
              duration: '5 days',
              level: 'Intermediate',
              schedule: 'Quarterly',
              registrationLink: '/training/register/business-management'
            },
            {
              title: 'Investment & Retirement Planning',
              description: 'Plan for your financial future with smart investment strategies',
              duration: '3 days',
              level: 'Intermediate',
              schedule: 'Bi-annually',
              registrationLink: '/training/register/investment-planning'
            },
            {
              title: 'Credit Union Leadership',
              description: 'For members interested in serving on boards and committees',
              duration: '1 week',
              level: 'Advanced',
              schedule: 'Annually',
              registrationLink: '/training/register/leadership'
            }
          ]
        },
        ctaSection: {
          title: 'Need Assistance?',
          description: 'Contact your credit union directly for personalized support.',
          primaryCta: {
            text: 'Find Your Credit Union',
            url: '/credit-unions/in-ghana'
          },
          secondaryCta: {
            text: 'Contact CUA Ghana',
            url: '/contact'
          }
        }
      }
    });
    console.log('✅ For Members Page seeded successfully\n');

    // 6. Seed Success Stories Overview Page
    console.log('📝 Seeding Success Stories Page...');
    await strapi.documents('api::credit-unions-success-stories-page.credit-unions-success-stories-page').create({
      data: {
        heroSection: {
          badge: 'Success Stories',
          title: 'Real Stories, Real Impact',
          description: 'Discover how credit unions are transforming lives across Ghana. These are real stories from real members.'
        },
        introSection: {
          title: 'Stories of Transformation',
          description: 'Read inspiring stories from credit union members who have achieved their dreams through cooperative finance.',
          stats: [
            {
              label: 'Success Stories',
              value: '250+'
            },
            {
              label: 'Lives Impacted',
              value: '10,000+'
            },
            {
              label: 'Total Loans Disbursed',
              value: '₵50M+'
            },
            {
              label: 'Jobs Created',
              value: '2,000+'
            }
          ]
        },
        categoriesSection: {
          title: 'Browse by Category',
          categories: [
            {
              name: 'Business Growth',
              description: 'Stories of business expansion and entrepreneurship success',
              icon: 'FiTrendingUp',
              color: '#10B981',
              storyCount: 85,
              slug: 'business-growth'
            },
            {
              name: 'Agricultural',
              description: 'Farmers and agricultural achievements through credit union support',
              icon: 'FiSun',
              color: '#F59E0B',
              storyCount: 62,
              slug: 'agricultural'
            },
            {
              name: 'Personal Finance',
              description: 'Individual financial success stories and life transformations',
              icon: 'FiDollarSign',
              color: '#3B82F6',
              storyCount: 58,
              slug: 'personal-finance'
            },
            {
              name: 'Community Impact',
              description: 'Community development projects and collective achievements',
              icon: 'FiUsers',
              color: '#8B5CF6',
              storyCount: 35,
              slug: 'community-impact'
            },
            {
              name: 'Women Empowerment',
              description: 'Stories of women achieving financial independence and success',
              icon: 'FiHeart',
              color: '#EC4899',
              storyCount: 42,
              slug: 'women-empowerment'
            }
          ]
        },
        ctaSection: {
          title: 'Have a Story to Share?',
          description: 'We\'d love to hear your credit union success story and share it with others.',
          primaryCta: {
            text: 'Submit Your Story',
            url: '/contact?subject=success-story'
          },
          secondaryCta: {
            text: 'View All Stories',
            url: '/success-stories'
          }
        }
      }
    });
    console.log('✅ Success Stories Page seeded successfully\n');

    console.log('✅ All Credit Unions pages seeded successfully!\n');

  } catch (error) {
    console.error('❌ Error seeding Credit Unions pages:', error);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedCreditUnionsPages(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
