import styles from './control-panel.module.css';
import { Search } from './search/Search';
import { Sorting } from './sorting/Sorting';

export const  ControlPanel = ({
    handleSearchChange,
    handleAddTodo,
}) => {
	return (
		<>
			<header className={styles.todoHeader}>
				<h1 className={styles.todoTitle}>Список задач</h1>
			</header>
			<div className={styles.todoForm}>
				<Search
    				handleSearchChange={handleSearchChange}
    				handleAddTodo={handleAddTodo}
				/>
				<Sorting />
			</div>
		</>
	)
}
