import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';




const HeaderButton: React.FC = ({
    style,
    iconProps,
}) => {
    const navigation = useNavigation();
    const renderColor = 'white';
    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
        >

        <Image  tintColor="white" style={{margin:7}} source={require('../../../assets/iconos/perfil.png')} />


        </TouchableOpacity>
    );
};

export default HeaderButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
    },
});
