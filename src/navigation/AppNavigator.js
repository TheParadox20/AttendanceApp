import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentOnboardingScreen from '../screens/StudentOnboardingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen 
          name="StudentOnboarding" 
          component={StudentOnboardingScreen}
          options={{ title: 'Add New Student' }}
        />
        <Stack.Screen 
          name="Attendance" 
          component={AttendanceScreen}
          options={{ title: 'Mark Attendance' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 