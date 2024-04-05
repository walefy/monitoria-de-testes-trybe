import express, { Request, Response } from 'express';
import * as monitoria from './sum';

const app = express();

app.use(express.json());

export const controllerCreatePerson = async (req: Request, res: Response) => {
	const { name, cash } = req.body;
	const newPerson = await monitoria.createPerson({ name, cash });

	return res.status(201).json(newPerson);
}

app.post('/person', controllerCreatePerson);

export default app;
