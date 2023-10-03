import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TaskItemProps = {
    title: string;
    description: string;
    price: number;
    duration: string;
    imageSource: string;
};

const MenuItem: React.FC<TaskItemProps> = ({ title, imageSource }) => {

    // Función para manejar el click en el item
    const handleItemClick = () => {
        Alert.alert('Aviso', 'Esta funcionalidad estará disponible próximamente');
    };

    return (
        <TouchableOpacity onPress={handleItemClick}>
            <View style={styles.container} >
            <Image source={imageSource} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    details: {
        flex: 1,
        top: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
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
