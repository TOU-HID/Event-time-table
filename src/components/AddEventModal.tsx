import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  newEvent: any;
  setNewEvent: (value: any) => void;
  days: Date[];
  venues: string[];
  handleAddEvent: () => void;
  handleTimeChange: (date: Date | null) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  newEvent,
  setNewEvent,
  days,
  venues,
  handleAddEvent,
  handleTimeChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>

      <DialogContent>
        <TextField
          label='Title'
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          fullWidth
          margin='normal'
        />

        <FormControl fullWidth margin='normal'>
          <InputLabel style={{ backgroundColor: '#fff' }}>Day</InputLabel>
          <Select
            label={'Day'}
            value={newEvent.dayIndex}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                dayIndex: Number(e.target.value),
              })
            }
          >
            {days.map((day, i) => (
              <MenuItem key={i} value={i}>
                {format(day, 'EEEE, yyyy-MM-dd')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel style={{ backgroundColor: '#fff' }}>Venue</InputLabel>
          <Select
            multiple
            value={newEvent.venueIndexes || []}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                venueIndexes: e.target.value as number[],
              })
            }
            renderValue={(selected) =>
              (selected as number[]).map((i) => venues[i]).join(', ')
            }
          >
            {venues.map((venue, i) => (
              <MenuItem key={i} value={i}>
                {venue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <TimePicker
            label='Start Time'
            value={new Date(0, 0, 0, 9, newEvent.startMinute || 0)}
            onChange={handleTimeChange}
            ampm={false}
            minutesStep={15}
          />
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel style={{ backgroundColor: '#fff' }}>
            Duration (minutes)
          </InputLabel>
          <Select
            value={newEvent.duration}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                duration: Number(e.target.value),
              })
            }
          >
            {[15, 30, 45, 60, 90, 120].map((dur) => (
              <MenuItem key={dur} value={dur}>
                {dur} min
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddEvent} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
