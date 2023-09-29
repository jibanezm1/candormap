import { GlobalStyles } from '@src/themes';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import Button, { ButtonProps } from './Button';

export interface TextButtonProps extends ButtonProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
}

const TextButton: React.FC<TextButtonProps> = ({
  title,
  titleStyle,
  ...props
}) => {
  return (
    <Button {...props}>
      <Text
        style={[styles.text, titleStyle, props.disabled && styles.textDisabled]}
      >
        {title}
      </Text>
    </Button>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  text: {
    ...GlobalStyles.text,
    color: '#333',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  textDisabled: {
    color: '#626262',
  },
});
