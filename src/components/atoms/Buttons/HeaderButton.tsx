import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button, { ButtonProps } from './Button';
import Icon from '../Icon';

interface BackButtonProps extends ButtonProps {
  iconProps?: IconProps;
}

const HeaderButton: React.FC<BackButtonProps> = ({
  style,
  iconProps,
   ...props
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const renderColor = route.name == 'MiPreunic' ? 'white' : 'gray';
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Button
      onPress={handlePress}
      style={[styles.container, style]}
      {...props}
    >
      <Icon name={'ChevronLeft'} size={25} color={renderColor} {...iconProps} />
    </Button>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
});
