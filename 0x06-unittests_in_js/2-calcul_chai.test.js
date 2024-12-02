const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', function() {
  describe('SUM', function() {
    it('should round and return the sum of 1.4 and 4.5', function() {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });

    it('should round and return the sum of 1.2 and 3.7', function() {
      expect(calculateNumber('SUM', 1.2, 3.7)).to.equal(5);
    });
  });

  describe('SUBTRACT', function() {
    it('should round and return the difference of 1.4 and 4.5', function() {
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
    });

    it('should round and return the difference of 3.7 and 1.2', function() {
      expect(calculateNumber('SUBTRACT', 3.7, 1.2)).to.equal(2);
    });
  });

  describe('DIVIDE', function() {
    it('should round and return the division of 1.4 by 4.5', function() {
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    });

    it('should return "Error" when dividing by 0', function() {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });

    it('should handle division with negative numbers', function() {
      expect(calculateNumber('DIVIDE', -4.5, 1.5)).to.equal(-3);
    });
  });

  describe('Invalid type', function() {
    it('should throw an error for invalid type', function() {
      expect(() => calculateNumber('MULTIPLY', 1.4, 4.5)).to.throw('Invalid type');
    });
  });
});
