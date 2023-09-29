import { Dimensions, Platform } from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('window');

const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: (width < height ? height : width) - getStatusBarHeight(true), 
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  statusBarHeight: getStatusBarHeight(),
  statusBarHeightIgnoreAndroid: getStatusBarHeight(true),
};

export default Metrics;
