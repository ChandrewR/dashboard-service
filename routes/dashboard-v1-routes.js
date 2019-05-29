/**
 * @name dashboard-v1-api
 * @description This module packages the Dashboard API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
var dashboardcontroller = require('../controllers/dashboardcontroller');
//var checkAuth   = require('../middleware/check-auth');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.get('/',
(req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
});

api.post('/getlocationdata', dashboardcontroller.getLocationsData);
api.post('/getbudata', dashboardcontroller.getBUData);
api.post('/getprojectdata', dashboardcontroller.getProjectData);
api.post('/getuserparticipationfrequency', dashboardcontroller.getUserParticipationFrequency);
api.post('/getvolunteers', dashboardcontroller.getVolunteers);
api.post('/getoverallvolunteeringhrs', dashboardcontroller.overallVolunteeringHrs);
api.post('/gettopcontributors',dashboardcontroller.getTopContributors);
api.get('/geteventdetails', dashboardcontroller.geteventdetails);
api.get('/geteventpoc',  dashboardcontroller.geteventpoc);
api.get('/geteventsummaries', dashboardcontroller.geteventsummaries);

module.exports = api;