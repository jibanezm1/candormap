import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const Questionnarie = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const data: any = route.params.cuestionarioData;

    // Usar los valores de 'data' en lugar de los valores estáticos
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.titulo}</Text>
            <Text style={styles.duration}>{data.tiempoEstimado} minutos para completar.</Text>
            <Text style={styles.description}>
                Cliente Incongnito - Responde esta breve encuesta a tu visita a la tienda de {data.titulo}. {/* o cualquier otra descripción que quieras */}
            </Text>
            <TouchableOpacity style={styles.button1} onPress={() => { }}>
                <Text style={styles.buttonText}>Invitar a un amigo</Text>
            </TouchableOpacity>
            <View style={{ width: "100%", top: 45 }}>
                <View style={[styles.official3, styles.containerButtons]}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate("Login")}
                    >
                        {isLoading2 && <ActivityIndicator />}

                        {!isLoading2 && <Text style={{ color: "black" }}>Guardar mas tarde</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={() => {
                        setIsLoading(true);

                        navigation.navigate("HomeSurvey", { cuestionarioData: data })
                        setIsLoading(false);

                    }} >
                        {isLoading && <ActivityIndicator />}
                        {!isLoading && <Text style={styles.buttonText}>Comenzar ahora</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 40,
        alignItems: 'center',
    },
    containerButtons: {
        justifyContent: "space-around",
        flexDirection: "row",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    official3: {

        width: "100%",
    },
    duration: {
        fontSize: 16,
        marginBottom: 20,
    },
    button1: {
        backgroundColor: "#4931a1",
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: "#4931a1",
        paddingHorizontal: 26,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Questionnarie;
