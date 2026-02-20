import type { CleaningMode } from '../../types/homeassistant';
import type { SupportedLanguage } from '../../i18n/locales';
import { useTranslation } from '../../hooks';
import './ModeTabs.scss';
import { FlaskConical } from 'lucide-react';
import type { ReactElement } from 'react';

interface ModeTabsProps {
  selectedMode: CleaningMode;
  onModeChange: (mode: CleaningMode) => void;
  disabled?: boolean;
  language?: SupportedLanguage;
}

export function ModeTabs({ selectedMode, onModeChange, disabled = false, language = 'en' }: ModeTabsProps) {
  const { t } = useTranslation(language);

  const modes: { value: CleaningMode; label: string; icon?: ReactElement }[] = [
    { value: 'room', label: t('modes.room') },
    { value: 'all', label: t('modes.all') },
    { value: 'zone', label: t('modes.zone'), icon: <FlaskConical /> },
  ];

  return (
    <div className={`mode-tabs ${disabled ? 'mode-tabs--disabled' : ''}`}>
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onModeChange(mode.value)}
          className={`mode-tabs__button ${selectedMode === mode.value ? 'mode-tabs__button--active' : ''}`}
          disabled={disabled}
        >
          {mode.label}
          {mode.icon && <span className="mode-tabs__button-icon">{mode.icon}</span>}
        </button>
      ))}
    </div>
  );
}
