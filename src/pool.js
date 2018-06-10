cherry.Pool = function (config) {
  this.config = config || {};
  this.pool = [];
  this.used = 0;
};

cherry.Pool.prototype.clear = function () {
  this.pool = [];
  this.used = 0;
};

cherry.Pool.prototype.getUsed = function () {
  return this.used;
};

cherry.Pool.prototype.use = function () {

  // get a free object
  var unusedItem = false;
  this.pool.forEach(function (item) {
    if (item.active === false) {
      unusedItem = item;
    }
  });

  // if free object init and reuse it
  if (unusedItem) {
    this.config.reset.apply(this, [unusedItem.object].concat(Array.prototype.slice.call(arguments)));
    unusedItem.active = true;
    return unusedItem.object;
  }

  // if no free object creates one
  var item = {
    active: true,
    object: new (Function.prototype.bind.apply(this.config.class, [null].concat(Array.prototype.slice.call(arguments))))()
  };
  this.pool.push(item);
  this.used++;
  return item.object;
};

cherry.Pool.prototype.dismiss = function (obj) {
  // search o and deactivate it
  this.pool.forEach(function (item) {
    if (item.object === obj) {
      item.active = false;
    }
  });
  this.used--;
};

cherry.Pool.prototype.getSize = function () {
  return this.pool.length;
};

cherry.Pool.prototype.each = function (fn) {
  var length = this.pool.length;
  var i;
  for (i = 0; i < length; i++) {
    if (this.pool[i].active === true) {
      fn(this.pool[i].object, i);
    }
  }
};