// App.tsx

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import AuthContext from './src/AuthContext';
import { ModalPortal } from 'react-native-modals';
import SplashScreen from 'react-native-splash-screen'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    SplashScreen.hide();
  },[])

  
  return (
    <Provider store={store}>


      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <ModalPortal />

    </Provider>
  );
}
