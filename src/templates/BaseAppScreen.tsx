import React from 'react';
import { SafeAreaView, StatusBarProps } from 'react-native';
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

interface BaseAppScreenProps extends SafeAreaViewProps {
  statusBarProps?: StatusBarProps;
}

const BaseAppScreen: React.FC<BaseAppScreenProps> = ({
  style,
  children,
  statusBarProps,
  ...props
}) => {
  return (
    <>
      <FocusAwareStatusBar {...statusBarProps} />
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: '#18191C' }, style]}
        {...props}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default BaseAppScreen;
