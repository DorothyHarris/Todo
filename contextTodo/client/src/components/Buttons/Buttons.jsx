import React, { useContext, useState } from 'react';
import { TodosContext } from '../Context/Context.jsx';
import Todo from '../Todo/Todo.jsx';
import styles from './Buttons.module.css';

export default function Buttons() {
	const { todos } = useContext(TodosContext);
	const [filter, setFilter] = useState('all');

	const filteredTodos = () => {
		switch (filter) {
			case 'done':
				return todos.filter(todo => todo.description === true);
			case 'todo':
				return todos.filter(todo => todo.description !== true);
			default:
				return todos;
		}
	};

	const visibleTodos = filteredTodos();

	return (
		<div className={styles.todoListContainer}>
			<h2 className={styles.todoListTitle}>TodoList</h2>
			<div className={styles.btnGroup}>
				<button className={styles.todoBtn} onClick={() => setFilter('all')}>
					All
				</button>
				<button className={styles.todoBtn} onClick={() => setFilter('done')}>
					Done
				</button>
				<button className={styles.todoBtn} onClick={() => setFilter('todo')}>
					Todo
				</button>
			</div>
			<div className={styles.todoItem}>
				{visibleTodos.map(todo => (
					<Todo key={todo.id} todo={todo} />
				))}
			</div>
		</div>
	);
}
