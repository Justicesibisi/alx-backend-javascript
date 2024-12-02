const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function() {
  describe('SUM', function() {
    it('should round and return the sum of 1.4 and 4.5', function() {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
    });

    it('should round and return the sum of 1.2 and 3.7', function() {
      assert.strictEqual(calculateNumber('SUM', 1.2, 3.7), 5);
    });
  });

  describe('SUBTRACT', function() {
    it('should round and return the difference of 1.4 and 4.5', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
    });

    it('should round and return the difference of 3.7 and 1.2', function() {
      assert.strictEqual(calculateNumber('SUBTRACT', 3.7, 1.2), 2);
    });
  });

  describe('DIVIDE', function() {
    it('should round and return the division of 1.4 by 4.5', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    });

    it('should return "Error" when dividing by 0', function() {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });

    it('should handle division with negative numbers', function() {
      assert.strictEqual(calculateNumber('DIVIDE', -4.5, 1.5), -3);
    });
  });

  describe('Invalid type', function() {
    it('should throw an error for invalid type', function() {
      assert.throws(() => calculateNumber('MULTIPLY', 1.4, 4.5), /Invalid type/);
    });
  });
});
