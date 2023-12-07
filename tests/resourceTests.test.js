const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addResource, viewResources, editResource, deleteResource } = require('../utils/ResourceUtil')
describe('Testing resource related features', () => {
    const resourcesFilePath = 'utils/resources.json';
    var orgContent = "";
    beforeEach(async () => {
        orgContent = await fs.readFile(resourcesFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });
    afterEach(async () => {
        await fs.writeFile(resourcesFilePath, JSON.stringify(orgContent), 'utf8');
    });
    it('Should add a new resource successfully', async () => {
        const req = {
            body: {
                name: "iPad Mini",
                location: "Blk 4 Lvl 5 Rm 2",
                description: "For project showcase",
                owner: "john@gmail.com"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data).to.have.lengthOf(orgContent.length + 1);
                expect(data[orgContent.length].name).to.equal(req.body.name);
            },
        };
        await addResource(req, res);
    });
    it('Should not be able to add resource due to incomplete input', async () => {
        const req = {
            body: {
                name: "iPad Mini",
                location: "Blk 4 Lvl 5 Rm 2",
                description: "For project showcase"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.not.equal(undefined);
            },
        };
        await addResource(req, res);
    }); it('Should return an array when viewing resources', async () => {
        const req = {};
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(Array.isArray(data)).to.be.true;
            },
        };
        await viewResources(req, res);
    });

    it('Should edit a resource successfully', async () => {
        const req = {
            body: {
                name: "Test",
                location: "Temasek",
                description: "Testing purpose",
            },
            params: {
                id: orgContent[0].id
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Resource modified successfully!');
            },
        };
        await editResource(req, res);
    });
    it('Should not be able to edit resource due to invalid id', async () => {
        const req = {
            body: {
                name: "Test",
                location: "Temasek",
                description: "Testing purpose",
            },
            params: {
                id: "ABCDEFG"
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Error occurred, unable to modify!');
            },
        };
        await editResource(req, res);
    });
    it('Should delete a resource successfully', async () => {
        const req = {
            params: {
                id: orgContent[0].id
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Resource deleted successfully!');
            },
        };
        await deleteResource(req, res);
    });
    it('Should not be able to delete resource due to invalid id', async () => {
        const req = {
            params: {
                id: "ABCDEFG"
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Error occurred, unable to delete!');
            },
        };
        await deleteResource(req, res);
    });
});
            
        
