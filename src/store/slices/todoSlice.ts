import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface TodoInterface {
  TODO: string;
  ID: number;
  COMPLETED: boolean;
}

export interface InitialStateInterface {
  todos: TodoInterface[],
  EDIT_STATUS: boolean,
  EDIT_ID: number | null,
}

const initialState: InitialStateInterface = {
  todos: [],
  EDIT_STATUS: false,
  EDIT_ID: null,
}

export const TodoSlice = createSlice({
  name: 'TodoSlice',

  initialState,

  reducers: {

    addTodo: (state, action) => {
      if (action.payload.status === 'ADD' && !state.EDIT_ID) {
        const newTodo: TodoInterface = { TODO: action.payload.TODO, ID: Date.now(), COMPLETED: false }
        state.todos.push(newTodo);
        toast.success('Todo Added Successfully!!')
      }
      else {
        const findTodo = state.todos.find(el => el.ID === state.EDIT_ID);
        if (!findTodo) {
          toast.error('No Todo Found with this ID!!')
          return state;
        }
        state.EDIT_STATUS = false;
        state.EDIT_ID = null;
        findTodo.TODO = action.payload.TODO;
        toast.success('Todo Edited Successfully!!')
      }
    },

    CheckBoxHandler: (state, action) => {
      const findTodo = state.todos.find(el => el.ID === action.payload.ID);
      if (!findTodo) return state;
      findTodo.COMPLETED = !findTodo.COMPLETED;
    },

    editTodo: (state, action) => {
      const findTodo = state.todos.find(el => el.ID === action.payload.ID);
      if (!findTodo) return state;
      state.EDIT_STATUS = true;
      state.EDIT_ID = action.payload.ID;
    },

    deleteTodo: (state, action) => {
      if (action.payload.ID === state.EDIT_ID) {
        toast.error("Can't delete any editable Todo")
        return state;
      }
      const filterTodo = state.todos.filter(el => el.ID !== action.payload.ID);
      state.todos = filterTodo;
      toast.success('Todo Deleted Successfully!')
      return state;
    },

  }
})

export const { addTodo, CheckBoxHandler, editTodo, deleteTodo } = TodoSlice.actions

export default TodoSlice.reducer;