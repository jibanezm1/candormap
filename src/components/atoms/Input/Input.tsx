import Colors from '../../../styles/Colors';
import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper';

export interface InputProps extends Omit<TextInputProps, 'theme'> {
  innerRef?: any;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ errorMessage, innerRef, ...props }) => {
  return (
    <>
      <TextInput
        ref={innerRef}
        mode="outlined"
        activeOutlineColor="white"
        style={{color: 'white'}}
        label={props.label}
        textColor="white"
        theme={{
          roundness: 5,
          colors: {
            error: Colors.error,
            background: '#30023e',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
            surface: '#30023e',     // Reemplaza 'morado' con el valor hexadecimal adecuado.
            primary: 'white',      // Esto cambia el color del label y el borde a blanco.
            text: 'white'           // Esto cambia el color del texto a blanco.
          },
        }}
        {...props}
      />
      {props.error && errorMessage ? (
        <HelperText type="error" theme={{ colors: { error: Colors.error } }}>
          {errorMessage}
        </HelperText>
      ) : null}
    </>
  );
};

export default Input;
