import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ReminderContext } from './src/contexts/ReminderContext';

import RemindersScreen from './src/screens/RemindersScreen';
import ScheduledRemindersScreen from './src/screens/ScheduledRemindersScreen';

const AppTab = createBottomTabNavigator();

export default function App() {
  const reminderContext = useContext(ReminderContext);

  return (
    <ReminderContext.Provider value={ reminderContext }>
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
