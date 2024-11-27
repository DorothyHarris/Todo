import React, { useContext, useState } from 'react';
import { TodosContext } from '../Context/Context.jsx';
import styles from './Input.module.css';

export default function Input() {
	const [task, setTask] = useState('');
	const { addTodo } = useContext(TodosContext);

	const handleAddTodo = async event => {
		event.preventDefault();
		if (!task.trim()) return;
		try {
			await addTodo(task);
		} catch (error) {
			console.error('Ошибка при добавлении задачи:', error);
		}
		setTask('');
	};

	return (
		<div className={styles.todoBox}>
			<h1 className={styles.mainTitle}>TodoInput</h1>
			<form className={styles.formBox} onSubmit={handleAddTodo}>
				<input
					value={task}
					onChange={e => setTask(e.target.value)}
					className={styles.taskInput}
					type='text'
					placeholder='new task'
				/>
				<button type='submit' className={styles.addBtn}>
					Add new task
				</button>
			</form>
		</div>
	);
}
