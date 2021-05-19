/*
 * Helpers for various tasks
 *
 */

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var fs = require('fs');
var path = require('path');

// Container for all the helpers
var helpers = {};

// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.trim().length > 0){
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};


// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Defined  all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i=1; i<=strLength; i++){
      // Get a random character from the possibleCharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)); // Grab a random number between the first position and last positions of the possible characters string and then get the character at that position
      // Append character to the final string
      str += randomCharacter;
    }

    // Return the final string
    return str;
  } else {
    return false;
  }
};

// Get the string content of a template
helpers.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir + templateName + '.html','utf8',function(err,str){
      if(!err && str && str.length > 0){
        // Do interpolation on the string
        var finalString = helpers.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback('Page could be found');
      }
    });
  } else {
    callback('A valid html name was not specified');
  }
};

// Add the universla header and footer to a string and pass a provided data object to a header and footer for interpolation
helpers.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Get the header
  helpers.getTemplate('_header',data,function(err,headerString){
    if(!err && headerString){
      // Get the footer
      helpers.getTemplate('_footer',data,function(err,footerString){
        if(!err && footerString){
          // Add them all together
          var fullString = headerString + str + footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
});

};

// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the template globals to the data object, prepending their key name with global
  for(var keyName in config.templateGlobals){
    if(config.templateGlobals.hasOwnProperty(keyName)){
      data['global.' + keyName] = config.templateGlobals[keyName];
    }
  }

  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(var key in data){
    if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
      var replace = data[key];
      var find = '{' + key + '}';
      str = str.replace(find,replace);
    }
  }

  return str;
};

// Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir + fileName,function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    })
  } else {
    callback('A valid file name was not specified');
  }
};

// Export the module
module.exports = helpers;