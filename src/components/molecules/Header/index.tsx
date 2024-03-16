import React from 'react';
import { View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import TooltipButton from '../../atoms/Tooltip';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native-elements';
import { Color } from '../../../styles/Global';

interface CabezaProps {
    close?: () => void;
    tittle?: string;
    menu?: boolean;
}

const Cabeza: React.FC<CabezaProps> = ({ close, tittle = "", menu = true }) => {
    const navigation = useNavigation();
    const route = navigation.getState().routes[navigation.getState().index];
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [isBack, setIsBack] = React.useState(false);

    React.useEffect(() => {
        if (route.name !== 'HomeMissions' && route.name !== "HomeTasks") {
            setIsBack(true);
        } else {
            setIsBack(false);
        }
    }, [route.name]);

    React.useEffect(() => {
        const checkTooltipShown = async () => {
            try {
                const tooltipShown = await AsyncStorage.getItem('tooltipShown2');
                if (!tooltipShown) {
                    setShowTooltip(true);
                } else {
                    setShowTooltip(false);
                }
            } catch (error) {
                console.error("Error al leer el valor de AsyncStorage:", error);
            }
        };

        checkTooltipShown();
    }, []);

    const handleBackPress = () => {
        if (close) {
            close(); // Si se proporciona una función close, se llama.
        } else if (isBack) {
            navigation.goBack(); // De lo contrario, si es posible volver, se usa navigation.goBack().
        }
    };

    const truncatedTitle = tittle.length > 20 ? tittle.slice(0, 20) + "..." : tittle;

    return (
        <>
            <StatusBar backgroundColor={Color.background} />
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: Color.background,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}>
                {menu ? (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeMenu');
                        }}
                        style={{
                            paddingVertical: 13,
                            borderRadius: 10,
                        }}>
                        <Image
                            source={require('../../../assets/images_black/menu.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            paddingVertical: 13,
                            borderRadius: 10,
                        }}
                    ></TouchableOpacity>
                )}
                <Text style={{ color: "white", textAlign: "justify", marginLeft: 20 }}>
                    {truncatedTitle}
                </Text>
                <TouchableOpacity
                    onPress={handleBackPress}
                    style={{
                        borderRadius: 10,
                    }}>
                    <Image
                        source={require('../../../assets/images_black/volver.png')}
                        style={{ width: 50, height: 50, marginRight: -10 }}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Cabeza;
