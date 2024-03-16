import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet, Alert, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TaskItemProps = {
    title: string;
    imageSource: string | ImageSourcePropType;
    onPress: () => void;
};

const MenuItem: React.FC<TaskItemProps> = ({ title, imageSource, onPress }) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Valor inicial para la animación

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const source: ImageSourcePropType = typeof imageSource === 'string'
        ? { uri: imageSource }
        : imageSource;

    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#272A31',
        padding: 16,
         borderRadius:60,
        marginVertical:10
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    details: {
        flex: 1,
        paddingVertical: 8,
     },
    title: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        color: 'white',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    duration: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

export default MenuItem;
