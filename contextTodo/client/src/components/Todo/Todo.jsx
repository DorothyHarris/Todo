import React, { useContext, useState } from 'react';
import { TodosContext } from '../Context/Context.jsx';
import styles from './Todo.module.css';

const Todo = ({ todo }) => {
	const [editText, setEditText] = useState(todo.title);
	const [isEditing, setIsEditing] = useState(false);

	const { deleteTodo, updateCheckbox, updateTodo } = useContext(TodosContext);

	const deleteHandler = () => {
		deleteTodo(todo);
	};

	const toggleEdit = () => {
		if (isEditing) {
			updateTodo({ ...todo, title: editText });
		}
		setIsEditing(!isEditing);
	};

	const changeHandler = e => {
		updateCheckbox({ ...todo, description: e.target.checked });
	};

	return (
		<div className={styles.todoContainer}>
			<input
				type='checkbox'
				checked={todo.description}
				onChange={changeHandler}
			/>
			{isEditing ? (
				<div className={styles.editContainer}>
					<input
						value={editText}
						onChange={e => setEditText(e.target.value)}
						className={styles.editInput}
					/>
					<button onClick={toggleEdit} className={styles.checkButton}>
						✔
					</button>
				</div>
			) : (
				<span
					className={`${styles.todoTitle} ${
						todo.description ? styles.completed : ''
					}`}
				>
					{todo.title}
				</span>
			)}
			<div className={styles.buttonContainer}>
				<button onClick={deleteHandler} className={styles.deleteButton}>
					🗑️
				</button>
				<button onClick={toggleEdit} className={styles.editButton}>
					✏️
				</button>
			</div>
		</div>
	);
};

export default Todo;
