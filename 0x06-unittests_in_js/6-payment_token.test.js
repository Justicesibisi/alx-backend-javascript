// 6-payment_token.test.js

const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function() {
  it('should return a successful response when success is true', function(done) {
    getPaymentTokenFromAPI(true)
      .then(response => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done(); // Call done to signal the completion of the test
      })
      .catch(err => {
        done(err); // If there's an error, pass it to done
      });
  });

  it('should not return anything when success is false', function(done) {
    getPaymentTokenFromAPI(false)
      .then(response => {
        // This test should fail if a response is received
        done(new Error('Expected no response, but received one.'));
      })
      .catch(() => {
        // No response is expected, so this is a valid outcome
        done();
      });
  });
});
