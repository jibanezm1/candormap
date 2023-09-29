import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import BaseAppScreen from '../../templates/BaseAppScreen';
import Button from '../../components/atoms/Buttons/Button';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import Metrics from '../../styles/Metrics';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import Input from '../../components/atoms/Input/Input';
import { Image } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/usuariosSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Realiza la autenticación
      const response = await axios.post('https://candormap.cl/api/login', {
        email: email,
        password: password,
      });

      // Obtén la respuesta del servidor
      const user = response.data;

      // Guarda la información del usuario en el AsyncStorage
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      // Actualiza el estado de Redux con la acción loginUser
      dispatch(loginUser(user));

      // Navega a la pantalla Onboarding u otras acciones
      setIsLoading(false);

      navigation.navigate('Onboarding');
    } catch (error) {
      setIsLoading(false);

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
    <BaseAppScreen style={{ backgroundColor: '#30023e' }}>
      <Image
        style={styles.image}
        source={require("../../assets/candormap.png")}
      />
      <KeyboardAwareScrollView
        onKeyboardWillShow={(frames: Object) => {
          console.log('Keyboard event', frames)
        }}
        innerRef={ref => {
          this.scroll = ref
        }}>
        {isLoading && <ActivityIndicator />}

        <View style={styles.inputContainer}>

          <Input
            label="Email"
            placeholder='Ingrese su Correo'
            placeholderTextColor={'white'}
            disabled={false}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Contraseña"
            placeholder='Ingrese una contraseña'
            placeholderTextColor={'white'}
            disabled={false}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={{ textAlign: 'justify', top: 20, color: "white" }}>¿Olvidaste tu Contraseña?</Text>
        </View>
        <View style={{ alignSelf: 'center' }} >

          <PrimaryButton
            type="primary"
            title="Continuar"
            size='small'
            style={{ width: '60%' }}
            onPress={handleLogin} // Llama a la función handleLogin cuando se presione el botón
          />

        </View>

      </KeyboardAwareScrollView>
    </BaseAppScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Metrics.screenHeight - 150,
    backgroundColor: '#30023e',
    width: '90%',
    padding: 10,
  },
  image: {
    width: 330,
    height: 180,
    margin: 30
  },
  title: {
    ...GlobalStyles.title,
    fontWeight: '700',
    paddingHorizontal: 2,
    color: Colors.textDark,
    fontSize: 20,
    lineHeight: 25,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    marginBottom: 32,
    fontFamily: 'Raleway-Regular'
  },
  form: {
    marginVertical: 30,
  },
  inputContainer: {
    marginVertical: 30,

    padding: 10,

  },
});
export default Login;
