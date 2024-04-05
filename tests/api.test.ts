import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as monitoria from '../src/sum';
import app, * as monitoriaController from '../src/app';
import { Request, Response } from 'express';

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Testes da api', function () {
	afterEach(function () {
		sinon.restore();
	});

	it('POST /person', async function () {
		const req = { body: { name: "teste", cash: 5000 } } as Request;
		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub().returnsThis()
		} as unknown as Response;

		const dbMock = [
			{ name: "fulaninho", cash: 50000 },
			{ name: "algumNome", cash: 50000 }
		];
		
		sinon.stub(monitoria, 'execute').resolves(dbMock);

		await monitoriaController.controllerCreatePerson(req, res);

		expect(res.status).to.have.been.calledWith(201);
		expect(res.json).to.have.been.calledWith({ name: "teste", cash: 5000 });
	});

	it('teste de integração create person', async function () {
		const dbMock = [
			{ name: "fulaninho", cash: 50000 },
			{ name: "algumNome", cash: 50000 }
		];
		
		sinon.stub(monitoria, 'execute').resolves(dbMock);

		const response = await chai.request(app).post('/person').send({
			name: 'teste',
			cash: 5000
		});

		expect(response.status).to.be.equal(201);
		expect(response.body).to.be.deep.equal({ name: 'teste', cash: 5000 });
	});
});
