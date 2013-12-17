/*
 * crud.js - module to provide CRUD db capabilities
 */

/*jslint         node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
    checkType,
    constructObj, readObj,
    updateObj,    destroyObj,

    mongodb     = require( 'mongodb' ),

    mongoServer = new mongodb.Server(
        'localhost',
        mongodb.Connection.DEFAULT_PORT
    ),
    dbHandle    = new mongodb.Db(
        'tutorial', mongoServer, { safe : true }
    ),

    objTypeMap  = { 'person' : {} };
// ------------- END MODULE SCOPE VARIABLES ---------------


// ---------------- BEGIN PUBLIC METHODS ------------------
checkType = function ( obj_type ) {
    if ( ! objTypeMap[ obj_type ] ) {
        return ({ error_msg : 'Object type "' + obj_type
            + '" is not supported.'
        });
    }
    return null;
};

constructObj = function ( obj_type, obj_map, callback ) {
    if ( checkType( obj_type ) ) {
        callback( checkType( obj_type ) );
        return;
    }

    dbHandle.collection(obj_type, function ( outer_error, collection ) {
        var options_map = { safe: true };

        collection.insert(
            obj_map,
            options_map,
            function ( inner_error, result_map ) {
                callback( result_map );
            });
        }
    );
};

readObj = function ( obj_type, find_map, fields_map, callback ) {
    if ( checkType( obj_type ) ) {
        callback( checkType( obj_type ) );
        return;
    }

    dbHandle.collection(
        obj_type,
        function ( outer_error, collection ) {
            collection.find( find_map, fields_map ).toArray(
                function ( inner_error, map_list ) {
                    callback( map_list );
                }
            );
        }
    );
};

updateObj = function ( obj_type, find_map, set_map, callback ) {
    if ( checkType( obj_type ) ) {
        callback( checkType( obj_type ) );
        return;
    }

    dbHandle.collection(
        obj_type,
        function ( outer_error, collection ) {
            collection.update(
                find_map,
                { $set : set_map },
                { safe : true, multi : true, upsert : false },
                function ( inner_error, update_count ) {
                    callback({ update_count : update_count });
                }
            );
        }
    );
};

destroyObj = function ( obj_type, find_map, callback ) {
    if ( checkType( obj_type ) ) {
        callback( checkType( obj_type ) );
        return;
    }

    dbHandle.collection(
        obj_type,
        function ( outer_error, collection ) {
            var options_map = { safe: true, single: true };

            collection.remove( find_map, options_map,
                function ( inner_error, delete_count ) {
                    callback({ delete_count: delete_count });
                }
            );
        }
    );
};

module.exports = {
    makeMongoId : mongodb.ObjectID,
    checkType   : checkType,
    construct   : constructObj,
    read        : readObj,
    update      : updateObj,
    destroy     : destroyObj
};
// ----------------- END PUBLIC METHODS -----------------

// ------------- BEGIN MODULE INITIALIZATION --------------
dbHandle.open( function () {
    console.log( '** Connected to MongoDB **' );
});
// -------------- END MODULE INITIALIZATION ---------------
