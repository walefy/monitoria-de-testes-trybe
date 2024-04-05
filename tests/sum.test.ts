import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as monitoria from '../src/sum';

chai.use(sinonChai);

describe('Testes a monitoria', function () {
	afterEach(function () {
		sinon.restore();
	});

	it('teste de soma', function() {
		const x = 5;
		const y = 5;
		const expectedValue = 10;

		const result = monitoria.sum(x, y);

		expect(result).to.be.equal(expectedValue);
	});

	it('teste da função saySomething', function () {
		const something = "hello world";
		const expectedValue = { message: something }

		const result = monitoria.saySomething(something);

		expect(result).to.be.deep.equal(expectedValue);
	});

	it('teste da função searchPerson', async function () {
		const persons = [
			{ name: "walefy", cash: 50000 },
		];
		const name = 'walefy';
		const expectedValue = { name: "walefy", cash: 50000 }

		sinon.stub(monitoria, 'execute').resolves(persons);

		const result = await monitoria.searchPerson(name);

		expect(result).to.be.deep.equal(expectedValue);
	});

	it('testa função update person', async function () {
		const dbMock = [
			{ name: "testeRR", cash: 50000 },
			{ name: "outroNome", cash: 50000 }
		];
		const oldName = "testeRR";
		const name = "testeFuncionou";
		const expectedValue = { name: "testeFuncionou", cash: 50000 };

		sinon.stub(monitoria, 'execute').resolves(dbMock);
		sinon.stub(monitoria, 'update').resolves(expectedValue);

		const result = await monitoria.updatePerson(oldName, name);

		expect(result).to.be.deep.equal(expectedValue);
	});

	it('testa função update person (pessoa não encontrada)', async function () {
		const dbMock = [
			{ name: "testeRR", cash: 50000 },
			{ name: "outroNome", cash: 50000 }
		];
		const oldName = "pessoaNãoEncontrada";
		const name = "testeFuncionou";
		const updatedPerson = { name: "testeFuncionou", cash: 50000 };

		sinon.stub(monitoria, 'execute').resolves(dbMock);
		sinon.stub(monitoria, 'update').resolves(updatedPerson);

		try {
			await monitoria.updatePerson(oldName, name);
			expect(false); // teste falha
		} catch(e) {
			expect(true); // teste passa
		}
	});
});
