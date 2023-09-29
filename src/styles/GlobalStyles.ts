import { TextStyle, ViewStyle } from 'react-native';
import Colors from './Colors';

interface GlobalStyleProps {
  [key: string]: ViewStyle | TextStyle;
}

const GlobalStyles: GlobalStyleProps = {
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 3,
  },

  header: {
    backgroundColor: 'white',
  },
  headerTitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#7A7A7A',
    letterSpacing: 0.5,
    fontFamily:'Raleway-Regular',

  },

  sectionTitle: {
    fontFamily:'Raleway-Regular',
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 24,

  },

  text: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.text,
    fontFamily:'Raleway-Regular'


  },
  text2: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight:'normal',
    letterSpacing:0.25,
    color: "#626262",
    fontFamily:'Raleway-Regular'

  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.text,
    fontFamily:'Raleway-Regular'
  },
  titleBold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 14,
    color: Colors.text,
    fontFamily:'Raleway-Regular'
  },
};

export default GlobalStyles;
