import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import testUser from '../mockData/testUsers';

const { expect } = chai;
chai.use(chaiHttp);
describe('User SignUp', () => {
  it('Should allow a user to signup', (done) => {
    chai.request(app).post('/auth/signup')
      .send(testUser[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('email');
        expect(res.body).to.have.property('token');
        done();
      });
  });
  it('Should NOT allow a user to signup: Invalid data', (done) => {
    chai.request(app).post('/auth/signup')
      .send(testUser[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(' name  is not allowed to be empty');
        done();
      });
  });
  it('Should NOT allow a user to signup: user already exist', (done) => {
    chai.request(app).post('/auth/signup')
      .send(testUser[0])
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Manager with testuser@gmail.com already exists');
        done();
      });
  });
});
