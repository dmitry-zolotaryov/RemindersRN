import { createContext } from 'react';
import { Reminder } from '../models/Reminder';
import { ScheduledReminder } from '../models/ScheduledReminder';

// The type of the reminder context provider
export type ReminderContextProvider = {
  loadReminders(): Promise<Reminder[]>;
  loadScheduledReminders(): Promise<ScheduledReminder[]>;
}

// The reminder context provider
export const ReminderContext = createContext<ReminderContextProvider>({
  loadReminders: () => Promise.resolve([]),
  loadScheduledReminders: () => Promise.resolve([]),
});