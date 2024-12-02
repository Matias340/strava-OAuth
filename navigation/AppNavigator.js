import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import MonthlyStatsScreen from '../screens/MonthlyStatsScreen';
import MonthlyActivitiesScreen from '../screens/MonthlyActivitiesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Activities">
        <Stack.Screen name="Actividades" component={ActivitiesScreen} />
        <Stack.Screen name="Estadisticas mensuales" component={MonthlyStatsScreen} />
        <Stack.Screen name="Actividades mensuales" component={MonthlyActivitiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
