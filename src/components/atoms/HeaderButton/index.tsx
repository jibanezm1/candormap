import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';


const iconStyle = { padding: 10, color: 'white' };

const HeaderButton: React.FC<{ icono: string }> = ({ icono }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlePress = () => {
        if (icono === "chevron-back-circle") {
            if (navigation.canGoBack()) {
                
                navigation.goBack();
            } else {
                navigation.navigate( 'HomeTasks');
            }
        } else {
            navigation.navigate('Profile');
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Icon name={icono} size={25} style={iconStyle} />
        </TouchableOpacity>
    );
};

export default HeaderButton;
