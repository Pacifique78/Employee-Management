import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import testUser from '../mockData/testUsers';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
describe('Welcome Home page', () => {
  it('Should return a welcome text', (done) => {
    chai.request(app).get('/')
      .end((err, res) => {
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.message).to.equal('WELCOME TO EMPLOYEE MANAGEMENT SYSTEM');
        done();
      });
  });
  it('Should return an error', (done) => {
    chai.request(app).get('/api/v2/ent')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.ownProperty('error');
        expect(res.body.error).to.equal('The route was not found');
        done();
      });
  });
});
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
        done();
      });
  });
});
describe('Registration confirmation', () => {
  it('Should confirm the user', (done) => {
    chai.request(app).get(`/auth/confirmation/${process.env.confirmationToken1}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Email confirmed');
        done();
      });
  });
});
describe('User Signin', () => {
  it('Should allow a Manager to signin', (done) => {
    chai.request(app).post('/auth/signin')
      .send(testUser[2])
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('Should NOT allow a user to signin: Email not found or incorrect password', (done) => {
    chai.request(app).post('/auth/signin')
      .send(testUser[3])
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Invalid username/ password OR Email not confirmed');
        done();
      });
  });
  it('Should NOT allow a user to signin: Invalid input or missing input', (done) => {
    chai.request(app).post('/auth/signin')
      .send(testUser[4])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(' password  is required');
        done();
      });
  });
});
