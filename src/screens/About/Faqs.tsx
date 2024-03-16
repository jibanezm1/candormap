import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabeza from '../../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/atoms/Input/Input';
import PhoneInput from 'react-native-international-phone-number';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/Colors';
import MenuItem from '../../components/molecules/MenuItem';
import axios from 'axios';
import { loginUser } from '../../redux/slices/usuariosSlice';
import { FAQs } from '../../utils/faqs';
import { Color } from '../../styles/Global';
const Faqs = () => {

  const windowHeight = Dimensions.get('window').height;
  const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla

  const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <View style={styles.faqItem}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
        </TouchableOpacity>
        {isOpen && <Text style={styles.answer}>{answer}</Text>}
      </View>
    );
  };

  const logoStyle = {
    transform: [
      {
        translateY: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0], // Comienza 100 píxeles arriba y se mueve a su posición original
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
      <Cabeza />


      <ScrollView style={styles.container}>
        <View style={{ marginHorizontal: 20, top: 120 }}>
          <Animated.View style={logoStyle}>
            <Text style={{ color: "#C889FF", fontSize: 40 }}>Preguntas frecuentes</Text>
          </Animated.View>
        </View>
        <View style={{marginTop:40}}>
          {FAQs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </View>

      </ScrollView>


    </SafeAreaView>

  )
}


export default Faqs;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 0,
    top: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,

    padding: 20,
    margin: 10,
    backgroundColor: '#272A31',
    borderRadius: 30,
  },
  questionContainer: {
    marginBottom: 5,
  },
  question: {
    fontWeight: '600',
    color: "#8F8C9D",
    textAlign: 'center',

  },
  answer: {
    color: 'gray',
  },
  official3: {

    width: "100%",
  },
  button1: {

    backgroundColor: "#4931a1",
    paddingHorizontal: 37,
    padding: 10,
    borderRadius: 10
  },
  inputContainer: {
    marginVertical: 0,
    padding: 10,

  },
  button: {
    borderWidth: 1,
    borderColor: "#4931a1",
    paddingHorizontal: 26,
    padding: 10,
    borderRadius: 10
  },
  containerButtons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 10,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 160,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerProgress: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowExpand: {
    marginTop: 65,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});
