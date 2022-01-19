import React from "react";
import { AppUI } from './AppUI'

// const defaultItem = [
//   { text: "Cocinar cebolla", completed: true },
//   { text: "Cocinar champinones", completed: false },
//   { text: "Preparar cafe", completed: false },
//   { text: "Preparar desayuno", completed: true },
// ]

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if(!localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = [];
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }
  
  const [todos, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  }

  return {
    todos,
    saveItem,
  }
}

function App() {

  const {
    item: todos,
    saveItem: saveTodos,
    // loading,
    // error,
  } = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('')

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];


  if (!searchValue.length >= 1) {
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    })
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
    const newItem = [...todos];
    newItem[todoIndex].completed = true;
    saveTodos(newItem);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
    const newItem = [...todos];
    newItem.splice(todoIndex, 1);
    saveTodos(newItem);
  };

  React.useEffect()

  return (
    <AppUI 
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
