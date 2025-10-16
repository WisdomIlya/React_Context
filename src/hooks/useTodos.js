import { generatedId } from '../utils';
import { API_BASE_URL } from '../constants';
import { useEffect } from 'react';
import { useApp } from './useApp';

export const useTodos = () => {
	const { state, actions } = useApp();

	useEffect(() => {
		actions.setIsLoader(true);

		fetch(`${API_BASE_URL}/todos`)
			.then((response) => response.json())
			.then((loadedTodos) => {
				actions.setTodos(loadedTodos);
			})
			.finally(() => {
				actions.setIsLoader(false);
			});
	},[]);

	const requestAddTodo = (isValueValid = true) => {
		if (!state.inputValue.trim() || !isValueValid) return;

		actions.setIsCreating(true);

		fetch(`${API_BASE_URL}/todos`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: generatedId(),
				title: state.inputValue.trim(),
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				actions.addTodo(response);
				actions.setInputValue('');
			})
			.finally(() => {
				actions.setIsCreating(false);
			});
	};

	const requestUpdateTodo = (id, updates) => {
		fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		})
			.then((response) => response.json())
			.then((updatedTodo) => { actions.updateTodo(id ,updatedTodo) });
	};

	const requestDeleteTodo = (id) => {
		fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'DELETE',
		}).then(() => {
			actions.deleteTodo(id);
		});
	};

	return {
		// Методы
		requestAddTodo,
		requestUpdateTodo,
		requestDeleteTodo,
	};
};
