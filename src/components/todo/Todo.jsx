import styles from './todo.module.css';

export const Todo = ({ todo, id, handleToggleTodo, handleDeleteTodo }) => {
	return (
	<div key={id} className={styles.todoItem}>
		<input type="checkbox"
			checked={todo.completed || false}
			className={styles.todoCheckbox}
			onChange={() => handleToggleTodo(todo)}
		/>
		<div className={styles.todoText}>
			{todo.title}
		</div>
		<button
            onClick={() => handleDeleteTodo(todo)}
            className={styles.deleteBtn}
            title="Удалить задачу"
        >
            x
        </button>
	</div>
	)
}
