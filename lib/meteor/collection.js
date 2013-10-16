var prefDebugging;

try {
  prefDebugging = RequestData.get('perfDebugging');
} catch(e) {
  
}

if (prefDebugging == 'true') {
  var wrappedFind = Meteor.Collection.prototype.find;

  Meteor.Collection.prototype.find = function () {
    var cursor = wrappedFind.apply(this, arguments);
    var collectionName = this._name;

    cursor.observeChanges({
      added: function (id, fields) {
        App.log.info(collectionName, 'added', id, fields);
      },

      changed: function (id, fields) {
        App.log.info(collectionName, 'changed', id, fields);
      },

      movedBefore: function (id, before) {
        App.log.info(collectionName, 'movedBefore', id, before);
      },

      removed: function (id) {
        App.log.info(collectionName, 'removed', id);
      }
    });

    return cursor;
  };
}