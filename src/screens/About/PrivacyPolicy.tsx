import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
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

const PrivacyPolicy = () => {


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

  const FAQs = [
    {
      question: "¿Qué es Candormap y cómo funciona?",
      answer: "Candormap es una aplicación móvil que te permite participar en estudios de mercado y opiniones, así como crear tus propias encuestas y misiones. Puedes responder preguntas, completar tareas, tomar fotografías, grabar audios y más, y recibir recompensas por tu participación."
    },
    {
      question: "¿En qué países está disponible Candormap?",
      answer: "Candormap está disponible en Chile, Bolivia, España, Argentina, Brasil y Estados Unidos, ofreciendo una plataforma de participación global para usuarios de habla hispana."
    },
    {
      question: "¿Cómo puedo crear mis propios estudios de mercado o misiones?",
      answer: "Para crear tus propios estudios o misiones, simplemente inicia sesión en tu cuenta de Candormap y busca la opción de 'Crear Estudio' o 'Crear Misión'. Luego, sigue las instrucciones para configurar tus preguntas y tareas, y establece un precio por participación si lo deseas."
    },
    {
      question: "¿Cómo se me recompensa por mi participación en estudios y misiones?",
      answer: "Cada vez que completas un estudio o misión en Candormap, acumulas un valor que se acredita en tu cuenta de usuario. Puedes retirar estas recompensas de acuerdo con los métodos de pago disponibles en tu país."
    },
    {
      question: "¿Es seguro proporcionar mi información personal en Candormap?",
      answer: "Sí, en Candormap tomamos la privacidad y seguridad de tus datos personales muy en serio. Utilizamos medidas de seguridad sólidas para proteger tu información, y cumplimos con todas las regulaciones de protección de datos aplicables."
    },
    {
      question: "¿Puedo utilizar Candormap en varios dispositivos?",
      answer: "Sí, puedes utilizar Candormap en varios dispositivos, siempre y cuando inicies sesión en tu cuenta con las mismas credenciales. Tus recompensas y actividades se sincronizarán en todos tus dispositivos."
    },
    {
      question: "¿Qué sucede si tengo un problema técnico o una pregunta sobre la aplicación?",
      answer: "Si tienes problemas técnicos o preguntas sobre la aplicación, te recomendamos ponerte en contacto con nuestro equipo de soporte. Puedes enviar un correo electrónico a [dirección de correo electrónico de soporte] o utilizar la función de contacto dentro de la aplicación."
    },
    {
      question: "¿Cuándo se liquidan las recompensas acumuladas en mi cuenta?",
      answer: "Las recompensas acumuladas en tu cuenta se liquidarán una vez a la semana, de acuerdo con el calendario de pagos establecido por Candormap."
    },
    {
      question: "¿Puedo cambiar mi ubicación en la aplicación si me muevo a otro país?",
      answer: "Sí, puedes cambiar tu ubicación en la aplicación si te mudas a otro país. Esto te permitirá acceder a estudios de mercado y misiones específicos de tu nueva ubicación."
    },
    {
      question: "¿Cómo puedo ganar dinero en Candormap?",
      answer: "En Candormap, puedes ganar dinero participando en encuestas y estudios de opinión. Al responder preguntas y completar misiones, acumulas un valor que se acredita en tu cuenta de usuario. Algunos estudios y misiones ofrecen recompensas en efectivo, mientras que otros pueden ofrecer descuentos, tarjetas de regalo u otros tipos de recompensas."
    },
    {
      question: "¿Cuánto puedo ganar en Candormap?",
      answer: "La cantidad que puedes ganar en Candormap depende de la cantidad de estudios y misiones en las que participes, así como del valor ofrecido por cada uno. Cuantas más encuestas completes y misiones cumplas, mayores serán tus recompensas acumuladas."
    },
    {
      question: "¿Cuándo y cómo puedo retirar mis ganancias?",
      answer: "Puedes retirar tus ganancias acumuladas de Candormap de acuerdo con los métodos de pago disponibles en tu país. Las recompensas suelen liquidarse una vez a la semana, según el calendario de pagos de la aplicación. Los métodos de pago pueden incluir transferencias bancarias, PayPal, tarjetas de regalo y otros medios de tu elección."
    },
    {
      question: "¿Hay límites en la cantidad de encuestas o misiones que puedo realizar?",
      answer: "No hay límites estrictos en la cantidad de encuestas o misiones que puedes realizar en Candormap. Puedes participar en tantas como desees, siempre que estén disponibles y cumplas con los requisitos de cada estudio o misión."
    },
    {
      question: "¿Qué sucede si no califico para una encuesta o misión?",
      answer: "En algunas ocasiones, es posible que no califiques para ciertas encuestas o misiones debido a criterios específicos establecidos por los creadores de los estudios. En estos casos, no podrás participar y ganar recompensas en esas investigaciones particulares."
    },
  ];

  return (<ImageBackground
    source={require('../../assets/images/crs.png')}
    style={{ width: "100%", height: "100%" }}
  >


    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Cabeza />

      <Modalize
        panGestureEnabled={false}
        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60
        }}
        withHandle={false}
        alwaysOpen={700}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >


        <View style={{ height: 1000, padding: 10 }}>

          <MenuItem
            title='Preguntas Frecuentes'
            onPress={() => { console.log("Información personal") }}
            imageSource={require('../../assets/iconos/preguntas.png')}
          />
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Preguntas Frecuentes (FAQ) de Candormap</Text>
            {FAQs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </ScrollView>



        </View>
      </Modalize>
    </SafeAreaView>
  </ImageBackground >

  )
}


export default PrivacyPolicy;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  questionContainer: {
    marginBottom: 5,
  },
  question: {
    fontWeight: 'bold',
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
