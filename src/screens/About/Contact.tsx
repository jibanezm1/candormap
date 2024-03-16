import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';
import Cabeza from '../../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import colors from '../../styles/Colors';
import Input from '../../components/atoms/Input/Input';
import MenuItem from '../../components/molecules/MenuItem';
import { Color } from '../../styles/Global';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
const windowWidth = Dimensions.get('window').width;

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const windowHeight = Dimensions.get('window').height;
  const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla
  const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const handleSubmit = async () => {
    console.log("formData")

    if (!name || !email || !message) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      const response = await axios({
        method: 'post',
        url: 'https://candormap.cl/api/contacto',
        data: formData,
        headers: {
          // Agrega el Content-Type para FormData si es necesario
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        Alert.alert('Éxito', 'Mensaje enviado correctamente.');
        setName('');
        setEmail('');
        setMessage('');
        navigation.goBack(); // Vuelve atrás después de enviar el mensaje correctamente

      } else {
        const errors = response.data.errors || {};
        const errorMessages = Object.keys(errors).map(key => `${key}: ${errors[key].join(', ')}`).join('\n');
        Alert.alert('Error', `Hubo un problema al enviar su mensaje:\n${errorMessages}`);
        console.log(response);
      }
    } catch (error) {
      console.error('Error al enviar el formulario: ', error);
      Alert.alert('Error', 'Hubo un problema al enviar su mensaje.');
    }
  };

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
  return (


    <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
      <Cabeza tittle='Contacto' />
      <View style={{ marginHorizontal: 20, top: 120, marginBottom:20 }}>
        <Animated.View style={logoStyle}>
          <Text style={{ color: "#C889FF", fontSize: 40 }}>Contactanos</Text>
        </Animated.View>




      </View>
      <View style={styles.container}>

        <Input
          placeholderTextColor={'#8F8C9D'}
          placeholder='Ingrese su Nombre'
          disabled={false}
          value={name}
          style={{ marginVertical: 10 }}

          onChangeText={setName}
        />
        <Input
          placeholderTextColor={'#8F8C9D'}
          placeholder='Ingrese su Correo Electrónico'
          disabled={false}
          value={email}
          style={{ marginVertical: 10 }}

          onChangeText={setEmail}
        />
        <Input
          placeholderTextColor={'#8F8C9D'}
          placeholder='Ingrese su Mensaje'
          disabled={false}
          multiline
          value={message}
           
          style={{ marginVertical: 10, paddingTop:30 }}
          numberOfLines={1}
          onChangeText={setMessage}
        />


<PrimaryButton title='Enviar' onPress={() => handleSubmit()} />

       
       


      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  button3: {
    textAlign: 'center',
    borderWidth: 1,
    width: "50%",
    fontWeight: '400',

    borderColor: "#4931a1",
    padding: 15,
    borderRadius: 10
  },
  bookNowBtn: {
    height: 50,
    width: "100%",
    backgroundColor: Color.white,
    borderRadius: 30,
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  footerText: {
    color: "black",
    fontSize: 16,
    fontWeight: '100',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  }
});

export default ContactScreen;
