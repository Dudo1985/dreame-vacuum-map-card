import { Toggle } from '../common';
import type { Hass } from '../../types/homeassistant';

interface CleanGeniusModeProps {
  cleangeniusMode: string;
  cleangeniusModeList: string[];
  cleangenius: string;
  cleangeniusModeEntity: string;
  cleangeniusEntity: string;
  cleaningRouteEntity: string;
  hass: Hass;
}

export function CleanGeniusMode({
  cleangeniusMode,
  cleangeniusModeList,
  cleangenius,
  cleangeniusModeEntity,
  cleangeniusEntity,
  cleaningRouteEntity,
  hass,
}: CleanGeniusModeProps) {
  // Service call helpers
  const setSelectOption = (selectEntity: string, option: string) => {
    hass.callService('select', 'select_option', {
      entity_id: selectEntity,
      option: option,
    });
  };

  // Convert display value to service value for cleangenius mode
  const convertToServiceValue = (mode: string): string => {
    if (mode === 'Vacuum and mop') return 'vacuum_and_mop';
    if (mode === 'Mop after vacuum') return 'mop_after_vacuum';
    return mode;
  };

  // Handle deep cleaning toggle in CleanGenius mode
  const handleDeepCleaningToggle = (enabled: boolean) => {
    if (enabled) {
      // Enable deep cleaning mode and set route to Deep
      setSelectOption(cleangeniusEntity, 'deep_cleaning');
      setSelectOption(cleaningRouteEntity, 'Deep');
    } else {
      // Disable deep cleaning and set route to Standard
      setSelectOption(cleangeniusEntity, 'routine_cleaning');
      setSelectOption(cleaningRouteEntity, 'Standard');
    }
  };

  return (
    <div className="cleaning-mode-modal__content">
      {/* Cleaning Mode */}
      <section className="cleaning-mode-modal__section">
        <h3 className="cleaning-mode-modal__section-title">Cleaning Mode</h3>
        <div className="cleaning-mode-modal__mode-grid">
          {/* Use cleangenius_mode_list from entity */}
          {cleangeniusModeList.map((mode, idx) => {
            const isVacMop = mode === 'Vacuum and mop';
            const isMopAfter = mode === 'Mop after vacuum';
            return (
              <div
                key={idx}
                className={`cleaning-mode-modal__mode-card ${
                  mode === cleangeniusMode ? 'cleaning-mode-modal__mode-card--selected' : ''
                }`}
                onClick={() => setSelectOption(cleangeniusModeEntity, convertToServiceValue(mode))}
                style={{ cursor: 'pointer' }}
              >
                <div className={`cleaning-mode-modal__mode-icon cleaning-mode-modal__mode-icon--${isVacMop ? 'vac-mop' : 'mop-after'}`}>
                  <span>{isVacMop ? '🔄' : '➜'}</span>
                </div>
                <span className="cleaning-mode-modal__mode-label">
                  {isVacMop ? 'Vac & Mop' : isMopAfter ? 'Mop after Vac' : mode}
                </span>
                {mode === cleangeniusMode && (
                  <div className="cleaning-mode-modal__mode-checkmark">
                    <span>✓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Deep Cleaning */}
      <div className="cleaning-mode-modal__setting">
        <span className="cleaning-mode-modal__setting-label">Deep Cleaning</span>
        <Toggle 
          checked={cleangenius === 'Deep cleaning'} 
          onChange={handleDeepCleaningToggle} 
        />
      </div>
    </div>
  );
}
