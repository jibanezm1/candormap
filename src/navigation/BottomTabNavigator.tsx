import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from '../screens/Tasks';
import Missions from '../screens/Missions';
import Payment from '../screens/Payment';
import Profile from '../screens/Profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeTask from '../screens/HomeTasks';
import { HomeTaskStackNavigator } from './HomeTaskNavigator';
import { Image } from 'react-native';
import { HomeMissionsStackNavigator } from './HomeMissionsNavigator';
const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="#3e2465"
    >
      <Tab.Screen name="HomeTasks"
        options={{
          tabBarLabel: 'Mis Tareas', // Título que se mostrará en el encabezado
          tabBarIcon: ({ color, size }) => (
            <Image style={{ bottom: 4 }} source={require("../assets/iconos/mis-tareas.png")} />
          ),
        }}
        component={HomeTaskStackNavigator} />
      <Tab.Screen name="MissionsHome"
        options={{

          title: 'Misiones', // Título que se mostrará en el encabezado
          tabBarIcon: ({ color, size }) => (
            <Image style={{ bottom: 4 }} source={require("../assets/iconos/misiones.png")} />
          ),
        }}
        component={HomeMissionsStackNavigator} />
      <Tab.Screen name="Payment"

        options={{
          title: 'Pagos', // Título que se mostrará en el encabezado

          tabBarIcon: ({ color, size }) => (
            <Image style={{ bottom: 4 }} source={require("../assets/iconos/pago.png")} />
          ),
        }}

        component={Payment} />
      <Tab.Screen name="Profile"
        options={{
          title: 'Perfil', // Título que se mostrará en el encabezado

          tabBarIcon: ({ color, size }) => (
            <Image style={{ bottom: 4 }} source={require("../assets/iconos/perfil.png")} />
          ),
        }}

        component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
