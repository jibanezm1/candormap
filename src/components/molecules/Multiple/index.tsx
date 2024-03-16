import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';
import { Color } from '../../../styles/Global';

const Multiple = ({ question, handleOptionSelect }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <List.Accordion
            title="Seleccionar"
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
            style={{ backgroundColor: "#272A31", padding: 10, borderRadius: 60 }}
            titleStyle={{ color: "white" }}
            theme={{colors: {background: Color.background}}}

        >
            <TouchableOpacity style={{ padding: 10 }}>
                {question.type === 'multiple' && question.options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.option,
                            question.selectedOptionIds.includes(option.id) && styles.selectedOption,
                        ]}
                        onPress={() => handleOptionSelect(question.id, option.id, question.type)}
                    >
                        <Text style={[styles.optionText,
                        question.selectedOptionIds.includes(option.id) && styles.selectedOption,
                        ]}>{option.text}</Text>
                    </TouchableOpacity>
                ))}
            </TouchableOpacity>
        </List.Accordion>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        padding: 20,
        paddingBottom: 300,
    },
    containerButtons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    official3: {
        width: '100%',
    },
    button1: {
        backgroundColor: '#4931a1',
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10,
    },
    button1Disabled: {
        backgroundColor: 'white',
        paddingHorizontal: 37,
        paddingVertical: 20,
        padding: 10,
        borderRadius: 60,
    },
    button: {
        borderWidth: 1,
        borderColor: '#4931a1',
        paddingHorizontal: 33,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
    },
    question: {
        fontSize: 15,
        marginVertical: 10,
        fontWeight: '300',
        color: 'white',
    },
    option: {
        borderWidth: 1,
        borderColor: '#272A31',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: "#272A31"
    },
    selectedOption: {
        backgroundColor: 'orange',
        color: 'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
    },
    input: {
        backgroundColor: '#f6f6f6',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        minHeight: 100,
    },
    cameraButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
    },
});
export default Multiple;
