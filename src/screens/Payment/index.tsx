import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const Payment = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Pago',
      headerTitleStyle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: 'purple',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto1}>$ 12.500</Text>
      <Text style={styles.texto}>Disponible para retirar.</Text>
      <View style={{ width: "82%", top: 25 }}>
        <View style={[styles.official3, styles.containerButtons]}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "black" }}>Tengo Cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={{ color: "white" }}>Soy Nuevo</Text>
          </TouchableOpacity>
        </View>
        <Image style={{ margin: 50 }} source={require("../../assets/cashback.png")} />




      </View>
      <View style={{
        alignItems: "center",
      }}>
        <TouchableOpacity style={styles.button3}>
          <Text style={{ color: "black" }}>Agregar Medio de Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: 'white',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#4931a1",
    paddingHorizontal: 26,
    padding: 10,
    borderRadius: 10
  },
  button3: {
    textAlign: 'center',
    borderWidth: 1,
    width: "100%",
    borderColor: "#4931a1",
    padding: 15,
    borderRadius: 10
  },
  containerButtons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  official3: {
    marginLeft: 30,
    width: "100%",
  },
  button1: {
    backgroundColor: "#4931a1",
    paddingHorizontal: 37,
    padding: 10,
    borderRadius: 10
  },
  texto1: {
    color: 'rgba(46, 58, 89, 1)',
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 35,
    paddingHorizontal: 50,
    marginTop: 100,
  },
  texto: {
    color: 'rgba(46, 58, 89, 1)',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    paddingHorizontal: 50,
  },
  lista: {
    marginTop: 50,
  },
});

export default Payment;
