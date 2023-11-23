import { createStackNavigator } from '@react-navigation/stack';
import HomeTask from '../screens/HomeTasks';
import HeaderButton from '../components/atoms/HeaderButton';
import Payment from '../screens/Payment';
import HomeSurvey from '../screens/HomeSurvey';
import React from 'react';
import Questionnarie from '../screens/Questionnaire';



const HomeTaskStack = createStackNavigator();

export function HomeTaskStackNavigator() {
  return (
    <HomeTaskStack.Navigator>
      <HomeTaskStack.Screen
        name="HomeTask"
        component={HomeTask}
        options={{
          title: 'Listado de Tareas', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerShown: false,

        }}
      />
      <HomeTaskStack.Screen
        name="HomeSurvey"
        component={HomeSurvey}
        options={{
          title: 'Encuesta', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerRight: () => <HeaderButton />,
        }}
      />
      <HomeTaskStack.Screen
        name="Questionnarie"
        component={Questionnarie}
        options={{
          title: 'Encuesta', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerRight: () => <HeaderButton />,
        }}
      />




    </HomeTaskStack.Navigator>
  );
}
