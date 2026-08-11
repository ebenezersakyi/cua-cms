import React from 'react';
import { Button } from '@strapi/design-system';
import { getFetchClient } from '@strapi/strapi/admin';

const CONFERENCE_UID = 'api::conference-registration.conference-registration';

// "Export CSV" button shown on the Conference Registration list view only.
// Written with React.createElement (no JSX) so it compiles as plain .js.
const ExportConferenceRegistrations = () => {
  const [loading, setLoading] = React.useState(false);

  if (
    typeof window === 'undefined' ||
    !window.location.pathname.includes(CONFERENCE_UID)
  ) {
    return null;
  }

  const handleExport = async () => {
    setLoading(true);
    try {
      const { get } = getFetchClient();
      const { data } = await get('/conference-registrations/export');
      // BOM so Excel opens it with correct encoding
      const blob = new Blob(['﻿' + data.csv], {
        type: 'text/csv;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Conference registrations export failed:', error);
      window.alert('Export failed. Please try again.');
    }
    setLoading(false);
  };

  return React.createElement(
    Button,
    { onClick: handleExport, loading, variant: 'secondary' },
    'Export CSV'
  );
};

export default {
  config: {},
  bootstrap(app) {
    app.getPlugin('content-manager').injectComponent('listView', 'actions', {
      name: 'export-conference-registrations',
      Component: ExportConferenceRegistrations,
    });
  },
};
