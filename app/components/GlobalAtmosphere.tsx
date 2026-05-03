'use client';

/**
 * GlobalAtmosphere — sage green background that shows through
 * between/under the BotanicalBackground layers.
 */
const GlobalAtmosphere = () => (
  <div className="fixed inset-0 z-[-1]" style={{ background: '#4A7055' }} />
);

export default GlobalAtmosphere;
