import React, { useEffect, useState } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import AuthContext from './src/AuthContext';
import { ModalPortal } from 'react-native-modals';
import SplashScreen from 'react-native-splash-screen';
import { LogBox } from 'react-native';
import notificationService from './src/services/NotificationService'; // Asegúrate de que la ruta sea correcta
import firestore from '@react-native-firebase/firestore';
import { CopilotProvider } from "react-native-copilot";

LogBox.ignoreLogs(['ViewPropTypes will be removed', 'VirtualizedLists should never be nested']);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const linking = {
    prefixes: ['candormap://'],
    config: {
      screens: {
        Welcome: 'welcome',
        Login: 'login',
        Register: 'register',
        Onboarding: 'onboarding',
        RecoverPassword: 'recover-password',
        CompleteProfile: 'complete-profile',
        PersonalInfo: 'personal-info',
        Contact: 'contact',
        AboutUs: 'about-us',
        Questionnarie: 'questionnaire',
        QuestionnarieDep: 'questionnaireDep',
        addPayment: 'add-payment',
        AdditionalForm: 'additional-form',
        AdditionalData: 'additional-data',
        Faqs: 'faqs',
        Notifications: 'notifications',
        Tasks: 'tasks',
        TermsOfUse: 'terms-of-use',
        PrivacyPolicy: 'privacy-policy',
      
        // Añade aquí otras pantallas o StackNavigators de nivel superior si tienes más
      }
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    leerDatosFirestore();
    // Registrar el dispositivo para notificaciones y escuchar las notificaciones
    notificationService.registerDevice();
    notificationService.registerNotificationListeners();

    // Desregistrar listeners al desmontar
    return () => {
      notificationService.unregisterNotificationListeners();
    };
  }, []);
  const leerDatosFirestore = () => {
    firestore()
      .collection('notifications')
      .get()
      .then(querySnapshot => {
        // console.log('Total de documentos:', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          // console.log('Datos del Documento:', documentSnapshot.id, documentSnapshot.data());
        });
      })
      .catch(error => {
        console.error('Error al leer datos de Firestore:', error);
      });
  };

  // Llama a esta función desde algún lugar en tu código, como un useEffect en App.js
  leerDatosFirestore();
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme} linking={linking} // Aquí agregas tu configuración de linking
      >
        <StackNavigator />
      </NavigationContainer>
      <ModalPortal />
    </Provider>
  );
}
