import { useMemo } from 'react';
import type { Room } from '../../types/homeassistant';
import { createRoomPath } from '../../utils/roomParser';

interface RoomSegmentsProps {
  rooms: Room[];
  selectedRooms: Map<number, string>;
  onRoomToggle: (roomId: number, roomName: string) => void;
  calibrationPoints: { vacuum: { x: number; y: number }; map: { x: number; y: number } }[];
  imageWidth: number;
  imageHeight: number;
  isStarted?: boolean;
}

export function RoomSegments({
  rooms,
  selectedRooms,
  onRoomToggle,
  calibrationPoints,
  imageWidth,
  imageHeight,
  isStarted,
}: RoomSegmentsProps) {
  const roomPaths = useMemo(() => {
    return rooms
      .filter((room) => room.visibility !== 'Hidden')
      .map((room) => ({
        room,
        path: createRoomPath(room, calibrationPoints, imageWidth, imageHeight),
      }));
  }, [rooms, calibrationPoints, imageWidth, imageHeight]);

  const handleRoomClick = (roomId: number, roomName: string) => {
    onRoomToggle(roomId, roomName);
  };

  if (!imageWidth || !imageHeight) {
    return null;
  }

  return (
    <svg
      className="vacuum-map__room-segments"
      width="100%"
      height="100%"
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    >
      {roomPaths.map(({ room, path }) => {
        const isSelected = selectedRooms.has(room.id);

        if (!path) {
          console.warn('No path for room:', room.id, room.name);
          return null;
        }

        return (
          <path
            key={room.id}
            d={path}
            className={`vacuum-map__room-segment ${isSelected ? 'vacuum-map__room-segment--selected' : ''}`}
            fill={isSelected ? 'var(--accent-bg, rgba(212, 175, 55, 0.3))' : 'transparent'}
            stroke={!isStarted && isSelected ? 'var(--accent-color, #D4AF37)' : 'rgba(255, 255, 255, 0.2)'}
            strokeWidth="2"
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleRoomClick(room.id, room.name);
            }}
            data-room-id={room.id}
            data-room-name={room.name}
          >
            <title>{room.name}</title>
          </path>
        );
      })}
    </svg>
  );
}
