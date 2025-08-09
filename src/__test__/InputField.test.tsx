import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputField from '../components/InputField';
import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

const TestWrapper = ({ children }: { children: ReactNode }) => <MantineProvider>{children}</MantineProvider>;

test('Rendering the Input Field', () => {
  render(<InputField />, { wrapper: TestWrapper });
});

test('Render with placeholders', () => {
  render(<InputField placeholder='Enter todo' />, { wrapper: TestWrapper });
  const isPlaceHolder = screen.getByPlaceholderText('Enter todo');
  expect(isPlaceHolder).toBeInTheDocument();
});

test('Render with Label', () => {
  render(<InputField placeholder='Enter todo' label='First Name' />, { wrapper: TestWrapper });
  const isPlaceHolder = screen.getByLabelText(/First Name/i);
  expect(isPlaceHolder).toBeInTheDocument();
});

test('renders disabled input', () => {
  render(<InputField disabled />, { wrapper: TestWrapper });
  const input = screen.getByRole('textbox');
  expect(input).toBeDisabled();
});

test('Forwards name, value, onChange props', () => {
  const mockOnChanage = jest.fn();
  render(<InputField placeholder='Enter todo' name='fname' onChange={mockOnChanage} />, { wrapper: TestWrapper });

  const input = screen.getByRole('textbox') as HTMLInputElement;
  expect(input).toHaveAttribute('name', 'fname');

  // Simulate change event
  fireEvent.change(input, { target: { value: 'pal' } });

  expect(mockOnChanage).toHaveBeenCalledTimes(1);

  expect(input.value).toBe('pal');
});

test('should handle change event with userEvent', async () => {
  const user = userEvent.setup();
  const mockOnChange = jest.fn();

  render(<InputField label='Test Input' onChange={mockOnChange} />, { wrapper: TestWrapper });

  const input = screen.getByRole('textbox') as HTMLInputElement;

  // Simulate user typing
  await user.type(input, 'hello world');

  expect(mockOnChange).toHaveBeenCalledTimes(11); // Called for each character
  expect(input.value).toBe('hello world');
});
