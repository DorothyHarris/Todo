const router = require('express').Router();
const { Task } = require('./db/models');

router.post('/todos', async (req, res) => {
	try {
		const { task } = req.body;
		const todo = await Task.create({
			title: task,
			user_id: Math.floor(Math.random() * 999),
		});
		console.log('todo', todo.title);
		res.status(201).json(todo);
	} catch (e) {
		console.log(e);

		res
			.status(500)
			.json({ error: 'An error occurred while creating the todo.' });
	}
});

router.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await Task.destroy({ where: { id: Number(id) } });
		res.sendStatus(204);
	} catch (e) {
		console.log(e);
	}
});

router.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		console.log(description);
		const updateTodo = await Task.update(
			{ description: !description },
			{ where: { id: Number(id) } }
		);
		res.sendStatus(204).json(updateTodo);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
