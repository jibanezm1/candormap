import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, StatusBarProps } from 'react-native';

const FocusAwareStatusBar: React.FC<StatusBarProps> = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      translucent
      barStyle={'dark-content'}
      backgroundColor="transparent"
      {...props}
    />
  ) : null;
};

export default FocusAwareStatusBar;
