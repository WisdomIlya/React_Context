import styles from './sorting.module.css';
import { useApp } from '../../../hooks';

export const Sorting = () => {
	const { state, actions } = useApp();

	const handleToggleSort = () => {
		actions.setIsSorted(!state.isSorted);
	};

	return (
		<button
            className={`${styles.sortBtn} ${state.isSorted ? styles.sortBtnActive : ''}`}
            onClick={handleToggleSort}
            title={state.isSorted ? "Отключить сортировку" : "Сортировать по алфавиту"}
        >
            {state.isSorted ? 'A-Z ✓' : 'A-Z'}
        </button>
	)
}
