import LoadingView from "../views/LoadingView";
import { ReminderContext } from "../contexts/ReminderContext";
import { useContext, useEffect, useState } from "react";
import { ScheduledReminder } from "@/models/ScheduledReminder";
import { SectionList } from "react-native";
import { ListItem, Divider, Text } from "@ui-kitten/components";
import SectionHeader from "../views/SectionHeader";

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

  const scheduledRemindersGroupedByDate: GroupedScheduleReminders[] = groupByDate(scheduledReminders);

  return (
    <>
      {isLoading ? <LoadingView /> : (
        <SectionList
          sections={scheduledRemindersGroupedByDate}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}) => (
            <ListItem title={item.reminder.title} description={item.on.toString()} />
          )}
          renderSectionHeader={({section: {label}}) => (
            <SectionHeader>{label}</SectionHeader>
          )}
          ItemSeparatorComponent={Divider}
          />
      )}
    </>
  )
}

type GroupedScheduleReminders = {
  upTo: Date;
  label: string;
  data: ScheduledReminder[];
}

function getToday(): Date {
  var now = new Date();
  now.setHours(23);
  now.setMinutes(59);
  now.setSeconds(59);
  return now;
}

function getTomorrow(): Date {
  var today = getToday();
  today.setDate(today.getDate() + 1);
  return today;
}

function getNextSevenDays(): Date {
  var today = getToday();
  today.setDate(today.getDate() + 7);
  return today;
}

function getNextThirtyDays(): Date {
  var today = getToday();
  today.setDate(today.getDate() + 30);
  return today;
}

function getAfterThirtyDays(): Date {
  var today = getToday();
  today.setFullYear(today.getFullYear() + 9999);
  return today;
}

/// Groups the scheduled reminders into a structure that is easy to display in a grouped list
function groupByDate(scheduledReminders: ScheduledReminder[]): GroupedScheduleReminders[] {
  const sorted = scheduledReminders.sort((a, b) => a.on.getTime() - b.on.getTime());

  const scheduledReminderGroups: GroupedScheduleReminders[] = [
    { upTo: getToday(), label: "Today", data: [] },
    { upTo: getTomorrow(), label: "Tomorrow", data: [] },
    { upTo: getNextSevenDays(), label: "Next few days", data: [] },
    { upTo: getNextThirtyDays(), label: "Next 30 days", data: [] },
    { upTo: getAfterThirtyDays(), label: "Much later", data: [] },
  ];

  var currentGroupIndex = 0;
  forloop: for (var i = 0; i < sorted.length; i++) {
    while (scheduledReminderGroups[currentGroupIndex].upTo < sorted[i].on) {
      currentGroupIndex += 1;
      if (currentGroupIndex >= scheduledReminderGroups.length) {
        break forloop;
      }
    }
    scheduledReminderGroups[currentGroupIndex].data.push(sorted[i]);
  }

  // removes empty groups
  return scheduledReminderGroups.filter((group) => group.data.length > 0);
}