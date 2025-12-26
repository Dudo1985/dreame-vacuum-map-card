import { useState } from 'react';
import { Modal, SegmentedControl } from '../common';
import { CleanGeniusMode } from './CleanGeniusMode';
import { CustomMode } from './CustomMode';
import type { Hass, HassEntity } from '../../types/homeassistant';
import './CleaningModeModal.scss';

interface CleaningModeModalProps {
  opened: boolean;
  onClose: () => void;
  entity: HassEntity;
  hass: Hass;
}

export function CleaningModeModal({
  opened,
  onClose,
  entity,
  hass,
}: CleaningModeModalProps) {
  // Get cleangenius mode from entity
  const cleangenius = entity.attributes.cleangenius || 'Off';
  const [isCleanGenius, setIsCleanGenius] = useState(cleangenius !== 'Off');
  
  // Get actual values from entity
  const cleaningMode = entity.attributes.cleaning_mode || 'Sweeping and mopping';
  const cleangeniusMode = entity.attributes.cleangenius_mode || 'Vacuum and mop';
  const suctionLevel = entity.attributes.suction_level || 'Standard';
  const wetnessLevel = entity.attributes.wetness_level || 20;
  const cleaningRoute = entity.attributes.cleaning_route || 'Standard';
  const maxSuctionPower = entity.attributes.max_suction_power || false;
  const selfCleanArea = entity.attributes.self_clean_area || 20;
  const mopPadHumidity = entity.attributes.mop_pad_humidity || 'Moist';

  const modeOptions = [
    { value: 'CleanGenius', label: 'CleanGenius' },
    { value: 'Custom', label: 'Custom' },
  ];

  // Get available options from entity
  const cleaningModeList: string[] = entity.attributes.cleaning_mode_list || [
    'Sweeping',
    'Mopping',
    'Sweeping and mopping',
    'Mopping after sweeping',
  ];
  
  const cleangeniusModeList: string[] = entity.attributes.cleangenius_mode_list || [
    'Vacuum and mop',
    'Mop after vacuum',
  ];
  
  const suctionLevelList: string[] = entity.attributes.suction_level_list || ['Quiet', 'Standard', 'Strong', 'Turbo'];
  const cleaningRouteList: string[] = entity.attributes.cleaning_route_list || ['Quick', 'Standard', 'Intensive', 'Deep'];

  // Service call helper
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

  // Get entity IDs based on the vacuum entity
  const baseEntityId = entity.entity_id.replace('vacuum.', '');
  const cleaningModeEntity = `select.${baseEntityId}_cleaning_mode`;
  const cleangeniusModeEntity = `select.${baseEntityId}_cleangenius_mode`;
  const cleangeniusEntity = `select.${baseEntityId}_cleangenius`;
  const suctionLevelEntity = `select.${baseEntityId}_suction_level`;
  const cleaningRouteEntity = `select.${baseEntityId}_cleaning_route`;
  const maxSuctionEntity = `switch.${baseEntityId}_max_suction_power`;
  const customMoppingModeEntity = `switch.${baseEntityId}_custom_mopping_mode`;
  const wetnessLevelEntity = `number.${baseEntityId}_wetness_level`;

  // Handle mode switching between CleanGenius and Custom
  const handleModeSwitch = (value: string) => {
    const isCleanGeniusMode = value === 'CleanGenius';
    setIsCleanGenius(isCleanGeniusMode);
    
    // Set custom_mopping_mode based on mode selection
    setSwitch(customMoppingModeEntity, !isCleanGeniusMode);
    
    // When switching to CleanGenius, activate routine cleaning
    if (isCleanGeniusMode) {
      setSelectOption(cleangeniusEntity, 'routine_cleaning');
    } else {
      // When switching to Custom, turn off CleanGenius
      setSelectOption(cleangeniusEntity, 'off');
    }
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="cleaning-mode-modal">
        {/* Mode Toggle */}
        <div className="cleaning-mode-modal__header">
          <SegmentedControl
            value={isCleanGenius ? 'CleanGenius' : 'Custom'}
            onChange={handleModeSwitch}
            options={modeOptions}
          />
        </div>

        {isCleanGenius ? (
          <CleanGeniusMode
            cleangeniusMode={cleangeniusMode}
            cleangeniusModeList={cleangeniusModeList}
            cleangenius={cleangenius}
            cleangeniusModeEntity={cleangeniusModeEntity}
            cleangeniusEntity={cleangeniusEntity}
            cleaningRouteEntity={cleaningRouteEntity}
            hass={hass}
          />
        ) : (
          <CustomMode
            cleaningMode={cleaningMode}
            cleaningModeList={cleaningModeList}
            suctionLevel={suctionLevel}
            suctionLevelList={suctionLevelList}
            wetnessLevel={wetnessLevel}
            mopPadHumidity={mopPadHumidity}
            cleaningRoute={cleaningRoute}
            cleaningRouteList={cleaningRouteList}
            maxSuctionPower={maxSuctionPower}
            selfCleanArea={selfCleanArea}
            cleaningModeEntity={cleaningModeEntity}
            suctionLevelEntity={suctionLevelEntity}
            wetnessLevelEntity={wetnessLevelEntity}
            cleaningRouteEntity={cleaningRouteEntity}
            maxSuctionEntity={maxSuctionEntity}
            hass={hass}
          />
        )}
      </div>
    </Modal>
  );
}
