import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle'
import { ProgressBar, MD3Colors } from 'react-native-paper';
import PrimaryButton from '../components/atoms/Buttons/PrimaryButton';
import MenuItem from '../components/molecules/MenuItem';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/usuariosSlice';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const tasksData = [
    {
      id: 1,
      title: 'Información personal',
      imageSource: require('../assets/iconos/informacion.png'),
    },
    {
      id: 2,
      title: 'Datos adicionales',
      imageSource: require('../assets/iconos/datos.png'),
    },
    {
      id: 3,
      title: 'Preguntas frecuentes',
      imageSource: require('../assets/iconos/preguntas.png'),
    },
    {
      id: 4,
      title: 'Contacto',
      imageSource: require('../assets/iconos/contacto.png'),
    },
    {
      id: 5,
      title: 'Notificaciones',
      imageSource: require('../assets/iconos/notificaciones.png'),
    },
    {
      id: 6,
      title: 'Acerca de',
      imageSource: require('../assets/iconos/acercade.png'),
    },
  ];

  const handleLogout = async () => {
    try {
      // 1. Elimina el usuario del AsyncStorage
      await AsyncStorage.removeItem('currentUser');

      // 2. Actualiza el estado de Redux (asumiendo que tienes una acción `logoutUser`)
      dispatch(logoutUser());

      // 3. Navega el usuario de regreso a la pantalla de login o inicio
      navigation.navigate('Welcome');  // Asume que tienes una pantalla llamada 'LoginScreen' en tu Navigator

    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  const footer = () => {
    return (<View>
      <Image style={{ width: "80%", height: 150 }} source={require('../assets/refer.png')} />
      <PrimaryButton
        type="primary"
        title="Invitar a un Amigo"
        size='small'
        style={{ width: '60%', margin: 35 }}
        onPress={() => { }} // Llama a la función handleLogin cuando se presione el botón
      />

    </View>)
  }
  return (
    <ScrollView style={{ backgroundColor: "white", padding: 10 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Investigador</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Text style={styles.title}>Encuestado</Text>


        </View>

      </View>
      <View style={styles.rowExpand}>
        <ProgressCircle
          percent={30}
          radius={50}
          borderWidth={8}
          color="rgba(46, 58, 89, 1)"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 18 }}>{'30%'}</Text>
        </ProgressCircle>

        <View style={styles.containerProgress}>
          <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '300' }}>Experto</Text>
          <View style={{ marginLeft: 20, width: 120 }}>
            <Text style={{ marginLeft: 40, marginVertical: 5, color: "rgba(254, 153, 0, 1)", fontWeight: '600' }}>70/100</Text>
            <ProgressBar style={{ height: 10 }} progress={0.5} color="rgba(46, 58, 89, 1)" />
          </View>
        </View>



      </View>
      <View style={{ alignSelf: 'center' }} >

        <View style={{ width: "100%" }}>
          <View style={[styles.official3, styles.containerButtons]}>
            <TouchableOpacity style={styles.button}
              onPress={() => console.log("hola")}
            >
              <Text style={{ color: "black" }}>Completar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={() =>  handleLogout()}
            >
              <Text style={{ color: "black" }}>Salir de Candormap</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      <View style={styles.containerProgress}>

        <FlatList
          data={tasksData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MenuItem
              title={item.title}

              imageSource={item.imageSource}
            />
          )}
          ListFooterComponentStyle={{ marginLeft: 50, marginVertical: 50 }}
          ListFooterComponent={footer}


        />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    alignItems: 'center',
  },
  official3: {

    width: "100%",
  },

  button: {
    borderWidth: 1,
    borderColor: "#4931a1",
    paddingHorizontal: 26,
    padding: 10,
    borderRadius: 10
  },
  containerButtons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  containerProgress: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowExpand: {
    marginTop: 65,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default Profile;
