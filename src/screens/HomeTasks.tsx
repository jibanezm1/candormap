import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, ActivityIndicator, ImageBackground, Image, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Tasks from './Tasks';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabeza from '../components/molecules/Header';
import { Modalize } from 'react-native-modalize';

import { Text } from 'react-native-paper';
import colors from '../styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FirstRoute = (props) => (
  <Tasks data={props.data} estado={true} />
);

const SecondRoute = (props) => (
  <Tasks data={props.data} estado={false} />
);

export default function HomeTask() {
  const layout = useWindowDimensions();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pendiente' },
    { key: 'second', title: 'Realizadas' },
  ]);
  const [data, setData] = React.useState([]);
  const [nodata, setNoData] = React.useState([]);
  const windowWidth = Dimensions.get('window').width; // Ancho de la ventana
  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // <-- Agregado estado para controlar el loading
  const perfilNombre = (idPerfil: string) => {

    const perfiles: { [key: string]: string } = {
      '1': 'Investigador',
      '2': 'Encuestado',
      '3': 'Administrador',
      '4': 'Revisor'
    };
    return perfiles[idPerfil] || 'Perfil no encontrado';

  };
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

  const fetchDataFromAPI = React.useCallback(() => {
    setLoading(true);
    if (currentUser && currentUser.idUsuario) {
      axios.get(`https://candormap.cl/api/cuestionarios?idUsuario=${currentUser.idUsuario}`)
        .then(response => {
          setData(response.data.cuestionariosNoResueltos);
          setNoData(response.data.cuestionariosResueltos);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching data", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  React.useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  useFocusEffect(
    React.useCallback(() => {
      fetchDataFromAPI();
      return () => { };
    }, [fetchDataFromAPI])
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute data={data} />;
      case 'second':
        return <SecondRoute data={nodata} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (<ImageBackground
    source={require('../assets/images/crs.png')}
    style={{ width: "100%", height: "100%" }}
  >

    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Cabeza />

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={require('../assets/images/logos.png')}
          style={{
            height: 170, // Puedes ajustar esto según necesites
            width: windowWidth * 0.8, // 80% del ancho de la pantalla
            resizeMode: 'contain', // Asegura que la imagen se ajuste dentro de las dimensiones
          }}
        />
       
      </View>


      <Modalize
        panGestureEnabled={false}

        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60
        }}
        withHandle={false}
        alwaysOpen={400}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          nestedScrollEnabled: true, // Enable nested scrolling if possible
        }}
      >
        <View style={{
          flexDirection: "row",
          marginHorizontal: 30,
          marginTop: 40
        }}>
          <Image
            source={require('../assets/images/a.png')}
            style={{
              height: 50,
              width: 50,
              borderWidth: 2,
              borderColor: "#fbfaf6",
              borderRadius: 50,
            }}
          />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{
              color: "#345c74",
              fontFamily: "Bold",
              fontSize: 18
            }}>{currentUser.nombre} {currentUser.apellidos} </Text>
            <Text style={{
              color: "#f58084",
              fontFamily: "Medium",
              fontSize: 12
            }}>
              {perfilNombre(currentUser.idPerfil)} , {currentUser.email}

            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile")

            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff2f2",
              width: 40,
              height: 40,
              borderRadius: 40
            }}>
            <Image
              source={require('../assets/images/a2.png')}
            />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1000 }}>

        {
          isLoading ?
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="blue" />
            </View> :
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
            />
        }




      </View>

      <View
        style={{
          flexDirection: "row",
          // paddingVertical: 5,
          backgroundColor: "#fff2f2",
          marginHorizontal: 20,
          paddingVertical: 15,
          alignItems: "center",
          borderRadius: 10,
          justifyContent: "center"
        }}
      >
        <Text style={{
          color: "#f58084",
          fontFamily: "Bold",
          fontSize: 13,
          marginRight: 5
        }}>Resume last lesson</Text>
        <Image source={require('../assets/images/a2.png')} />
      </View>
    </Modalize>
  </SafeAreaView>
  </ImageBackground >

  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabIndicator: {
    backgroundColor: 'blue',
  },
  tabLabel: {
    color: '#f58084',
  },
});
