import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import axios from 'axios';
import Cabeza from '../../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import colors from '../../styles/Colors';
import Input from '../../components/atoms/Input/Input';
import MenuItem from '../../components/molecules/MenuItem';
import { Color } from '../../styles/Global';

const AboutUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const windowHeight = Dimensions.get('window').height;
  const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla

  const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación

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


      <ScrollView style={{ paddingBottom: 0, marginBottom: 0, height: 700, padding: 10 }}>
        <View style={{ top: 100 }}>
          <Animated.View style={logoStyle}>
            <Text style={{ color: "#C889FF", fontSize: 40 }}>Acerca de nosotros</Text>
          </Animated.View>



        </View>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold", marginTop: 20 }}>¿Quiénes somos?</Text>
        <Text style={{ padding: 10, color: "white", textAlign: "justify" }}>
          Bienvenidos a Candormap, una innovadora aplicación móvil diseñada para revolucionar la forma en que participas en estudios de mercado y opiniones, y para permitirte crear tus propias investigaciones de manera sencilla y efectiva. En Candormap, creemos en la importancia de escuchar la voz de las personas y conectar a empresas e individuos de una manera significativa. Aquí te contamos más acerca de lo que somos y lo que hacemos:
        </Text>
        <Text style={{ padding: 10, color: "white", textAlign: "justify" }}>
          Nuestra Misión En Candormap es empoderarte para que compartas tus opiniones y experiencias, mientras te recompensamos por tu participación activa en estudios de mercado y misiones. Creemos en la importancia de la retroalimentación y la toma de decisiones basadas en datos sólidos.
        </Text>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold", marginTop: 20 }}>¿Cómo funciona?</Text>
        <View>
          <Text style={{ padding: 10, color: "white", textAlign: "justify" }}>•	Participación en Estudios de Mercado y Misiones: Candormap te brinda la oportunidad de responder preguntas, completar tareas, tomar fotografías, grabar audios y más, a través de estudios de mercado y misiones emocionantes y variadas.</Text>
          <Text style={{ padding: 10, color: "white", textAlign: "justify" }}>•	Crea tus Propios Estudios: ¿Tienes una pregunta que quieres hacerle al mundo? En Candormap, puedes crear tus propios estudios de mercado y opiniones de manera rápida y sencilla, permitiendo que otros usuarios participen y contribuyan a tus investigaciones.</Text>
          <Text style={{ padding: 10, color: "white", textAlign: "justify" }}>•	Recompensas y Pagos: Valoramos tu tiempo y esfuerzo. Cada estudio de mercado y misión que completes te recompensará con un valor que podrás acumular en tu cuenta de usuario y retirar de acuerdo con nuestros métodos de pago disponibles en tu país.</Text>
          <Text style={{ padding: 10, color: "white", textAlign: "justify" }}>•	Comunidad Global: Candormap está disponible en todos los países de habla hispana, incluyendo Estados Unidos, conectando a una comunidad diversa de usuarios que comparten sus perspectivas y opiniones.</Text>
        </View>
        <View style={{ paddingBottom: 100, marginBottom: 50 }}>
          <Text>
            Nuestra Promesa En Candormap, nos comprometemos a proteger tu privacidad y seguridad mientras utilizas nuestra aplicación. Valoramos la transparencia y la confianza de nuestros usuarios, por lo que cumplimos rigurosamente con las regulaciones de protección de datos y hemos establecido medidas de seguridad sólidas.
          </Text>
          <Text>
            Te invitamos a unirte a nuestra comunidad y formar parte de la conversación global. Juntos, podemos contribuir a un mundo en el que las decisiones estén respaldadas por la voz de la gente. ¡Bienvenido a Candormap, donde tus opiniones cuentan!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button3: {
    textAlign: 'center',
    borderWidth: 1,
    width: "50%",
    borderColor: "#4931a1",
    padding: 15,
    borderRadius: 10
  },
  container: {
    flex: 1,


    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  }
});

export default AboutUs;
