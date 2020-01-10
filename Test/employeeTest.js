import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import testUser from '../mockData/testUsers';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);

describe('Add employee', () => {
  it('Should allow manager to add an employee', (done) => {
    chai.request(app).post('/api/employees')
      .set('Authorization', process.env.userToken1)
      .send(testUser[5])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('email');
        done();
      });
  });
  it('Should NOT allow manager to add an employee: Invalid data', (done) => {
    chai.request(app).post('/api/employees')
      .set('Authorization', process.env.userToken1)
      .send(testUser[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(' name  is not allowed to be empty');
        done();
      });
  });
  it('Should NOT allow manager to add an employee: employee already exist', (done) => {
    chai.request(app).post('/api/employees')
      .set('Authorization', process.env.userToken1)
      .send(testUser[5])
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
