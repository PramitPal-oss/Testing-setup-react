import { Button, ComboboxData } from '@mantine/core';
import InputField from './components/InputField';
import SelectInput from './components/SelectInput';
import TodoList from './components/TodoList';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { addTodo } from './store/slices/todoSlice';
import toast from 'react-hot-toast';

export type filterType = 'Completed' | 'Incompleted' | 'All';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [filter, setFilter] = useState<filterType>('All');
  const dispatch = useAppDispatch();

  const options: ComboboxData | undefined = useMemo(() => ['Completed', 'Incompleted', 'All'], []);

  const EDITSTATUS = useAppSelector((store) => store.todo.EDIT_STATUS);

  const onAddTodoHandler = () => {
    if (!input.trim()) {
      toast.error('Please add a Todo');
      return;
    }
    if (EDITSTATUS) dispatch(addTodo({ status: 'EDIT', TODO: input }));
    else dispatch(addTodo({ status: 'ADD', TODO: input }));
    setInput('');
  };

  return (
    <div>
      <h1 className='font-mono text-center mt-2.5'> Todo App Using Redux Toolkit</h1>
      <div className='flex flex-row gap-2 justify-center items-center'>
        <SelectInput
          label='Status'
          description='Filter your todo!!'
          placeholder='Filtered...'
          data={options}
          value={filter}
          onChange={(e) => setFilter(e as filterType)}
        />
        <InputField
          placeholder='Enter Todo...'
          description='Starts your day with what to do!!'
          label='Todo'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant='light'
          color={EDITSTATUS ? 'teal' : 'violet'}
          className='self-end mb-0.5'
          onClick={onAddTodoHandler}
        >
          {EDITSTATUS ? 'Edit Todo' : 'Add Todo'}
        </Button>
      </div>
      <div className='flex items-center justify-center mt-2.5'>
        <TodoList setInput={setInput} filter={filter} />
      </div>
    </div>
  );
};

export default App;
