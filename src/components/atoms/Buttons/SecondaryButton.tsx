import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { Colors, GlobalStyles } from '@src/themes';
import Button, { ButtonProps } from './Button';
import Icon, { IconName } from '../Icon';

export interface SecondarynProps extends ButtonProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  icon?: IconName;
}

const SecondaryButton: React.FC<SecondarynProps> = ({
  title,
  titleStyle,
  icon,
  style,
  ...props
}) => {
  return (
    <Button
      style={[
        styles.button,
        props.disabled ? styles.disabled : styles.default,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          props.disabled ? styles.textDisabled : null,
          titleStyle,
        ]}
      >
        {title}
      </Text>
      {icon ? (
        <Icon
          name={icon}
          style={{ marginLeft: 5 }}
          color={props.disabled ? '#979797' : 'black'}
          size={16}
        />
      ) : null}
    </Button>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    ...GlobalStyles.shadowSmall,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 12,
    color: Colors.text,
    fontFamily:'Raleway-Regular'
  },
  textDisabled: {
    color: '#979797',
  },
  disabled: {
    backgroundColor: '#F0F0F0',
  },
});
