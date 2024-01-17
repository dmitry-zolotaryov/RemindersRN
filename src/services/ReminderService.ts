import { Reminder } from "@/models/Reminder";
import { ScheduledReminder } from "@/models/ScheduledReminder";
import { ReminderContextProvider } from "@/contexts/ReminderContext";

// Generates a reminder context provider
export function makeReminderContextProvider(): ReminderContextProvider {
  return {
    loadReminders: loadReminders,
    loadScheduledReminders: loadScheduledReminders,
  }
}

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
  { id: 1, title: "Kristine", description: "The girl I met a party last friday." },
  { id: 2, title: "What is bunkum?", description: "Bunkum is an old-fashioned and informal word that refers to foolish or insincere talk or ideas." }
]

const tomorrow: Date = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek: Date = new Date();
nextWeek.setDate(nextWeek.getDate() + 6);

const scheduledReminders: ScheduledReminder[] = [
  { id: 1, reminder: reminders[0], on: tomorrow },
  { id: 2, reminder: reminders[1], on: tomorrow },
  { id: 3, reminder: reminders[0], on: nextWeek },
  { id: 4, reminder: reminders[1], on: nextWeek },
]