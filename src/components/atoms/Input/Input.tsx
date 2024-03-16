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
        outlineColor='#272A31'
        activeOutlineColor="#272A31"
        style={{ color: 'white', marginVertical: 10, height:65, width: "100%", textAlign: 'center' }} // Ajustar el textAlign a 'center'
        textColor="white"

        theme={{
          roundness: 60,

          colors: {
            error: Colors.error,
            background: '#272A31',  // Reemplaza 'morado' con el valor hexadecimal adecuado.
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
