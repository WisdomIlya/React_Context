import { createContext, useState } from 'react';
import { initialState } from "../constants";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [state, setState] = useState(initialState);

	const updateState = (updates) => {
        if (typeof updates === 'object' && updates !== null) {
            setState(prevState => ({
                ...prevState,
                ...updates,
            }));
        }
    };

	const actions = {

		setDebouncedSearch: ( query ) => {
			updateState({ debouncedSearch: query });
		},

		setIsSorted: ( sorting ) => {
			updateState({ isSorted: sorting });
		},

		setIsLoader: ( loader ) => {
			updateState({ isLoader: loader });
		},

		setInputValue: ( value ) => {
			updateState({ inputValue: value });
		},

		setTodos: ( todosArray ) => {
			updateState({ todos: todosArray });
		},

		setIsCreating: ( creating ) => {
			updateState({ isCreating: creating });
		},

		addTodo: (newTodo) => {
			setState(prev => ({
				...prev,
				todos: [...prev.todos, newTodo]
			}));
		},

		updateTodo: (id, updates) => {
			setState(prev => ({
				...prev,
				todos: prev.todos.map(todo =>
					todo.id === id ? { ...todo, ...updates } : todo
				)
			}));
		},

		deleteTodo: (id) => {
			setState(prev => ({
				...prev,
				todos: prev.todos.filter(todo => todo.id !== id)
			}));
		}
	};

	const value = {
		state, actions
	};

	return < AppContext.Provider value={value} >
		{children}
	</AppContext.Provider>
}

export { AppContext };
