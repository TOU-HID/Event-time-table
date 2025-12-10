import { Box, Typography } from '@mui/material';
import { TIME_START, SLOT_MINUTES } from '../constants';
import { Event } from '../store/eventStore';

interface EventCardProps {
  event: Event;
  slotHeight: number;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  slotHeight,
  onClick,
}) => {
  const height = ((event.duration + 15) / SLOT_MINUTES) * slotHeight;
  const top = (event.startMinute / SLOT_MINUTES) * slotHeight;

  const startHours = Math.floor((TIME_START + event.startMinute) / 60);
  const startMins = (TIME_START + event.startMinute) % 60;
  const startTime = `${startHours.toString().padStart(2, '0')}:${startMins
    .toString()
    .padStart(2, '0')}`;

  const endHours = Math.floor(
    (TIME_START + event.startMinute + event.duration) / 60
  );
  const endMins = (TIME_START + event.startMinute + event.duration) % 60;
  const endTime = `${endHours.toString().padStart(2, '0')}:${endMins
    .toString()
    .padStart(2, '0')}`;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top,
        left: 0,
        width: '100%',
        height,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#e0e0e0',
          border: '1px solid #ccc',
          padding: '4px',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Typography>
          {startTime} - {endTime}
        </Typography>
        {event.title}
      </Box>
    </Box>
  );
};

export default EventCard;
