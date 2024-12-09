function calculateNumber(type, a, b) {
    const roundedA = Math.round(a);
    const roundedB = Math.round(b);

    if (type === 'SUM') {
        return Math.round(roundedA + roundedB);  // Round after the operation
    }
    if (type === 'SUBTRACT') {
        return Math.round(roundedA - roundedB);  // Round after the operation
    }
    if (type === 'DIVIDE') {
        if (roundedB === 0) {
            return 'Error';
        }
        return Math.round(roundedA / roundedB);  // Round after the operation
    }
    
    throw new Error('Invalid type');
}

module.exports = calculateNumber;

