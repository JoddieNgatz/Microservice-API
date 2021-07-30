process.env.NODE_ENV = "test";


const chai = require('chai');
const chaiHttp = require('chai-http');
const dbHandler = require('./connect');
const userController = require("../controller/users.controller");
const server =require('../server')
const expect = chai.expect;
chai.use(chaiHttp);

const Testuser = {
    "username": "test",
    "email": "test@gmail.com",
    "password": "12yy4567"
};

//Testing POST Register
    describe('/POST User Register and Sign IN', () => {
        before(() => {
            //dbHandler.connect().then(() => done()).catch((err) => done(err));
         
            async () => {
                await dbHandler.connect().then((done) => done()).catch((err) => done(err));
                console.log('at connect');
            }
        });
        after(() => {
            //conn.close().then(() => done()).catch((err) => done(err));
            
            async () => await dbHandler.clearDatabase().then(() => done()).catch((err) => done(err));
            async () => await dbHandler.close().then(() => done()).catch((err) => done(err));
        });

        it('it should not register without username', (done) => {
            const User = {
                email: 'test@gmail.com',
                password: '12yy4567',
            }
            chai.request(server).post('/user/register')
                .send(User).end((err, res) => {
                    expect(res.status).to.equal(500);
                    expect(res.body).should.be('object');
                    expect(res.body).to.have.property('err');
    
                    done();
                }).catch((err) => {
                done(err);
            });
        });

        it('it should register with username', async () => {
         
            async () =>  await userController.signUp(Testuser).then((result) => {
                expect(res.status).toBe(200);
                const body = res.body;
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('test@gmail.com');
                expect(body).to.contain.property('test');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });


        it('it should not register without username', async () => {
         
            async () =>  await userController.signUp({
                "email": "test@gmail.com",
                "password": "12yy4567"
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        it('it should not register without email', async () => {
         
            async () =>  await userController.signUp({
                "username": "test",
                "password": "12yy4567"
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        it('it should not register without password', async () => {
         
            async () =>  await userController.signUp({
                "username": "test",
                "email": "test@gmail.com",
                "password": "12yy4567"
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        
        
        it('it should not register bad email', async () => {
         
            async () =>  await userController.signUp({
                "username": "test",
                "email": "testgmail.com",
                "password": "12yy4567"
            }).then((result) => {
                expect(res.status).toBe(400);
                const body = res.body;
                expect(body).to.contain.property('not an email');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });


        

    //SIGN IN TESTS
    
        
        
    it('it should signIn with email and password', async () => {
     
        async () =>  await userController.signIn({
                "email": "test@gmail.com",
                "password": "12yy4567"
            }).then((result) => {
            expect(res.status).toBe(200);
            const body = res.body;
            expect(body).to.contain.property('test@gmail.com');
                
            done(result);
        }).catch((err) => {
            done(err);
        });
    });

    it('it should not post sign In without email', async () => {
     
        async () =>  await userController.signIn({
            "username": "test",
            "password": "12yy4567"
        }).then((result) => {
            expect(res.status).toBe(500);
            const body = res.body;
            expect(body).to.contain.property('err');
                
            done(result);
        }).catch((err) => {
            done(err);
        });
    });

    it('it should not post sign In without password', async () => {
     
        async () =>  await userController.signIn({
            "email": "test@gmail.com",
        }).then((result) => {
            expect(res.status).toBe(500);
            const body = res.body;
            expect(body).to.contain.property('err');
                
            done(result);
        }).catch((err) => {
            done(err);
        });
    });

    
    
    it('it should not post sign In bad email', async () => {
     
        async () =>  await userController.signIn({
            "email": "testgmail.com",
            "password": "12yy4567"
        }).then((result) => {
            expect(res.status).toBe(400);
            const body = res.body;
            expect(body).to.contain.property('not an email');
                
            done(result);
        }).catch((err) => {
            done(err);
        });
    });

        
    });



// //Testing POST
// describe('/POST UserReg', () => {
//     it('it should not post /register with incorrect email', (done) => {
//         const User = {
//             username: "test",
//             email: "testgmail.com",
//             password :"12yy4567",
//         }
//         chai.request(server).post('/user/register')
//             .send(User).end((err, res) => {
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('errors');
                
//                 done();
//             });
        
//     })
// })




            
        // request(user).post('/user/register').send({

        // }).then((res) => {
        //     const body = res.body;
        //     expect(body).to.contain.property('username');
        // }).catch((err) => done(err));
       
        // const User = {
        //     "email": "test@gmail.com",
        //     "password": "12yy4567"
        // }
        // chai.request(server).post('/user/register')
        //     .send(User).end((err, res) => {
        //         should(res.body).have.status(404);

        //         res.body.should().be.a('object');
        //         res.body.should.have.property('errors');
        //         res.body.errors.should.have.property('username');
        //         res.body.errors.pages.should.have.property('kind').eql('required');

        //         done();