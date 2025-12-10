import { Box } from '@mui/material';

const VenuesHeader = ({ venues }: { venues: string[] }) => {
  return (
    <Box
      display='flex'
      position='sticky'
      top={0}
      zIndex={1}
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
          width='200px'
          flexShrink={0}
          padding='8px'
          textAlign='center'
          borderRight='1px solid #ccc'
        >
          {venue}
        </Box>
      ))}
    </Box>
  );
};

export default VenuesHeader;
