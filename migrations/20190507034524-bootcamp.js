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
    return db.createTable('bootcamp_batch', {
        columns: {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            name: 'string',  // shorthand notation
            date: 'DATE'
        },
        ifNotExists: true
    });
};

exports.down = function(db) {
    return db.dropTable('bootcamp_batch');
};

exports._meta = {
  "version": 1
};
