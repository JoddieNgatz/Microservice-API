# Microservice-API With Simple Api Gateway
 Microservice api that performs CRUD operations on the data stored in a database using Express.js MongoDB, Mocha&Chai.
# API Documentation can be found here:
   https://documenter.getpostman.com/view/3109347/Tzscpmm2
   
# API GATEWAY
  APIGateway PORT: 8079
  
  Users SignIN & Register Microservice hosted on PORT: 8080
  
  Symptoms hosted on PORT: 8081
  
  MedicalProfile hosted on PORT: 8082
  
# Project Structure
   -Users //User login & register Microservice
   
   -MedicalProfile // Users can create and update medical profile information Microservcice
   
   -SymptomsChecker  //users can search symptoms for associated diagnoses Microservice
   
   -API_Gateway_routefiles  //contains API gateway files
   
   
## Project setup
```
npm install
```
## DB setup
```
can run local monogDb Server or cloud mongoDb. Change db url of db.config file in config folder then run. Ensure console log prints Connected to database
```
### Run
```
node server.js
npm run dev
```
### First Step
```
Sign Up user by post: /register {'username':'**', 'email':'**', 'password':'**'}
```
