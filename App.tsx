import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ReminderContext } from './src/contexts/ReminderContext';
import { makeReminderContextProvider } from './src/services/ReminderService';

import RemindersScreen from './src/screens/RemindersScreen';
import ScheduledRemindersScreen from './src/screens/ScheduledRemindersScreen';

const AppTab = createBottomTabNavigator();

export default function App() {
  const reminderContextProvider = makeReminderContextProvider();

  return (
    <ReminderContext.Provider value={reminderContextProvider}>
      <NavigationContainer>
        <AppTab.Navigator>
          <AppTab.Screen name="Schedule" component={ScheduledRemindersScreen} />
          <AppTab.Screen name="Reminders" component={RemindersScreen} />
        </AppTab.Navigator>
      </NavigationContainer>
    </ReminderContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
