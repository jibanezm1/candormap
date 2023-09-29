import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import TaskItem from '../components/molecules/TaskItem';

const Missions = () => {
  // Datos de ejemplo de la lista de tareas
  const tasksData = [
    {
      id: 7,
      title: 'Hábitos de compras',
      imageSource: require('../assets/iconos/1.png'),
      price: '$0.03',
      duration: '3-4 min',
    },
    {
      id: 8,
      title: 'Sostenibilidad',
      imageSource: require('../assets/iconos/2.png'),
      price: '$0.03',
      duration: '3-4 min',
    },
    {
      id: 9,
      title: 'Instituciones financieras',
      imageSource: require('../assets/iconos/3.png'),
      price: '$0.03',
      duration: '3-4 min',
    },
    {
      id: 10,
      title: 'Internet y teléfonos móviles',
      imageSource: require('../assets/iconos/4.png'),
      price: '$0.03',
      duration: '3-4 min',
    },
    {
      id: 11,
      title: 'Salud y bienestar personal',
      imageSource: require('../assets/iconos/5.png'),
      price: '$0.03',
      duration: '3-4 min',
    },
    {
      id: 12,
      title: 'Deportes y entretenimiento',
      imageSource: require('../assets/iconos/6.png'),
      price: '$0.03',
      duration: '3-4 min',
    },
    // Agrega más tareas aquí...
  ];


  return (
    <View style={styles.container}>

      <FlatList
        data={tasksData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            description={item.description}
            price={item.price}
            duration={item.duration}
            imageSource={item.imageSource}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default Missions;
