import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export const AuthScreen = ({ navigation }) => {
  const { loginWithStrava, authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      // Aquí puedo redirigir al usuario a otra pantalla si ya está autenticado
      navigation.navigate('ActivitiesScreen');
    }
  }, [authState, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!authState.isAuthenticated ? (
        <>
          <Text style={styles.text}>Por favor, inicia sesión con Strava</Text>
          <TouchableOpacity style={styles.button} onPress={loginWithStrava}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
     fontSize: 20,
     fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#ff5900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
