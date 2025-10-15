import styles from './sorting.module.css';

export const Sorting = ({isSorted, setIsSorted}) => {

	const handleToggleSort = () => {
		setIsSorted(!isSorted);
	};

	return (
		<button
            className={`${styles.sortBtn} ${isSorted ? styles.sortBtnActive : ''}`}
            onClick={handleToggleSort}
            title={isSorted ? "Отключить сортировку" : "Сортировать по алфавиту"}
        >
            {isSorted ? 'A-Z ✓' : 'A-Z'}
        </button>
	)
}
