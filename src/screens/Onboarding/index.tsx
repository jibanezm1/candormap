import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {

  type UserRole = "encuestado" | "investigador";
  const userRole: UserRole = "encuestado";
  const navigation = useNavigation();



  const handleBeggin: any = () => {
    switch (userRole) {
      case 'encuestado':

      navigation.navigate('BottomTabNavigator', { screen: 'HomeTask' });

      
        break;
      default:


      
        break;
    }
  }

  // Definir el arreglo con los elementos "estudio", "pago" y "perfil"
  const getDataByRole = (role: any) => {
    if (role === 'investigador') {
      return [
        { title: "Estudio", description: "Descripción del estudio", icon: require("../../assets/iconos/estudio.png") },
        { title: "Pago", description: "Descripción del pago", icon: require("../../assets/iconos/pago.png") },
        { title: "Perfil", description: "Descripción del perfil", icon: require("../../assets/iconos/perfil.png") },
      ];
    } else if (role === 'encuestado') {
      return [
        { title: "Mis tareas", description: "Descripción de mis tareas", icon: require("../../assets/iconos/mis-tareas.png") },
        { title: "Misiones", description: "Descripción de misiones", icon: require("../../assets/iconos/misiones.png") },
        { title: "Pagos", description: "Descripción de pagos", icon: require("../../assets/iconos/pago.png") },
        { title: "Perfil", description: "Descripción del perfil", icon: require("../../assets/iconos/perfil.png") },
      ];
    } else {
      return []; // En caso de que no se reconozca el rol, devuelve un arreglo vacío o maneja el error de acuerdo a tus necesidades.
    }
  };

  // Definimos el rol del usuario (investigador o encuestado)

  // Obtener el arreglo de datos según el rol del usuario
  const data = getDataByRole(userRole);

  // Función para renderizar cada elemento del arreglo en la lista
  const renderRow = (item: any) => {
    return (
      <List.Item
        style={{ borderBottomWidth: 0.3, borderBottomColor: "rgba(224, 224, 224, 1)", paddingHorizontal: "32%" }}
        key={item.title} // Usamos el título como clave para cada elemento
        title={item.title}
        left={props => <Image source={item.icon} />}
      />
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>¡Te damos la bienvenida a CandorMap!</Text>
      <View style={styles.lista}>
        {
          data.map(item => renderRow(item)) // Usamos el método map para recorrer el arreglo y renderizar cada elemento
        }
        <PrimaryButton
          title="Continuar"
          size='small'
          style={{ width: '60%', marginHorizontal: 75, marginTop: 20 }}
          onPress={handleBeggin} // Llama a la función handleLogin cuando se presione el botón
        />
      </View>

    </View>
  );
};
const styles = StyleSheet.create({

  contenedor: {
    backgroundColor: "white",
    height: "100%",

  },
  texto: {
    color: "rgba(46, 58, 89, 1)",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    paddingHorizontal: 50,
    marginTop: 100
  },
  lista: {

    marginTop: 50

  }

});
export default Onboarding;
