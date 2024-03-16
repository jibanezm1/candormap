import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Alert, Dimensions } from 'react-native';
import TaskItem from '../components/molecules/TaskItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Chapters from './Chapters';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { ActivityIndicator } from 'react-native-paper';
import { Color } from '../styles/Global';



// SCREEN CON EL LISTADO DE MISIONES O ENCUESTAS (SEGÚN EL ESTADO) DE LA ENCUESTA


type TasksScreenNavigationProp = any; // Placeholder type declaration

interface TasksProps {
  data: any[];
  estado: boolean;
  loading: boolean;
}

const Tasks = ({ data, estado, loading }: TasksProps) => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const windowWidth = Dimensions.get('window').width; // Ancho de la ventana

  const onSubmit = (props, cuestionario, description) => {

    if (!estado) {
      Alert.alert(
        "Encuesta ya realizada",
        "Esta encuesta ya fue realizada, no puede volver a realizarla",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
      return;
    } else {
       navigation.navigate("Questionnarie", {
        cuestionarioData: cuestionario,
      })
    }
  }
  const colores = ["#f9e1fc", "#e8f1fd", "#e5ffef", "#fbfaf6"];

  const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large"  />
      </View>
    );
  }
  // Datos de ejemplo de la lista de tareas
  return (
    <View style={styles.container}>
      {
        data.length ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {data.map((item, index) => (
              <Chapters
                key={index}
                index={index}
                title={item.titulo}
                description={item.descripcion}
                price={`$${item.valorMonetario}`}
                duration={`${item.tiempoEstimado ? item.tiempoEstimado : 1} min`}
                imageSource={item.imagenIcono}
                cuestionario={item}
                instrucciones={item.instrucciones}
                estado={estado}
                mision={null}
                onPressTask={onSubmit}
                colorAleatorio={colorAleatorio}
              />
            ))}
            {data.length ? (
              <View style={{ padding: 30,   alignContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white" }}>No quedan más elementos por mostrar.</Text>
              </View>
            ) : null}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/sinencuestas.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.emptyText}>
              Actualmente no tienes tareas o encuestas realizadas. ¡Revisa más tarde para nuevas oportunidades!
            </Text>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top:150
  },
  container: {

    backgroundColor: Color.background,
  },
  scrollViewContent: {
    height: "100%",
    paddingBottom: 100, // Agrega espacio en la parte inferior si es necesario
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 150,
    width: "80%", // Ajustado para ser un porcentaje del ancho del contenedor
    resizeMode: 'contain',
  },
  emptyText: {
    color: "#345c74",
    fontFamily: "Bold",
    fontSize: 13,
    textAlign: 'center',
    marginHorizontal: 30,
  },
});

export default Tasks;
