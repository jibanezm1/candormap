import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions, Animated } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import { Border, FontFamily } from '../../styles/Global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from '../../styles/GlobalStyles';
import colors from '../../styles/Colors';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const OnboardingScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      title: '¡Bienvenido!',
      text: 'Explora y participa en estudios de investigación o encuestas y recibe recompensas.',
      image: require('../../assets/images_black/Onboarding1.png'),
    },
    {
      title: 'Elige tu rol',
      text: '¿Estás aquí para realizar investigaciones o para participar en encuestas? Selecciona tu camino y comienza.',
      image: require('../../assets/images_black/Onboarding2.png'),
    },

    // ... Add as many items as you have images for
  ];


  const renderItem = ({ item, index }) => {

    // Animaciones
    const opacity = new Animated.Value(index === 0 ? 0 : 1);
    const scale = new Animated.Value(index === 0 ? 0.1 : 1);

    // Iniciar animaciones cuando se renderiza el ítem
    index == 0 ?
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start() : null;

    return (<SafeAreaView>
      <Animated.View style={[styles.slide, { opacity, transform: [{ scale }] }]}>

        <View style={{ flexDirection: "row", marginVertical: 10, paddingHorizontal: 60 }}>
          <Image

            style={styles.logoIcon}
            source={require("../../assets/images_black/icono.png")}
          />
          <Text style={{ color: "#D0D4E3", fontWeight: "500", paddingVertical: 2, paddingHorizontal: 10, fontSize: 12 }}>Candormap</Text>

        </View>
        <Image source={item.image} resizeMode="contain" style={styles.image} />
        <Image
          style={[{ paddingVertical: 0, width: 50 }]}
          resizeMode="contain"
          source={require("../../assets/images_black/persona.png")}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[GlobalStyles.secondaryText, { fontSize: 15, paddingHorizontal: 30, marginVertical: 20 }]}>{item.text}</Text>
      </Animated.View>
    </SafeAreaView>

    );
  };


  const handleSkip = () => {
    navigation.navigate('HomeTask');
  };

  const handleNext = () => {
    if (activeIndex === carouselItems.length - 1) {
      handleSkip();
    } else {
      carouselRef.current.snapToNext();
    }
  };

  const carouselRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setActiveIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={[styles.buttonContainer, { width: activeIndex === carouselItems.length - 1  ? '50%' : null }]}>
        {activeIndex === carouselItems.length - 1 ? (
          <View style={{ width: '100%' }}>
            <PrimaryButton title="Iniciar" onPress={handleSkip} />
          </View>
        ) : (
          <>


            <TouchableOpacity
              onPress={handleNext}
              style={{
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/images_black/volver.png')}
                style={{
                  width: 70, height: 70, transform: [{ rotate: '180deg' }]
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  slide: {
    width: ITEM_WIDTH,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 20,
    height: 20,
    borderRadius: Border.br_12xs,
    overflow: "hidden",
  },
  image: {
    width: windowWidth * 0.5, // Set this to the width you want
    height: windowHeight * 0.4 // Set this to the height you want
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
  button2: {
    backgroundColor: 'white',
    borderColor: "#4931a1",
    fontFamily: FontFamily.proximaNovaRegular,
    top: 5,
    padding: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: "white"
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  paginationInactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 50,

  },
});

export default OnboardingScreen;
