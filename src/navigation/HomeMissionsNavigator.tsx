import { createStackNavigator } from '@react-navigation/stack';
import HeaderButton from '../components/atoms/HeaderButton';
import HomeMissions from '../screens/HomeMissions';
import Questionnarie from '../screens/Questionnaire';
import React from 'react';
import QuestionnarieMisions from '../screens/QuestionnaireMisions';
import HomeSurveyMissions from '../screens/HomeSurveyMissions';
import Missions from '../screens/Missions';
import DetailsScreen from '../screens/Details';
import Xd from '../screens/xd';



const HomeMissionsStack = createStackNavigator();

export function HomeMissionsStackNavigator() {
  return (
    <HomeMissionsStack.Navigator>
      <HomeMissionsStack.Screen
        name="HomeMissions"
        component={HomeMissions}
        options={{
          title: 'Misiones', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerShown: false,

        }}
      />
      <HomeMissionsStack.Screen
        name="Xd"
        component={Xd}
        options={{
          title: 'XD', // Título que se mostrará en el encabezado
          headerTintColor: 'white',
          headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
          headerShown: false,
          headerStyle: {
            backgroundColor: '#30023e', // Set your desired background color here
          },
          headerRight: () => <HeaderButton />,
          headerLeft: () => null,

        }}
      />
      <HomeMissionsStack.Screen
        name="QuestionnarieMisions"
        component={QuestionnarieMisions}
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
        name="Details"
        component={DetailsScreen}
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
        name="Missions"
        component={Missions}
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
        name="HomeSurveyMissions"
        component={HomeSurveyMissions}
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
