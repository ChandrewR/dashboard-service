var EventDetails = require('../models/eventdetails');
var EventPOCDetails = require('../models/eventpoc');
var EventSummary = require('../models/eventsummary');

exports.getLocationsData = function(req, res) {

  location = 0;
  locationChart = []; 
  console.log("=============>"+req.body.id)
    try {

      if(req.body.role == 'Admin') {
        EventSummary.aggregate([
          {$group : {
            _id : "$baselocation",
            total: {$sum: 1}
          }
        }]).then(data => {
          this.location = data.length;
          this.locationChart = data;
          return res.sendOk({
            message : "Fetched data successfully",
            location : this.location,
            locationChart : this.locationChart
          });
        });

      } else {
        EventSummary.aggregate([{
          $match : {
            pocid : req.body.id
          }},
          {$group : {
            _id : "$baselocation",
            total: {$sum: 1}
          }
        }]).then(data => {
          this.location = data.length;
          this.locationChart = data;
          return res.sendOk({
            message : "Fetched data successfully",
            location : this.location,
            locationChart : this.locationChart
          });
        });
      }
    } catch(e) {
      console.log(e);
      return res.sendError({
        message : "Error, while retrieving location data"
      });
    }
  }

  function getEventDetails(callback) {
    var temp = [];
    try {
      EventSummary.find({ pocid : '616076'},'eventid').then(data => {
        for (var i=0; i<data.length; i++ ) {
          temp.push(data[i].eventid);
        }
        console.log("Tempppp:")+temp;
        callback(temp, false)
      });
    } catch(e) {
      callback(e, true);
    }
  }

  /* function getEventDetails(callback, pocid) {
    var temp = [];
    try {
      EventSummary.find({ pocid : pocid},'eventid').then(data => {
        for (var i=0; i<data.length; i++ ) {
          temp.push(data[i].eventid);
        }
        console.log("Tempppp:")+temp;
        callback(temp, false)
      });
    } catch(e) {
      callback(e, true);
    }
  } */

  exports.getTopContributors = function(req, res) {

     if(req.body.role == 'Admin') {
      try {
        EventDetails.aggregate([{
          $group : {
            _id : { name : "$employeename", id : "$employeeid" },
            total: {$sum: {$add : ["$volunteerhours","$travelhours"]}},
            frequency : { $sum: 1 }
          }
        }]).then(data => {

          console.log("TopContributors: "+data);
          return res.sendOk({
            message : "Fetched data successfully",
            data : data
          });
        });
  
      } catch(e) {
        return res.sendError({
          message : "Error, while retrieving top contributors."
        });
      }
    } else {
      try {

        getEventDetails(function(events, err) {
          _events = events;
          if(!err) {

        EventDetails.aggregate([{
          $match : {
            eventid : { $in : _events}
          }},{
          $group : {
            _id : { name : "$employeename", id : "$employeeid" },
            total: {$sum: {$add : ["$volunteerhours","$travelhours"]}},
            frequency : { $sum: 1 }
          }
        }]).then(data => {
          return res.sendOk({
            message : "Fetched data successfully",
            data : data
          });
        });
      }});
  
      } catch(e) {
        return res.sendError({
          message : "Error, while retrieving top contributors."
        });
      }
    }
    
     
  }


  exports.getUserParticipationFrequency = function(req, res) {

    if(req.body.role == 'Admin') {
      console.log('Test =======>>><<<<<<<'+req.body.role);
     try {
       EventDetails.aggregate([{
         $group : {
           _id : { name : "$employeename", id : "$employeeid" },
           count: { $sum: 1 }
         }
       }]).then(data => {

         console.log("TopContributors: "+data);
         return res.sendOk({
           message : "Fetched data successfully",
           data : data
         });
       });
 
     } catch(e) {
       return res.sendError({
         message : "Error, while retrieving user participation frequency."
       });
     }
   } else {
     try {
      console.log('Test =======>>><<<<<<<'+req.body.role);

       getEventDetails(function(events, err) {
         _events = events;
         if(!err) {

       EventDetails.aggregate([{
         $match : {
           eventid : { $in : _events}
         }},{
         $group : {
           _id : { name : "$employeename", id : "$employeeid" },
           total: {$sum: 1}
         }
       }]).then(data => {
         return res.sendOk({
           message : "Fetched data successfully",
           data : data
         });
       });
     }});
 
     } catch(e) {
       return res.sendError({
         message : "Error, while retrieving user participation frequency."
       });
     }
   }
 }

  exports.getBUData = function(req, res) {

    bu = 0;
    buChart = [];
    temp = [];
    _events = [];
  
      try {

        if(req.body.role == 'Admin') {
          try{
            EventDetails.aggregate([{
              $group : {
                _id : "$businessunit",
                total: {$sum: 1}
              }
            }]).then(data => {
              this.bu = data.length;
              this.buChart = data;
              return res.sendOk({
                message : "Fetched data successfully",
                bu : this.bu,
                buChart : this.buChart
              });
            });
          } catch(e) {
            return res.sendError({
              message : "Error, while retrieving business unit data"
            });
          }
        } else {
          try {

            getEventDetails(function(events, err) {
              _events = events;
              if(!err) {
    
                EventDetails.aggregate([{
                  $match : {
                    eventid : { $in : _events}
                  }},{
                  $group : {
                    _id : "$businessunit",
                    total: {$sum: 1}
                  }
                }]).then(data => {
                  this.bu = data.length;
                  this.buChart = data;
                  return res.sendOk({
                    message : "Fetched data successfully",
                    bu : this.bu,
                    buChart : this.buChart
                  });
                });
                
              } else {
                return res.sendError({
                  message : "Error, while retrieving business unit data"
                });
              }
            });

          } catch(e) {
            return res.sendError({
              message : "Error, while retrieving business unit data"
            });
          }
        }

      } catch(e) {
        return res.sendError({
          message : "Error, while retrieving business unit data"
        });
      }
  }

  exports.getProjectData = function(req, res) {

    project = 0;
    projectChart = []; 
    console.log(">>>>"+req.body.id);
  
      try {

        if(req.body.role == "Admin") {
          
        EventSummary.aggregate([{
          $group : {
            _id : "$project",
            total: {$sum: 1}
          }
        }]).then(data => {
          this.project = data.length;
          this.projectChart = data;
          return res.sendOk({
            message : "Fetched data successfully",
            project : this.project,
            projectChart : this.projectChart
          });
        });

        } else {
          
        EventSummary.aggregate([{
          $match : {
            pocid : req.body.id
          }},{
          $group : {
            _id : "$project",
            total: {$sum: 1}
          }
        }]).then(data => {
          this.project = data.length;
          this.projectChart = data;
          return res.sendOk({
            message : "Fetched data successfully",
            project : this.project,
            projectChart : this.projectChart
          });
        });
          
        }
  
      } catch(e) {
        return res.sendError({
          message : "Error, while retrieving project data"
        });
      }
  }

  exports.overallVolunteeringHrs = function(req, res) {
    
    overallvolunteeringhrs = 0;
    _events = [];

    try {
      if(req.body.role == 'Admin') {

        EventSummary.aggregate([{
          $group : {
            _id : null,
            total: {$sum: "$overallvolunteeringhrs"}
          }
        }]).then(data => {
          this.overallvolunteeringhrs = data;
          return res.sendOk({
            message : "Fetched data successfully",
            overallvolunteeringhrs : this.overallvolunteeringhrs
          });
        });

      } else {

        getEventDetails(function(events, err) {
          _events = events;
          console.log("888888888888"+_events);
          if(!err) {

            EventSummary.aggregate([{
              $match : {
                eventid : { $in : _events}
              }},{
                $group : {
                  _id : null,
                  total: {$sum: "$overallvolunteeringhrs"}
                }
              }]).then(data => {
                console.log("888888888888----"+data);
                this.overallvolunteeringhrs = data;
                return res.sendOk({
                  message : "Fetched data successfully",
                  overallvolunteeringhrs : this.overallvolunteeringhrs
                });
              });
            } else {

              return res.sendError({
                message : "Error, while retrieving overall volunteeringhours"
              });
            }
          });


      }

    } catch(e) {
      return res.sendError({
        message : "Error, while retrieving location data"
      });
    }
  }

  exports.getVolunteers = function(req, res) {

    console.log(req.body.id);
    console.log(req.body.role);
    _uniquevolunteers = 0;
    _events = [];
    try {

      if(req.body.role == 'Admin') {
        EventDetails.distinct('employeeid').exec(function (err, result) {
          _uniquevolunteers = result.length;
          return res.sendOk({
            message : "Fetched data successfully",
            volunteers : this._uniquevolunteers
          });
        });
      } else {
        getEventDetails(function(events, err) {
          _events = events;
        EventDetails.distinct('employeeid', {
          eventid : _events
        }).exec(function (err, result) {
          _uniquevolunteers = result.length;
          return res.sendOk({
            message : "Fetched data successfully",
            volunteers : this._uniquevolunteers
          });
        });
      });
      }
    } catch(e) {
      return res.sendError({
        message : "Error, while retrieving location data"
      });
    }

  }

  exports.geteventdetails = function(req, res) {
    console.log('----->Eventdetails');

    EventDetails.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        eventdetails : data
      });
    });
  }

  exports.geteventpoc = function(req, res) {
    console.log('----->Eventdetails');

    EventPOCDetails.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        eventpocdetails : data
      });
    });
  }

  exports.geteventsummaries = function(req, res) {
    console.log('----->Eventdetails');

    EventSummary.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        eventsummary : data
      });
    });
  }