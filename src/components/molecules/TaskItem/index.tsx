import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TaskItemProps = {
    title: string;
    description: string;
    price: any;
    duration: string;
    imageSource: string;
    cuestionario: any;
};
const TaskItem: React.FC<TaskItemProps> = ({ title, description, price, duration, imageSource, cuestionario }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate("Questionnarie", { cuestionarioData: cuestionario })}
        >
            <Image source={imageSource} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.duration}> {price}, {duration}</Text>
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

export default TaskItem;
