import styles from './search.module.css';

export const Search = ({
	searchQuery,
	inputValue,
	isCreating,
    handleSearchChange,
    handleAddTodo,
    setInputValue,
	}) => {
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
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</div>

			<div className={styles.inputGroup}>
				<input type="text"
					className={styles.todoInput}
					placeholder="Добавить новую задачу..."
					value={inputValue}
					onKeyDown={handleAddTodoKeyPress}
					disabled={isCreating}
					onChange={({ target }) => (setInputValue(target.value))}
				/>
				<button disabled={isCreating || !inputValue.trim()}
					className={styles.addBtn}
					onClick={handleAddTodo}
				>
					Добавить задачу
				</button>
			</div>
		</>
	)
}
