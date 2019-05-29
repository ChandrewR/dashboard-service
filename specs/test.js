'use strict';

/**
* Change into specs folder so that file loading works.
*/
process.chdir('./specs');

require('./helpers/chai.js');

// Tests go here.
let mongoose = require("mongoose");
var EventDetails = require('../models/eventdetails');
var dashboardcontroller = require('../controllers/dashboardcontroller');
var dashboardrouter = require('../routes/dashboard-v1-routes');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dashboard-service-test');
let should = chai.should();
chai.use(chaiHttp);
/* const request = require('supertest');
const req = require(server); */

/* describe('it should GET all the eventdetails', function() {
  it('get /', function(done) {
      req
      .get('/')
      .expect(200, done);
  });
}); */

chai.request(server);

/* function startingServer() {
  console.log("Server started");
  describe('/GET eventdetails', () => {
    it('it should GET all the eventdetails', (done) => {
      chai.request(server)
         .get('/dashboardapi/v1/geteventdetails')
           .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});
} */

describe('/GET eventdetails', () => {
  it('it should GET all the eventdetails', (done) => {
    chai.request(server)
       .get('/dashboardapi/v1/geteventdetails')
         .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});



  

