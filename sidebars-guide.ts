import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * User guide sidebars — one per product.
 *
 * Every id is prefixed with its product folder, so any of these can be lifted
 * into a docs instance of its own later without a single URL changing.
 */
const sidebars: SidebarsConfig = {
  guideTmsSidebar: ['tms/index'],

  guideWmsSidebar: ['wms/index'],

  guideVoiceSidebar: ['voice/index'],
};

export default sidebars;
