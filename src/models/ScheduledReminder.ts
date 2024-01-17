import { Reminder } from "@/models/Reminder";

// A scheduled reminder
export type ScheduledReminder = {
  reminder: Reminder;
  on: Date;
}
