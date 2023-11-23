import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { Switch } from 'react-native-paper';
import Input from '../../components/atoms/Input/Input';
import axios from 'axios';
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/usuariosSlice';
import PhoneInput from 'react-native-international-phone-number';


const Profile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [nombre, setNombre] = useState(''); // Nombre inicialmente en blanco
  const [apellidos, setApellidos] = useState(''); // Apellidos inicialmente en blanco
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);


  type Country = {
    cca2: string;
  } | null;

  const [selectedCountry, setSelectedCountry] = useState<Country>(null);
  const [inputValue, setInputValue] = useState('');

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
    console.log(country.cca2);
  }

  const handleInputValue = (phoneNumber) => {
    setInputValue(phoneNumber);
  }

  const navigation = useNavigation();
  const dispatch = useDispatch();


  const handleRegister = () => {

    // Verificar si los campos obligatorios están llenos
    if (!nombre || !apellidos || !email || !password || !inputValue) {
      setStatus("Por favor, complete todos los campos.");
      setIsVisible(true);
      return; // Evitar enviar la solicitud si falta algún campo
    }
    const userData = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      password: password,
      telefono: inputValue,
      idPerfil: isSwitchOn == true ? 2 : 1,
      country: selectedCountry ? selectedCountry.cca2 : "CL"
    };


    axios
      .post('https://candormap.cl/api/register', userData)
      .then(response => {
        if (response.data.status == "error") {
          setStatus(response.data.message);
          setError(true);
          setIsVisible(true);
        } else {
          handleLogin(email, password);
          setStatus("Registro exitoso");
          setIsVisible(true);
          setError(false);
        }
      })
      .catch(error => {
        console.log(error);
        setStatus(error.message);
        setIsVisible(true);
      });
  };


  const handleLogin = async (inputEmail: any, inputPassword: any) => {
    try {
      // Realiza la autenticación
      const response = await axios.post('https://candormap.cl/api/login', {
        email: inputEmail,
        password: inputPassword,
      });

      // Obtén la respuesta del servidor
      const user = response.data;

      // Guarda la información del usuario en el AsyncStorage
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      // Actualiza el estado de Redux con la acción loginUser
      dispatch(loginUser(user));
    } catch (error) {
      // Manejo de errores
      console.error(error);

      Alert.alert(
        'Error de inicio de sesión',
        'Hubo un problema al intentar iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  };




  return (
    <ScrollView style={{ backgroundColor: "#f2f0f0", padding: 10, top: 20 }}>
      <Modal
        visible={isVisible}
        swipeDirection={['up', 'down']} // can be string or an array
        swipeThreshold={200} // default 100 juan.ibanez@outlook.com
        onSwipeOut={(event) => {
          setIsVisible(false);
        }}
        footer={error == false ? <ModalFooter>

          <ModalButton
            text="Ingresar"
            onPress={() => { navigation.navigate('Onboarding'); setIsVisible(false); }}
          />
        </ModalFooter> : <ModalFooter>
          <ModalButton
            text="Salir"
            onPress={() => setIsVisible(false)}
          />

        </ModalFooter>}
      >

        <ModalContent>
          <View>
            <Text>{status}</Text>
          </View>
        </ModalContent>
      </Modal>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Investigador</Text>
          <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} />
          <Text style={styles.title}>Encuestado</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Nombre"
          placeholder='Ingrese su Nombre'
          disabled={false}
          value={nombre} // Usar el estado "nombre" como valor
          style={{ marginVertical: 10 }}
          textColor="black"
          activeOutlineColor="black"
          theme={{
            roundness: 5,
            colors: {
              background: 'white',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
              surface: 'black',     // Reemplaza 'morado' con el valor hexadecimal adecuado.
              primary: 'black',      // Esto cambia el color del label y el borde a blanco.
              text: 'black'           // Esto cambia el color del texto a blanco.
            },
          }}
          onChangeText={text => setNombre(text)} // Actualizar el estado "nombre"
        />
        <Input
          label="Apellidos"
          placeholder='Ingrese su Apellido'
          disabled={false}
          value={apellidos} // Usar el estado "apellidos" como valor
          style={{ marginVertical: 10 }}
          textColor="black"
          activeOutlineColor="black"
          theme={{
            roundness: 5,
            colors: {
              background: 'white',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
              surface: 'black',     // Reemplaza 'morado' con el valor hexadecimal adecuado.
              primary: 'black',      // Esto cambia el color del label y el borde a blanco.
              text: 'black'           // Esto cambia el color del texto a blanco.
            },
          }}
          onChangeText={text => setApellidos(text)} // Actualizar el estado "apellidos"
        />
        <Input
          label="Email"
          placeholder='Ingrese su Correo'
          disabled={false}
          value={email}
          style={{ marginVertical: 10 }}
          textColor="black"
          activeOutlineColor="black"
          theme={{
            roundness: 5,
            colors: {
              background: 'white',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
              surface: 'black',     // Reemplaza 'morado' con el valor hexadecimal adecuado.
              primary: 'black',      // Esto cambia el color del label y el borde a blanco.
              text: 'black'           // Esto cambia el color del texto a blanco.
            },
          }}
          onChangeText={text => setEmail(text)}
        />
        <PhoneInput
          value={inputValue}
          language="es"
          placeholder="Ingrese su número de teléfono"
          defaultCountry="CL"
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
        />
        <Input
          label="Crear una Contraseña"
          placeholder='Ingrese una contraseña'
          disabled={false}
          value={password}
          style={{ marginVertical: 10 }}
          textColor="black"
          activeOutlineColor="black"
          theme={{
            roundness: 5,
            colors: {
              background: 'white',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
              surface: 'black',     // Reemplaza 'morado' con el valor hexadecimal adecuado.
              primary: 'black',      // Esto cambia el color del label y el borde a blanco.
              text: 'black'           // Esto cambia el color del texto a blanco.
            },
          }}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Input
          label='Repite la contraseña'
          placeholder='Repite la contraseña'
          disabled={false}
          value={password}
          style={{ marginVertical: 10 }}
          textColor="black"
          activeOutlineColor="black"
          theme={{
            roundness: 5,
            colors: {
              background: 'white',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
              surface: 'black',     // Reemplaza 'morado' con el valor hexadecimal adecuado.
              primary: 'black',      // Esto cambia el color del label y el borde a blanco.
              text: 'black'           // Esto cambia el color del texto a blanco.
            },
          }}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={{ width: "100%" }}>
        <View style={[styles.official3, styles.containerButtons]}>
          <TouchableOpacity style={styles.button1} onPress={handleRegister}>
            <Text style={{ color: "white" }}>Completar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  official3: {

    width: "100%",
  },
  button1: {

    backgroundColor: "#4931a1",
    paddingHorizontal: 37,
    padding: 10,
    borderRadius: 10
  },
  inputContainer: {
    marginVertical: 30,
    padding: 10,

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
