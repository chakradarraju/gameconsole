function Storage() {
}

Storage.prototype.update = function(key, value) {
  localStorage.setItem(key, value);
};

Storage.prototype.get = function(key) {
  return localStorage.getItem(key);
};
