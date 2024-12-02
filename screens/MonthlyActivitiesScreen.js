import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../store';

const MonthlyActivitiesScreen = ({ route }) => {
  const { month } = route.params;
  const activities = useStore(state => state.activities);

  // Filtrar actividades por el mes seleccionado
  const filteredActivities = activities.filter(
    (activity) => new Date(activity.start_date).getMonth() + 1 === month
  );

  if (!filteredActivities.length) {
    return <Text style={styles.noHay}>No hay actividades registradas para este mes.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actividades del Mes {month}</Text>
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {item.name}</Text>
            <Text style={styles.cardContent}>
              Fecha: {new Date(item.start_date).toLocaleDateString()}
            </Text>
            <Text style={styles.cardContent}>Distancia: {item.distance} m</Text>
            <Text style={styles.cardContent}>Tiempo: {item.moving_time} seg</Text>
            <Text style={styles.cardContent}>
              Ganancia de Elevación: {item.elevation_gain} m
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 14,
  },
  noHay: {
    fontWeight: 'bold',
    color: '#ff5900',
    marginTop: 10,
    marginLeft: 10
  }
});

export default MonthlyActivitiesScreen;
