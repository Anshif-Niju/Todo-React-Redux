import { createSlice, current } from '@reduxjs/toolkit';

const loadTodo = () => {
  const data = localStorage.getItem('todos');
  return data ? JSON.parse(data) : [];
};

const saveTodo = (todo) => {
  localStorage.setItem('todos', JSON.stringify(todo));
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: loadTodo(),
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        checked: false,
        createdAt: new Date().toLocaleString(),
      });

      saveTodo(current(state));
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;

      const todoId = state.find((t) => t.id === id);
      if (todoId) {
        todoId.text = text;
      }
      saveTodo(current(state));
    },

    deleteTodo: (state, action) => {
      const newState = state.filter((todo) => todo.id !== action.payload);
      saveTodo(newState);
      return newState;
    },
    toggleTodo: (state, action) => {
      const todoId = state.find((t) => t.id === action.payload);
      if (todoId) {
        todoId.checked = !todoId.checked;
      }
      saveTodo(current(state));
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
