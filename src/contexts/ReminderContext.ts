import { createContext } from 'react';
import { Reminder } from '../models/Reminder';
import { ScheduledReminder } from '../models/ScheduledReminder';

// The react context
export const ReminderContext = createContext({
  loadReminders: loadReminders,
  loadScheduledReminders: loadScheduledReminders
});

// Loads all of the reminders in the system in alphabetical order
async function loadReminders(): Promise<Reminder[]> {
  return reminders;
}

// Returns all scheduled reminders
async function loadScheduledReminders(): Promise<ScheduledReminder[]> {
  return scheduledReminders;
}

// MARK: Private

const reminders: Reminder[] = [
  { title: "Kristine", description: "The girl I met a party last friday." },
  { title: "What is bunkum?", description: "Bunkum is an old-fashioned and informal word that refers to foolish or insincere talk or ideas." }
]

const tomorrow: Date = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek: Date = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

const scheduledReminders: ScheduledReminder[] = [
  { reminder: reminders[0], on: tomorrow },
  { reminder: reminders[1], on: tomorrow },
  { reminder: reminders[0], on: nextWeek },
  { reminder: reminders[1], on: nextWeek },
]