import { Reminder } from "@/models/Reminder";

// A scheduled reminder
export type ScheduledReminder = {
  id: number;
  reminder: Reminder;
  on: Date;
}
