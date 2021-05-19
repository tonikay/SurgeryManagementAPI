/*
 * FrontEnd Logic for the application
 *
 */

// Container for frontend application
 var app ={};

// Config
app.config = {
	'sessionToken' : false
};

// AJAX client for the RESTful API
app.client ={};

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){
	headers = typeof(headers) == 'object' && headers !== null ? headers : {};
	path = typeof(path) == 'string' ? path : '/';
	method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
	queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
	payload = typeof(payload) == 'object' && payload !== null ? payload : {};
	callback = typeof(callback) == 'function' ? callback : false; // Allows user to make requests without a callback

	// For each query string parameter sent, add it to the path
	var requestUrl = path + '?';
	var counter = 0;
	for(var queryKey in queryStringObject){
		if(queryStringObject.hasOwnProperty(queryKey)){
			counter++;
			// If at least one query string parameter has been added, prepend with an ampersand
			if(counter > 1){
				requestUrl += '&';
			}
			// Add the key and value
			requestUrl += queryKey + '=' + queryStringObject[queryKey];
		}
	}

	// Form the http request as a JSON type
	var xhr = new XMLHttpRequest();
	xhr.open(method,requestUrl,true);
	xhr.setRequestHeader("Content-Type","application/json");

	// For each additional header sent, add it to the request one by one
	for(var headerKey in headers){
		if(headers.hasOwnProperty(headerKey)){
			xhr.setRequestHeader(headerKey,headers[headerKey]);
		}
	}

	// If there is a current session token, add as a header
	if(app.config.sessionToken){
		xhr.setRequestHeader("token",app.config.sessionToken.id);
	}

	// When the request comes back, handle the response
	xhr.onreadystatechange = function(){
		if(xhr.readyState == XMLHttpRequest.DONE){
			var statusCode = xhr.status;
			var responseReturned = xhr.responseText;

			// Callback if requested
			if(callback){
				try{
					var parsedResponse = JSON.parse(responseReturned);
					callback(statusCode,parsedResponse);
				} catch(e){
					callback(statusCode,false);
				}
			}
		}
	}

	// Send the payload as json
	var payloadString = JSON.stringify(payload);
	xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
  	if(statusCode !== 200){
  		console.log("Error deleted session token");
  	} else {
  		// Set the app.config token as false
	    app.setSessionToken(false);

	    // Send the user to the logged out page
	    if(redirectUser){
	      window.location = '/logout';
	    }
  	}
  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            var valueOfElement = elements[i].type == 'select-multiple' ? [...elements[i].selectedOptions].map(option => option.value) : elements[i].value ;
            var nameOfElement = elements[i].name;

            if(nameOfElement == '_method'){
              method = valueOfElement;
        	} else {

			    // Create an payload field named "id" if the elements name is actually uid
			    if(nameOfElement == 'uid'){
			        nameOfElement = 'id';
			    }

	            payload[nameOfElement] = valueOfElement;


        	}
          }
        }
        

        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload[0]);
		window.location = '/dashboard/main';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountCreate','patientCreate','surgeryCreate','roomsCreate','staffCreate','patientEdit','roomEdit1', 'accountEdit2', 'staffEdit1'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }


  // If the user just deleted a patient, redirect them to the dashboard
  if(formId == 'patientEdit2'){
    window.location = '/patients/all';
  }
};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'tokenId' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'tokenId' : currentToken.id};
        app.client.request(undefined,'tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload[0]);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  	// Get the current page from the body class
  	var bodyClasses = document.querySelector("body").classList;
  	var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  	// Logic for account settings page
  	if(primaryClass == 'accountEdit'){
    	app.loadAccountEditPage();
  	}

  	// Logic for patients list page
  	if(primaryClass == 'patientsList'){
    	app.loadPatientListPage();
  	}

  	// Logic for patient details page
  	if(primaryClass == 'patientEdit'){
    	app.loadPatientsEditPage();
  	}

  	//Logic to populate fields on create pages
  	if(primaryClass.indexOf('Create') > -1){
    	app.loadCreatePage(primaryClass);
  	}

  	// Logic for surgery list page
  	if(primaryClass == 'surgeryList'){
    	app.loadSurgeryListPage();
  	}

  	// Logic for surgery edit page
  	if(primaryClass == 'surgeryEdit'){
  		app.loadSurgeryEditPage()
  	}

    // Logic for staff list page
  	if(primaryClass == 'staffList'){
    	app.loadStaffListPage();
  	} 

  	// 
  	if(primaryClass == 'roomList'){
    	app.loadRoomListPage();
  	}

  	//
	if(primaryClass == 'userList'){
    	app.loadUserListPage();
	}

  	//
	if(primaryClass == 'roomEdit'){
		app.loadRoomEditPage();
	}

  	//
	if(primaryClass == 'staffEdit'){
		app.loadStaffEditPage();
	}

  	//Logic for Dashboard
	if(primaryClass == 'dashboardMain'){
  		app.loadDashboard()
	}
};

