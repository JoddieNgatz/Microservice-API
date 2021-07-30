process.env.NODE_ENV = "test";


const chai = require('chai');
const chaiHttp = require('chai-http');
const dbHandler = require('./connect');
const profController = require("../controller/MedProf.controller");

//const expect = chai.expect;

chai.use(chaiHttp);

const Testprofile = {
	"username": "test",
	"age": 22,
	"sex": "male",
	"alcoholConsumption": 3,
	"alergies": ["pollen", "penuts"],
	"medicalBackground": ["asma"],
	"pregnant": false
};

//Testing POST Register
    describe('/POST Profile', () => {
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

        it('it should create profile', async () => {
         
            async () =>  await profController.createProfile(req.body = TestProfile).then((result) => {
                expect(res.status).toBe(200);
                const body = res.body;
                expect(result).to.contain.property('username');
                expect(body).to.contain.property('test');
                expect(body).to.contain.property('test');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });


        it('it should not create profile without username', async () => {
         
            async () =>  await profController.createProfile({
                "age": 22,
                "sex": "male",
                "alcoholConsumption": 3,
                "alergies": ["pollen", "penuts"],
                "medicalBackground": ["asma"],
                "pregnant": false
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });


        it('it should not create profile with incorrect type passed values', async () => {
         
            async () => await profController.createProfile({
                "username": "test",
                "age": "age",//note: age not number
                "sex": "male",
                "alcoholConsumption": 3,
                "alergies": ["pollen", "penuts"],
                "medicalBackground": ["asma"],
                "pregnant": false
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        //Find Profile Test

        it('it should find profile with only username passed in', async () => {
         
            async () => await profController.findMedProfile("test").then((result) => {
                expect(res.status).toBe(200);
                const body = res.body;
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('test');
                expect(body).to.contain.property('test');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        it('it should not find profile with not registered username', async () => {
         
            async () =>  await profController.findMedProfile("notRegistered"
            ).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        it('it should not find profile with wrong type username', async () => {
         
            async () =>  await profController.findMedProfile( 2
            ).then((result) => {
                expect(result.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });



        it('it should not find without username', async () => {
         
            async () =>  await profController.findMedProfile({
                "age": 22,
                "sex": "male",
                "alcoholConsumption": 3,
                "alergies": ["pollen", "penuts"],
                "medicalBackground": ["asma"],
                "pregnant": false
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });


        //Updaate Med Profile

        
        it('it should update profile', async () => {
         
            async () =>  await profController.updateMedProfile({
                "username": "test",
                "age": 32, //changed age
                "sex": "male",
                "alcoholConsumption": 0, //changed consumption
                "alergies": ["pollen", "penuts"],
                "medicalBackground": ["asma"],
                "pregnant": false
            }).then((result) => {
                expect(res.status).toBe(200);
                const body = res.body;
                expect(body).to.contain.property('username');
                expect(body).to.contain.property('test');
                expect(body).to.contain.property('test');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        it('it should not update without username', async () => {
         
            async () =>  await profController.updateMedProfile({
                "age": 22,
                "sex": "male",
                "alcoholConsumption": 3,
                "alergies": ["pollen", "penuts"],
                "medicalBackground": ["asma"],
                "pregnant": false
            }).then((result) => {
                expect(res.status).toBe(500);
                const body = res.body;
                expect(body).to.contain.property('err');
                    
                done(result);
            }).catch((err) => {
                done(err);
            });
        });

        
        
        it('it should not update profile with wrong types', async () => {
         
            async () =>  await profController.updateMedProfile({
                "age": "age",
                "sex": "male",
                "alcoholConsumption": "none",
                "alergies": ["pollen", "penuts"],
                "medicalBackground": ["asma"],
                "pregnant": false
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

