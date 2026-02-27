import { Map, List } from 'lucide-react';
import type { RoomViewMode } from '../../types/homeassistant';
import './ViewToggleButton.scss';

interface ViewToggleButtonProps {
  viewMode: RoomViewMode;
  onToggle: () => void;
  mapLabel: string;
  listLabel: string;
}

export function ViewToggleButton({ viewMode, onToggle, mapLabel, listLabel }: ViewToggleButtonProps) {
  const isMapView = viewMode === 'map';
  const label = isMapView ? listLabel : mapLabel;
  const Icon = isMapView ? List : Map;

  return (
    <button className="view-toggle-button" onClick={onToggle} aria-label={label} title={label}>
      <Icon size={18} />
    </button>
  );
}
