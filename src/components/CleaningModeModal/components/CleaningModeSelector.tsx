import { CircularButton } from '../../common';
import type { CleaningMode } from '../../../types/vacuum';
import { getCleaningModeIcon, convertCleaningModeToService, getCleaningModeFriendlyName } from '../../../utils';

interface CleaningModeSelectorProps {
  cleaningMode: string;
  cleaningModeList: string[];
  onSelect: (entityId: string, value: string) => void;
  entityId: string;
}

export function CleaningModeSelector({
  cleaningMode,
  cleaningModeList,
  onSelect,
  entityId,
}: CleaningModeSelectorProps) {
  return (
    <div className="cleaning-mode-modal__power-grid">
      {cleaningModeList.map((mode, idx) => (
        <div key={idx} className="cleaning-mode-modal__mode-option">
          <CircularButton
            size="small"
            selected={mode === cleaningMode}
            onClick={() => onSelect(entityId, convertCleaningModeToService(mode as CleaningMode))}
            icon={getCleaningModeIcon(mode as CleaningMode)}
          />
          <span className="cleaning-mode-modal__mode-option-label">
            {getCleaningModeFriendlyName(mode as CleaningMode)}
          </span>
        </div>
      ))}
    </div>
  );
}
