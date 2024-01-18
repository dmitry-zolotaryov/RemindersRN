import { useContext, useEffect, useState } from "react";

import { ReminderContext } from "../contexts/ReminderContext";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoadingView from "../views/LoadingView";
import { Reminder } from "../models/Reminder";
import { Divider, List } from 'react-native-paper';

/// A screen displaying a list of all reminders
export default function RemindersScreen() {
  const reminderContext = useContext(ReminderContext);

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      const reminders = await reminderContext.loadReminders();
      console.log(reminders);
      setLoading(false);
      setReminders(reminders);
    })();
  }, [reminderContext]);

  return (
    <SafeAreaView style={styles.container}>
      { isLoading ? <LoadingView /> : (
        <FlatList
          data={reminders}
          renderItem={({item}) => <ReminderListItem reminder={item} />}
          keyExtractor={reminder => reminder.id.toString()}
          style={styles.flatList}
          ItemSeparatorComponent={Divider}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    flatList: {
        backgroundColor: 'transparent'
    }
});

type ReminderListItemProps = {
  reminder: Reminder;
}

const ReminderListItem = ({reminder}: ReminderListItemProps) => (
  <List.Item title={reminder.title} />
);