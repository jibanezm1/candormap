import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Alert, Dimensions } from 'react-native';
import TaskItem from '../components/molecules/TaskItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Chapters from './Chapters';



// SCREEN CON EL LISTADO DE MISIONES O ENCUESTAS (SEGÚN EL ESTADO) DE LA ENCUESTA


type TasksScreenNavigationProp = any; // Placeholder type declaration

interface TasksProps {
  data: any[];
  estado: boolean;
}

const Tasks = ({ data, estado }: TasksProps) => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const windowWidth = Dimensions.get('window').width; // Ancho de la ventana

  const onSubmit = (props, cuestionario) => {


    navigation.navigate("Questionnarie", {
      cuestionarioData: cuestionario,
    })

    // if (estado) {
    //   if (instrucciones) {
    //     navigation.navigate("Questionnarie", {
    //       cuestionarioData: cuestionarioData,
    //       mision: mision,
    //       instrucciones: instrucciones
    //     })

    //   } else {
    //     console.log(mision);
    //     // navigation.navigate("Questionnarie", {
    //     //   cuestionarioData: cuestionarioData,
    //     //   mision: mision,
    //     // })
    //   }
    // } else {
    //   Alert.alert("No puedes realizar esta misión, ya que no has completado la misión anterior.");
    // }


  }
  const colores = ["#f9e1fc", "#e8f1fd", "#e5ffef", "#fbfaf6"];

  const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

  // Datos de ejemplo de la lista de tareas
  return (
    <View style={styles.container}>

      {
        data.length ? <FlatList
          nestedScrollEnabled={true}

          data={data}
          keyExtractor={(item) => item.cuestionarioId.toString()}
          renderItem={({ item }) => {

            return (


              <Chapters
                title={item.titulo}
                description={item.descripcion}
                price={`$${item.valorMonetario}`}
                duration={`${item.tiempoEstimado} min`}
                imageSource={item.imagenIcono}
                cuestionario={item}
                instrucciones={item.instrucciones}
                estado={estado}
                mision={null}
                onPressTask={onSubmit}
                colorAleatorio={colorAleatorio}
              />

            )
          }}
        /> : <View
          style={{ flex: 1, alignItems: 'center' }}
        >
          <Image source={require('../assets/sinencuestas.png')}
            style={{
              height: 150, // Puedes ajustar esto según necesites
              width: windowWidth * 0.8, // 80% del ancho de la pantalla
              resizeMode: 'contain', // Asegura que la imagen se ajuste dentro de las dimensiones
            }}
          />
          <Text
            style={{
              color: "#345c74",
              fontFamily: "Bold",
              fontSize: 13,
              marginHorizontal: 30,
              marginLeft: 100,
              width: windowWidth * 0.8, // 80% del ancho de la pantalla
            }}
          >Actualmente no tienes
            tareas o encuestas
            realizadas.
            ¡Revisa más tarde
            para nuevas oportunidades!</Text>

        </View>
      }
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
