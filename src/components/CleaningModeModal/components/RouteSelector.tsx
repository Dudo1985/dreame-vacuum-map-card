import { CircularButton } from '../../common';
import type { CleaningRoute } from '../../../types/vacuum';
import { getCleaningRouteIcon, convertToLowerCase } from '../../../utils';

interface RouteSelectorProps {
  cleaningRoute: string;
  cleaningRouteList: string[];
  onSelect: (entityId: string, value: string) => void;
  entityId: string;
}

export function RouteSelector({ cleaningRoute, cleaningRouteList, onSelect, entityId }: RouteSelectorProps) {
  return (
    <div className="cleaning-mode-modal__route-grid">
      {cleaningRouteList.map((route, idx) => (
        <div key={idx} className="cleaning-mode-modal__route-option">
          <CircularButton
            size="small"
            selected={route === cleaningRoute}
            onClick={() => onSelect(entityId, convertToLowerCase(route))}
            icon={getCleaningRouteIcon(route as CleaningRoute)}
          />
          <span className="cleaning-mode-modal__route-label">{route}</span>
        </div>
      ))}
    </div>
  );
}
