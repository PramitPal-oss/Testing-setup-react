import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';

const InputField: React.FC<TextInputProps> = (props) => {
  return <TextInput size='sm' radius='md' withAsterisk {...props} />;
};

export default InputField;
