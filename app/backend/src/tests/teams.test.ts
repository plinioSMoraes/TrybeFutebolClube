import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import TeamsModel from '../database/models/teamsModel';
import allTeamsMock from './Mocks/teamMocks';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);


const { expect } = chai;

describe('Testa as rotas do tipo teams', () => {
    afterEach(() => {
        (TeamsModel.findAll as sinon.SinonStub).restore();
    })
    it('Testa se a rota GET /teams retorna corretamente todos os times', async () => {
        sinon.stub(TeamsModel, 'findAll').resolves(allTeamsMock as TeamsModel[]);
        const request = await chai.request(app).get('/teams');
        expect(request.status).to.be.equal(200);
        // console.log('mock', allTeamsMock);
        // console.log('sinon', request.body);
        expect(request.body.length).to.be.equal(allTeamsMock.length);
    });
});
