cherry.stateManager = function (game) {
  var self = this;
  self.current = null;
  self.states = [];

  cherry.stateManager.prototype.add = function (state) {
    self.states.push(state);
  };

  cherry.stateManager.prototype.get = function (stateName) {
    var output = false;
    self.states.forEach(function (state) {
      if (state.name === stateName) {
        output = state;
      }
    });
    return output;
  };

  cherry.stateManager.prototype.getStates = function (stateName) {
    return self.states;
  };

  cherry.stateManager.prototype.switch = function (stateName) {
    game.loop.nextStep(function () {
      self.current = self.get(stateName);
    });
  };
};
