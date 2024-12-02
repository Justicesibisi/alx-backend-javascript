// 6-payment_token.js

function getPaymentTokenFromAPI(success) {
    return new Promise((resolve, reject) => {
      if (success) {
        resolve({ data: 'Successful response from the API' });
      } else {
        // Simulate a failure by doing nothing
        // The promise won't be rejected or resolved
      }
    });
  }
  
  module.exports = getPaymentTokenFromAPI;
  