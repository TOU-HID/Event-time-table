import React, { useState, useEffect } from 'react';
import { Box, Button, Tabs, Tab } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEventStore, Event } from '../store/eventStore';
import { addDays, format } from 'date-fns';

import TimeSlotsColumn from './TimeSlotsColumn';
import VenuesHeader from './VenuesHeader';
import VenueColumn from './VenueColumn';
import AddEventModal from './AddEventModal';

import { SLOT_HEIGHT, TIME_START, TIME_END, SLOT_MINUTES } from '../constants';

const TimeTable: React.FC = () => {
  const { events, venues, currentWeekStart, addEvent, updateEvent, setEvents } =
    useEventStore();

  const [selectedDay, setSelectedDay] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [newEvent, setNewEvent] = useState<
    Partial<Event> & { venueIndexes?: number[] }
  >({
    title: '',
    dayIndex: 0,
    venueIndexes: [],
    startMinute: 0,
    duration: 15,
  });

  useEffect(() => {
    const saved = localStorage.getItem('events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEvents(parsed);
      } catch {
        localStorage.removeItem('events');
      }
    }
  }, [setEvents]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const handleTabChange = (_e: any, newVal: number) => {
    setSelectedDay(newVal);
  };

  const timeSlots = Array.from(
    { length: (TIME_END - TIME_START) / SLOT_MINUTES },
    (_, i) => {
      const minutes = TIME_START + i * SLOT_MINUTES;
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;
      return `${hour}:${min.toString().padStart(2, '0')}`;
    }
  );

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.venueIndexes?.length) return;

    if (selectedEvent) {
      const eventToUpdate = {
        ...newEvent,
        id: selectedEvent.id,
        venueIndex: selectedEvent.venueIndex,
      } as Event;

      updateEvent(eventToUpdate);
    } else {
      const newEvents = newEvent.venueIndexes.map((venueIndex) => ({
        id: Date.now().toString() + '-' + venueIndex,
        title: newEvent.title,
        dayIndex: newEvent.dayIndex,
        venueIndex,
        startMinute: newEvent.startMinute,
        duration: newEvent.duration,
      })) as Event[];

      newEvents.forEach((event) => addEvent(event));
    }

    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      dayIndex: 0,
      venueIndexes: [],
      startMinute: 0,
      duration: 15,
    });
  };

  const handleTimeChange = (date: Date | null) => {
    if (!date) return;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const startMin = hours * 60 + minutes - TIME_START;

    setNewEvent({
      ...newEvent,
      startMinute: Math.max(0, startMin),
    });
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      ...event,
      venueIndexes: [event.venueIndex],
    });
    setModalOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Button
          variant='contained'
          onClick={() => setModalOpen(true)}
          sx={{ m: 2 }}
        >
          Add Event
        </Button>

        <Tabs
          value={selectedDay}
          onChange={handleTabChange}
          variant='scrollable'
          scrollButtons='auto'
        >
          {days.map((day, i) => (
            <Tab
              key={i}
              label={
                <Box textAlign='center'>
                  <Box fontWeight='bold'>{format(day, 'EEEE')}</Box>
                  <Box fontSize='12px'>{`Date: ${format(
                    day,
                    'yyyy-MM-dd'
                  )}`}</Box>
                </Box>
              }
              sx={{
                paddingY: 1,
                paddingX: 2,
                width: '230px',
              }}
            />
          ))}
        </Tabs>

        <Box display='flex' overflow='hidden' height='calc(100vh - 120px)'>
          <TimeSlotsColumn timeSlots={timeSlots} />

          <Box flex={1} overflow='auto'>
            <VenuesHeader venues={venues} />

            <Box
              display='flex'
              height={`${timeSlots.length * SLOT_HEIGHT}px`}
              position='relative'
            >
              {venues.map((_, venueIndex) => (
                <VenueColumn
                  key={venueIndex}
                  dayIndex={selectedDay}
                  venueIndex={venueIndex}
                  slotHeight={SLOT_HEIGHT}
                  onEventClick={handleEditEvent}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <AddEventModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          days={days}
          venues={venues}
          handleAddEvent={handleAddEvent}
          handleTimeChange={handleTimeChange}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TimeTable;
