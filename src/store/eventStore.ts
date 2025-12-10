import { create } from 'zustand';

export interface Event {
  id: string;
  title: string;
  dayIndex: number;
  venueIndex: number;
  startMinute: number;
  duration: number;
}

interface EventStore {
  events: Event[];
  currentWeekStart: Date;
  venues: string[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  setEvents: (events: Event[]) => void;
  setVenues: (venues: string[]) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  currentWeekStart: new Date(2025, 11, 10),
  venues: ['Venue1', 'Venue2', 'Venue3', 'Venue4', 'Venue5', 'Venue6'],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
  setEvents: (events) => set({ events }),
  setVenues: (venues) => set({ venues }),
}));
