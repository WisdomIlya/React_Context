import styles from './todo.module.css';

export const Todo = ({ todo, id, handleToggleTodo, handleDeleteTodo }) => (
	<div key={id} className={styles.todoItem}>
		<input id={id}
			type="checkbox"
			checked={todo.completed || false}
			className={styles.todoCheckbox}
			onChange={() => handleToggleTodo(id, todo.completed)}
		/>
		<div className={styles.todoText}>
			{todo.title}
		</div>
		<button
            onClick={() => handleDeleteTodo(id)}
            className={styles.deleteBtn}
            title="Удалить задачу"
        >
            x
        </button>
	</div>
)
