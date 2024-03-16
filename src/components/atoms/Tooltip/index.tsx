import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../Buttons/Button';

import { Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Polygon, Svg } from 'react-native-svg';
const screenHeight = Dimensions.get('window').height;
const marginTop = screenHeight * (Platform.OS === 'android' ? -0.86 : -0.90);
const screenWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

interface itemsProps {
    onPress: () => void;
    index: number;
    content: string;
}

const TooltipButton: React.FC<itemsProps> = ({ index, content, onPress }) => {
    const navigation = useNavigation();
    const [tooltipVisible, setTooltipVisible] = useState(true);


    return (
        <View style={styles.containera}>
            {tooltipVisible && (
                <View style={styles.tooltip}>

                    <View style={styles.tooltipInside}>
                        <Text style={styles.tooltipText}>{content}</Text>
                    </View>
                    <Button
                        onPress={onPress}
                        style={styles.iconContainer}
                    >
                        <Icon name="close-circle" size={20} />
                    </Button>
                </View>
            )}
        </View>

    );
};

export default TooltipButton;

const styles = StyleSheet.create({
    iconContainer: {
        top: -30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        alignSelf: 'flex-end',
    },
    nuevo: {
        fontWeight: '700',
        alignSelf: 'baseline',
        fontFamily: 'Raleway-Regular',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        letterSpacing: 0.25,
        color: '#DE001F',
        lineHeight: 19,
        backgroundColor: 'rgba(232, 83, 106, 0.1)',
        borderRadius: 4,
        marginBottom: 8,
        marginRight: 5
    },
    container: {
        borderRadius: 8,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
    },
    containera: {
        top: 10,
        justifyContent: "space-around",
        height: screenHeight - 10,




    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    tooltip: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: marginTop,
        marginHorizontal: 10,

    },
    tooltipInside: {
        // width: screenWidth-100,
        bottom: 20,
    },
    tooltipText: {

        marginHorizontal: 4,

        color: 'black',
        fontSize: 15
    },
});
