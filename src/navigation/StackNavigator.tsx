import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa las pantallas aquí
import Welcome from '../screens/Welcome';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/Onboarding/Login';
import Register from '../screens/Onboarding/Register';
import RecoverPassword from '../screens/Onboarding/RecoverPassword';
import CompleteProfile from '../screens/CompleteProfile';
import PersonalInfo from '../screens/About/PersonalInfo';

import TermsOfUse from '../screens/About/TermsOfUse';
import AboutUs from '../screens/About/AboutUs';

import AdditionalData from '../screens/About/AdditionalData';
import Contact from '../screens/About/Contact';
import Faqs from '../screens/About/Faqs';
import Notifications from '../screens/About/Notifications';

import History from '../screens/Payment/History';
import PrivacyPolicy from '../screens/About/PrivacyPolicy';
import AuthContext from '../AuthContext';

import Onboarding from '../screens/Onboarding';
import Tasks from '../screens/Tasks';
import HeaderButton from '../components/atoms/HeaderButton';
import HomeTask from '../screens/HomeTasks';
import HomeSurvey from '../screens/HomeSurvey';
import HomeSurveyProfile from '../screens/HomeSurveyProfile';
import addPayment from '../screens/Payment/EnterPaymentData';
import Questionnaire from '../screens/Questionnaire';
import QuestionnaireDep from '../screens/QuestionnaireDep';
import Profile from '../screens/Profile';
import DetailsScreen from '../screens/Details';
import HomeSurveyMissions from '../screens/HomeSurveyMissions';
import WelcomeSelector from '../screens/WelcomeSelector';
import Payment from '../screens/Payment';
import HomeMissions from '../screens/HomeMissions';
import HomeMenu from '../screens/HomeMenu';
import Discovery from '../screens/Discovery';

const Stack = createStackNavigator();

function StackNavigator() {
    const { isLoggedIn } = useContext(AuthContext);
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={isLoggedIn ? 'HomeStack' : 'Welcome'}>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    title: ' ', // Título que se mostrará en el encabezado
                    headerShown: false
                }} // Esto oculta el encabezado para la pantalla Welcome
            />
            <Stack.Screen
                name="WelcomeSelector"
                component={WelcomeSelector}
                options={{
                    title: ' ', // Título que se mostrará en el encabezado
                    headerShown: false
                }} // Esto oculta el encabezado para la pantalla Welcome
            />
            <Stack.Screen name="Login" options={{
                title: ' ', // Título que se mostrará en el encabezado
                headerTintColor: 'white',
                headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                headerStyle: {
                    backgroundColor: 'black', // Set your desired background color here
                },
            }} component={Login} />
            <Stack.Screen name="Register" component={Register}
                options={{
                    title: '', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: 'black', // Set your desired background color here
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

            <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
            <Stack.Screen name="CompleteProfile" component={CompleteProfile} />


            <Stack.Screen name="PersonalInfo"
                options={{
                    title: ' ', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={PersonalInfo} />
            <Stack.Screen name="Contact"

                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={Contact} />
            <Stack.Screen name="AboutUs"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={AboutUs} />
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

            <Stack.Screen name="addPayment"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={addPayment} />
            <Stack.Screen name="HomeMenu"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={HomeMenu} />
            <Stack.Screen name="Details"
                options={{
                    title: 'Mision', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerLeft: () => <HeaderButton icono="chevron-back-circle" />,
                    headerRight: () => <HeaderButton icono="person" />,
                }}
                component={DetailsScreen} />
            <Stack.Screen name="HomeSurveyMissions"
                options={{
                    title: 'Mision', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerLeft: () => <HeaderButton icono="chevron-back-circle" />,
                    headerRight: () => <HeaderButton icono="person" />,
                }}
                component={HomeSurveyMissions} />


            {/* HomeSurveyMissions */}
            <Stack.Screen name="AdditionalForm"
                options={{
                    title: 'Mis Datos Adicionales', // Título que se mostrará en el encabezado
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerRight: () => <HeaderButton />,
                }}
                component={HomeSurveyProfile} />

            <Stack.Screen name="AdditionalData"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}

                component={AdditionalData} />
            <Stack.Screen name="Faqs"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={Faqs} />
            <Stack.Screen name="Notifications"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={Notifications} />
            <Stack.Screen name="History"
                options={{
                    headerTintColor: 'white',
                    headerShadowVisible: false, // Esto eliminará la línea de separación debajo del encabezado
                    headerStyle: {
                        backgroundColor: '#30023e', // Set your desired background color here
                    },
                    headerShown: false,

                }}
                component={History} />


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
            <Stack.Screen name="HomeTask" component={HomeTask} options={{ cardStyleInterpolator: forFade }} />
            <Stack.Screen name="MissionsHome" component={HomeMissions} options={{ cardStyleInterpolator: forFade }} // Aplica la transición personalizada
            />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Discovery" component={Discovery} options={{ cardStyleInterpolator: forFade }} />

        </Stack.Navigator>
    );
}


export default StackNavigator;
