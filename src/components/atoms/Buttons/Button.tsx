import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {}

const Button: React.FC<ButtonProps> = ({
  activeOpacity,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity ?? 0.8} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
