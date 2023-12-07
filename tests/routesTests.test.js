const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index');
const fs = require('fs').promises;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
describe('Testing API Routes', () => {
    const usersFilePath = 'utils/users.json';
    var orgContent = "";
    const resourcesFilePath = 'utils/resources.json';
    var orgResources = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);

        orgResources = await fs.readFile(resourcesFilePath, 'utf8');
        orgResources = JSON.parse(orgResources);
    });
    afterEach(async () => {
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
        await fs.writeFile(resourcesFilePath, JSON.stringify(orgResources), 'utf8');
    });

    it('Should register a new user successfully', (done) => {
        chai.request(app)
            .post('/register')
            .send({ email: 'james@gmail.com', password: 'testpassword' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
                server.close();
            });
    });

    it('Should log in an existing user successfully', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: orgContent[0].email, password: orgContent[0].password, })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal('Login successful!');
                done();
                server.close();
            });
        it('Should add resource successfully', (done) => {
            chai.request(app)
                .post('/add-resource')
                .send({
                    name: "Sample name", location: "Some location",
                    description: "For testing only", owner: "john@gmail.com"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.lengthOf(orgResources.length + 1);
                    done();
                    server.close();
                });
        });
        it('Should retrieve resource successfully', (done) => {
            chai.request(app)
                .get('/view-resources')
                .send()
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.lengthOf(orgResources.length);
                    done();
                    server.close();
                });
        });
        it('Should edit resource successfully', (done) => {
            chai.request(app)
                .put('/edit-resource/' + orgResources[0].id)
                .send({
                    name: "Sample name", location: "Some location",
                    description: "For testing only", owner: "john@gmail.com"
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.equal('Resource modified successfully!');
                    done();
                    server.close();
                });
        });
        it('Should delete resource successfully', (done) => {
            chai.request(app)
                .delete('/delete-resource/' + orgResources[0].id)
                .send()
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.equal('Resource deleted successfully!');
                    done();
                    server.close();
                });
        });
    });
});