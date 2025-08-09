import { Badge, Checkbox, Table } from '@mantine/core';
import ActionsIcons from './ActionIcons';
import { TodoInterface } from './TodoList';
import React, { useCallback } from 'react';
import { useAppDispatch } from '../store/store';
import { CheckBoxHandler, deleteTodo, editTodo } from '../store/slices/todoSlice';

const TodoRow = ({ todo }: { todo: TodoInterface }) => {
  const dispatch = useAppDispatch();

  const onCheckboxChnageHandler = useCallback((ID: number) => dispatch(CheckBoxHandler({ ID })), [dispatch]);

  const onEditHandler = useCallback((ID: number) => dispatch(editTodo({ ID })), [dispatch]);

  const onDeleteHandler = useCallback((ID: number) => dispatch(deleteTodo({ ID })), [dispatch]);

  return (
    <Table.Tr key={todo.ID}>
      <Table.Td>
        <Checkbox
          label={todo.TODO}
          checked={todo.COMPLETED}
          onChange={() => onCheckboxChnageHandler(todo.ID)}
          className={`font-sans ${todo?.COMPLETED ? 'line-through' : ''}`}
        />
      </Table.Td>
      <Table.Td>
        <Badge variant='light' color={todo.COMPLETED ? 'lime' : 'indigo'}>
          {todo.COMPLETED ? 'Completed' : 'Incomplete'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <ActionsIcons deleteHandler={() => onDeleteHandler(todo.ID)} editHandler={() => onEditHandler(todo.ID)} />
      </Table.Td>
    </Table.Tr>
  );
};

export default React.memo(TodoRow);
