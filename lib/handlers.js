/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');

// Define all the handlers
var handlers = {};

/*
 * HTML Handlers
 *
 */

 // Index handler
 handlers.index = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Surgery Management API',
      'head.description' : 'Toni-Kay Campbell\'s Assessment',
      'body.title' : 'Surgery Management API as an Assessment Exercise for Toni-Kay Campbell',
      'body.class' : 'index'
    };

    // Read in the index html as a string
    helpers.getTemplate('index',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // Create user account handle
 handlers.accountCreate = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Maintenance',
      'head.description' : 'Create a user account for a staff member.',
      'body.class' : 'accountCreate'
    };

    // Read in the index html as a string
    helpers.getTemplate('accountCreate',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 //Create New Session
 handlers.sessionCreate = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login',
      'head.description' : 'Enter your staff email and password to access your account.',
      'body.class' : 'login'
    };

    // Read in the index html as a string
    helpers.getTemplate('login',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

// Session has been deleted
 handlers.sessionDeleted = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out.',
      'body.class' : 'sessionDeleted'
    };

    // Read in the index html as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

// Edit user account
 handlers.accountEdit = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Maintenance',
      'body.class' : 'accountEdit'
    };

    // Read in the index html as a string
    helpers.getTemplate('accountEdit',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // Account has been deleted
 handlers.accountDeleted = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };

    // Read in the index html as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // Create a new patient
 handlers.patientCreate = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Patient Maintenance',
      'body.class' : 'patientCreate'
    };

    // Read in the index html as a string
    helpers.getTemplate('patientCreate',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // View all patients
 handlers.patientsList = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Patient Maintenance',
      'body.class' : 'patientsList'
    };

    // Read in the index html as a string
    helpers.getTemplate('patientsList',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

  // Edit a patient
 handlers.patientEdit = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Patient Maintenance',
      'body.class' : 'patientEdit'
    };

    // Read in the index html as a string
    helpers.getTemplate('patientEdit',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

  // Create a surgery schedule
 handlers.surgeryCreate = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Surgery Schedule',
      'body.class' : 'surgeryCreate'
    };

    // Read in the index html as a string
    helpers.getTemplate('surgeryCreate',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // View all scheduled surgeries
 handlers.surgeryList = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Surgery Schedule',
      'body.class' : 'surgeryList'
    };

    // Read in the index html as a string
    helpers.getTemplate('surgeryList',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

  // Edit a surgery schedule
 handlers.surgeryEdit = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Surgery Schedule',
      'body.class' : 'surgeryEdit'
    };

    // Read in the index html as a string
    helpers.getTemplate('surgeryEdit',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // Create a room
 handlers.roomsCreate = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Room Maintenance',
      'body.class' : 'roomsCreate'
    };

    // Read in the index html as a string
    helpers.getTemplate('roomsCreate',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // View all rooms
 handlers.roomList = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Room Maintenance',
      'body.class' : 'roomList'
    };

    // Read in the index html as a string
    helpers.getTemplate('roomList',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

  // Edit a room
 handlers.roomsEdit = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Room Maintenance',
      'body.class' : 'roomEdit'
    };

    // Read in the index html as a string
    helpers.getTemplate('roomEdit',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // Create a staff member
 handlers.staffCreate = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Staff Maintenance',
      'body.class' : 'staffCreate'
    };

    // Read in the index html as a string
    helpers.getTemplate('staffCreate',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // View all staff
 handlers.staffList = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Staff Maintenance',
      'body.class' : 'staffList'
    };

    // Read in the index html as a string
    helpers.getTemplate('staffList',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

  // Edit a staff member
 handlers.staffEdit = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Staff Maintenance',
      'body.class' : 'staffEdit'
    };

    // Read in the index html as a string
    helpers.getTemplate('staffEdit',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // View all rooms
 handlers.roomsList = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Room Maintenance',
      'body.class' : 'roomList'
    };

    // Read in the index html as a string
    helpers.getTemplate('roomList',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 // Dashboad Landing Page
 handlers.dashboardMain = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Surgery Management Dashboad',
      'head.description' : 'Main Dashboard',
      'body.class' : 'dashboardMain'
    };

    // Read in the index html as a string
    helpers.getTemplate('dashboardMain',templateData,function(err,htmlStr){
      if(!err && htmlStr){
        // Add the universal header and footer
        helpers.addUniversalTemplates(htmlStr,templateData,function(err,pageHtml){
          if(!err && pageHtml){
            // Return page as html
            callback(200,pageHtml,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html'); // Method not allowed
  }
 };

 handlers.favicon = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
    } else {
    callback(405); // Method not allowed
  }
 };

 handlers.public = function(data,callback){
  // Reject any request that isnt a GET
  if(data.method == 'get'){
    // Get the file name being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
      if(!err && data){
        // Determine the content type (default to plain text)
        var contentType = 'plain';

        if(trimmedAssetName.indexOf('.css') > -1){
          contentType = 'css';
        }

        if(trimmedAssetName.indexOf('.png') > -1){
          contentType = 'png';
        }

        if(trimmedAssetName.indexOf('.jpg') > -1){
          contentType = 'jpg';
        }

        if(trimmedAssetName.indexOf('.ico') > -1){
          contentType = 'favicon';
        }
        callback(200,data,contentType);
      } else {
        callback(404);
      }
    });
    }else {
      callback(404);
    }
  } else {
    callback(405); // Method not allowed
  }
 };

 // Surgery Query
