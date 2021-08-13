process.env.NODE_ENV = "test";


const chai = require('chai');
const chaiHttp = require('chai-http');
const dbHandler = require('./connect');
const symptController = require("../controllers/symptoms.controller");

const expect = chai.expect;

chai.use(chaiHttp);


//Testing POST Register
    describe('Symptoms checker ', () => {
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

        it('it should post symptoms', async () => {
            const TestSymp = {
                "Symptom": "Convulsions",
                "AssociatedDiagnoses": "Eclampsia",
                "MedicalProfileRestrictions": "pregnant"
            };
            async () =>  await symptController.postSymptoms(TestSymp,res).then((result) => {
                expect(res.status).toBe(200);
                const body = res.body;
                expect(body).to.contain.property('Symptom');
                expect(body).to.contain.property('AssociatedDiagnoses');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });


        it('it should not post without symptom', async () => {
         
            async () =>  await symptController.postSymptoms({
                "AssociatedDiagnoses": "Eclampsia",
                "MedicalProfileRestrictions": "pregnant"
            
            },res).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        it('it should not post with wrong data types', async () => {
         
            async () =>  await symptController.postSymptoms({
                "AssociatedDiagnoses": 323,
                "MedicalProfileRestrictions": false
            },res).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        // it('it should get medical details of user', async () => {
         
        //     async () => await symptController.getUsersMedInfo({
        //         "username": "test",
        //     }).then((result) => {
        //         expect(res.status).toBe(200);
        //         const body = res.body;
        //         expect(body).to.contain.property('err');
                    
        //         done(result);
        //     }).catch((err) => {
        //         done(err);
        //     });
        // });


        

    //Search symptoms IN TESTS
    
        
        
    it('it should search for a associated diag with symptom', async () => {
     
        async () =>  await symptController.searchSymptoms(
               'Difficulty urinating',res
            ).then((result) => {
            expect(res.status).toBe(200);
            const body = res.body;
            expect(body).to.contain.property('foundSymptom');
                
            done(result);
        }).catch((err) => {
            done(err);
        });
    });

    it('it should err for search for a non existing symptom', async () => {
     
        async () =>  await symptController.searchSymptoms('headache',res).then((result) => {
            expect(res.status).toBe(500);
            const body = res.body;
            expect(body).to.contain.property('err');
                
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