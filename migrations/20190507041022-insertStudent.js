'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */



exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.insert('student',['firstName','lastName','email','phone','address','batch_id'],
        ['Agus','wibawa','ags@mail.com','09878','jogja',1]);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
