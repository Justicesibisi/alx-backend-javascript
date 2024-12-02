const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./api'); // Importing the app from api.js
const { expect } = chai;

chai.use(chaiHttp);

describe('API integration tests', () => {
  describe('Index page', () => {
    it('should return the correct status code and message for GET /', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome to the payment system');
          done();
        });
    });
  });

  describe('Cart page', () => {
    it('should return the correct status code and message for valid cart ID', (done) => {
      chai
        .request(app)
        .get('/cart/12')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Payment methods for cart 12');
          done();
        });
    });

    it('should return 404 for invalid cart ID', (done) => {
      chai
        .request(app)
        .get('/cart/abc')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('/available_payments endpoint', () => {
    it('should return the correct payment methods object', (done) => {
      chai
        .request(app)
        .get('/available_payments')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            payment_methods: {
              credit_cards: true,
              paypal: false,
            },
          });
          done();
        });
    });
  });

  describe('/login endpoint', () => {
    it('should return the correct welcome message for a valid userName', (done) => {
      chai
        .request(app)
        .post('/login')
        .send({ userName: 'Betty' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome Betty');
          done();
        });
    });

    it('should return 400 status code for missing userName', (done) => {
      chai
        .request(app)
        .post('/login')
        .send({})
        .end((err, res) => {
          expect(res).
