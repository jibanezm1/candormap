import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa las pantallas aquí
import Welcome from '../screens/Welcome';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/Onboarding/Login';
import Register from '../screens/Onboarding/Register';
import RecoverPassword from '../screens/Onboarding/RecoverPassword';
import CompleteProfile from '../screens/CompleteProfile';
import PersonalInfo from '../screens/PersonalInfo';
import Contact from '../screens/Contact';
import TermsOfUse from '../screens/About/TermsOfUse';
import PrivacyPolicy from '../screens/About/PrivacyPolicy';
import AuthContext from '../AuthContext';
import Onboarding from '../screens/Onboarding';
import Tasks from '../screens/Tasks';
import HeaderButton from '../components/atoms/HeaderButton';
import HomeTask from '../screens/HomeTasks';
import { HomeTaskStackNavigator } from './HomeTaskNavigator';

const Stack = createStackNavigator();

function StackNavigator() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? 'BottomTabNavigator' : 'Welcome'}>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }} // Esto oculta el encabezado para la pantalla Welcome
            />
            <Stack.Screen name="Login" options={{
                title: ' ', // Título que se mostrará en el encabezado
                headerTintColor: 'white',
                headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                headerStyle: {
                    backgroundColor: '#30023e', // Set your desired background color here
                },
            }} component={Login} />
            <Stack.Screen name="Register" component={Register}
            options={{
                title: 'Registro', // Título que se mostrará en el encabezado
                headerTintColor: 'white',
                headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                headerStyle: {
                    backgroundColor: '#30023e', // Set your desired background color here
                },

            }}
            />
            <Stack.Screen name="Onboarding" component={Onboarding}
                options={{
                    title: ' ', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                }}
            />


            <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
            <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="Contact" component={Contact} />


           
            <Stack.Screen name="Tasks" component={Tasks}
                
                options={{
                    title: 'Listado de Tareas', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerRight: () => <HeaderButton />,
                    

                }}

            />
            <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="BottomTabNavigator" 
              options={{ headerShown: false }}  // Esto ocultará el encabezado

            component={BottomTabNavigator} />
        </Stack.Navigator>
    );
}


export default StackNavigator;
