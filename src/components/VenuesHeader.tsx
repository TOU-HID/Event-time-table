import { Box } from '@mui/material';
import { VENUE_COLUMN_WIDTH } from '../constants';

const VenuesHeader = ({ venues }: { venues: string[] }) => {
  return (
    <Box
      display='flex'
      bgcolor='white'
      borderBottom='1px solid #ccc'
      borderTop='1px solid #ccc'
      sx={{
        backgroundColor: 'gray',
      }}
    >
      {venues.map((venue, i) => (
        <Box
          key={i}
          width={`${VENUE_COLUMN_WIDTH}px`}
          flexShrink={0}
          padding='8px'
          textAlign='center'
          borderRight='1px solid #ccc'
          color={'white'}
          boxSizing='border-box'
        >
          {venue}
        </Box>
      ))}
    </Box>
  );
};

export default VenuesHeader;
