import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from '../screens/Tasks';
import HomeSurvey from '../screens/HomeSurvey';
import Questionnaire from '../screens/Questionnaire';
import QuestionnaireDep from '../screens/QuestionnaireDep';
import HeaderButton from '../components/atoms/HeaderButton';



const Stack = createStackNavigator();

function TasksStackNavigator() {
    return (
        <Stack.Navigator>


            <Stack.Screen name="HomeSurvey"
                options={{
                    title: 'Encuesta', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerLeft: () => <HeaderButton icono="chevron-back-circle" />,
                    headerRight: () => <HeaderButton icono="person" />,
                }}
                component={HomeSurvey} />
            <Stack.Screen
                name="Questionnarie"
                component={Questionnaire}
                options={{
                    title: 'Encuesta', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerLeft: () => <HeaderButton icono="chevron-back-circle" />,
                    headerRight: () => <HeaderButton icono="person" />,
                }}
            />

            <Stack.Screen
                name="QuestionnarieDep"
                component={QuestionnaireDep}
                options={{
                    title: 'Encuesta', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerLeft: () => <HeaderButton icono="chevron-back-circle" />,
                    headerRight: () => <HeaderButton icono="person" />,
                }}
            />

            {/* Añade otras pantallas que pertenecen a la pestaña de Tareas aquí */}
        </Stack.Navigator>
    );
}

export default TasksStackNavigator;
