const { describe, it } = require('mocha');
const { expect } = require('chai');
const { computeGrade } = require('../utils/sampleFunctions')
describe('Testing computeGrade function', () => {
    it('Should be A', () => {
        const result = computeGrade(100);
        expect(result).to.equal("A");
    });
    it('Should be A', () => {
        const result = computeGrade(85);
        expect(result).to.equal("A");
    });
    it('Should be A', () => {
        const result = computeGrade(80);
        expect(result).to.equal("A");
    });
    it('Should be C', () => {
        const result = computeGrade(63);
        expect(result).to.equal("C");
    });
    it('Should be C', () => {
        const result = computeGrade(60);
        expect(result).to.equal("C");
    });
    it('Should be D', () => {
        const result = computeGrade(50);
        expect(result).to.equal("D");
    });

    it('Should be B+', () => {
        const result = computeGrade(79);
        expect(result).to.equal("B+");
    });
    it('Should be B', () => {
        const result = computeGrade(74);
        expect(result).to.equal("B");
    });
    it('Should be C+', () => {
        const result = computeGrade(65);
        expect(result).to.equal("C+");
    });
    it('Should be D+', () => {
        const result = computeGrade(57);
        expect(result).to.equal("D+");
    });
    it('Should be F', () => {
        const result = computeGrade(45);
        expect(result).to.equal("F");
    });
});
