import styles from "./todoList.module.css";
import { searchTodo } from "./utils";
import { useTodos, useApp } from "./hooks";
import { debounce } from "./utils";
import { useRef  } from "react";
import { ControlPanel } from "./components/control-panel/controlPanel";
import { Todo } from "./components/todo/Todo";

export const TodoList = () => {
	const { state, actions } = useApp();

	const {
		requestAddTodo,
		requestUpdateTodo,
		requestDeleteTodo,}
	= useTodos();

	const debouncedSearchRef = useRef(
        debounce((query) => {
            actions.setDebouncedSearch(query);
        }, 300)
    )

    const sortTodos = (todosArray) => {
        return [...todosArray].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    };

    const filteredTodos = searchTodo(state.todos, state.debouncedSearch);
    const sortedTodos = state.isSorted ? sortTodos(filteredTodos) : filteredTodos;

	const handleAddTodo = () => {
        requestAddTodo(true);
    };

	const handleToggleTodo = ({id, completed}) => {
        requestUpdateTodo(id, { completed: !completed });
    };

	const handleDeleteTodo = (todo) => {
        if (window.confirm('Вы уверены, что хотите удалить задачу?')) {
			console.log('🗑️ handleDelete called with todo.id:', todo.id); // 🔍 ОТЛАДКА
            requestDeleteTodo(todo.id);
        }
    };

	const handleSearchChange = (event) => {
		debouncedSearchRef.current(event.target.value);
    };

	return (
		<div className={styles.todoContainer}>
			<ControlPanel
				handleSearchChange={handleSearchChange}
				handleAddTodo={handleAddTodo}
			/>
			{state.isLoader ? (
				<div className={styles.loaderGradient}></div>
			) : ( <div className={styles.todoList}>
				{sortedTodos.map(( todo ) => (
				<Todo todo={todo}
					key={todo.id}
					handleToggleTodo={handleToggleTodo}
					handleDeleteTodo={handleDeleteTodo}
				/>
				))}
				</div>
			)}
		</div>
	)
};
