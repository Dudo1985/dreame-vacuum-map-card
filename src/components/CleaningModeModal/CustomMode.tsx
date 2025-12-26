import { Toggle, CircularButton } from '../common';
import type { Hass } from '../../types/homeassistant';

interface CustomModeProps {
  cleaningMode: string;
  cleaningModeList: string[];
  suctionLevel: string;
  suctionLevelList: string[];
  wetnessLevel: number;
  mopPadHumidity: string;
  cleaningRoute: string;
  cleaningRouteList: string[];
  maxSuctionPower: boolean;
  selfCleanArea: number;
  cleaningModeEntity: string;
  suctionLevelEntity: string;
  wetnessLevelEntity: string;
  cleaningRouteEntity: string;
  maxSuctionEntity: string;
  hass: Hass;
}

export function CustomMode({
  cleaningMode,
  cleaningModeList,
  suctionLevel,
  suctionLevelList,
  wetnessLevel,
  mopPadHumidity,
  cleaningRoute,
  cleaningRouteList,
  maxSuctionPower,
  selfCleanArea,
  cleaningModeEntity,
  suctionLevelEntity,
  wetnessLevelEntity,
  cleaningRouteEntity,
  maxSuctionEntity,
  hass,
}: CustomModeProps) {
  // Service call helpers
  const setSelectOption = (selectEntity: string, option: string) => {
    hass.callService('select', 'select_option', {
      entity_id: selectEntity,
      option: option,
    });
  };

  const setSwitch = (switchEntity: string, turnOn: boolean) => {
    hass.callService('switch', turnOn ? 'turn_on' : 'turn_off', {
      entity_id: switchEntity,
    });
  };

  const setNumber = (numberEntity: string, value: number) => {
    hass.callService('number', 'set_value', {
      entity_id: numberEntity,
      value: value,
    });
  };

  // Map cleaning modes to icons
  const getModeIcon = (mode: string): string => {
    if (mode.includes('Sweep') && mode.includes('Mop')) return '🔄';
    if (mode.includes('after')) return '➜';
    if (mode.includes('Mop')) return '💧';
    if (mode.includes('Sweep') || mode.includes('Vacuum')) return '🌀';
    return '⚙️';
  };

  // Map suction levels to icons
  const getSuctionIcon = (level: string): string => {
    if (level.includes('Quiet') || level.includes('Silent')) return '🌙';
    if (level.includes('Turbo')) return '⚡';
    if (level.includes('Strong')) return '🌀';
    return '🔄';
  };

  // Map routes to icons
  const getRouteIcon = (route: string): string => {
    if (route === 'Quick') return '⌇';
    if (route === 'Standard') return '≡';
    if (route === 'Intensive') return '⋮⋮';
    if (route === 'Deep') return '⫴';
    return '≡';
  };

  return (
    <div className="cleaning-mode-modal__content">
      {/* Custom Mode - Cleaning Mode */}
      <section className="cleaning-mode-modal__section">
        <h3 className="cleaning-mode-modal__section-title">Cleaning Mode</h3>
        <div className="cleaning-mode-modal__horizontal-scroll">
          {cleaningModeList.map((mode, idx) => (
            <div key={idx} className="cleaning-mode-modal__mode-option">
              <CircularButton
                size="small"
                selected={mode === cleaningMode}
                onClick={() => setSelectOption(cleaningModeEntity, mode)}
                icon={getModeIcon(mode)}
              />
              <span className="cleaning-mode-modal__mode-option-label">{mode}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Suction Power */}
      <section className="cleaning-mode-modal__section">
        <h3 className="cleaning-mode-modal__section-title">Suction Power</h3>
        <div className="cleaning-mode-modal__power-grid">
          {suctionLevelList.map((level, idx) => (
            <div key={idx} className="cleaning-mode-modal__power-option">
              <CircularButton
                size="small"
                selected={level === suctionLevel}
                onClick={() => setSelectOption(suctionLevelEntity, level)}
                icon={getSuctionIcon(level)}
              />
              <span className="cleaning-mode-modal__power-label">{level}</span>
            </div>
          ))}
        </div>

        {/* Max+ toggle */}
        <div className="cleaning-mode-modal__max-plus">
          <div className="cleaning-mode-modal__max-plus-header">
            <span className="cleaning-mode-modal__max-plus-title">Max+</span>
            <Toggle 
              checked={maxSuctionPower} 
              onChange={(checked) => setSwitch(maxSuctionEntity, checked)} 
            />
          </div>
          <p className="cleaning-mode-modal__max-plus-description">
            The suction power will be increased to the highest level, which is a single-use mode.
          </p>
        </div>
      </section>

      {/* Wetness */}
      <section className="cleaning-mode-modal__section">
        <h3 className="cleaning-mode-modal__section-title">Wetness</h3>

        {/* Slider */}
        <div className="cleaning-mode-modal__slider-container">
          <input
            type="range"
            min="0"
            max="30"
            value={wetnessLevel}
            onChange={(e) => setNumber(wetnessLevelEntity, parseInt(e.target.value))}
            className="cleaning-mode-modal__slider"
          />
          <div className="cleaning-mode-modal__slider-value">{wetnessLevel}</div>
        </div>

        {/* Labels */}
        <div className="cleaning-mode-modal__slider-labels">
          <span className={`cleaning-mode-modal__slider-label ${
            mopPadHumidity === 'Slightly dry' ? 'cleaning-mode-modal__slider-label--active' : 'cleaning-mode-modal__slider-label--inactive'
          }`}>
            Slightly dry
          </span>
          <span className={`cleaning-mode-modal__slider-label ${
            mopPadHumidity === 'Moist' ? 'cleaning-mode-modal__slider-label--active' : 'cleaning-mode-modal__slider-label--inactive'
          }`}>
            Moist
          </span>
          <span className={`cleaning-mode-modal__slider-label ${
            mopPadHumidity === 'Wet' ? 'cleaning-mode-modal__slider-label--active' : 'cleaning-mode-modal__slider-label--inactive'
          }`}>
            Wet
          </span>
        </div>
      </section>

      {/* Mop-washing frequency */}
      <div className="cleaning-mode-modal__setting cleaning-mode-modal__setting--clickable">
        <span className="cleaning-mode-modal__setting-label">Mop-washing frequency</span>
        <div className="cleaning-mode-modal__setting-value">
          <span>By Area {selfCleanArea}m²</span>
          <span className="cleaning-mode-modal__setting-arrow">›</span>
        </div>
      </div>

      {/* Route */}
      <section className="cleaning-mode-modal__section">
        <div className="cleaning-mode-modal__section-header">
          <h3 className="cleaning-mode-modal__section-title">Route</h3>
          <span className="cleaning-mode-modal__help-icon">?</span>
        </div>

        <div className="cleaning-mode-modal__route-grid">
          {cleaningRouteList.map((route, idx) => (
            <div key={idx} className="cleaning-mode-modal__route-option">
              <CircularButton
                size="small"
                selected={route === cleaningRoute}
                onClick={() => setSelectOption(cleaningRouteEntity, route)}
                icon={getRouteIcon(route)}
              />
              <span className="cleaning-mode-modal__route-label">{route}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
