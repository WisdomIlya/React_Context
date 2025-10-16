import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TodoList } from './TodoList.jsx';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
	<AppProvider>
		<StrictMode>
			<TodoList />
		</StrictMode>
	</AppProvider>
);
