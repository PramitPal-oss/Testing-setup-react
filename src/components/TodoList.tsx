import { Table } from '@mantine/core';
import React, { Fragment, useEffect, useMemo } from 'react';
import { useAppSelector } from '../store/store';
import { filterType } from '../App';
import TodoRow from './TodoRow';

export interface TodoInterface {
  TODO: string;
  ID: number;
  COMPLETED: boolean;
}

export interface TodoListInterface {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  filter: filterType;
}

const TodoList: React.FC<TodoListInterface> = ({ filter, setInput }) => {
  const todos = useAppSelector((store) => store.todo.todos);

  const todoStatus = useAppSelector((store) => store.todo);

  const filteredTodo = useMemo(() => {
    return todos.filter((el) => {
      if (filter === 'Completed') return el.COMPLETED;
      else if (filter === 'Incompleted') return !el.COMPLETED;
      else return el;
    });
  }, [filter, todos]);

  useEffect(() => {
    if (todoStatus.EDIT_STATUS && todoStatus.EDIT_ID) {
      const findTodo = todoStatus.todos.find((el) => el.ID === todoStatus.EDIT_ID);
      if (!findTodo) return;
      setInput(findTodo.TODO);
    }
  }, [todoStatus]);

  return (
    <Fragment>
      {filteredTodo.length ? (
        <Table.ScrollContainer minWidth={500} maxHeight={300}>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Todo</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredTodo.map((todo) => (
                <TodoRow todo={todo} key={todo.ID} />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <div>
          <p className='font-mono font-semibold text-cyan-600'>Add todos to start your day !!</p>
        </div>
      )}
    </Fragment>
  );
};

export default TodoList;