handlers.surgeryQuery = function(data,callback){
  // Check if request is for a doctor
  var cond = '';
  var param = '';
 
  // View only logged in doctor surgeries
  queryParams = JSON.parse(JSON.stringify(data.queryStringObject)); // converting null-prototype object to a standard javascript Object
  var userid = typeof(queryParams.userid) == 'string' && queryParams.userid.trim().length > 0 ? queryParams.userid.trim() : false;
  if(userid){
    _data.read('staff',"WHERE email=?",[userid],function(err,data){
      if(!err && data.length > 0){
        param = data[0].id;
        cond = " WHERE p.id in (SELECT surgeryId FROM doc_in_surgery WHERE doctorId=?)";

        // Get all surgeries
        var sqlQuery = "select p.id, concat(rb.fname,' ',rb.lname) requestedBy, rm.roomName, concat(pt.fname,' ',pt.lname) Patient, " +
          "p.startDate, p.endDate, if((select group_concat(concat(st.fname,' ',st.lname)) docName from doc_in_surgery s inner join staff st " +
          "on s.doctorId = st.id where surgeryId = p.id group by surgeryId) IS NULL ,' ',(select group_concat(concat(st.fname,' ',st.lname)) docName " +
          "from doc_in_surgery s inner join staff st on s.doctorId = st.id where surgeryId = p.id group by surgeryId) )  Doctors " +
          "from surgery p inner join staff rb on p.requestedBy=rb.id inner join room rm on p.room = rm.id inner join patient pt on p.patient=pt.id" + cond;
console.log(sqlQuery,param);

        _data.custom(sqlQuery,param,function(err,data){
            if(!err && data.length > 0){
              callback(200,data);
            } else {
              callback(404,{'Error' : 'No Data found'});
            }
        });
      } else {
        callback(404,{'Error' : 'Doctor not found in staff list'});
      }
    });
  } else {
      // View only patient surgeries
      queryParams = JSON.parse(JSON.stringify(data.queryStringObject)); // converting null-prototype object to a standard javascript Object
      var patientId = typeof(queryParams.patientId) == 'string' && queryParams.patientId.trim().length > 0 ? queryParams.patientId.trim() : false;
      if(patientId){    
          param = patientId;
          cond = " WHERE p.patient=?";
      } 

      // View only room surgeries
      var roomId = typeof(queryParams.roomId) == 'string' && queryParams.roomId.trim().length > 0 ? queryParams.roomId.trim() : false;
      if(roomId){    
          param = roomId;
          cond = " WHERE p.room=?";
      } 

      // View only 1 surgery
      var surgeryId = typeof(queryParams.surgeryId) == 'string' && queryParams.surgeryId.trim().length > 0 ? queryParams.surgeryId.trim() : false;
      if(surgeryId){    
          param = surgeryId;
          cond = " WHERE p.id=?";
      }

      // Get all surgeries
      var sqlQuery = "select p.id, concat(rb.fname,' ',rb.lname) requestedBy, rm.roomName, concat(pt.fname,' ',pt.lname) Patient, " +
        "p.startDate, p.endDate, if((select group_concat(concat(st.fname,' ',st.lname)) docName from doc_in_surgery s inner join staff st " +
        "on s.doctorId = st.id where surgeryId = p.id group by surgeryId) IS NULL ,' ',(select group_concat(concat(st.fname,' ',st.lname)) docName " +
        "from doc_in_surgery s inner join staff st on s.doctorId = st.id where surgeryId = p.id group by surgeryId) )  Doctors " +
        "from surgery p inner join staff rb on p.requestedBy=rb.id inner join room rm on p.room = rm.id inner join patient pt on p.patient=pt.id" + cond;

      _data.custom(sqlQuery,param,function(err,data){
          if(!err && data.length > 0){
            callback(200,data);
          } else {
            callback(404,{'Error' : 'No Data found'});
          }
      });
  } 

};

 
/*
 * JSON API Handlers
 *
 */

