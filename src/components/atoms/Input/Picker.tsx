import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../Buttons/Button';
import { GlobalStyles } from '@src/themes';
import Input, { InputProps } from './Input';
import Icon from '../Icon';

interface PickerOption {
  label: string;
  value: string | number;
}

export interface PickerProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string | number) => void;
  options: PickerOption[];
}

const Picker: React.FC<PickerProps> = ({ options, onChange, ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const _handleChange = (value: string | number) => {
    setModalVisible(!modalVisible);
    onChange?.(value);
  };

  const _renderItem = ({ item }: { item: PickerOption }) => {
    return (
      <Button
        style={[styles.itemContainer]}
        onPress={() => _handleChange(item.value)}
      >
        <Text style={styles.itemLabel}>{item.label}</Text>
      </Button>
    );
  };

  return (
    <>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Input
          editable={false}
          onPressIn={() => setModalVisible(!modalVisible)} // Workaround for iOS
          {...props}
        />
        <View style={{ position: 'absolute', marginTop: 25, right: 15 }}>
          <Icon
            name={modalVisible ? 'ChevronUp' : 'ChevronDown'}
            color="#626262"
            size={25}
          />
        </View>
      </Pressable>
      <View
        style={[
          styles.modalContainer,
          { height: modalVisible ? undefined : 0 },
        ]}
      >
        <FlatList
          nestedScrollEnabled={true}
          data={options}
          renderItem={_renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  modalContainer: {
    ...GlobalStyles.shadowSmall,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    position: 'absolute',
    top: 65,
  },
  itemContainer: {
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  itemLabel: {
    ...GlobalStyles.text,
  },
});
