import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, Dimensions, useWindowDimensions, StyleSheet, } from 'react-native'
import { Modalize } from 'react-native-modalize'
import Chapters from './Chapters'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../styles/Colors'
import Cabeza from '../components/molecules/Header'
import { ActivityIndicator } from 'react-native-paper'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Missions from './Missions'
import Discovery from './Discovery'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width; // Ancho de la ventana
const FirstRoute = () => (
  <Missions estado="0" />
);

const SecondRoute = () => (
  <Missions estado="1" />
);

const ThirtRoute = () => (
  <Discovery />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  thirt: ThirtRoute,
});
const perfilNombre = (idPerfil: string) => {
  const perfiles: { [key: string]: string } = {
    '1': 'Investigador',
    '2': 'Encuestado',
    '3': 'Administrador',
    '4': 'Revisor'
  };

  return perfiles[idPerfil] || 'Perfil no encontrado';
}
export default function HomeMissions() {

  const [currentUser, setCurrentUser] = React.useState([]);
  const navigation = useNavigation();
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
  const layout = useWindowDimensions();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Misiones' },
    { key: 'second', title: 'Resueltas' },
    { key: 'thirt', title: 'Explorar' },
  ]);

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
      <Modalize
        panGestureEnabled={false}

        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60
        }}
        withHandle={false}
        alwaysOpen={600}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
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
    top: -500,
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