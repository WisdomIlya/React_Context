import styles from './control-panel.module.css';
import { Search } from './search/Search';
import { Sorting } from './sorting/Sorting';

export const  ControlPanel = ({
	debouncedSearch,
	inputValue,
	isCreating,
	isSorted,
    handleSearchChange,
    handleAddTodo,
    setInputValue,
	setIsSorted
}) => {
	return (
		<>
			<header className={styles.todoHeader}>
				<h1 className={styles.todoTitle}>Список задач</h1>
			</header>
			<div className={styles.todoForm}>
				<Search debouncedSearch={debouncedSearch}
					inputValue={inputValue}
					isCreating={isCreating}
    				handleSearchChange={handleSearchChange}
    				handleAddTodo={handleAddTodo}
    				setInputValue={setInputValue}
				/>
				<Sorting isSorted={isSorted} setIsSorted={setIsSorted}/>
			</div>
		</>
	)
}
