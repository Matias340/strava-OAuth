import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useStore } from "../store";
import { useQuery } from "react-query";
import axios from "axios";
import { getActivities } from "../api/strava.api";

const ActivitiesScreen = ({ navigation }) => {
  const activities = useStore((state) => state.activities);
  const setActivities = useStore((state) => state.setActivities);
  const accessToken = useStore((state) => state.accessToken);

  // Usando React Query para obtener las actividades de Strava
  const { isLoading, error, data } = useQuery(
    "activities",
    getActivities(accessToken)
  );

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data, setActivities]);

  if (isLoading)
    return <ActivityIndicator size="large" style={styles.loader} />;
  if (error)
    return (
      <Text style={styles.errorText}>Error al cargar las actividades</Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actividades</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nombre:</Text>
            <Text style={styles.cardContent}>{item.name}</Text>

            <Text style={styles.cardTitle}>Fecha:</Text>
            <Text style={styles.cardContent}>
              {new Date(item.start_date).toLocaleDateString()}
            </Text>

            <Text style={styles.cardTitle}>Distancia:</Text>
            <Text style={styles.cardContent}>{item.distance} m</Text>

            <Text style={styles.cardTitle}>Tiempo:</Text>
            <Text style={styles.cardContent}>{item.moving_time} seg</Text>

            <Text style={styles.cardTitle}>Ganancia de Elevación:</Text>
            <Text style={styles.cardContent}>{item.elevation_gain} m</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Estadisticas mensuales")}
      >
        <Text style={styles.buttonText}>Ir a estadisiticas mensuales</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardContent: {
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#ff5900",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ActivitiesScreen;
