import { createStackNavigator } from '@react-navigation/stack';
import HeaderButton from '../components/atoms/HeaderButton';
import HomeMissions from '../screens/HomeMissions';
import Questionnarie from '../screens/Questionnaire';
import React from 'react';



const HomeMissionsStack = createStackNavigator();

export function HomeMissionsStackNavigator() {
  return (
    <HomeMissionsStack.Navigator>
      <HomeMissionsStack.Screen
        name="HomeTask"
        component={HomeMissions}
        options={{
          title: 'Misiones', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerRight: () => <HeaderButton />,
        }}
      />
      <HomeMissionsStack.Screen
        name="Questionnarie"
        component={Questionnarie}
        options={{
          title: 'Misiones', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerRight: () => <HeaderButton />,
        }}
      />

    </HomeMissionsStack.Navigator>
  );
}