// Ping
handlers.ping = function(data,callback){
    callback(200,'I am alive');
};

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

// Builds the GET condition and parameters from the querystring
handlers.queryGetParams = function(queryString){
  queryStringObject = JSON.parse(JSON.stringify(queryString)); // converting null-prototype object to a standard javascript Object

  var condition = '';
  var parameters = [];

  for(var queryKey in queryStringObject){
    if(queryStringObject.hasOwnProperty(queryKey)){
      if(queryKey.indexOf('startdate') > -1){
        condition = condition.trim().length > 0 ? condition += " and " + queryKey +">=?": queryKey +">=?" ;
      } else if(queryKey.indexOf('enddate') > -1){
        condition = condition.trim().length > 0 ? condition += " and " + queryKey +"<=?": queryKey +"<=?" ;
      } else {
        condition = condition.trim().length > 0 ? condition += " and " + queryKey +"=?": queryKey +"=?" ;
      }

      parameters.push(queryStringObject[queryKey]);
    }
  }

  condition = condition.trim().length > 0 ? " where " + condition : '';

  return {condition,parameters};
};

// User CRUD Handlers
handlers.user = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._user[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the staff methods
handlers._user  = {};

// User - post
// Required data: userid, password,staffid
// Optional data: none
handlers._user.post = function(data,callback){
  // Check that all required fields are filled out
  var userid = typeof(data.payload.userid) == 'string' && data.payload.userid.trim().length > 0 ? data.payload.userid.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length <= 8 ? data.payload.password.trim() : false;
  var staffId = typeof(data.payload.staffId) == 'string' && data.payload.staffId.trim().length > 0 ? data.payload.staffId.trim() : false;

  if(userid && password && staffId){
    // Make sure the user doesnt already exist
    _data.read('users',"WHERE staffId=?",[staffId],function(err,data){
      if(!err && data.length == 0){
        // Create the user object
        // Hash the password
        var hashedPassword = helpers.hash(password);

        var fieldToInsertInto = "(userid,password,staffId) values (?,?,?)";
        var dataToInsert = [userid,hashedPassword,staffId];

        // Store the user
        _data.create('users',fieldToInsertInto,dataToInsert,function(err,result){
          if(!err){
            callback(200,{'Success' : 'User created successfully'});
          } else {
            callback(500,{'Error' : 'Could not create the new user'});
          }
        });

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user account already exists for the staff'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields (userid,password,staffId)'});
  }

};

// User - Get
// Required data: userid
// Optional data: none
handlers._user.get = function(data,callback){
  // Check that staffId is valid
  var userid = typeof(data.queryStringObject.userid) == 'string' && data.queryStringObject.userid.trim().length > 0 ? data.queryStringObject.userid.trim() : false;
  if(userid){
    // Lookup the user
    _data.read('users',"WHERE userid=?",[userid],function(err,data){
      if(!err && data.length > 0){
        callback(200,data);
      } else {
        callback(404,{'Error' : 'No Data found'});
      }
    });
  } else {
    callback(400,{'Error' : 'userid is missing or invalid'})
  }
};

// User - Put
// Required data: userid
// Optional data: password
handlers._user.put = function(data,callback){
  // Check for required field
  var userid = typeof(data.payload.userid) == 'string' && data.payload.userid.trim().length > 0 ? data.payload.userid.trim() : false;

  // Check for optional fields
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length <= 8 ? data.payload.password.trim() : false;

  // Error if userid is invalid
  if(userid){
    // Error if nothing is sent to update
    if(password){
      // Lookup the user
      _data.read('users',"WHERE userid=?",[userid],function(err,userData){
        if(!err && userData.length > 0){
          // Update the fields if necessary
          var params = [];
          var fieldsToUpdate = '';

          //Hash password
          var hashedPassword = helpers.hash(password);

          params.push(hashedPassword);
          fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",password=?" : "password=?";

          params.push(userid);
          // Store the new updates
          _data.update('users',fieldsToUpdate,"WHERE userid=?",params,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the user.'});
            }
          });
        } else {
          callback(400,{'Error' : 'Specified user does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Nothing to update.'});
    }
  } else {
    callback(400,{'Error' : 'userid is missing or invalid.'});
  }

};

// User - Delete
// Required data: userid
handlers._user.delete = function(data,callback){
  // Check that userid is valid
  var userid = typeof(data.queryStringObject.userid) == 'string' && data.queryStringObject.userid.trim().length > 0 ? data.queryStringObject.userid.trim() : false;
  if(userid){
    // Lookup the user
    _data.read('users',"WHERE userid=?",[userid],function(err,data){
      if(!err && data.length > 0){
        _data.delete('users',"WHERE userid=?",[userid],function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified user'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'userid is missing or invalid'})
  }
};

// Staff CRUD Handlers
handlers.staff = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._staff[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the staff methods
handlers._staff  = {};

// Staff - post
// Required data: staffType, firstName,lastName, phone, email
// Optional data: none
handlers._staff.post = function(data,callback){
  // Check that all required fields are filled out
  var staffType = typeof(data.payload.staffType) == 'string' && data.payload.staffType.trim().length > 0 ? data.payload.staffType.trim() : false;
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;


  if(staffType && firstName && lastName && phone && email){
    // Make sure the staff doesnt already exist
    _data.read('staff',"WHERE email=?",[email,phone],function(err,data){
      if(!err && data.length == 0){
        // Create the staff object
        var fieldToInsertInto = "(staffType,fname,lname,phone,email) values (?,?,?,?,?)";
        var dataToInsert = [staffType,firstName,lastName,phone,email];

        // Store the staff
        _data.create('staff',fieldToInsertInto,dataToInsert,function(err,result){
          if(!err){
            callback(200,result);
          } else {
            callback(500,{'Error' : 'Could not create the new staff'});
          }
        });

      } else {
        // Staff alread exists
        callback(400,{'Error' : 'The staff member already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields (staffType,firstName,lastName,phone,email'});
  }

};

// Staff - Get
// Required data: staffId
// Optional data: none
handlers._staff.get = function(data,callback){

  // Check if conditions were specified
  var queryParams = handlers.queryGetParams(data.queryStringObject);
  queryParams = typeof(queryParams) == 'object' && queryParams !== null ? queryParams : {condition : '',parameters : ''};

  // Lookup the staff
  _data.read('staff',queryParams.condition,queryParams.parameters,function(err,data){
  //_data.read('staff',"WHERE id=?",[staffId],function(err,data){
    if(!err && data.length > 0){
      callback(200,data);
    } else {
      callback(404,{'Error' : 'No Data found'});
    }
  });

};

// Staff - Put
// Required data: staffId
// Optional data: StaffType,firstName, lastName, email, phone (at least one specified)
handlers._staff.put = function(data,callback){
  // Check for required field
  var staffId = typeof(data.payload.id) == 'string' && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;

  // Check for optional fields
  var staffType = typeof(data.payload.staffType) == 'string' && data.payload.staffType.trim().length > 0 ? data.payload.staffType.trim() : false;
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;


  // Error if staffId is invalid
  if(staffId){
    // Error if nothing is sent to update
    if(staffType || firstName || lastName || email || phone){
      // Lookup the staff
      _data.read('staff',"WHERE id=?",[staffId],function(err,staffData){
        if(!err && staffData.length > 0){
          // Update the fields if necessary
          var params = [];
          var fieldsToUpdate = '';

          if(staffType){
            params.push(staffType);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",StaffType=?" : "StaffType=?";
          }
          if(firstName){
            params.push(firstName);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",fname=?" : "fname=?";
          }
          if(lastName){
            params.push(lastName);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",lname=?" : "lname=?";
          }
          if(email){
            params.push(email);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",email=?" : "email=?";
          }
          if(phone){
            params.push(phone);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",phone=?" : "phone=?";
          }

          params.push(staffId);
          // Store the new updates
          _data.update('staff',fieldsToUpdate,"WHERE id=?",params,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the staff.'});
            }
          });
        } else {
          callback(400,{'Error' : 'Specified staff does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Nothing to update.'});
    }
  } else {
    callback(400,{'Error' : 'staffId is missing or invalid.'});
  }

};

// Staff - Delete
// Required data: staffId
handlers._staff.delete = function(data,callback){
  // Check that staffId is valid
  var staffId = typeof(data.queryStringObject.staffId) == 'string' && data.queryStringObject.staffId.trim().length > 0 ? data.queryStringObject.staffId.trim() : false;
  if(staffId){
    // Lookup the staff
    _data.read('staff',"WHERE id=?",[staffId],function(err,data){
      if(!err && data.length > 0){
        _data.delete('staff',"WHERE id=?",[staffId],function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified staff'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified staff.'});
      }
    });
  } else {
    callback(400,{'Error' : 'staffId is missing or invalid'})
  }
};

// Rooms CRUD Handlers
handlers.rooms = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._rooms[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the rooms methods
handlers._rooms  = {};

// Rooms - post
// Required data: roomName
// Optional data: none
handlers._rooms.post = function(data,callback){
  // Check that all required fields are filled out
var roomName = typeof(data.payload.roomName) == 'string' && data.payload.roomName.trim().length > 0 ? data.payload.roomName.trim() : false;

  if(roomName){
    // Make sure the room doesnt already exist
    _data.read('room',"WHERE roomName=?",[roomName],function(err,data){
      if(!err && data.length == 0){
        // Create the room object
        var fieldToInsertInto = "(roomName) values (?)";
        var dataToInsert = [roomName];

        // Store the room
        _data.create('room',fieldToInsertInto,dataToInsert,function(err,result){
          if(!err){
            callback(200,result);
          } else {
            callback(500,{'Error' : 'Could not create the room'});
          }
        });

      } else {
        // Staff alread exists
        callback(400,{'Error' : 'The room description already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields (roomName)'});
  }

};

// Room - Get
// Required data: roomId
// Optional data: none
handlers._rooms.get = function(data,callback){
  // Check if conditions were specified
  var queryParams = handlers.queryGetParams(data.queryStringObject);
  queryParams = typeof(queryParams) == 'object' && queryParams !== null ? queryParams : {condition : '',parameters : ''};

  // Lookup the room
  _data.read('room',queryParams.condition,queryParams.parameters,function(err,data){
  //_data.read('room',"WHERE id=?",[roomId],function(err,data){
    if(!err && data.length > 0){
      callback(200,data);
    } else {
      callback(404,{'Error' : 'No Data found'});
    }
  });

};

// Room - Put
// Required data: roomId
// Optional data: roomName
handlers._rooms.put = function(data,callback){
  // Check for required field
  var roomId = typeof(data.payload.id) == 'string' && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;

  // Check for optional fields
  var roomName = typeof(data.payload.roomName) == 'string' && data.payload.roomName.trim().length > 0 ? data.payload.roomName.trim() : false;

  // Error if roomId is invalid
  if(roomId){
    // Error if nothing is sent to update
    if(roomName){
      // Lookup the user
      _data.read('room',"WHERE id=?",[roomId],function(err,roomData){
        if(!err && roomData.length > 0){
          // Update the fields if necessary
          var params = [];
          var fieldsToUpdate = '';

          params.push(roomName);
          fieldsToUpdate = "roomName=?";
          
          params.push(roomId);
          // Store the new updates
          _data.update('room',fieldsToUpdate,"WHERE id=?",params,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the room name.'});
            }
          });
        } else {
          callback(400,{'Error' : 'Specified room does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Nothing specified to update.'});
    }
  } else {
    callback(400,{'Error' : 'roomId missing or invalid.'});
  }

};

// Room - Delete
// Required data: roomId
handlers._rooms.delete = function(data,callback){
  // Check that roomId is valid
  var roomId = typeof(data.queryStringObject.roomId) == 'string' && data.queryStringObject.roomId.trim().length > 0 ? data.queryStringObject.roomId.trim() : false;
  if(roomId){
    // Lookup the room
    _data.read('room',"WHERE id=?",[roomId],function(err,data){
      if(!err && data.length > 0){
        _data.delete('room',"WHERE id=?",[roomId],function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified room'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified room.'});
      }
    });
  } else {
    callback(400,{'Error' : 'roomId is missing or invalid'})
  }
};

// Patient CRUD Handlers
handlers.patient = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._patient[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the patient methods
handlers._patient  = {};

// Patient - post
// Required data: firstName,lastName, dob,contactNumber, email
// Optional data: none
handlers._patient.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var dob = typeof(data.payload.dob) == 'string' && data.payload.dob.trim().length > 0 ? data.payload.dob.trim() : false;
  var contactNumber = typeof(data.payload.contactNumber) == 'string' && data.payload.contactNumber.trim().length == 10 ? data.payload.contactNumber.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;


  if(firstName && lastName && dob && contactNumber && email){
    // Make sure the patient doesnt already exist
    _data.read('patient',"WHERE email=? and contactNumber=?",[email,contactNumber],function(err,data){
      if(!err && data.length == 0){
        // Create the patient object
        var fieldToInsertInto = "(fname,lname,dob,contactNumber,email) values (?,?,?,?,?)";
        var dataToInsert = [firstName,lastName,dob,contactNumber,email];

        // Store the patient
        _data.create('patient',fieldToInsertInto,dataToInsert,function(err,result){
          if(!err){
            callback(200,result);
          } else {
            callback(500,{'Error' : 'Could not create the new patient'});
          }
        });

      } else {
        // Patient already exists
        callback(400,{'Error' : 'The patient already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing or invalid required fields (firstName,lastName,dob,contactNumber,email) '});
  }

};

// Patient - Get
// Required data: patientId
// Optional data: none
handlers._patient.get = function(data,callback){
  // Check if a patient id was specified
  var queryParams = handlers.queryGetParams(data.queryStringObject);
  queryParams = typeof(queryParams) == 'object' && queryParams !== null ? queryParams : {condition : '',parameters : ''};

  // Lookup the specfic patient if id passed or return all
  _data.read('patient',queryParams.condition,queryParams.parameters,function(err,data){
  //_data.read('patient',"WHERE id=?",[patientId],function(err,data){
    if(!err && data.length > 0){
      callback(200,data);
    } else {
      callback(404,{'Error' : 'No Data found'});
    }
  });
};

// Patient - Put
// Required data: patientId
// Optional data: firstName, lastName, dob, email, contactNumber (at least one specified)
handlers._patient.put = function(data,callback){
  // Check for required field
  var patientId = typeof(data.payload.uid) == 'string' && data.payload.uid.trim().length > 0 ? data.payload.uid.trim() : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var dob = typeof(data.payload.dob) == 'string' && data.payload.dob.trim().length > 0 ? data.payload.dob.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  var contactNumber = typeof(data.payload.contactNumber) == 'string' && data.payload.contactNumber.trim().length == 10 ? data.payload.contactNumber.trim() : false;


  // Error if patientId is invalid
  if(patientId){
    // Error if nothing is sent to update
    if(firstName || lastName || dob || email || contactNumber){
      // Lookup the patient
      _data.read('patient',"WHERE id=?",[patientId],function(err,patientData){
        if(!err && patientData.length > 0){
          // Update the fields if necessary
          var params = [];
          var fieldsToUpdate = '';

          if(firstName){
            params.push(firstName);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",fname=?" : "fname=?";
          }
          if(lastName){
            params.push(lastName);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",lname=?" : "lname=?";
          }
          if(dob){
            params.push(dob);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",dob=?" : "dob=?";
          }
          if(email){
            params.push(email);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",email=?" : "email=?";
          }
          if(contactNumber){
            params.push(contactNumber);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",contactNumber=?" : "contactNumber=?";
          }

          params.push(patientId);
          // Store the new updates
          _data.update('patient',fieldsToUpdate,"WHERE id=?",params,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the patient.'});
            }
          });
        } else {
          callback(400,{'Error' : 'Specified patient does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Nothing to update.'});
    }
  } else {
    callback(400,{'Error' : 'patientId is missing or invalid.'});
  }

};

// Patients - Delete
// Required data: patientId
handlers._patient.delete = function(data,callback){
  // Check that patientId is valid
  var patientId = typeof(data.queryStringObject.uid) == 'string' && data.queryStringObject.uid.trim().length > 0 ? data.queryStringObject.uid.trim() : false;
  if(patientId){
    // Lookup the patient
    _data.read('patient',"WHERE id=?",[patientId],function(err,data){
      if(!err && data.length > 0){
        _data.delete('patient',"WHERE id=?",[patientId],function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified patient'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified patient.'});
      }
    });
  } else {
    callback(400,{'Error' : 'patientId is missing or invalid'})
  }
};

// Surgery CRUD Handlers
handlers.surgery = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._surgery[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the surgery methods
handlers._surgery  = {};

// Surgery - Post
// Required data: requestedBy,room,patient,startdate,enddate,doctorsAssigned
// Optional data: none
handlers._surgery.post = function(data,callback){
  // Check that all required fields are filled out
  var requestedBy = typeof(data.payload.requestedBy) == 'string' && data.payload.requestedBy.trim().length > 0 ? data.payload.requestedBy.trim() : false;
  var room = typeof(data.payload.room) == 'string' && data.payload.room.trim().length > 0 ? data.payload.room.trim() : false;
  var patient = typeof(data.payload.patient) == 'string' && data.payload.patient.trim().length > 0 ? data.payload.patient.trim() : false;
  var startdate = typeof(data.payload.startdate) == 'string' && data.payload.startdate.trim().length > 0 ? data.payload.startdate.trim() : false;
  var enddate = typeof(data.payload.enddate) == 'string' && data.payload.enddate.trim().length > 0 ? data.payload.enddate.trim() : false;
  var doctorsAssigned = typeof(data.payload.docAssigned) == 'object' && data.payload.docAssigned !== null > 0 ? data.payload.docAssigned : false;

  if(requestedBy && room && patient && startdate && enddate && doctorsAssigned){
    // Make sure the surgery doesnt already exist
    _data.read('surgery',"WHERE room=? and patient=?",[room,patient],function(err,data){
      if(!err && data.length == 0){
        // Create the surgery object

        var fieldToInsertInto = "(requestedBy,room,patient,startdate,enddate) values (?,?,?,?,?)";
        var dataToInsert = [requestedBy,room,patient,startdate,enddate];

        // Store the patient
        _data.create('surgery',fieldToInsertInto,dataToInsert,function(err,result){
          if(!err){

            // Doctors Assigned JSON
            var docList = '';

              // Get the newly created surgery record
              _data.read('surgery',"WHERE room=? and patient=?",[room,patient],function(err,data){
                
                doctorsAssigned.forEach(function(doctorId){
                  var fieldToInsertInto = "(surgeryId,doctorId) values (?,?)";
                  var dataToInsert = [data[0].id,doctorId];
                  // Store the doctor - surgery
                  _data.create('doc_in_surgery',fieldToInsertInto,dataToInsert,function(err,result){
                    if(!err){
                      callback(false);
                    } else {
                      callback(500,{'Error' : 'Could not create the new surgery doctor mapping'});
                    }
                  });
                });              
            });
            callback(200,result);
          } else {
            callback(500,{'Error' : 'Could not create the new surgery schedule'});
          }
        });

      } else {
        // Patient already exists
        callback(400,{'Error' : 'The surgery schedule already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing or invalid required fields (requestedBy,room,patient,startdate,enddate,doctorsAssigned)'});
  }

};

// Surgery - Get
// Required data: surgeryId
// Optional data: none
handlers._surgery.get = function(data,callback){
  // Check if conditions were specified
  var queryParams = handlers.queryGetParams(data.queryStringObject);
  queryParams = typeof(queryParams) == 'object' && queryParams !== null ? queryParams : {condition : '',parameters : ''};

  // Lookup the surgery
    _data.read('surgery',queryParams.condition,queryParams.parameters,function(err,data){
    //_data.read('surgery'," WHERE id=?",[surgeryId],function(err,data){
    if(!err && data.length > 0){
      callback(200,data);
    } else {
      callback(404,{'Error' : 'No Data found'});
    }
  });

};

// Surgery - Put
// Required data: surgeryId
// Optional data: requestedBy,room,patient,startdate,enddate (at least one specified)
handlers._surgery.put = function(data,callback){
  // Check for required field
  var surgeryId = typeof(data.queryStringObject.surgeryId) == 'string' && data.queryStringObject.surgeryId.trim().length > 0 ? data.queryStringObject.surgeryId.trim() : false;

  // Check for optional fields
  var requestedBy = typeof(data.payload.requestedBy) == 'string' && data.payload.requestedBy.trim().length > 0 ? data.payload.requestedBy.trim() : false;
  var room = typeof(data.payload.room) == 'string' && data.payload.room.trim().length > 0 ? data.payload.room.trim() : false;
  var patient = typeof(data.payload.patient) == 'string' && data.payload.patient.trim().length > 0 ? data.payload.patient.trim() : false;
  var startdate = typeof(data.payload.startdate) == 'string' && data.payload.startdate.trim().length == 10 ? data.payload.startdate.trim() : false;
  var enddate = typeof(data.payload.enddate) == 'string' && data.payload.enddate.trim().length > 0 ? data.payload.enddate.trim() : false;
 
  // Error if surgeryId is invalid
  if(surgeryId){
    // Error if nothing is sent to update
    if(requestedBy || room || patient || startdate || enddate){
      // Lookup the patient
      _data.read('surgery',"WHERE id=?",[surgeryId],function(err,surgeryData){
        if(!err && surgeryData.length > 0){
          // Update the fields if necessary
          var params = [];
          var fieldsToUpdate = '';

          if(requestedBy){
            params.push(requestedBy);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",requestedBy=?" : "requestedBy=?";
          }
          if(room){
            params.push(room);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",room=?" : "room=?";
          }
          if(patient){
            params.push(patient);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",patient=?" : "patient=?";
          }
          if(startdate){
            params.push(startdate);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",startdate=?" : "startdate=?";
          }
          if(enddate){
            params.push(enddate);
            fieldsToUpdate = fieldsToUpdate.length > 0 ? fieldsToUpdate += ",enddate=?" : "enddate=?";
          }          

          params.push(surgeryId);
          // Store the new updates
          _data.update('surgery',fieldsToUpdate,"WHERE id=?",params,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the surgery schedule.'});
            }
          });
        } else {
          callback(400,{'Error' : 'Specified surgery schedule does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Nothing to update on surgery'});
    }
  } else {
    callback(400,{'Error' : 'surgeryId is missing or invalid'});
  }

};

// Surgery - Delete
// Required data: surgeryId
handlers._surgery.delete = function(data,callback){
  // Check that surgeryId is valid
  var surgeryId = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;
  if(surgeryId){
    // Lookup the patient
    _data.read('surgery',"WHERE id=?",[surgeryId],function(err,data){
      if(!err && data.length > 0){
        _data.delete('surgery',"WHERE id=?",[surgeryId],function(err){
          if(!err){
            // Delete surgery mapping as well
            _data.delete('doc_in_surgery',"WHERE surgeryId=?",[surgeryId],function(err){
              if(!err){
                callback(false);
              } else {
                callback(500,{'Error' : 'Could not delete the specified surgery schedule'});
              }
            });
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified surgery schedule'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified surgery schedule.'});
      }
    });
  } else {
    callback(400,{'Error' : 'surgeryId is missing or invalid'})
  }
};

// Tokens CRUD Handlers
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the token methods
handlers._tokens  = {};

// Tokens - post
// Required data: userid, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  // Check that all required fields are filled out
  var userid = typeof(data.payload.userid) == 'string' && data.payload.userid.trim().length > 0 ? data.payload.userid.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length <= 8 ? data.payload.password.trim() : false;

  if(userid && password){

    // Hash the password for comparison
    var hashedPassword = helpers.hash(password);
    // Make sure the user doesnt already exist
    _data.read('users',"WHERE userid=? and password=?",[userid,hashedPassword],function(err,userData){
      if(!err && userData.length > 0){
        
        // Get the user's staff Type to add to the session token
        _data.read('staff',"WHERE id=?",[userData[0].staffId],function(err,staffData){
        if(!err && staffData.length > 0){
          // Create the token object
          var id = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;

          var staffType = staffData[0].staffType;

          var fieldToInsertInto = "(id,userid,staffType,expires) values (?,?,?,?)";
          var dataToInsert = [id,userid,staffType,expires];

          // Store the token
          _data.create('sessionToken',fieldToInsertInto,dataToInsert,function(err,result){
            if(!err){
            
                callback(200,[{id,userid,staffType}]);
              } else {
                callback(500,{'Error' : 'Could not create the token'});
              }
          });
        } else {
            callback(400);
        }
          
        });

      } else {
        // User does not exists
        callback(400,{'Error' : 'Username and/or password is incorrect'});
      }
    });

  } else {
    callback(400,{'Error' : 'Username and/or password is missing or invalid'});
  }

};

// Tokens - Get
// Required data: tokenId
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that staffId is valid
  var tokenId = typeof(data.queryStringObject.tokenId) == 'string' && data.queryStringObject.tokenId.trim().length == 20 ? data.queryStringObject.tokenId.trim() : false;
  if(tokenId){
    // Lookup the staff
    _data.read('sessionToken',"WHERE id=?",[tokenId],function(err,data){
      if(!err && data.length > 0){
        callback(200,data);
      } else {
        callback(404,{'Error' : 'No Data found'});
      }
    });
  } else {
    callback(400,{'Error' : 'tokenId is missing or invalid'})
  }
};

// Tokens - Put
// Required data: tokenId, extend
// Optional data: None
handlers._tokens.put = function(data,callback){
  // Check for required field
  var tokenId = typeof(data.payload.tokenId) == 'string' && data.payload.tokenId.trim().length > 0 ? data.payload.tokenId.trim() : false;

  // Check for optional fields
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

  // Error if tokenId is invalid
  if(tokenId && extend){
    // Lookup the token
    _data.read('sessionToken',"WHERE id=?",[tokenId],function(err,tokenData){
      if(!err && tokenData.length > 0){
        // Check to make sure token hasn't expired
        if(tokenData[0]['expires'] > Date.now()){
          // Set expiration 1 hour from now
          var expires = Date.now() + 1000 * 60 * 60;

          var params = [];
          var fieldsToUpdate = '';

          params.push(expires);
          fieldsToUpdate = "expires=?";          

          params.push(tokenId);

          // Store the new updates
          _data.update('sessionToken',fieldsToUpdate,"WHERE id=?",params,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the staff.'});
            }
          });
        } else {
          callback(400,{"Error" : "Token has already expired and cannot be extended"});
        }
        
      } else {
        callback(400,{'Error' : 'Specified token does not exist.'});
      }
    });
  } else {
    callback(400,{'Error' : 'tokenId and extend is missing or invalid'});
  }

};

// Tokens - Delete
// Required data: tokenId
handlers._tokens.delete = function(data,callback){
  // Check that staffId is valid
  var tokenId = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(tokenId){
    // Lookup the token record
    _data.read('sessionToken',"WHERE id=?",[tokenId],function(err,data){
      if(!err && data.length > 0){
        _data.delete('sessionToken',"WHERE id=?",[tokenId],function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'tokenId is missing or invalid'})
  }
};



// Export the handlers
module.exports = handlers;