app.loadDashboard = function(){
	var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
	if(!userid){
		app.logUserOut(false);
		window.location = '/';
	} else {
		var staffType = typeof(app.config.sessionToken.staffType) == 'string' ? app.config.sessionToken.staffType : false;
		if(staffType == 'Admin'){
			document.getElementById("staffBtn").classList.remove('AdminOnly');

			document.getElementById("usersBtn").classList.remove('AdminOnly');
		}
	}
};

// Load the create pages specifically
app.loadCreatePage = function(formId,payload){
    var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
  	if(userid){
		// Populate staff dropdown on user create page
		if(formId == 'accountCreate'){
			// Get all staff list
			app.client.request(undefined,'staff','GET',{},undefined,function(statusCode,responsePayload){
		      	if(statusCode == 200){
		      		var staffList = responsePayload;

		        	var select = document.getElementById("staffMember");
		        	
		        	var blankOption = document.createElement("option");
				    blankOption.text = '';
				    select.appendChild(blankOption);

		            for (var staff of staffList)
				    {
				        var option = document.createElement("option");
				        option.value = staff.id;
				        option.text = staff.fname + ' ' + staff.lname;
				        select.appendChild(option);
				    }
				} else {
					callback(400);
				}
			});

			// On change of staff list, update the userid field with staff's email
			document.getElementById("staffMember").addEventListener("change", function(e){

			    // Stop it from redirecting anywhere
			    e.preventDefault();

			    // Get all staff email
		        var queryStringObject = {
			      'id' : e.target.value
			    };
				app.client.request(undefined,'staff','GET',queryStringObject,undefined,function(statusCode,responsePayload){
			      	if(statusCode == 200){
			      		var staffEmail = responsePayload[0].email;

			        	document.getElementById("userid").value = staffEmail; // Add email to userid field
					} else {
						callback(400);
					}

				});
			});
		}

		// Populate staff dropdown on user create page
		if(formId == 'surgeryCreate'){

			// Get all staff list - doctors
			var queryStringObject = {
		      'staffType' : "Doctor"
		    };
			app.client.request(undefined,'staff','GET',queryStringObject,undefined,function(statusCode,responsePayload){
		      	if(statusCode == 200){
		      		var doctorList = responsePayload;

		      		// Requested By Field
				    var select1 = document.getElementById("requestedBy");

				    var blankOption1 = document.createElement("option");
				    blankOption1.text = '';
				    select1.appendChild(blankOption1);

		            for (var doctor of doctorList)
				    {
				        var option = document.createElement("option");
				        option.value = doctor.id;
				        option.text = doctor.fname + ' ' + doctor.lname;
				        select1.appendChild(option);
				    }


				    // Doctors Assigned Field
				   	var select2 = document.getElementById("docAssigned");

		            for (var doctor of doctorList)
				    {
				        var option = document.createElement("option");
				        option.value = doctor.id;
				        option.text = doctor.fname + ' ' + doctor.lname;
				        select2.appendChild(option);
				    }
				} else {
					callback(400);
				}
			});

			// Get all room list
			app.client.request(undefined,'rooms','GET',{},undefined,function(statusCode,responsePayload){
		      	if(statusCode == 200){
		      		var roomList = responsePayload;

		        	var select3 = document.getElementById("room");

		        	var blankOption3 = document.createElement("option");
				    blankOption3.text = '';
				    select3.appendChild(blankOption3);

		            for (var room of roomList)
				    {
				        var option = document.createElement("option");
				        option.value = room.id;
				        option.text = room.roomName;
				        select3.appendChild(option);
				    }
				} else {
					callback(400);
				}
			});

			// Get all patient list
			app.client.request(undefined,'patients','GET',{},undefined,function(statusCode,responsePayload){
		      	if(statusCode == 200){
		      		var patientList = responsePayload;

		        	var select4 = document.getElementById("patient");

		        	var blankOption4 = document.createElement("option");
				    blankOption4.text = '';
				    select4.appendChild(blankOption4);

		            for (var patient of patientList)
				    {
				        var option = document.createElement("option");
				        option.value = patient.id;
				        option.text = patient.fname + ' ' + patient.lname;
				        select4.appendChild(option);
				    }
				} else {
					callback(400);
				}
			});
		}
	} else {
	    app.logUserOut(false);
	    window.location = '/';
	}
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the user from the current token, or log the user out if none is there
  var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
  if(userid){
    // Fetch the user data
    var queryStringObject = {
      'userid' : userid
    };
    app.client.request(undefined,'users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed

        document.querySelector("#accountEdit2 .displayUseridInput").value = responsePayload[0].userid;

        // Put the hidden phone field into both forms
        var useridInputs = document.querySelectorAll("input.hiddenuseridInput");
        for(var i = 0; i < useridInputs.length; i++){
            useridInputs[i].value = responsePayload[0].userid;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the patient page specifically
app.loadPatientListPage = function(){
  // Get the user from the current token, or log the user out if none is there
  var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
  if(userid){
    // Fetch the patient data

    app.client.request(undefined,'patients','GET',undefined,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Determine how many checks the user has
        var allPatients = typeof(responsePayload) == 'object' && responsePayload instanceof Array && responsePayload.length > 0 ? responsePayload : [];
        if(allPatients.length > 0){

          // Show each patient as a new row in the table
          for(var i = 0 ; i < allPatients.length ; i++){
                var patientData = allPatients[i];
                // Make the patient data into a table row
                var table = document.getElementById("patientListTable");
                var tr = table.insertRow(-1);
                tr.classList.add('patientRow');
                var td0 = tr.insertCell(0);
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(2);
                var td3 = tr.insertCell(3);
                var td4 = tr.insertCell(4);
                var td5 = tr.insertCell(5);
                var td6 = tr.insertCell(6);
                td0.innerHTML = patientData.fname.toUpperCase();
                td1.innerHTML = patientData.lname.toUpperCase();

				//Converting date from datetime to Locale
				const dob = new Date(patientData.dob);
				const options = {year: 'numeric', month: 'long', day: 'numeric' };

                td2.innerHTML = dob.toLocaleDateString(undefined, options);
                td3.innerHTML = patientData.contactNumber;
                td4.innerHTML = patientData.email;
                td5.innerHTML = '<a href="/patients/edit?id='+patientData.id+'">View / Edit / Delete</a>';
                td6.innerHTML = '<a href="/surgery/all?patientId='+patientData.id+'">Surgeries</a>';
          }
        } else {
          // Show  message
          document.getElementById("noPatientsMessage").style.display = 'table-row';

        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
            app.logUserOut(false);
    		window.location = '/';
      }
    });
  } else {
    app.logUserOut(false);
    window.location = '/';
  }
};

// Load the surgery page specifically
app.loadSurgeryListPage = function(){


  	// Get the user from the current token, or log the user out if none is there
  	var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
 	if(userid){

   		// Fetch the surgery data

    	var queryParam = {};
	    var staffType = app.config.sessionToken.staffType;

	  	//Get the request id from the query string, if any
	  	var passedParam = window.location.search.replace('?','').split('=');
	  	var paramKey = passedParam[0];
	  	var paramVal = passedParam[1];
	  	var id = typeof(paramVal) == 'string' && paramVal.length > 0 ? paramVal : false;
	  	if(id){
	  		if(paramKey == 'patientId'){
			  	queryParam = {
		  			"patientId" : id
		  		};
	  		}
	  		if(paramKey == 'roomId'){
			  	queryParam = {
		  			"roomId" : id
		  		};
	  		}
	  	}


	   	if(staffType == 'Doctor'){
		  	queryParam = {
	  			"userid" : userid
	  		};
	   	} 

  	   	app.client.request(undefined,'surgeryQuery','GET',queryParam,undefined,function(statusCode,responsePayload){
      		if(statusCode == 200){
      			var allSurgery = typeof(responsePayload) == 'object' && responsePayload instanceof Array && responsePayload.length > 0 ? responsePayload : [];
      			
      			if(allSurgery.length > 0){

		          // Show each surgery as a new row in the table
		          for(var i = 0 ; i < allSurgery.length ; i++){
		                var surgeryData = allSurgery[i];
		                // Make the patient data into a table row
		                var table = document.getElementById("surgeryListTable");
		                var tr = table.insertRow(-1);
		                tr.classList.add('surgeryRow');
		                var td0 = tr.insertCell(0);
		                var td1 = tr.insertCell(1);
		                var td2 = tr.insertCell(2);
		                var td3 = tr.insertCell(3);
		                var td4 = tr.insertCell(4);
		                var td5 = tr.insertCell(5);
		                var td6 = tr.insertCell(6);

		                td0.innerHTML = surgeryData.requestedBy.toUpperCase();
		                td1.innerHTML = surgeryData.roomName.toUpperCase();
		                td2.innerHTML = surgeryData.Patient.toUpperCase();

		                //Converting date from datetime to Locale
						const options = {year: 'numeric', month: 'long', day: 'numeric' };
						const startdate = new Date(surgeryData.startDate);
						const enddate = new Date(surgeryData.endDate);

		                td3.innerHTML = startdate.toLocaleDateString(undefined, options);
		                td4.innerHTML = enddate.toLocaleDateString(undefined, options);
		                td5.innerHTML = surgeryData.Doctors.toUpperCase();
		                td6.innerHTML = '<a href="/surgery/edit?id='+surgeryData.id+'">View / Edit / Delete</a>';
		          }
		        } else {
		          // Show message
		          document.getElementById("noSurgeryMessage").style.display = 'table-row';

		        }
      		} else {
		        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
	            app.logUserOut(false);
				window.location = '/';
		    }
		});

 		
  } else {
    app.logUserOut(false);
    window.location = '/';
  }
};

// Load the staff page specifically
app.loadStaffListPage = function(){
  // Get the user from the current token, or log the user out if none is there
  var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
  if(userid){
    // Fetch the staff data

    app.client.request(undefined,'staff','GET',undefined,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Determine how many checks the user has
        var allStaff = typeof(responsePayload) == 'object' && responsePayload instanceof Array && responsePayload.length > 0 ? responsePayload : [];
        if(allStaff.length > 0){

          // Show each patient as a new row in the table
          for(var i = 0 ; i < allStaff.length ; i++){
                var staffData = allStaff[i];
                // Make the patient data into a table row
                var table = document.getElementById("staffListTable");
                var tr = table.insertRow(-1);
                tr.classList.add('staffRow');
                var td0 = tr.insertCell(0);
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(2);
                var td3 = tr.insertCell(3);
                var td4 = tr.insertCell(4);
                var td5 = tr.insertCell(5);
                var td6 = tr.insertCell(6);
                td0.innerHTML = staffData.staffType.toUpperCase();
                td1.innerHTML = staffData.fname.toUpperCase();
                td2.innerHTML = staffData.lname.toUpperCase();
                td3.innerHTML = staffData.phone;
                td4.innerHTML = staffData.email;
                td5.innerHTML = '<a href="/staff/edit?id='+staffData.id+'">View / Edit / Delete</a>';
          }
        } else {
          // Show message
          document.getElementById("noStaffMessage").style.display = 'table-row';

        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
            app.logUserOut(false);
    		window.location = '/';
      }
    });
  } else {
    app.logUserOut(false);
    window.location = '/';
  }
};

// Load the room page specifically
app.loadRoomListPage = function(){
  // Get the user from the current token, or log the user out if none is there
  var userid = typeof(app.config.sessionToken.userid) == 'string' ? app.config.sessionToken.userid : false;
  if(userid){
    // Fetch the room data

    app.client.request(undefined,'rooms','GET',undefined,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){


        var allRooms = typeof(responsePayload) == 'object' && responsePayload instanceof Array && responsePayload.length > 0 ? responsePayload : [];
        if(allRooms.length > 0){

          // Show each room as a new row in the table
          for(var i = 0 ; i < allRooms.length ; i++){
                var roomData = allRooms[i];
                // Make the room data into a table row
                var table = document.getElementById("roomListTable");
                var tr = table.insertRow(-1);
                tr.classList.add('roomRow');
                var td0 = tr.insertCell(0);
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(1);               
                td0.innerHTML = roomData.roomName.toUpperCase();
                td1.innerHTML = '<a href="/rooms/edit?id='+roomData.id+'">View / Edit / Delete</a>';
				td2.innerHTML = '<a href="/surgery/all?roomId='+roomData.id+'">Surgeries</a>';
          }
        } else {
          // Show  message
          document.getElementById("noRoomMessage").style.display = 'table-row';

        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
            app.logUserOut(false);
    		window.location = '/';
      }
    });
  } else {
    app.logUserOut(false);
    window.location = '/';
  }
};


// Load the room edit page specifically
app.loadRoomEditPage = function(){
  // Get the patient id from the query string, if none is found then redirect back to dashboard
  var id = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
  if(id){
    // Fetch the patient data
    var queryStringObject = {
      'id' : id
    };
    app.client.request(undefined,'rooms','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Put the hidden id field into both forms
        var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
        for(var i = 0; i < hiddenIdInputs.length; i++){
            hiddenIdInputs[i].value = responsePayload[0].id;
        }

        // Put the data into the top form as values where needed
        document.querySelector("#roomEdit1 .roomNameInput").value = responsePayload[0].roomName;

      } else {
        // If the request comes back as something other than 200, redirect back to dashboard
        window.location = '/room/all';
      }
    });
  } else {
    window.location = '/room/all';
  }
};

