import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import TaskItem from '../components/molecules/TaskItem';

const Tasks = ({ data }) => {
  // Datos de ejemplo de la lista de tareas
  const tasksData = [
    {
      id: 1,
      title: 'Sucursal Banco Estado',
      description: 'Descripción de la tarea 1',
      price: '$0.03',
      duration: '3-4 min',
      imageSource: require('../assets/tarea1.png'),
    },
    {
      id: 2,
      title: 'Encuesta comida rápida',
      description: 'Descripción de la tarea 2',
      price: '$0.02',
      duration: '2-3 min',
      imageSource: require('../assets/tarea2.png'),
    },
    // Agrega más tareas aquí...
  ];

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        keyExtractor={(item) => item.cuestionarioId.toString()}
        renderItem={({ item }) => (
          <TaskItem
            title={item.titulo}
            description="Descripción no disponible" // Adapta esto según tu API
            price={`$${item.valorMonetario}`}
            duration={`${item.tiempoEstimado} min`}
            imageSource={require('../assets/tarea2.png')} // Esto puede requerir adaptación dependiendo de cómo manejes las imágenes
            cuestionario={item} // Pasando el objeto cuestionario completo

          />
        )}
      />
    </View>
  );
};

//  jibanez@quotidian.cl
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default Tasks;
