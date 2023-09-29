import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Discovery = () => {
  const markersData = [
    { id: 1, title: 'Misión 1', coordinate: { latitude: -33.4489, longitude: -70.6693 } }, // Coordenadas de un punto dentro de Santiago (ficticias)
    { id: 2, title: 'Misión 2', coordinate: { latitude: -33.4500, longitude: -70.6700 } }, // Coordenadas de otro punto dentro de Santiago (ficticias)
    // Agrega los otros marcadores aquí
  ];

  return (
    <View style={styles.container}>
      {/* Mapa a pantalla completa */}
      <MapView style={styles.map} initialRegion={{ latitude: -33.4489, longitude: -70.6693, latitudeDelta: 0.1, longitudeDelta: 0.1 }}>
        {/* Renderizar los marcadores */}
        {markersData.map(marker => (
          <Marker key={marker.id} coordinate={marker.coordinate} title={marker.title}>
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>{marker.title}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    backgroundColor: 'purple',
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Discovery;
