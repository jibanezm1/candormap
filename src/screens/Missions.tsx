import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import TaskItem from '../components/molecules/TaskItem';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chapters from './Chapters';

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
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        nestedScrollEnabled={true}

        data={tasksData}
        keyExtractor={(item) => item.idMision.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={estado == 0 ? loadMoreData : null}
        ListFooterComponent={loading ? <ActivityIndicator /> : noMoreItems ? <View style={{ padding: 30, alignContent: "center", alignItems: "center" }}>
          <Text style={{ color: "black" }}>No quedan más elementos por mostrar.</Text>
        </View> : null}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 500
  },
});

export default Missions;

