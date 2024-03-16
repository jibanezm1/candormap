import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import TaskItem from '../components/molecules/TaskItem';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chapters from './Chapters';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { Color } from '../styles/Global';

const Missions = ({ estado }: { estado: any }) => {
  const [tasksData, setTasksData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [noMoreItems, setNoMoreItems] = useState(false); // Nuevo estado para verificar si no hay más elementos
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const [currentUser, setCurrentUser] = React.useState([]);
  const navigation = useNavigation();
  // useEffect para manejar el enfoque
  useEffect(() => {
    if (isFocused) {
      // Reiniciar estados relevantes
      setPage(1);
      setTasksData([]);
      setNoMoreItems(false);
    }
  }, [isFocused]);
  // useEffect para cargar el currentUser desde AsyncStorage
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Error al leer el valor de AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect para cargar datos desde la API
  useEffect(() => {
    if (currentUser && currentUser.idUsuario) {


      var apiUrl = "";

      if (estado == 0) {
        apiUrl = `https://candormap.cl/api/misiones-home?page=${page}&perPage=${perPage}&idUsuario=${currentUser.idUsuario}`;
      } else {
        apiUrl = `https://candormap.cl/api/misiones-resueltas?idUsuario=${currentUser.idUsuario}`;
      }

      if (loading || noMoreItems) return;
      setLoading(true);

      axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          if (data.length === 0) {
            setNoMoreItems(true);
          } else {
            setTasksData(prevData => [...prevData, ...data]);
            setPage(prevPage => prevPage + 1);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data from API: ', error);
          setLoading(false);
        });
    }

  }, [page, perPage, noMoreItems, currentUser]);  // Añadir currentUser a la lista de dependencias


  const onSubmit = (estado: any, cuestionarioData: any, mision: any, instrucciones: any) => {

    if (estado) {
      if (instrucciones) {
        navigation.navigate("Details", {
          cuestionarioData: cuestionarioData,
          mision: mision,
          instrucciones: instrucciones
        })
      }
    } else {

      Alert.alert("No puedes realizar esta misión, ya que no has completado la misión anterior.");
    }
  }

  interface Item {
    titulo: string;
    descripcion: string;
    recompensa: number;
    tiempo: string;
    idCuestionario0: {
      imagenIcono: string;
    };
    instrucciones: string;
    idUsuario: string;
  }
  const colores = ["#f9e1fc", "#e8f1fd", "#e5ffef", "#fbfaf6"];

  const renderItem = ({ item }: { item: Item }) => {
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    return (
      <Chapters
        title={item.titulo}
        description={item.descripcion}
        price={`$${item.recompensa}`}
        duration={item.tiempo}
        imageSource={item.idCuestionario0.imagenIcono}
        cuestionario={item.idCuestionario0}
        instrucciones={item.instrucciones}
        estado={true}
        mision={item}
        onPressTask={onSubmit}
        colorAleatorio={colorAleatorio}
      />

    );
  };

  const loadMoreData = () => {
    if (!loading && !noMoreItems) {
      setPage(page + 1);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {
        tasksData.length ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {tasksData.map((item, index) => (
              <Chapters
                title={item.titulo}
                description={item.descripcion}
                price={`$${item.recompensa}`}
                duration={item.tiempo}
                imageSource={item.idCuestionario0.imagenIcono}
                cuestionario={item.idCuestionario0}
                instrucciones={item.instrucciones}
                estado={true}
                mision={item}
                onPressTask={onSubmit}
              />
            ))}
            {tasksData.length ? (
              <View style={{ padding: 30, marginBottom: 300, alignContent: "center", alignItems: "center" }}>
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


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 150
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

export default Missions;

