import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query'
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from './hooks/useAuth';
import { ZustandStoreProvider } from './store';
import ActivitiesScreen from './screens/ActivitiesScreen';  // Pantalla de actividades
import MonthlyStatsScreen from './screens/MonthlyStatsScreen';  // Pantalla de estadísticas mensuales
import MonthlyActivitiesScreen from './screens/MonthlyActivitiesScreen';
import { AuthScreen } from './screens/AuthScreen';  // Pantalla de autenticación (Strava OAuth)

const Stack = createStackNavigator();

const queryClient = new QueryClient()

export default function App() {
  const { authState, loginWithStrava } = useAuth(); 

  return (
    <QueryClientProvider client={queryClient}>
    <ZustandStoreProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          {!authState.isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthScreen} />
          ) : (
            <>
              <Stack.Screen name="Actividades" component={ActivitiesScreen} />
              <Stack.Screen name="Estadisticas mensuales" component={MonthlyStatsScreen} />
              <Stack.Screen name="Actividades mensuales" component={MonthlyActivitiesScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ZustandStoreProvider>
    </QueryClientProvider>
  );
}
