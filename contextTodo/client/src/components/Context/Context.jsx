import React, { createContext, useEffect, useState } from 'react';

const initialState = {
	todos: [],
	deleteTodo: async () => {},
	updateCheckbox: async () => {},
	updateTodo: async () => {},
	addTodo: async () => {},
};

export const TodosContext = createContext(initialState);

export const TodosContextProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const fetchTodos = async () => {
			const response = await fetch('http://localhost:8000/get/all');
			const data = await response.json();
			setTodos(data);
		};

		fetchTodos();
	}, []);

	const addTodo = async task => {
		const response = await fetch('http://localhost:8000/todo/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ task }),
		});

		if (response.status === 201) {
			const newTodo = await response.json();
			console.log(newTodo);
			setTodos(prevTodos => [...prevTodos, newTodo]);
		} else {
			console.error('Ошибка при добавлении todo:', response.statusText);
		}
	};

	const deleteTodo = async todo => {
		const response = await fetch(
			`http://localhost:8000/todo/todos/${todo.id}`,
			{
				method: 'DELETE',
			}
		);
		if (response.ok) {
			setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
		}
	};

	const updateCheckbox = async todo => {
		const updatedTodo = { ...todo, completed: !todo.completed };
		const response = await fetch(
			`http://localhost:8000/todo/todos/${todo.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedTodo),
			}
		);

		if (response.ok) {
			setTodos(prevTodos =>
				prevTodos.map(t => (t.id === todo.id ? updatedTodo : t))
			);
		}
	};

	const updateTodo = async todo => {
		const response = await fetch(
			`http://localhost:8000/todo/todos/${todo.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			}
		);

		if (response.ok) {
			setTodos(prevTodos => prevTodos.map(t => (t.id === todo.id ? todo : t)));
		}
	};

	return (
		<TodosContext.Provider
			value={{ todos, deleteTodo, updateCheckbox, updateTodo, addTodo }}
		>
			{children}
		</TodosContext.Provider>
	);
};
