// 4-payment.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', function() {
  it('should call Utils.calculateNumber and return a stubbed value', function() {
    // Stub the calculateNumber method to always return 10
    const stub = sinon.stub(Utils, 'calculateNumber').returns(10);

    // Create a spy to verify the console.log output
    const consoleSpy = sinon.spy(console, 'log');

    // Call the function
    sendPaymentRequestToApi(100, 20);

    // Verify the stub was called with the correct arguments
    expect(stub.calledOnceWithExactly('SUM', 100, 20)).to.be.true;

    // Verify the console.log was called with the correct message
    expect(consoleSpy.calledOnceWithExactly('The total is: 10')).to.be.true;

    // Restore the stub and spy to prevent side effects
    stub.restore();
    consoleSpy.restore();
  });
});
