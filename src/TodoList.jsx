import styles from "./todoList.module.css";
import { searchTodo } from "./utils";
import { useTodos } from "./hooks/useTodos";
import { debounce } from "./utils";
import { useState, useRef  } from "react";
import { ControlPanel } from "./components/control-panel/controlPanel";
import { Todo } from "./components/todo/Todo";
import { AppProvider } from "../state-manager";

export const TodoList = () => {
	const [isSorted, setIsSorted] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState('');

	const {todos,
		inputValue,
		isCreating,
		isLoader,

		setInputValue,

		requestAddTodo,
		requestUpdateTodo,
		requestDeleteTodo,}
	= useTodos();

	const debouncedSearchRef = useRef(
        debounce((query) => {
            setDebouncedSearch(query);
        }, 300)
    )

    const sortTodos = (todosArray) => {
        return [...todosArray].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    };

    const filteredTodos = searchTodo(todos, debouncedSearch);
    const sortedTodos = isSorted ? sortTodos(filteredTodos) : filteredTodos;

	const handleAddTodo = () => {
        requestAddTodo(true);
    };

	const handleToggleTodo = (id, completed) => {
        requestUpdateTodo(id, { completed: !completed });
    };

	const handleDeleteTodo = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить задачу?')) {
            requestDeleteTodo(id);
        }
    };

	const handleSearchChange = (event) => {
		debouncedSearchRef.current(event.target.value);
    };

	return (
		<AppProvider>
			<div className={styles.todoContainer}>
				<ControlPanel debouncedSearch={debouncedSearch}
					inputValue={inputValue}
					isCreating={isCreating}
					isSorted={isSorted}
					handleSearchChange={handleSearchChange}
					handleAddTodo={handleAddTodo}
					setInputValue={setInputValue}
					setIsSorted={setIsSorted}
				/>
				{isLoader ? (
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
		</AppProvider>
	)
};
