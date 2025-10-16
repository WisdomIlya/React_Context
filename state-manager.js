import { createContext, useContext, useState } from 'react';

const initialState = {
	todos: [],
	debouncedSearch: '',
	isSorted: false,
	isLoader: false,
	inputValue: '',
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [state, setState] = useState(initialState);

	const updateState = (updates) => {
		setState((prevState) => {
			if (typeof updates === 'object' && updates !== null) {
				return setState((prevState) => ({
					...prevState,
					...updates,
				}));
			} else {
				return prevState;
			}
		});
	};

	const actions = {
		setDebouncedSearchQuery: (query) => {
			updateState({ debouncedSearchQuery: query });
		},
		setIsSorted: (sorting) => {
			updateState({ isSorted: sorting });
		},
		setIsLoader: (loader) => {
			updateState({ isLoader: loader });
		},
		setInputValue: (value) => {
			updateState({ inputValue: value });
		},

	};


	const value = {
		state, actions
	};

	return < AppContext.Provider value={value} >
		{children}
	</AppContext.Provider>
}


export const useApp = () => {
	const context = useContext(AppContext);

	return context
}
