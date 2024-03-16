import React from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { Color } from '../../../styles/Global';
import Button, { ButtonProps } from './Button';

export interface PrimaryButtonProps extends ButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
  size?: 'default' | 'small' | 'mini';
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
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
  },
  primary: {
    borderColor: Color.designPrimary,
    paddingVertical: 34,
    marginTop:10
  },
  secondary: {
    borderColor: "white",
    backgroundColor: 'black',
  },
  disabled: {
    borderColor: Color.designPrimary,
    backgroundColor: 'black',
  },
  tertiary: {
    borderColor: 'black',
    backgroundColor: 'white',
  },
  default: {
    paddingVertical: 20,
  },
  small: {
    paddingVertical: 20,
    borderRadius: 30,
  },
  mini: {
    paddingVertical: 2,
    borderRadius: 30,
  },
  text: {
    color:"black",
    alignSelf: 'center',
    fontSize: 18,
    fontFamily:'Raleway-Regular',
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
    color: 'black',
  },
  label_secondary: {
    color: "white",
  },
  label_tertiary: {
    color: '#333',
  },
  disabled: {
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
});
