let mongoose = require("mongoose");
let Users = require('../users/user.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /GET route
  */
  describe('User Management ', () => {

      before((done) => {
        Users.remove({}, (err) => { 
           done();           
        });        
      });

      after((done) => {
        Users.remove({}, (err) => { 
           done();           
        });        
      });

      it('it should create user', (done) => {
        //this.timeout(0);

        let user = {
          "Name": "Rajesh 555",
          "Email": "A2@gmail.com",
          "Department": "Software5",
          "PhoneNumber": "7795906491"
        };

        chai.request(server)
            .post('/users/register')
            .send(user)
            .then((res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            }).catch((err) => {
                console.log("errrrr ", err);
                done();
            });
        //setTimeout(done, 10000);    
      });

      it('it should get all user', (done) => {
        //this.timeout(0);
        chai.request(server)
            .get('/users')
            .then((res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
              done();
            }).catch((err) => {
                console.log("errrrr ", err);
                done();
            });
        //setTimeout(done, 10000);    
      });

  });