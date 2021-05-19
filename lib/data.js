/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');
var DBConn = require('./DBConn');

// Container for module (to be exported)
var lib = {};


// Write data to a file
lib.create = function(file,fields,param,callback){
  var sqlString = "INSERT INTO " + file + " " + fields;
  DBConn.query(sqlString,param,function (err, result) {
      if (err) {
        console.log(err);
        callback(true,result);
      } else {
        callback(false,file + "created successfully");
      }
    });
};

// Read data from a file
lib.read = function(file,condition,param,callback){
  var sqlString = "SELECT * FROM " + file + " " + condition;
  DBConn.query(sqlString, param,function(err, result) {
    if (err) {
      console.log(err);
      callback(true);
    } else {
      callback(false,result);
    }
  });
};

// Update data in a file
lib.update = function(file,fields,condition,param,callback){
 var sqlString = "UPDATE " + file + " SET " + fields + " " + condition;
  DBConn.query(sqlString,param,function (err, result) {
    if (err) {
        console.log(err);
        callback(true);
    } else {
      callback(false,"1 record updated successfully");
    }
    });
};

// Delete a file
lib.delete = function(file,condition,param,callback){
var sqlString = "DELETE FROM " + file + " " + condition;
  DBConn.query(sqlString,param,function (err, result) {
    if (err) {
        console.log(err);
        callback(true);
    } else {
      callback(false,"1 record deleted successfully");
    }
    });
};

// Execute a custom query
lib.custom = function(sqlString,params,callback){
  DBConn.query(sqlString,params,function(err, result) {
    if (!err && result.length > 0) {
      callback(false,result);
    } else {
      callback(true);
    }
  });
};

// Export the module
module.exports = lib;