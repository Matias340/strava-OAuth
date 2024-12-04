// screens/MonthlyStatsScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { useStore } from "../store";
import { getActivities } from "../api/strava.api";

const MonthlyStatsScreen = ({ navigation }) => {
  const monthlyStats = useStore((state) => state.monthlyStats);
  const setMonthlyStats = useStore((state) => state.setMonthlyStats);
  const accessToken = useStore((state) => state.accessToken);

  const { data, error, isLoading } = useQuery(
    "Estadisticas mensuales",
    getActivities(accessToken)
  );

  useEffect(() => {
    if (data) {
      setMonthlyStats(data);
    }
  }, [data, setMonthlyStats]);

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error loading stats</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadisticas Mensuales</Text>
      <FlatList
        data={monthlyStats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Mes:</Text>
            <Text style={styles.cardContent}>
              {new Date(item.start_date).getMonth() + 1}
            </Text>
            <Text style={styles.cardTitle}>Distancia Total:</Text>
            <Text style={styles.cardContent}>{item.distance / 1000} km</Text>

            <Text style={styles.cardTitle}>Tiempo Total:</Text>
            <Text style={styles.cardContent}>{item.moving_time} min</Text>

            <Text style={styles.cardTitle}>Elevación total: </Text>
            <Text style={styles.cardContent}>
              {item.total_elevation_gain} m
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Actividades mensuales", {
                  month: new Date(item.start_date).getMonth() + 1,
                })
              }
            >
              <Text style={styles.buttonText}>Ver actividades del mes</Text>
            </TouchableOpacity>
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
  loading: {
    fontWeight: "bold",
    color: "#ff5900",
    marginTop: 10,
    marginLeft: 10,
  },
});

export default MonthlyStatsScreen;
