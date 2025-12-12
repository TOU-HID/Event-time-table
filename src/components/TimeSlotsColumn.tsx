import { Box } from '@mui/material';
import { SLOT_HEIGHT } from '../constants';

const TimeSlotsColumn = ({ timeSlots }: { timeSlots: string[] }) => {
  return (
    <Box
      width='80px'
      flexShrink={0}
      position='sticky'
      left={0}
      zIndex={3}
      bgcolor='white'
      borderRight='1px solid #ccc'
    >
      {timeSlots.map((time, i) => (
        <Box
          key={i}
          height={`${SLOT_HEIGHT}px`}
          borderBottom='1px solid #ccc'
          display='flex'
          alignItems='center'
          justifyContent='center'
          fontSize='12px'
          boxSizing='border-box'
        >
          {time}
        </Box>
      ))}
    </Box>
  );
};

export default TimeSlotsColumn;
