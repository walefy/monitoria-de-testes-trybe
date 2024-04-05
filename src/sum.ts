export type Person = {
	name: string;
	cash: number;
}

const persons = [
	{ name: "keli", cash: 50000 },
	{ name: "walefy", cash: 50000 },
	{ name: "dênis", cash: 50000 },
	{ name: "fulaninho", cash: 50000 },
	{ name: "algumNome", cash: 50000 }
];

export const execute = async () => persons;
export const update = async (index: number, newName: string) => {
	persons[index].name = newName;
	return persons[index];

	// throw new Error('ECONREFUED');
} 

export const sum = (x: number, y: number): number => x + y;

export const saySomething = (something: string): any => {
	return { message: something };
};

export const searchPerson = async (name: string): Promise<Person | void> => {
	const persons = await execute();
	return persons.find((currName) => currName.name === name);
};

export const updatePerson = async (oldName: string, name: string): Promise<Person> => {
	const person = await searchPerson(oldName);

	if (!person) {
		throw new Error("Pessoa não encontrada!");
	}

	const persons = await execute();
	const index = persons.findIndex((p) => p.name === oldName);

	const updatePerson = await update(index, name);
	return updatePerson;
}

export const createPerson = async (person: Person): Promise<Person> => {
	const db = await execute();
	db.push(person);
	return person;
}
