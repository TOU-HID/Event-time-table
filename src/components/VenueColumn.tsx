import { Box } from '@mui/material';
import { useEventStore } from '../store/eventStore';
import EventCard from './EventCard';
import type { Event } from '../store/eventStore';

interface VenueColumnProps {
  dayIndex: number;
  venueIndex: number;
  slotHeight: number;
  onEventClick: (event: Event) => void;
}

const VenueColumn: React.FC<VenueColumnProps> = ({
  dayIndex,
  venueIndex,
  slotHeight,
  onEventClick,
}) => {
  const { events } = useEventStore();
  const columnEvents = events.filter(
    (e) => e.dayIndex === dayIndex && e.venueIndex === venueIndex
  );

  return (
    <Box
      sx={{
        width: '216px',
        flexShrink: 0,
        borderRight: '1px solid #ccc',
        position: 'relative',
      }}
    >
      {columnEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          slotHeight={slotHeight}
          onClick={() => onEventClick(event)}
        />
      ))}
    </Box>
  );
};

export default VenueColumn;
