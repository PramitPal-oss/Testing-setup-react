import { Select, SelectProps } from '@mantine/core';
import React from 'react';

const SelectInput: React.FC<SelectProps> = (props) => {
  return (
    <Select
      {...props}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      size='sm'
      radius='md'
      withAsterisk
    />
  );
};

export default SelectInput;
