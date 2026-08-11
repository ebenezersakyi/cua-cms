'use strict';

/**
 * conference-registration controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const EXPORT_COLUMNS = [
  ['fullName', 'Name'],
  ['gender', 'Gender'],
  ['age', 'Age'],
  ['phoneNumber', 'Telephone Number'],
  ['email', 'Email Address'],
  ['emergencyContact', 'Emergency Contact'],
  ['creditUnion', 'Credit Union / Institution'],
  ['chapter', 'Chapter'],
  ['role', 'Role'],
  ['expectations', 'Expectations'],
  ['tshirtSize', 'T-Shirt Size'],
  ['dietaryRestrictions', 'Dietary Restrictions'],
  ['excursionAccra', 'Excursion (Accra)'],
  ['status', 'Status'],
  ['adminNotes', 'Admin Notes'],
  ['createdAt', 'Registered At'],
];

const escapeCsv = (value) => {
  if (value === null || value === undefined) return '';
  return `"${String(value).replace(/"/g, '""')}"`;
};

module.exports = createCoreController(
  'api::conference-registration.conference-registration',
  ({ strapi }) => ({
    async exportCsv(ctx) {
      const entries = await strapi.db
        .query('api::conference-registration.conference-registration')
        .findMany({
          orderBy: { createdAt: 'asc' },
        });

      const header = EXPORT_COLUMNS.map(([, label]) => escapeCsv(label)).join(',');
      const rows = entries.map((entry) =>
        EXPORT_COLUMNS.map(([key]) => {
          let value = entry[key];
          if (key === 'excursionAccra') {
            value = value ? 'Yes' : 'No';
          }
          return escapeCsv(value);
        }).join(',')
      );

      ctx.body = {
        filename: `conference-registrations-${new Date().toISOString().slice(0, 10)}.csv`,
        count: entries.length,
        csv: [header, ...rows].join('\n'),
      };
    },
  })
);
