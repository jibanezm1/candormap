import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { Color } from '../../../styles/Global';
import Button, { ButtonProps } from './Button';

export interface PrimaryButtonProps extends ButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  size?: 'default' | 'small';
  loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  style,
  type = 'primary',
  size = 'default',
  loading,
  ...props
}) => {
  return (
    <Button
      style={[
        styles.button,
        styles[type],
        styles[size],
        props.disabled
          ? styles.disabled
          : type === 'primary'
          ? styles.shadowSmall
          : null,
        style,
      ]}
      {...props}
      disabled={props.disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={styles[`label_${type}`].color} />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`label_${type}`],
            props.disabled ? styles.textDisabled : null,
          ]}
        >
          {title}
        </Text>
      )}
    </Button>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.designPrimary,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  primary: {
    borderColor: Color.designPrimary,
    paddingVertical: 16,
  },
  secondary: {
    borderColor: Color.designPrimary,
    backgroundColor: 'white',
  },
  tertiary: {
    borderColor: 'black',
    backgroundColor: 'white',
  },
  default: {
    paddingVertical: 16,
  },
  small: {
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily:'Raleway-Regular'
    },
  textDisabled: {
    color: '#626262',
  },
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
  label_primary: {
    color: 'white',
  },
  label_secondary: {
    color: Color.designPrimary,
  },
  label_tertiary: {
    color: '#333',
  },
  disabled: {
    backgroundColor: '#EEE',
    borderColor: '#CCC',
  },
});
