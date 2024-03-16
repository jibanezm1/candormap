import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/usuariosSlice";
import { Alert } from "react-native";




export const handleLogin = async (idUsuario: any) => {
    try {
      
        
        const response = await axios.post('https://candormap.cl/api/loginid', {
            idUsuario: idUsuario
        });

        const user = response.data;
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    } catch (error) {
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

export const capitalizeInitials = (text: string) => {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

export const perfilNombre = (idPerfil: string) => {
    const perfiles: { [key: string]: string } = {
        '1': 'Investigador',
        '2': 'Encuestado',
        '3': 'Administrador',
        '4': 'Revisor'
    };

    return perfiles[idPerfil] || 'Perfil no encontrado';
}