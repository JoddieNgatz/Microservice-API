process.env.NODE_ENV = "tesst";

const moongoose = require('mongoose');
const User = require('../models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
//Parent Block
describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        })
    })
});

//Testing POST
describe('/POST UserReg', () => {
    it('it should not post /register without username', (done) => {
        const User = {
            email: 'test@gmail.com',
            password: '12yy4567',
        }
        chai.request(server).post('/user/register')
            .send(User).end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('username');
                res.body.errors.pages.should.have.property('kind').eql('required');

                done();
            });
        
    });
});

//Testing POST
describe('/POST UserReg', () => {
    it('it should not post /register with incorrect email', (done) => {
        const User = {
            username: "test",
            email: 'testgmail.com',
            password :'12yy4567',
        }
        chai.request(server).post('/user/register')
            .send(User).end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                
                done();
            });
        
    })
})
