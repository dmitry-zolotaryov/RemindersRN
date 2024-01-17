import LoadingView from "../views/LoadingView";
import { ReminderContext } from "../contexts/ReminderContext";
import { useContext, useEffect, useState } from "react";
import { ScheduledReminder } from "@/models/ScheduledReminder";

/// Screen showing all scheduled reminders
export default function ScheduledRemindersScreen() {
  const reminderContext = useContext(ReminderContext);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [scheduledReminders, setScheduledReminders] = useState<ScheduledReminder[]>([]);

  useEffect(() => {
    (async function () {
      setScheduledReminders(await reminderContext.loadScheduledReminders());
      setLoading(false);
    })();
  }, [reminderContext]);

  return (
    <>
      {isLoading ? <LoadingView /> : (
        <></>
      )}
    </>
  )
}