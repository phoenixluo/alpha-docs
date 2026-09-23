import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * User guide sidebars — one per product.
 *
 * Every id is prefixed with its product folder, so any of these can be lifted
 * into a docs instance of its own later without a single URL changing.
 */
const sidebars: SidebarsConfig = {
  guideTmsSidebar: [
    'tms/index',
    {
      type: 'category',
      label: '开始使用',
      collapsed: false,
      items: [
        'tms/getting-started/signup',
        'tms/getting-started/navigation',
        'tms/getting-started/concepts',
      ],
    },
    {
      type: 'category',
      label: '运单',
      items: [
        'tms/waybills/list',
        'tms/waybills/import',
        'tms/waybills/detail',
        'tms/waybills/events',
        'tms/waybills/labels',
        'tms/waybills/consolidate',
        'tms/waybills/subcontract',
        'tms/waybills/statuses',
      ],
    },
    {
      type: 'category',
      label: '配送',
      items: [
        'tms/delivery/planning',
        'tms/delivery/tracking',
        'tms/delivery/address',
      ],
    },
    {
      type: 'category',
      label: '司机',
      items: ['tms/driver/scan', 'tms/driver/pod'],
    },
  ],

  guideWmsSidebar: ['wms/index'],

  guideVoiceSidebar: ['voice/index'],
};

export default sidebars;
