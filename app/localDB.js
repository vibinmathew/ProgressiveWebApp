import * as DB from "localforage";

export default DB;

(function() {
  'use strict';
  DB.config({
    driver      : [DB.INDEXEDDB, DB.WEBSQL, DB.LOCALSTORAGE],
    name        : 'myApp',
    version     : 1.0,
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
  });

})();