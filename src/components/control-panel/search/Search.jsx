import styles from './search.module.css';
import { useApp } from '../../../hooks'

export const Search = ({
    handleSearchChange,
    handleAddTodo,
	}) => {
	const { state, actions } = useApp();

	const handleAddTodoKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

	return (
		<>
			<div className={styles.searchGroup}>
			<input
					type="text"
					className={styles.searchInput}
					placeholder="Поиск задач..."
					value={state.debouncedSearch}
					onChange={handleSearchChange}
				/>
			</div>

			<div className={styles.inputGroup}>
				<input type="text"
					className={styles.todoInput}
					placeholder="Добавить новую задачу..."
					value={state.inputValue}
					onKeyDown={handleAddTodoKeyPress}
					disabled={state.isCreating}
					onChange={({ target }) => (actions.setInputValue(target.value))}
				/>
				<button disabled={state.isCreating || !state.inputValue.trim()}
					className={styles.addBtn}
					onClick={handleAddTodo}
				>
					Добавить задачу
				</button>
			</div>
		</>
	)
}
