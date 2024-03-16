import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;

interface BlurRotateListItemProps {
    title: string;
    description: string;
    price: string;
    duration: string;
    imageSource: string;
    cuestionario: any;
    instrucciones: string;
    estado: boolean;
    mision: string | null;
    colorAleatorio: string;
    onPressTask: (estado: boolean, cuestionario: string, mision: string | null, instrucciones: string) => void;
    index: number;
    viewables: any; // Asegúrate de ajustar este tipo según sea necesario
}

const BlurRotateListItem: React.FC<BlurRotateListItemProps> = ({
    title,
    description,
    price,
    duration,
    imageSource,
    cuestionario,
    instrucciones,
    estado,
    mision,
    colorAleatorio,
    onPressTask,
    index,
    viewables
}) => {
    const isVisible = useSharedValue(false);

    useEffect(() => {
        isVisible.value = viewables.value.includes(index);
    }, [viewables, index]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            delay: index * 300,
            useNativeDriver: true,
        }).start();
    }, [index]);

    const animatedStyle = useAnimatedStyle(() => {
        const isAtStart = index < viewables.value[0];
        return {
            transform: [
                { perspective: 1000 },
                {
                    rotateX: withTiming(
                        isVisible.value ? "0deg" : `${isAtStart ? -45 : 45}deg`,
                        { duration: 300 }
                    ),
                },
                {
                    rotate: withTiming(
                        isVisible.value ? "0deg" : `${isAtStart ? -15 : 15}deg`,
                        { duration: 300 }
                    ),
                },
                { scale: withTiming(isVisible.value ? 1 : 0.8, { duration: 300 }) },
            ],
        };
    }, [isVisible, viewables]);

    return (
        <Animated.View style={[{ opacity: fadeAnim }, animatedStyle]}>
            <TouchableOpacity
                onPress={() => onPressTask(estado, cuestionario, mision, instrucciones)}
                style={{
                    flexDirection: "row",
                    padding: 15,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    alignItems: "center",
                    borderBottomWidth: 0.3,
                    borderBottomColor: "#345c74"
                }}
            >
                {/* Resto del contenido de tu componente aquí */}
            </TouchableOpacity>
        </Animated.View>
    );
};

export default BlurRotateListItem;
