import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, Animated, ImageBackground, Image, Dimensions, Platform, Alert, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Tasks from './Tasks';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabeza from '../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import Tooltip from "react-native-walkthrough-tooltip";

import { Text } from 'react-native-paper';
import colors from '../styles/Colors';

import { capitalizeInitials } from '../utils/aux';
import Icon from 'react-native-vector-icons/Ionicons';
import TooltipButton from '../components/atoms/Tooltip';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../styles/Global';


const windowHeight = Dimensions.get('window').height;
const desiredHeight = windowHeight * 0.55; // 80% de la altura de la pantalla

const FirstRoute = (props) => (
  <Tasks data={props.data} estado={true} loading={props.loading} />
);

const SecondRoute = (props) => (
  <Tasks data={props.data} estado={false} loading={props.loading} />
);

export default function HomeTask() {


  const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación

  useEffect(() => {
    // Iniciar la animación cuando el componente se monta
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 600, // Duración en milisegundos
      useNativeDriver: true,
    }).start();
  }, []);

  const logoStyle = {
    transform: [
      {
        translateY: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0], // Comienza 100 píxeles arriba y se mueve a su posición original
        }),
      },
    ],
  };
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [secondshowTooltip, setSecondShowTooltip] = React.useState(false);

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

  React.useEffect(() => {
    const checkTooltipShown = async () => {
      try {
        const tooltipShown = await AsyncStorage.getItem('tooltipShown1');
        console.log("tooltipShown1: ", tooltipShown);
        if (!tooltipShown) {
          setShowTooltip(false);
        }
      } catch (error) {
        console.error("Error al leer el valor de AsyncStorage:", error);
      }
    };

    checkTooltipShown();
  }, []);


  const closeTooltip = async () => {
    try {
      await AsyncStorage.setItem('tooltipShown1', 'true');
      setShowTooltip(false);
    } catch (error) {
      console.error("Error al guardar en AsyncStorage:", error);
    }
  };
  const closeTooltipHeader = async () => {
    try {
      await AsyncStorage.setItem('tooltipShown2', 'true');
      setSecondShowTooltip(false);
      setShowTooltip(true);
    } catch (error) {
      console.error("Error al guardar en AsyncStorage:", error);
    }
  };




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
        return <FirstRoute data={data} loading={loading} />;
      case 'second':
        return <SecondRoute data={nodata} loading={loading} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (

    <Tooltip
      isVisible={showTooltip}
      content={
        <TooltipButton index={1} content="En estas pestañas podras revisar cada una de tus tareas" onPress={closeTooltip} />
      }
      childContentSpacing={5}
      contentStyle={{
        backgroundColor: "white",
        height: 80,
        padding: Platform.OS === 'android' ? 0 : 10,
        width: ScreenWidth - 30,
        borderRadius: 10
      }}
      placement="top"
      onClose={() => closeTooltip()}
      useInteractionManager={true} // need this prop to wait for react navigation
    // below is for the status bar of react navigation bar
    >
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={styles.tabBar}
        labelStyle={styles.tabLabel}
      />
    </Tooltip>


  );




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>

      <Cabeza tittle="Tareas" />
      <ScrollView>
        <View style={{ marginHorizontal: 30 }}>
          <Animated.View style={logoStyle}>
            <TouchableOpacity onPress={() => { navigation.navigate("HomeTask") }} >
              <Text style={{ color: "#C889FF", fontSize: 40 }}>Tareas</Text>

            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={logoStyle}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("MissionsHome")
            }}>
              <Text style={{ color: "#DBDBDB", fontSize: 40 }}>Misiones</Text>

            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={logoStyle}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Discovery")
            }}>
              <Text style={{ color: "#DBDBDB", fontSize: 40 }}>Explorar</Text>
            </TouchableOpacity>

          </Animated.View>
          <Animated.View style={logoStyle}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("MissionsHome")
            }}>
              <Image source={require('../assets/images_black/abajo.png')} style={{ width: 84, height: 84 }} />

            </TouchableOpacity>
          </Animated.View>

        </View>
        <Tasks data={data} estado={true} loading={loading} />
      </ScrollView>

    </SafeAreaView >
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