// Load the patients edit page specifically
app.loadPatientsEditPage = function(){
  // Get the patient id from the query string, if none is found then redirect back to dashboard
  var id = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
  if(id){
    // Fetch the patient data
    var queryStringObject = {
      'id' : id
    };
    app.client.request(undefined,'patients','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Put the hidden id field into both forms
        var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
        for(var i = 0; i < hiddenIdInputs.length; i++){
            hiddenIdInputs[i].value = responsePayload[0].id;
        }

        // Put the data into the top form as values where needed
        document.querySelector("#patientEdit1 .fnameInput").value = responsePayload[0].fname;
        document.querySelector("#patientEdit1 .lnameInput").value = responsePayload[0].lname;
        document.querySelector("#patientEdit1 .dobInput").value = responsePayload[0].dob.substring(0, 10);
        document.querySelector("#patientEdit1 .contactNumberInput").value = responsePayload[0].contactNumber;
        document.querySelector("#patientEdit1 .emailInput").value = responsePayload[0].email;

      } else {
        // If the request comes back as something other than 200, redirect back to dashboard
        window.location = '/patients/all';
      }
    });
  } else {
    window.location = '/patients/all';
  }
};

// Load the staff edit page specifically
app.loadStaffEditPage = function(){
  // Get the patient id from the query string, if none is found then redirect back to dashboard
  var id = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
  if(id){
    // Fetch the patient data
    var queryStringObject = {
      'id' : id
    };
    app.client.request(undefined,'staff','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Put the hidden id field into both forms
        var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
        for(var i = 0; i < hiddenIdInputs.length; i++){
            hiddenIdInputs[i].value = responsePayload[0].id;
        }

        // Put the data into the top form as values where needed

        var staffType = responsePayload[0].staffType;
        options = document.getElementById("staffType").getElementsByTagName("option");
		for(var i in options){
	        if(options[i].innerHTML == staffType){
	            options[i].selected="selected";
	        }
		}

        document.querySelector("#staffEdit1 .fnameInput").value = responsePayload[0].fname;
        document.querySelector("#staffEdit1 .lnameInput").value = responsePayload[0].lname;
        document.querySelector("#staffEdit1 .phoneInput").value = responsePayload[0].phone;
        document.querySelector("#staffEdit1 .emailInput").value = responsePayload[0].email;

      } else {
        // If the request comes back as something other than 200, redirect back to dashboard
        window.location = '/staff/all';
      }
    });
  } else {
    window.location = '/staff/all';
  }
};

// Load the surgery edit page specifically
app.loadSurgeryEditPage = function(){


  	// Get the surgery id from the query string, if none is found then redirect back to dashboard
	  	//Get the request id from the query string, if any
	  	var passedParam = window.location.search.replace('?','').split('=');
	  	var paramVal = passedParam[1];
	  	var id = typeof(paramVal) == 'string' && paramVal.length > 0 ? paramVal : false;
	  	if(id){

     	// Fetch the patient data
     	var queryStringObject = {
      		'surgeryId' : id
     	};
	    app.client.request(undefined,'surgeryQuery','GET',queryStringObject,undefined,function(statusCode,responsePayload){
	      if(statusCode == 200){

		        // Put the hidden id field into both forms
		        var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
		        for(var i = 0; i < hiddenIdInputs.length; i++){
		            hiddenIdInputs[i].value = responsePayload[0].id;
		        }

		        app.loadCreatePage('surgeryCreate');

	      } else {
	        // If the request comes back as something other than 200, redirect back to dashboard
	        window.location = '/surgery/all';
	       }
	    });
  } else {
    window.location = '/surgery/all';
  }
};



// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 300);
};

// Init (bootstrapping)
app.init = function(){

   // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};