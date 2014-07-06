var Storaj = (function() {

  function Storaj(options) {
    if (options == null) options = {};
    options.name || (options.name = "defaultStorage");
    options.initialData || (options.initialData = {});
    this.options = options;
    if (!localStorage.getItem(options.name)) this._createStorage();
  }

  Storaj.prototype._createStorage = function() {
    var initialData, name, _ref;
    _ref = this.options, name = _ref.name, initialData = _ref.initialData;
    initialData = JSON.stringify(initialData);
    return localStorage.setItem(name, initialData);
  };

  Storaj.prototype.set = function(key, value) {
    var name, storageObject;
    name = this.options.name;
    storageObject = this.getAll();
    storageObject[key] = value;
    storageObject = JSON.stringify(storageObject);
    return localStorage.setItem(name, storageObject);
  };

  Storaj.prototype.get = function(key) {
    return this.getAll()[key];
  };

  Storaj.prototype.remove = function(key) {
    var name, storageObject;
    name = this.options.name;
    storageObject = this.getAll();
    delete storageObject[key];
    storageObject = JSON.stringify(storageObject);
    return localStorage.setItem(name, storageObject);
  };

  Storaj.prototype.getAll = function() {
    var name, storageObject;
    name = this.options.name;
    storageObject = localStorage.getItem(name);
    return storageObject = JSON.parse(storageObject);
  };

  Storaj.prototype.removeAll = function() {
    var name;
    name = this.options.name;
    return localStorage.setItem(name, "{}");
  };

  return Storaj;

})();